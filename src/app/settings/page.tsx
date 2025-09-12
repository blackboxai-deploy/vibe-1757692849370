"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface AdvancedSettings {
  // Knockback Settings
  horizontalReduction: number;
  verticalReduction: number;
  velocityMultiplier: number;
  
  // Detection Settings
  randomizeValues: boolean;
  detectionBypass: boolean;
  customDelay: number;
  
  // Server Settings
  packetOptimization: boolean;
  lagCompensation: boolean;
  pingThreshold: number;
  
  // Safety Settings
  maxReduction: number;
  emergencyStop: boolean;
  logActivity: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AdvancedSettings>({
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
  });

  const [savedSettings, setSavedSettings] = useState<AdvancedSettings | null>(null);

  const handleSettingChange = (key: keyof AdvancedSettings, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (response.ok) {
        setSavedSettings(settings);
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    }
  };

  const resetSettings = () => {
    setSettings({
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
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'antiknockback-settings.json';
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Advanced Settings
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Fine-tune your anti-knockback experience with professional-grade settings
        </p>
      </div>

      <Tabs defaultValue="knockback" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/40">
          <TabsTrigger value="knockback">Knockback</TabsTrigger>
          <TabsTrigger value="detection">Detection</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="knockback" className="space-y-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle>Knockback Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Horizontal Reduction */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Horizontal Reduction: {settings.horizontalReduction}%
                </Label>
                <Slider
                  value={[settings.horizontalReduction]}
                  onValueChange={(value) => handleSettingChange('horizontalReduction', value[0])}
                  max={95}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">
                  Reduces horizontal knockback when hit by other players
                </p>
              </div>

              {/* Vertical Reduction */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Vertical Reduction: {settings.verticalReduction}%
                </Label>
                <Slider
                  value={[settings.verticalReduction]}
                  onValueChange={(value) => handleSettingChange('verticalReduction', value[0])}
                  max={95}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">
                  Reduces vertical knockback (prevents high jumps when hit)
                </p>
              </div>

              {/* Velocity Multiplier */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Velocity Multiplier: {settings.velocityMultiplier.toFixed(1)}x
                </Label>
                <Slider
                  value={[settings.velocityMultiplier * 10]}
                  onValueChange={(value) => handleSettingChange('velocityMultiplier', value[0] / 10)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">
                  Overall velocity multiplier for knockback calculations
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detection" className="space-y-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle>Anti-Detection System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Randomize Values */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-black/60 border border-gray-700">
                <div>
                  <div className="font-medium">Randomize Values</div>
                  <div className="text-sm text-gray-400">
                    Adds small random variations to avoid pattern detection
                  </div>
                </div>
                <Switch
                  checked={settings.randomizeValues}
                  onCheckedChange={(checked) => handleSettingChange('randomizeValues', checked)}
                />
              </div>

              {/* Detection Bypass */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-black/60 border border-gray-700">
                <div>
                  <div className="font-medium">Detection Bypass</div>
                  <div className="text-sm text-gray-400">
                    Advanced bypass techniques for anti-cheat systems
                  </div>
                </div>
                <Switch
                  checked={settings.detectionBypass}
                  onCheckedChange={(checked) => handleSettingChange('detectionBypass', checked)}
                />
              </div>

              {/* Custom Delay */}
              <div className="space-y-3">
                <Label htmlFor="customDelay">Custom Delay (ms)</Label>
                <Input
                  id="customDelay"
                  type="number"
                  value={settings.customDelay}
                  onChange={(e) => handleSettingChange('customDelay', parseInt(e.target.value))}
                  className="bg-black/60 border-gray-700"
                  min="50"
                  max="500"
                />
                <p className="text-sm text-gray-400">
                  Delay between knockback modifications (50-500ms recommended)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle>Network Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Packet Optimization */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-black/60 border border-gray-700">
                <div>
                  <div className="font-medium">Packet Optimization</div>
                  <div className="text-sm text-gray-400">
                    Optimizes packet handling for better performance
                  </div>
                </div>
                <Switch
                  checked={settings.packetOptimization}
                  onCheckedChange={(checked) => handleSettingChange('packetOptimization', checked)}
                />
              </div>

              {/* Lag Compensation */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-black/60 border border-gray-700">
                <div>
                  <div className="font-medium">Lag Compensation</div>
                  <div className="text-sm text-gray-400">
                    Adjusts for network latency and server lag
                  </div>
                </div>
                <Switch
                  checked={settings.lagCompensation}
                  onCheckedChange={(checked) => handleSettingChange('lagCompensation', checked)}
                />
              </div>

              {/* Ping Threshold */}
              <div className="space-y-3">
                <Label htmlFor="pingThreshold">Ping Threshold (ms)</Label>
                <Input
                  id="pingThreshold"
                  type="number"
                  value={settings.pingThreshold}
                  onChange={(e) => handleSettingChange('pingThreshold', parseInt(e.target.value))}
                  className="bg-black/60 border-gray-700"
                  min="20"
                  max="300"
                />
                <p className="text-sm text-gray-400">
                  Maximum ping for optimal anti-knockback performance
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle>Safety & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Max Reduction */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Maximum Reduction Limit: {settings.maxReduction}%
                </Label>
                <Slider
                  value={[settings.maxReduction]}
                  onValueChange={(value) => handleSettingChange('maxReduction', value[0])}
                  max={95}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">
                  Safety limit to prevent overly aggressive settings
                </p>
              </div>

              {/* Emergency Stop */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-black/60 border border-gray-700">
                <div>
                  <div className="font-medium">Emergency Stop</div>
                  <div className="text-sm text-gray-400">
                    Enables F4 emergency stop hotkey
                  </div>
                </div>
                <Switch
                  checked={settings.emergencyStop}
                  onCheckedChange={(checked) => handleSettingChange('emergencyStop', checked)}
                />
              </div>

              {/* Log Activity */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-black/60 border border-gray-700">
                <div>
                  <div className="font-medium">Log Activity</div>
                  <div className="text-sm text-gray-400">
                    Saves activity logs for debugging purposes
                  </div>
                </div>
                <Switch
                  checked={settings.logActivity}
                  onCheckedChange={(checked) => handleSettingChange('logActivity', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card className="bg-black/40 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={saveSettings}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Save Settings
            </Button>
            
            <Button
              onClick={resetSettings}
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
            >
              Reset to Default
            </Button>
            
            <Button
              onClick={exportSettings}
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
            >
              Export Config
            </Button>
            
            {savedSettings && (
              <Badge className="self-center bg-green-600">
                Settings Saved Successfully
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}