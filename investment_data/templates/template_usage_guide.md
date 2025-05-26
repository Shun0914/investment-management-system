# Template Usage Guide

## 📋 Template Overview

This directory contains professional-grade templates for systematic investment analysis and portfolio management, designed specifically for Barbell Strategy implementation.

### Available Templates
1. **standard_portfolio_analysis.tsx** - Interactive React dashboard for portfolio visualization
2. **portfolio_comparison_analysis.tsx** - Period-over-period portfolio comparison dashboard
3. **stock_analysis_template.md** - Comprehensive individual stock analysis framework
4. **stock_forecast_template.md** - Forward-looking investment thesis and price target methodology

### Purpose
- Maintain consistent analysis quality and format across all investment decisions
- Standardize investment process for systematic Barbell Strategy implementation
- Enable efficient portfolio review and rebalancing decisions
- Create comprehensive investment documentation and decision audit trail

## 🔧 Template Usage Instructions

### Step 1: Template Selection
Choose the appropriate template based on your analysis needs:
- **Portfolio Analysis**: Use `standard_portfolio_analysis.tsx` for current portfolio snapshot
- **Portfolio Tracking**: Use `portfolio_comparison_analysis.tsx` for month-over-month comparison
- **Individual Stocks**: Use `stock_analysis_template.md` for fundamental analysis
- **Forward Planning**: Use `stock_forecast_template.md` for investment thesis and targets

### Step 2: Data Preparation
Before using templates, ensure you have:
- Current portfolio data (CSV exports from brokers)
- Updated fixed assets information (cash, mutual funds)
- Recent financial data for individual stocks
- Market data and technical indicators

### Step 3: Template Customization
Replace all placeholder values marked with `[PLACEHOLDER]` syntax:

#### Basic Information Placeholders
- `[TICKER]` → Actual stock symbol (e.g., AAPL, MSFT, GOOGL)
- `[COMPANY_NAME]` → Full company name
- `[INDUSTRY_SECTOR]` → Industry classification
- `[CURRENT_PRICE]` → Current stock price
- `[ANALYSIS_DATE]` → Date of analysis

#### Portfolio Information Placeholders
- `[SHARES_HELD]` → Number of shares owned
- `[CURRENT_VALUE_JPY]` → Current position value in yen
- `[PORTFOLIO_PERCENTAGE]` → Position weight in portfolio
- `[GAIN_LOSS_PERCENTAGE]` → Current profit/loss percentage

#### Financial Data Placeholders
- `[REVENUE]` → Latest revenue figures
- `[YOY_GROWTH]` → Year-over-year growth rate
- `[EBITDA]` → Earnings before interest, taxes, depreciation, amortization
- `[FREE_CASH_FLOW]` → Free cash flow figures
- `[PE_RATIO]` → Price-to-earnings ratio

#### Strategic Placeholders
- `[BARBELL_CATEGORY]` → Aggressive/Defensive/Middle classification
- `[INVESTMENT_THESIS]` → Core investment reasoning
- `[PRICE_TARGET]` → 12-month price target
- `[RISK_ASSESSMENT]` → Primary risk factors

## 📊 Barbell Strategy Integration

### Asset Classification Guidelines

#### ⚡ Aggressive Assets (Target: 8-12% of portfolio)
**Criteria**:
- High growth potential (>25% annual revenue growth)
- Significant market disruption capability
- Technology or innovation leadership
- High volatility and risk tolerance required
- Potential for 5-10x returns over 3-5 years

**Example Classifications**:
- Growth technology stocks (cloud, AI, biotech)
- Cryptocurrency positions
- Early-stage growth companies
- Emerging market high-growth plays

**Template Settings**:
- `[BARBELL_CATEGORY]` → "⚡ Aggressive (Antifragile)"
- `[MAX_LOSS_TOLERANCE]` → 100% (willing to lose entire position)
- `[POSITION_SIZE]` → Small individual positions (1-3% max)

#### 🛡️ Defensive Assets (Target: 88-92% of portfolio)
**Criteria**:
- Capital preservation focus
- Stable, predictable cash flows
- Low correlation with aggressive positions
- High liquidity and low volatility
- Dividend income or interest payments

**Example Classifications**:
- Cash and cash equivalents
- Government bonds and bond ETFs
- Gold and precious metals ETFs
- Utility stocks and REITs
- High-grade corporate bonds

**Template Settings**:
- `[BARBELL_CATEGORY]` → "🛡️ Defensive (Safe Haven)"
- `[STABILITY_FOCUS]` → Capital preservation primary goal
- `[INCOME_EXPECTATION]` → Modest but steady returns

#### 📊 Middle Ground (Target: Systematic reduction to <5%)
**Criteria**:
- Moderate risk/moderate return profile
- Traditional "balanced" investments
- Neither explosive growth nor guaranteed safety
- Target for gradual elimination

**Example Classifications**:
- Traditional mutual funds
- Balanced ETFs
- Large-cap value stocks without growth catalyst
- Investment-grade corporate bonds (non-government)

**Template Settings**:
- `[BARBELL_CATEGORY]` → "📊 Middle Ground (Reduction Target)"
- `[REDUCTION_TIMELINE]` → Specific exit strategy
- `[REALLOCATION_PLAN]` → Where to redeploy capital

