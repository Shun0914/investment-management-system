# 📋 Investment Management Workflow

This document outlines the typical workflow for using the Investment Management System to analyze portfolios and implement Barbell Strategy.

## 🎯 Core Workflow

### Phase 1: System Initialization
```
1. Load investment_dashboard_policy
   ↓
2. Review Barbell Strategy rules
   ↓  
3. Understand asset classification system
```

### Phase 2: Portfolio Data Integration
```
1. Prepare broker CSV files
   ↓
2. Process with analyze_portfolio_csv
   ↓
3. Integrate with fixed assets data
   ↓
4. Validate data quality and completeness
```

### Phase 3: Strategic Analysis
```
1. Apply Barbell Strategy rules
   ↓
2. Classify assets (Aggressive/Defensive/Middle)
   ↓
3. Calculate current vs target allocation
   ↓
4. Identify rebalancing opportunities
```

### Phase 4: Decision Support
```
1. Generate portfolio dashboard
   ↓
2. Create rebalancing recommendations
   ↓
3. Risk assessment and validation
   ↓
4. Implementation planning
```

## 📊 Typical User Sessions

### New Portfolio Analysis
```
User: "Load investment_dashboard_policy and analyze my portfolio CSV."

System: 
1. Loads investment analysis rules
2. Processes CSV with automatic encoding detection
3. Integrates with philosophy resources
4. Provides comprehensive portfolio analysis
```

### Rebalancing Decision
```
User: "Based on my current holdings, recommend Barbell Strategy adjustments."

System:
1. Reviews current allocation
2. Compares with Barbell Strategy targets
3. Identifies specific rebalancing actions
4. Calculates risk/return implications
```

### Dashboard Generation
```
User: "Create a comprehensive dashboard showing my portfolio status."

System:
1. Generates React/TypeScript dashboard component
2. Includes current allocation vs targets
3. Shows historical performance trends
4. Highlights key metrics and recommendations
```

## 🔄 Data Flow

### Input Sources
- **Broker CSVs**: Matsui Securities, Rakuten Securities, SBI Securities
- **Fixed Assets**: Cash, mutual funds, bonds (from philosophy/fixed_assets.json)
- **Asset Classification**: Stock mapping rules (from philosophy/stock_mapping.json)
- **Strategy Rules**: Barbell Strategy principles (from philosophy/barbell_strategy.md)

### Processing Pipeline
```
Raw CSV Data
    ↓
Encoding Detection & Parsing
    ↓
Asset Classification & Integration
    ↓
Barbell Strategy Analysis
    ↓
Dashboard Generation & Recommendations
```

### Output Formats
- **Analysis Reports**: JSON format with detailed breakdowns
- **Dashboards**: React/TSX components for visualization
- **Recommendations**: Strategic action items and rationale

## 🎯 Strategy Implementation Patterns

### Defensive Asset Management (90% target)
```
1. Cash position optimization
2. Government bond allocation
3. Gold ETF for inflation protection
4. High-grade corporate bonds
```

### Aggressive Asset Management (10% target)
```
1. Cryptocurrency position sizing
2. Growth stock selection
3. Speculative investment allocation
4. Asymmetric upside positioning
```

### Middle Ground Elimination
```
1. Identify moderate-risk assets
2. Plan systematic reduction
3. Capital reallocation to extremes
4. Monitor transition progress
```

## 📈 Performance Monitoring

### Regular Review Cycle
```
Weekly: Portfolio value tracking
Monthly: Allocation drift analysis
Quarterly: Full strategy review
Annually: Philosophy and rules update
```

### Key Metrics
- **Allocation Compliance**: Current vs target percentages
- **Risk Metrics**: Downside protection validation
- **Performance**: Risk-adjusted returns
- **Rebalancing**: Frequency and effectiveness

## 🛠️ Customization Points

### Philosophy Adaptation
- Modify `philosophy/barbell_strategy.md` for personal preferences
- Update `philosophy/stock_mapping.json` for new assets
- Adjust `philosophy/fixed_assets.json` for current positions

### Analysis Rules
- Customize investment_dashboard_policy for specific needs
- Modify CSV processing rules for different broker formats
- Adapt dashboard templates for preferred visualizations

## ⚠️ Best Practices

### Data Management
- ✅ Keep philosophy files updated with current strategy
- ✅ Backup analysis outputs for historical tracking
- ✅ Validate CSV data quality before processing
- ❌ Never commit actual personal financial data

### Strategy Execution
- ✅ Follow systematic rebalancing rules
- ✅ Maintain discipline during market volatility
- ✅ Document all investment decisions
- ❌ Make emotional decisions based on short-term movements

### System Usage
- ✅ Start each session with policy review
- ✅ Validate all analysis results
- ✅ Keep generated dashboards for reference
- ❌ Skip risk assessment steps

---

**🎯 This workflow ensures systematic, disciplined, and effective investment management through AI-powered analysis and Barbell Strategy implementation.**