"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([
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
    {
      id: "3",
      name: "Custom Server PvP",
      server: "custom",
      knockbackReduction: 85,
      pvpMode: "ffa",
      stealthMode: false,
      lastUsed: "2024-01-13",
      wins: 234,
      losses: 67,
    },
  ]);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [newProfile, setNewProfile] = useState({
    name: "",
    server: "hypixel",
    knockbackReduction: 70,
    pvpMode: "1v1",
    stealthMode: true,
  });

  const handleCreateProfile = () => {
    const profile: Profile = {
      id: Date.now().toString(),
      name: newProfile.name,
      server: newProfile.server,
      knockbackReduction: newProfile.knockbackReduction,
      pvpMode: newProfile.pvpMode,
      stealthMode: newProfile.stealthMode,
      lastUsed: new Date().toISOString().split('T')[0],
      wins: 0,
      losses: 0,
    };

    setProfiles([...profiles, profile]);
    setNewProfile({
      name: "",
      server: "hypixel",
      knockbackReduction: 70,
      pvpMode: "1v1",
      stealthMode: true,
    });
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfiles(profiles.filter(p => p.id !== profileId));
  };

  const handleLoadProfile = async (profile: Profile) => {
    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'load', profileId: profile.id }),
      });
      
      if (response.ok) {
        setSelectedProfile(profile);
        // Update last used
        setProfiles(profiles.map(p => 
          p.id === profile.id 
            ? { ...p, lastUsed: new Date().toISOString().split('T')[0] }
            : p
        ));
        alert(`Profile "${profile.name}" loaded successfully!`);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const getWinRate = (wins: number, losses: number) => {
    const total = wins + losses;
    if (total === 0) return 0;
    return Math.round((wins / total) * 100);
  };

  const getServerDisplayName = (server: string) => {
    const serverNames: { [key: string]: string } = {
      hypixel: "Hypixel Network",
      cubecraft: "CubeCraft Games", 
      mineplex: "Mineplex",
      custom: "Custom Server"
    };
    return serverNames[server] || server;
  };

  const getModeDisplayName = (mode: string) => {
    const modeNames: { [key: string]: string } = {
      "1v1": "1v1 Duels",
      "team": "Team PvP",
      "ffa": "Free For All",
      "custom": "Custom Mode"
    };
    return modeNames[mode] || mode;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Player Profiles
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Manage multiple configurations for different servers and game modes
        </p>
      </div>

      {/* Current Profile */}
      {selectedProfile && (
        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Active Profile</span>
              <Badge className="bg-green-600">LOADED</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-400">Profile Name</div>
                <div className="font-semibold">{selectedProfile.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Server</div>
                <div className="font-semibold">{getServerDisplayName(selectedProfile.server)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Knockback Reduction</div>
                <div className="font-semibold text-purple-400">{selectedProfile.knockbackReduction}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Win Rate</div>
                <div className="font-semibold text-green-400">
                  {getWinRate(selectedProfile.wins, selectedProfile.losses)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create New Profile */}
      <Card className="bg-black/40 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Create New Profile
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  + New Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle>Create New Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileName">Profile Name</Label>
                    <Input
                      id="profileName"
                      value={newProfile.name}
                      onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
                      placeholder="Enter profile name"
                      className="bg-black/60 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Target Server</Label>
                    <Select value={newProfile.server} onValueChange={(value) => setNewProfile({...newProfile, server: value})}>
                      <SelectTrigger className="bg-black/60 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="hypixel">Hypixel Network</SelectItem>
                        <SelectItem value="cubecraft">CubeCraft Games</SelectItem>
                        <SelectItem value="mineplex">Mineplex</SelectItem>
                        <SelectItem value="custom">Custom Server</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>PvP Mode</Label>
                    <Select value={newProfile.pvpMode} onValueChange={(value) => setNewProfile({...newProfile, pvpMode: value})}>
                      <SelectTrigger className="bg-black/60 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="1v1">1v1 Duels</SelectItem>
                        <SelectItem value="team">Team PvP</SelectItem>
                        <SelectItem value="ffa">Free For All</SelectItem>
                        <SelectItem value="custom">Custom Mode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="knockback">Knockback Reduction (%)</Label>
                    <Input
                      id="knockback"
                      type="number"
                      value={newProfile.knockbackReduction}
                      onChange={(e) => setNewProfile({...newProfile, knockbackReduction: parseInt(e.target.value)})}
                      min="10"
                      max="90"
                      className="bg-black/60 border-gray-700"
                    />
                  </div>

                  <Button
                    onClick={handleCreateProfile}
                    disabled={!newProfile.name}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Create Profile
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Existing Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Card key={profile.id} className="bg-black/40 border-gray-800 hover:border-gray-600 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{profile.name}</span>
                {selectedProfile?.id === profile.id && (
                  <Badge className="bg-green-600 text-xs">ACTIVE</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Server:</span>
                  <span>{getServerDisplayName(profile.server)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Mode:</span>
                  <span>{getModeDisplayName(profile.pvpMode)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Knockback:</span>
                  <span className="text-purple-400">{profile.knockbackReduction}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Stealth:</span>
                  <span className={profile.stealthMode ? "text-green-400" : "text-red-400"}>
                    {profile.stealthMode ? "ON" : "OFF"}
                  </span>
                </div>
              </div>

              {/* Statistics */}
              <div className="border-t border-gray-700 pt-4">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="text-green-400 font-bold">{profile.wins}</div>
                    <div className="text-gray-400">Wins</div>
                  </div>
                  <div>
                    <div className="text-red-400 font-bold">{profile.losses}</div>
                    <div className="text-gray-400">Losses</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold">
                      {getWinRate(profile.wins, profile.losses)}%
                    </div>
                    <div className="text-gray-400">Win Rate</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleLoadProfile(profile)}
                  disabled={selectedProfile?.id === profile.id}
                  size="sm"
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {selectedProfile?.id === profile.id ? "Loaded" : "Load"}
                </Button>
                <Button
                  onClick={() => handleDeleteProfile(profile.id)}
                  size="sm"
                  variant="destructive"
                  className="px-3"
                >
                  Delete
                </Button>
              </div>

              {/* Last Used */}
              <div className="text-xs text-gray-500 text-center">
                Last used: {profile.lastUsed}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {profiles.length === 0 && (
        <Card className="bg-black/40 border-gray-800">
          <CardContent className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 text-gray-400">No Profiles Found</h3>
            <p className="text-gray-500 mb-4">
              Create your first profile to get started with anti-knockback
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Create First Profile
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}