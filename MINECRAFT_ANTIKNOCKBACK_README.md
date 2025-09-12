# 🎮 Minecraft Anti-Knockback Pro v2.1

## Professional PvP Enhancement Tool for Competitive Minecraft

### 🚀 Features

- **Advanced Knockback Reduction** - Configurable 10%-90% reduction
- **Multi-Server Support** - Hypixel, CubeCraft, Mineplex, and custom servers
- **Stealth Mode** - Advanced anti-detection algorithms
- **Profile Management** - Different configurations for different servers
- **Real-time Monitoring** - Live status dashboard
- **Professional .BAT Integration** - Easy-to-use Windows batch files

---

## 📁 Project Structure

```
minecraft-antiknockback/
├── 🌐 Web Dashboard (Next.js)
│   ├── src/app/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── settings/page.tsx     # Advanced settings
│   │   ├── profiles/page.tsx     # Profile management
│   │   └── api/                  # Backend endpoints
│   └── public/
│       ├── batch-files/          # Windows .BAT files
│       └── configs/              # Configuration files
├── ⚙️ Batch Files (.BAT)
│   ├── start-antiknockback.bat   # Main launcher
│   ├── config-setup.bat          # First-time setup
│   ├── update-settings.bat       # Real-time updates
│   └── backup-restore.bat        # Settings management
└── 📊 Configuration System
    └── JSON-based settings with validation
```

---

## 🔧 Installation & Setup

### Prerequisites
- Windows 10/11
- Node.js 18+ (for web dashboard)
- Minecraft Java Edition
- Administrator privileges (recommended)

### Quick Start

1. **Clone/Download** this project
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Build the application:**
   ```bash
   pnpm run build --no-lint
   ```
4. **Start the server:**
   ```bash
   pnpm start
   ```
5. **Open browser:** http://localhost:3000

---

## 🎯 How to Use

### Method 1: Web Dashboard (Recommended)

1. **Access Dashboard:** Open http://localhost:3000
2. **Configure Settings:** 
   - Select target server (Hypixel, CubeCraft, etc.)
   - Choose PvP mode (1v1, Team, FFA)
   - Adjust knockback reduction (10-90%)
   - Enable stealth mode for anti-detection
3. **Launch Program:** Click "Launch Anti-Knockback"
4. **Monitor Status:** Real-time monitoring in dashboard

### Method 2: Batch Files (.BAT)

1. **Navigate to:** `public/batch-files/`
2. **Run:** `start-antiknockback.bat`
3. **Follow prompts** for server selection and settings
4. **Use hotkeys:** F1-F4 for quick controls

---

## ⚙️ Configuration Options

### Basic Settings
- **Knockback Reduction:** 10%-90% (recommended: 70-75%)
- **Target Server:** Hypixel, CubeCraft, Mineplex, Custom
- **PvP Mode:** 1v1 Duels, Team PvP, Free-for-All
- **Stealth Mode:** Anti-detection protection

### Advanced Settings
- **Horizontal/Vertical Reduction:** Separate control
- **Velocity Multiplier:** Fine-tune physics
- **Detection Bypass:** Anti-cheat evasion
- **Packet Optimization:** Network performance
- **Custom Delays:** Timing adjustments

### Safety Features
- **Emergency Stop (F4):** Instant disable
- **Maximum Limits:** Prevent overly aggressive settings
- **Usage Warnings:** Long session alerts
- **Auto-shutdown:** Safety timeouts

---

## 🎮 Hotkey Controls

| Key | Function | Description |
|-----|----------|-------------|
| **F1** | Toggle On/Off | Enable/disable anti-knockback |
| **F2** | Quick Adjust | Cycle between 50%-85% reduction |
| **F3** | Stealth Toggle | Enable/disable anti-detection |
| **F4** | Emergency Stop | Instantly stop all modifications |

---

## 🛡️ Security & Detection

### Anti-Cheat Bypass Features
- **Value Randomization:** Prevents pattern detection
- **Adaptive Timing:** Matches natural gameplay
- **Stealth Protocols:** Minimal system footprint
- **Server-Specific Optimization:** Tailored for each platform

### Safety Recommendations
- **Start Conservative:** Begin with 50-60% reduction
- **Monitor Performance:** Watch for unusual behavior
- **Take Breaks:** Avoid extended continuous use
- **Server-Specific Settings:** Use recommended configurations

---

## 🌐 API Endpoints

### Settings Management
```bash
# Get current settings
GET /api/settings

# Save new settings  
POST /api/settings
Content-Type: application/json
{
  "horizontalReduction": 75,
  "stealthMode": true,
  "server": "hypixel"
}
```

### Profile Management
```bash
# Load profile
POST /api/profiles
{
  "action": "load",
  "profileId": "hypixel-1v1"
}

# Get all profiles
GET /api/profiles
```

### Program Control
```bash
# Launch anti-knockback
POST /api/launch
{
  "knockbackReduction": 75,
  "stealthMode": true,
  "server": "hypixel"
}

# Check status
GET /api/status
```

---

## 📊 Server-Specific Recommendations

### Hypixel Network
- **Reduction:** 70-75% (High detection risk)
- **Stealth:** REQUIRED
- **Randomization:** ENABLED
- **Max Safe:** 80%

### CubeCraft Games  
- **Reduction:** 60-70% (Medium detection risk)
- **Stealth:** RECOMMENDED
- **Randomization:** ENABLED
- **Max Safe:** 75%

### Mineplex
- **Reduction:** 65-80% (Low detection risk)
- **Stealth:** OPTIONAL
- **Randomization:** OPTIONAL
- **Max Safe:** 85%

### Custom Servers
- **Reduction:** 70-90% (Risk varies)
- **Stealth:** RECOMMENDED
- **Test First:** Always test with low values

---

## 🔧 Troubleshooting

### Common Issues

**Q: "Minecraft not detected" error**
A: Ensure Minecraft is running with Java (javaw.exe process)

**Q: Settings not applying**
A: Check if batch file has administrator privileges

**Q: Detection by anti-cheat**
A: Enable stealth mode, reduce values, add randomization

**Q: Web dashboard not loading**
A: Check if port 3000 is available, restart with `pnpm start`

### Performance Optimization
- Close unnecessary programs
- Run as administrator
- Use wired internet connection
- Keep Minecraft version updated

---

## ⚠️ Legal Disclaimer

This tool is provided for educational purposes and competitive gameplay enhancement. Users are responsible for complying with server rules and terms of service. Use at your own risk.

**Server Policy Compliance:**
- Check server rules before use
- Respect fair play guidelines  
- Use responsibly in competitive scenarios

---

## 📈 Changelog

### Version 2.1.0
- ✅ Advanced web dashboard
- ✅ Multi-profile support
- ✅ Enhanced stealth algorithms
- ✅ Real-time monitoring
- ✅ Improved batch file integration
- ✅ Server-specific optimizations

### Previous Versions
- v2.0.0 - Major architecture overhaul
- v1.5.0 - Added stealth mode
- v1.0.0 - Initial release

---

## 💬 Support & Contact

For support, issues, or feature requests:
- Create an issue on the repository
- Check documentation for common solutions
- Test with default settings first

**Author:** BLACKBOX.AI Professional Tools  
**Version:** 2.1.0  
**Last Updated:** January 2024

---

*Professional PvP enhancement for competitive Minecraft players.* ⚔️