## 🎯 Portfolio Dashboard Usage

### React Dashboard Templates (.tsx files)

#### Data Section Replacement
In both dashboard templates, look for the **"★ データ部分 - ここを置換する ★"** section:

```typescript
// ★ データ部分 - ここを置換する ★
const portfolioData = {
  // Replace this entire object with your actual portfolio data
  TECH1: { value: 125000, shares: 15, category: 'aggressive', gainLoss: 48.1 },
  // ... more holdings
};
// ★ データ部分終了 ★
```

#### Customization Steps
1. **Export Portfolio Data**: Get CSV from your broker(s)
2. **Process Data**: Use the MCP server's `analyze_portfolio_csv` tool
3. **Update Portfolio Object**: Replace sample data with actual holdings
4. **Adjust Categories**: Ensure each asset has correct Barbell classification
5. **Update Analysis Date**: Set current date for the analysis
6. **Test Dashboard**: Verify all charts and metrics display correctly

#### Dashboard Features
- **Allocation Pie Chart**: Visual breakdown of Barbell Strategy compliance
- **Performance Metrics**: Key portfolio statistics and ratios
- **Holdings Table**: Detailed view of all positions with gain/loss
- **Strategy Status**: Real-time Barbell Strategy compliance checking
- **Recommendations**: Automated suggestions based on current allocation

### Comparison Dashboard Specific Usage
For `portfolio_comparison_analysis.tsx`:
- **Historical Data**: Requires previous period data for comparison
- **Performance Tracking**: Shows month-over-month changes
- **Top Movers**: Highlights best/worst performing positions
- **Progress Tracking**: Measures Barbell Strategy implementation progress

## 📝 Stock Analysis Templates (.md files)

### Analysis Template Workflow
1. **Copy Template**: Create new analysis file for each stock
2. **Basic Info Section**: Fill company and financial fundamentals
3. **Investment Thesis**: Develop core investment reasoning
4. **Risk Assessment**: Identify and quantify key risks
5. **Barbell Classification**: Assign to appropriate strategy category
6. **Valuation Analysis**: Determine fair value and price targets
7. **Decision Summary**: Final rating and position sizing recommendation

### Forecast Template Workflow
1. **Scenario Planning**: Develop bull/base/bear case scenarios
2. **Financial Projections**: Create forward-looking estimates
3. **Timeline Planning**: Map key events and catalysts
4. **Trading Strategy**: Define entry/exit rules and risk management
5. **Monitoring Plan**: Establish review triggers and checkpoints

## 🔄 Regular Update Process

### Monthly Portfolio Review
1. **Update Dashboard Data**: Refresh with latest portfolio values
2. **Run Comparison Analysis**: Compare with previous month
3. **Rebalancing Check**: Assess if allocation adjustments needed
4. **Strategy Compliance**: Verify Barbell Strategy adherence

### Quarterly Stock Review
1. **Update Analysis Templates**: Refresh fundamental data
2. **Review Price Targets**: Adjust based on new information
3. **Reassess Classifications**: Confirm Barbell Strategy category
4. **Update Risk Factors**: Identify new risks or risk changes

### Annual Strategy Review
1. **Template Effectiveness**: Evaluate if templates need updates
2. **Classification Rules**: Review asset classification criteria
3. **Performance Attribution**: Analyze what worked/didn't work
4. **Process Improvements**: Refine analysis methodology

## ⚠️ Best Practices

### Data Quality
- ✅ Always verify data accuracy before analysis
- ✅ Use consistent data sources and methodology
- ✅ Document assumptions and data limitations
- ❌ Never rely on single data source without verification

### Analysis Consistency
- ✅ Follow template structure consistently
- ✅ Apply same criteria across all positions
- ✅ Document rationale for all classifications
- ❌ Don't skip sections or use incomplete analysis

### Risk Management
- ✅ Always complete risk assessment sections
- ✅ Set appropriate position sizes based on classification
- ✅ Monitor correlation between aggressive positions
- ❌ Never exceed risk tolerance for any single position

### Documentation
- ✅ Date all analysis and keep historical versions
- ✅ Document decision rationale thoroughly
- ✅ Track performance against predictions
- ❌ Don't delete old analysis - maintain audit trail

## 🎯 Success Metrics

### Template Effectiveness Measures
- **Decision Quality**: Track accuracy of investment decisions
- **Process Efficiency**: Time to complete analysis vs quality
- **Consistency**: Standardization across different analyses
- **Portfolio Performance**: Risk-adjusted returns vs benchmarks

### Barbell Strategy Metrics
- **Allocation Compliance**: % time within target ranges
- **Risk Management**: Maximum drawdown control
- **Asymmetric Returns**: Upside capture vs downside protection
- **Rebalancing Frequency**: Optimal rebalancing triggers

---

**Created**: May 26, 2025  
**Template Version**: v1.0  
**Next Review**: Quarterly or upon major methodology changes

---
*These templates are designed for systematic personal investment management. Always adapt to your specific needs and risk tolerance. Consider professional financial advice for significant investment decisions.*