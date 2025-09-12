"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AntiKnockbackSettings {
  enabled: boolean;
  knockbackReduction: number;
  pvpMode: string;
  selectedServer: string;
  stealthMode: boolean;
  autoDetection: boolean;
}

export default function Dashboard() {
  const [settings, setSettings] = useState<AntiKnockbackSettings>({
    enabled: false,
    knockbackReduction: 75,
    pvpMode: "1v1",
    selectedServer: "hypixel",
    stealthMode: true,
    autoDetection: true,
  });

  const [isActive, setIsActive] = useState(false);
  const [serverStatus, setServerStatus] = useState("Disconnected");

  const servers = [
    { id: "hypixel", name: "Hypixel Network", status: "Online" },
    { id: "cubecraft", name: "CubeCraft Games", status: "Online" },
    { id: "mineplex", name: "Mineplex", status: "Online" },
    { id: "custom", name: "Custom Server", status: "Unknown" },
  ];

  const handleLaunchProgram = async () => {
    try {
      const response = await fetch('/api/launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (response.ok) {
        setIsActive(true);
        setServerStatus("Connected");
      }
    } catch (error) {
      console.error('Failed to launch program:', error);
    }
  };

  const handleStopProgram = () => {
    setIsActive(false);
    setServerStatus("Disconnected");
  };

  const handleSettingsUpdate = (key: keyof AntiKnockbackSettings, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Minecraft Anti-Knockback Pro
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Professional PvP enhancement tool for competitive Minecraft gameplay. 
          Reduce knockback in 1v1 battles and dominate the battlefield.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
              Program Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isActive ? "ACTIVE" : "INACTIVE"}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {isActive ? "Anti-knockback is running" : "Click Launch to start"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Knockback Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {settings.knockbackReduction}%
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Current reduction level
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Server Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serverStatus}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {settings.selectedServer.charAt(0).toUpperCase() + settings.selectedServer.slice(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Controls */}
      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/40">
          <TabsTrigger value="quick">Quick Setup</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Quick Launch Settings
                <Badge variant={isActive ? "default" : "secondary"}>
                  {isActive ? "Running" : "Stopped"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Server Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Target Server</label>
                <Select value={settings.selectedServer} onValueChange={(value) => handleSettingsUpdate('selectedServer', value)}>
                  <SelectTrigger className="bg-black/60 border-gray-700">
                    <SelectValue placeholder="Select server" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {servers.map((server) => (
                      <SelectItem key={server.id} value={server.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{server.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {server.status}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PvP Mode */}
              <div className="space-y-3">
                <label className="text-sm font-medium">PvP Mode</label>
                <Select value={settings.pvpMode} onValueChange={(value) => handleSettingsUpdate('pvpMode', value)}>
                  <SelectTrigger className="bg-black/60 border-gray-700">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="1v1">1v1 Duels</SelectItem>
                    <SelectItem value="team">Team PvP</SelectItem>
                    <SelectItem value="ffa">Free For All</SelectItem>
                    <SelectItem value="custom">Custom Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Knockback Reduction Slider */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Knockback Reduction: {settings.knockbackReduction}%
                </label>
                <Slider
                  value={[settings.knockbackReduction]}
                  onValueChange={(value) => handleSettingsUpdate('knockbackReduction', value[0])}
                  max={90}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtle (10%)</span>
                  <span>Moderate (50%)</span>
                  <span>Aggressive (90%)</span>
                </div>
              </div>

              {/* Toggle Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-black/60 border border-gray-700">
                  <div>
                    <div className="font-medium">Stealth Mode</div>
                    <div className="text-sm text-gray-400">Anti-detection protection</div>
                  </div>
                  <Switch
                    checked={settings.stealthMode}
                    onCheckedChange={(checked) => handleSettingsUpdate('stealthMode', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-black/60 border border-gray-700">
                  <div>
                    <div className="font-medium">Auto Detection</div>
                    <div className="text-sm text-gray-400">Auto-enable during PvP</div>
                  </div>
                  <Switch
                    checked={settings.autoDetection}
                    onCheckedChange={(checked) => handleSettingsUpdate('autoDetection', checked)}
                  />
                </div>
              </div>

              {/* Launch Controls */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleLaunchProgram}
                  disabled={isActive}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isActive ? "Program Running" : "Launch Anti-Knockback"}
                </Button>
                
                <Button
                  onClick={handleStopProgram}
                  disabled={!isActive}
                  variant="outline"
                  className="flex-1 border-gray-700 hover:bg-gray-800"
                >
                  Stop Program
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle>Advanced Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Advanced Settings</h3>
                <p className="text-gray-400 mb-4">
                  Fine-tune your anti-knockback experience with advanced options
                </p>
                <Button asChild variant="outline">
                  <Link href="/settings">Open Advanced Settings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Keybind Info */}
      <Card className="bg-black/40 border-gray-800">
        <CardHeader>
          <CardTitle>Keybinds & Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-black/60 border border-gray-700">
              <div className="font-mono text-lg font-bold text-purple-400">F1</div>
              <div className="text-sm text-gray-400">Toggle On/Off</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-black/60 border border-gray-700">
              <div className="font-mono text-lg font-bold text-purple-400">F2</div>
              <div className="text-sm text-gray-400">Quick Adjust</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-black/60 border border-gray-700">
              <div className="font-mono text-lg font-bold text-purple-400">F3</div>
              <div className="text-sm text-gray-400">Stealth Mode</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-black/60 border border-gray-700">
              <div className="font-mono text-lg font-bold text-purple-400">F4</div>
              <div className="text-sm text-gray-400">Emergency Stop</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}