import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json();
    
    // Validate advanced settings
    const validatedSettings = {
      // Knockback Settings
      horizontalReduction: Math.max(0, Math.min(95, settings.horizontalReduction || 70)),
      verticalReduction: Math.max(0, Math.min(95, settings.verticalReduction || 50)),
      velocityMultiplier: Math.max(0.1, Math.min(1.0, settings.velocityMultiplier || 0.3)),
      
      // Detection Settings
      randomizeValues: settings.randomizeValues !== false,
      detectionBypass: settings.detectionBypass !== false,
      customDelay: Math.max(50, Math.min(500, settings.customDelay || 150)),
      
      // Network Settings
      packetOptimization: settings.packetOptimization !== false,
      lagCompensation: settings.lagCompensation !== false,
      pingThreshold: Math.max(20, Math.min(300, settings.pingThreshold || 100)),
      
      // Safety Settings
      maxReduction: Math.max(50, Math.min(95, settings.maxReduction || 85)),
      emergencyStop: settings.emergencyStop !== false,
      logActivity: settings.logActivity === true,
    };

    // Generate advanced config file
    const configContent = generateAdvancedConfig(validatedSettings);
    
    console.log('Saving advanced settings:', validatedSettings);
    console.log('Generated config:', configContent);

    return NextResponse.json({
      success: true,
      message: 'Advanced settings saved successfully',
      settings: validatedSettings,
      configFile: 'advanced-config.json',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Settings save error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to save settings',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return default advanced settings
  const defaultSettings = {
    horizontalReduction: 70,
    verticalReduction: 50,
    velocityMultiplier: 0.3,
    randomizeValues: true,
    detectionBypass: true,
    customDelay: 150,
    packetOptimization: true,
    lagCompensation: true,
    pingThreshold: 100,
    maxReduction: 85,
    emergencyStop: true,
    logActivity: false,
  };

  return NextResponse.json({
    success: true,
    settings: defaultSettings,
    message: 'Default advanced settings loaded'
  });
}

interface AdvancedSettings {
  horizontalReduction: number;
  verticalReduction: number;
  velocityMultiplier: number;
  randomizeValues: boolean;
  detectionBypass: boolean;
  customDelay: number;
  packetOptimization: boolean;
  lagCompensation: boolean;
  pingThreshold: number;
  maxReduction: number;
  emergencyStop: boolean;
  logActivity: boolean;
}

function generateAdvancedConfig(settings: AdvancedSettings): string {
  return JSON.stringify({
    "version": "2.1.0",
    "timestamp": new Date().toISOString(),
    "knockback": {
      "horizontalReduction": settings.horizontalReduction,
      "verticalReduction": settings.verticalReduction,
      "velocityMultiplier": settings.velocityMultiplier
    },
    "detection": {
      "randomizeValues": settings.randomizeValues,
      "detectionBypass": settings.detectionBypass,
      "customDelay": settings.customDelay,
      "variationRange": settings.randomizeValues ? [0.85, 1.15] : [1.0, 1.0]
    },
    "network": {
      "packetOptimization": settings.packetOptimization,
      "lagCompensation": settings.lagCompensation,
      "pingThreshold": settings.pingThreshold,
      "bufferSize": 1024
    },
    "safety": {
      "maxReduction": settings.maxReduction,
      "emergencyStop": settings.emergencyStop,
      "logActivity": settings.logActivity,
      "safetyChecks": true
    },
    "keybinds": {
      "toggle": "F1",
      "quickAdjust": "F2",
      "stealthToggle": "F3",
      "emergencyStop": "F4"
    }
  }, null, 2);
}