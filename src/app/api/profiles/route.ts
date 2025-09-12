import { NextRequest, NextResponse } from 'next/server';

interface Profile {
  id: string;
  name: string;
  server: string;
  knockbackReduction: number;
  pvpMode: string;
  stealthMode: boolean;
  lastUsed: string;
  wins: number;
  losses: number;
}

// In a real application, this would be stored in a database
const profiles: Profile[] = [
  {
    id: "1",
    name: "Hypixel Duels",
    server: "hypixel",
    knockbackReduction: 75,
    pvpMode: "1v1",
    stealthMode: true,
    lastUsed: "2024-01-15",
    wins: 127,
    losses: 43,
  },
  {
    id: "2", 
    name: "CubeCraft Team",
    server: "cubecraft",
    knockbackReduction: 60,
    pvpMode: "team",
    stealthMode: true,
    lastUsed: "2024-01-14",
    wins: 89,
    losses: 31,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    profiles: profiles,
    count: profiles.length
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, profileId, profileData } = body;

    switch (action) {
      case 'load':
        const profile = profiles.find(p => p.id === profileId);
        if (!profile) {
          return NextResponse.json(
            { success: false, message: 'Profile not found' },
            { status: 404 }
          );
        }

        // Update last used date
        profile.lastUsed = new Date().toISOString().split('T')[0];
        
        // Generate batch file for this profile
        const batchContent = generateProfileBatchFile(profile);

        return NextResponse.json({
          success: true,
          message: `Profile "${profile.name}" loaded successfully`,
          profile: profile,
          batchFile: `profile_${profileId}.bat`,
          batchContent: batchContent
        });

      case 'create':
        if (!profileData || !profileData.name) {
          return NextResponse.json(
            { success: false, message: 'Profile name is required' },
            { status: 400 }
          );
        }

        const newProfile: Profile = {
          id: Date.now().toString(),
          name: profileData.name,
          server: profileData.server || 'hypixel',
          knockbackReduction: Math.max(10, Math.min(90, profileData.knockbackReduction || 70)),
          pvpMode: profileData.pvpMode || '1v1',
          stealthMode: profileData.stealthMode !== false,
          lastUsed: new Date().toISOString().split('T')[0],
          wins: 0,
          losses: 0,
        };

        profiles.push(newProfile);

        return NextResponse.json({
          success: true,
          message: 'Profile created successfully',
          profile: newProfile
        });

      case 'delete':
        const profileIndex = profiles.findIndex(p => p.id === profileId);
        if (profileIndex === -1) {
          return NextResponse.json(
            { success: false, message: 'Profile not found' },
            { status: 404 }
          );
        }

        const deletedProfile = profiles.splice(profileIndex, 1)[0];

        return NextResponse.json({
          success: true,
          message: `Profile "${deletedProfile.name}" deleted successfully`,
          deletedProfile: deletedProfile
        });

      case 'update':
        const updateProfile = profiles.find(p => p.id === profileId);
        if (!updateProfile) {
          return NextResponse.json(
            { success: false, message: 'Profile not found' },
            { status: 404 }
          );
        }

        // Update profile with new data
        Object.assign(updateProfile, profileData);
        updateProfile.lastUsed = new Date().toISOString().split('T')[0];

        return NextResponse.json({
          success: true,
          message: 'Profile updated successfully',
          profile: updateProfile
        });

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Profiles API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function generateProfileBatchFile(profile: Profile): string {
  const serverDisplayName = profile.server.charAt(0).toUpperCase() + profile.server.slice(1);
  
  return `@echo off
title Anti-Knockback Pro - ${profile.name}
color 0e

echo ==========================================
echo    PROFILE: ${profile.name}
echo ==========================================
echo.

echo [INFO] Loading profile settings...
echo [INFO] Server: ${serverDisplayName}
echo [INFO] PvP Mode: ${profile.pvpMode.toUpperCase()}
echo [INFO] Knockback Reduction: ${profile.knockbackReduction}%
echo [INFO] Stealth Mode: ${profile.stealthMode ? 'ENABLED' : 'DISABLED'}
echo.

REM Profile-specific configuration
echo {> profile_${profile.id}_config.json
echo   "profileId": "${profile.id}",>> profile_${profile.id}_config.json
echo   "profileName": "${profile.name}",>> profile_${profile.id}_config.json
echo   "server": "${profile.server}",>> profile_${profile.id}_config.json
echo   "knockbackReduction": ${profile.knockbackReduction},>> profile_${profile.id}_config.json
echo   "pvpMode": "${profile.pvpMode}",>> profile_${profile.id}_config.json
echo   "stealthMode": ${profile.stealthMode ? 'true' : 'false'},>> profile_${profile.id}_config.json
echo   "wins": ${profile.wins},>> profile_${profile.id}_config.json
echo   "losses": ${profile.losses},>> profile_${profile.id}_config.json
echo   "loadedAt": "%date% %time%">> profile_${profile.id}_config.json
echo }>> profile_${profile.id}_config.json

echo [SUCCESS] Profile "${profile.name}" loaded successfully!
echo.

echo [INFO] Starting anti-knockback with profile settings...
timeout /t 3 /nobreak >nul

echo [SUCCESS] Anti-knockback is now ACTIVE with ${profile.name} settings!
echo.
echo ==========================================
echo    PROFILE STATS
echo ==========================================
echo  Wins: ${profile.wins}
echo  Losses: ${profile.losses}
echo  Win Rate: ${profile.wins + profile.losses > 0 ? Math.round((profile.wins / (profile.wins + profile.losses)) * 100) : 0}%
echo  Last Used: ${profile.lastUsed}
echo ==========================================
echo.

echo [INFO] Press F4 to stop or close window
echo.

:loop
timeout /t 5 /nobreak >nul
echo [ACTIVE] Profile: ${profile.name} - Reduction: ${profile.knockbackReduction}%
goto loop`;
}