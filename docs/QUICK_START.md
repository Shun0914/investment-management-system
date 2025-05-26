# 🚀 Quick Start Guide

Get the Investment Management System running in **5 minutes**.

## Prerequisites

- Python 3.8+
- Claude Desktop app installed
- Basic command line knowledge

## Installation

### 1. Clone & Setup
```bash
git clone <repository-url>
cd investment-management-system
pip install -r requirements.txt
```

### 2. Configure Claude Desktop
Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "Investment Management System": {
      "command": "python",
      "args": ["/path/to/your/investment-management-system/server.py"],
      "cwd": "/path/to/your/investment-management-system"
    }
  }
}
```

### 3. Start the System
```bash
python server.py
```

You should see: `[MCP Server] 起動：データベースを初期化しました。`

### 4. Connect via Claude Desktop
1. Open Claude Desktop
2. Start a new conversation
3. The Investment Management System tools are now available!

## Try It Out

### Basic Commands
```
> Load investment_dashboard_policy to understand the system rules.
```

```
> Analyze the sample portfolio using analyze_portfolio_csv with the sample data.
```

```
> Show me the Barbell Strategy rules from the philosophy resources.
```

### Sample Data Analysis
```
> Use analyze_portfolio_csv("investment_data/samples/sample_portfolio.csv") to process the demo data.
```

## Verification

If everything works correctly, you should be able to:
- ✅ Load investment policies and philosophy
- ✅ Process CSV files with portfolio data
- ✅ Generate investment analysis and recommendations
- ✅ Access Barbell Strategy resources

## Troubleshooting

### Common Issues

**Server won't start:**
- Check Python version: `python --version`
- Install dependencies: `pip install -r requirements.txt`

**Claude Desktop not connecting:**
- Verify the path in `claude_desktop_config.json`
- Restart Claude Desktop after configuration changes

**CSV processing errors:**
- Ensure CSV files are in the correct format (see samples/)
- Check file encoding (UTF-8, Shift-JIS supported)

## Next Steps

Once running successfully:
1. Review the [Workflow Guide](WORKFLOW.md) for usage patterns
2. Check [Architecture Overview](ARCHITECTURE.md) for system design
3. Explore the philosophy/ directory for investment strategy details

---

**🎯 Ready to experience AI-powered investment management in action!**