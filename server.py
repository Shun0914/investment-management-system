import subprocess
import json
import os
import uuid
import csv
from datetime import datetime
from mcp.server.fastmcp import FastMCP
from mcp.server.fastmcp import Context
from mcp.server.fastmcp.prompts import base
from dataclasses import dataclass
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

# Base directory settings
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_DIR = os.path.join(BASE_DIR, "db")
INVESTMENT_DIR = os.path.join(BASE_DIR, "investment_data")
PROJECTS_FILE = os.path.join(DB_DIR, "projects.json")
SERVERS_FILE = os.path.join(DB_DIR, "servers.json")
TASKS_FILE = os.path.join(DB_DIR, "tasks.json")
ACTIVE_CONTEXT_FILE = os.path.join(DB_DIR, "active_context.json")
ERRORS_FILE = os.path.join(DB_DIR, "errors.json")

# 投資データディレクトリの初期化
INVESTMENT_SUBDIRS = ["raw_data", "dashboards", "philosophy", "processed"]
for subdir in INVESTMENT_SUBDIRS:
    os.makedirs(os.path.join(INVESTMENT_DIR, subdir), exist_ok=True)

# ファイル操作用安全結合関数
def safe_join(*paths) -> str:
    full_path = os.path.abspath(os.path.join(BASE_DIR, *paths))
    if not full_path.startswith(BASE_DIR):
        raise ValueError("Invalid path access detected.")
    return full_path

# JSONファイル読み書き関数
def load_json(path: str, default):
    full_path = safe_join(path)
    if not os.path.exists(full_path):
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as f:
            json.dump(default, f, indent=2, ensure_ascii=False)
        return default
    with open(full_path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path: str, data):
    full_path = safe_join(path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# エラー記録関数（履歴追加対応版）
def record_error(error_message: str) -> None:
    errors = load_json("db/errors.json", [])
    error_data = {
        "error_message": error_message,
        "timestamp": datetime.utcnow().isoformat()
    }
    errors.append(error_data)
    save_json("db/errors.json", errors)

# 仮のデータベース
@dataclass
class AppContext:
    db: dict[str, str]

@asynccontextmanager
async def app_lifespan(server) -> AsyncIterator[AppContext]:
    db = {}
    print("[MCP Server] 起動：データベースを初期化しました。")
    try:
        yield AppContext(db=db)
    finally:
        db.clear()
        print("[MCP Server] 終了：データベースをクリアしました。")

mcp = FastMCP(
    "Investment Management System",
    lifespan=app_lifespan
)

# --------------- Tools ---------------- #
@mcp.tool()
def instruction_policy() -> str:
    """
    ClaudeなどのAIが必ず従うべき開発ルール・操作ポリシー。
    この関数を呼び出して、事前にポリシーを読み込むこと。
    """

    return """
==============================
MCPサーバー操作ポリシー
==============================

【開発プロセスの原則】
1. レポートラインの維持を最優先とする
   - docs/ - 全ての設計書とインデックス
   - reports/ - 進捗レポート
   - logs/error_logs/ - エラーレポート
2. 各操作前に関連ドキュメントを確認する
3. 操作後は必ず結果を確認し、適切なレポートを作成/更新する

【使用可能なTool】
- read_code - コード内容の読み取り
- create_code - 新規ファイル作成
- update_code - 既存ファイル修正
- delete_code - ファイル削除
- move_code - ファイル移動
- list_files_in_directory - ディレクトリ内容確認
- create_directory - ディレクトリ作成
- check_code - コード品質チェック（静的解析）

【各Toolの使用ルール】

■ update_code
- 既存ファイルに対してのみ使用可能
- 部分的な修正に限定（全体書き換えは禁止）
- 変更内容を明確に説明するコメントを追加

■ create_code
- 新規ファイル作成時のみ使用
- ファイル冒頭にはファイルの目的と作成日を記載
- 同名ファイルの存在を事前に確認すること

■ delete_code
- 削除前にファイルの内容を確認
- 削除理由を明記したエラーログを作成
- 削除後の影響範囲を確認

■ check_code
- コード変更後に使用し、基本的な問題を事前に発見
- インポート文や構文エラーを中心にチェック
- エラーが見つかった場合は即時修正

【レポート管理ルール】

■ エラーレポート
- エラー発生時に即座に logs/error_logs/ に作成
- 命名規則: ERROR_YYYYMMDDNNN.md
- 内容: エラー内容、発生状況、原因分析、修正内容
- error_logs_index.md を必ず更新

■ 進捗レポート
- 指示があった場合に reports/ に作成
- 命名規則: progress_YYYYMMDDNNN.md
- 内容: 進捗状況、完了タスク、次のアクション
- reports_index.md を必ず更新

【スレッド運用ルール】
- 1ターンに1つの操作まで（複数操作は禁止）
- スレッドリミット接近時はdocs/に現状をまとめる
- 新スレッド開始時は既存ドキュメントを読み込む

【禁止事項】
- レポートラインの無視・省略
- インデックスファイルの更新忘れ
- 修正内容の不明確な記述
- 独自判断によるプロセスの変更
- 一度の更新で大規模な変更を行うこと

==============================
"""

@mcp.tool()
def create_directory(path: str) -> str:
    """
    指定されたパスにディレクトリを作成するツール。
    """
    try:
        full_path = safe_join(path)
        os.makedirs(full_path, exist_ok=True)
        return f"Directory '{path}' created successfully."
    except Exception as e:
        record_error(str(e))
        return f"Failed to create directory '{path}': {str(e)}"

@mcp.tool()
def read_code(file_path: str) -> str:
    """
    指定されたファイルの内容を読み取るツール。
    ファイルが存在しない場合はエラーを返す。
    """
    try:
        full_path = safe_join(file_path)
        if not os.path.exists(full_path):
            raise FileNotFoundError(f"File '{file_path}' not found.")
        with open(full_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        record_error(str(e))
        return str(e)

@mcp.tool()
def update_code(file_path: str, new_content: str = None, new_str: str = None) -> str:
    """
    既存ファイルの内容を更新するツール。
    ファイル全体を新しい内容に置き換える。
    """
    try:
        # Claudeが `new_str` で送ってきた場合にも対応
        if new_content is None and new_str is not None:
            new_content = new_str
        if new_content is None:
            raise ValueError("No code content provided.")
        
        full_path = safe_join(file_path)
        if not os.path.exists(full_path):
            raise FileNotFoundError(f"File '{file_path}' not found.")
        
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        return f"Code in '{file_path}' updated successfully."
    except Exception as e:
        record_error(str(e))
        return str(e)

@mcp.tool()
def create_code(file_path: str, content) -> str:
    """
    新しいファイルを作成するツール。
    同名のファイルが既に存在する場合はエラーを返す。
    """
    try:
        full_path = safe_join(file_path)
        if os.path.exists(full_path):
            return f"Error: File '{file_path}' already exists."
        
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        
        if isinstance(content, dict):
            content = json.dumps(content, indent=2, ensure_ascii=False)
        
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        return f"Code file '{file_path}' created successfully."
    except Exception as e:
        record_error(str(e))
        return str(e)

@mcp.tool()
def delete_code(file_path: str) -> str:
    """
    指定されたファイルを削除するツール。
    削除前にファイルの存在を確認する。
    """
    try:
        full_path = safe_join(file_path)
        if not os.path.exists(full_path):
            return f"Warning: File '{file_path}' does not exist."
        
        os.remove(full_path)
        return f"Deleted file: '{file_path}'"
    except Exception as e:
        record_error(str(e))
        return str(e)

@mcp.tool()
def move_code(from_path: str, to_path: str) -> str:
    """
    ファイルを別の場所に移動するツール。
    移動先のディレクトリが存在しない場合は自動的に作成する。
    """
    try:
        from_full = safe_join(from_path)
        to_full = safe_join(to_path)
        
        if not os.path.exists(from_full):
            return f"Error: Source file '{from_path}' does not exist."
        
        os.makedirs(os.path.dirname(to_full), exist_ok=True)
        os.rename(from_full, to_full)
        return f"Moved '{from_path}' to '{to_path}'"
    except Exception as e:
        record_error(str(e))
        return str(e)

@mcp.tool()
def list_files_in_directory(directory_path: str) -> list[str]:
    """
    指定されたディレクトリ内のファイルとサブディレクトリを一覧表示するツール。
    """
    try:
        full_path = safe_join(directory_path)
        if not os.path.isdir(full_path):
            raise NotADirectoryError(f"'{directory_path}' is not a directory.")
        
        contents = os.listdir(full_path)
        return contents
    except Exception as e:
        record_error(str(e))
        return [str(e)]

@mcp.tool()
def investment_dashboard_policy() -> str:
    """
    投資ダッシュボード分析・生成のための専用ポリシー。
    バーベル戦略に基づく分析ルールとダッシュボード生成フローを提供。
    投資関連の作業時には必ずこのポリシーを最初に読み込むこと。
    """
    return """
==============================
投資ダッシュボード生成ポリシー
==============================

【前提条件】
投資ダッシュボード関連の作業を開始する前に、必ず以下のリソースを読み込むこと：
- investment://barbell_strategy (バーベル戦略ルール)
- investment://stock_mapping (銘柄分類マッピング)
- investment://fixed_assets (固定資産データ: 現金・投資信託)

【ディレクトリ構造】
investment_data/
├── philosophy/        # 投資思想・ルール定義
├── templates/         # テンプレートTSXコード
├── output/            # 生成されたTSXダッシュボード
└── samples/           # サンプルデータ・デモ用

【標準ワークフロー】

■ Phase 1: データ準備
1. 投資データCSVを投資システムに配置
2. list_files_in_directory("investment_data/samples") でサンプル確認

■ Phase 2: データ分析・統合
3. analyze_portfolio_csv を使用してCSVを処理
4. 3つのリソースを参照して完全なポートフォリオを構築：
   - CSVデータ: 証券データの評価額・株数・損益率
   - stock_mapping: 銘柄のカテゴリ分類（攻め・守り・中間）
   - fixed_assets: 現金・投資信託データ
5. 統合されたポートフォリオデータを分析

■ Phase 3: ダッシュボード生成
6. read_code("investment_data/templates/portfolio_dashboard.tsx") でテンプレート読み込み
7. テンプレートのデータ部分のみを新しい統合分析結果で置換
8. create_code で新しいダッシュボードを investment_data/output/ に保存

【ダッシュボード生成時の注意点】
- 既存のTSXコードの構造は維持する
- データ部分（配列・オブジェクト）のみを置換
- コンポーネント名、インポート文、型定義は変更しない
- 時系列比較データがある場合は前回データとの差分を強調
- 固定資産を必ず含めて分析

【命名規則】
- 分析データ: portfolio_analysis_YYYYMMDD_HHMMSS.json
- ダッシュボード: dashboard_YYYYMMDD_HHMMSS.tsx
- 比較ダッシュボード: comparison_YYYYMMDD.tsx

【禁止事項】
- 銘柄分類のハードコーディング（必ずリソースを参照）
- 固定資産の未統合（必ずfixed_assetsリソースを参照）
- ダッシュボードの全面的な書き換え（データ部分のみ置換）
- バーベル戦略原則に反する推奨
- 個人情報・機密情報の含有

==============================
"""

# --------------- 投資ダッシュボード関連ツール ---------------- #

@mcp.tool()
def analyze_portfolio_csv(csv_file_path: str) -> str:
    """
    投資CSVファイルを読み込み、正確なデータを抽出して保存する。
    証券会社CSVの日本語列名に対応し、正確な評価額・株数・損益率を取得。
    """
    try:
        full_csv_path = safe_join(csv_file_path)
        if not os.path.exists(full_csv_path):
            return f"Error: CSV file '{csv_file_path}' not found."
        
        # CSVファイルの読み込み（エンコーディング自動判定）
        encodings = ['utf-8', 'shift_jis', 'iso-8859-1', 'cp932']
        csv_data = None
        
        for encoding in encodings:
            try:
                with open(full_csv_path, 'r', encoding=encoding) as f:
                    csv_reader = csv.DictReader(f)
                    csv_data = list(csv_reader)
                    columns = csv_reader.fieldnames
                break
            except UnicodeDecodeError:
                continue
        
        if csv_data is None:
            return "Error: Could not read CSV file with any supported encoding."
        
        # 証券会社CSV形式の正確なデータ抽出
        portfolio_holdings = {}
        
        for row in csv_data:
            # 証券会社CSVの列名に基づく抽出
            ticker = row.get('ティッカー', '').strip().upper()
            
            # 評価額（円）の取得
            value_jpy_str = row.get('時価評価額[円]', '0')
            try:
                value_jpy = float(str(value_jpy_str).replace(',', '').strip())
            except (ValueError, TypeError):
                value_jpy = 0
                
            # 保有株数の取得
            shares_str = row.get('保有数[株]', '0')
            try:
                shares = float(str(shares_str).replace(',', '').strip())
            except (ValueError, TypeError):
                shares = 0
                
            # 損益率の取得
            gain_loss_str = row.get('損益率[円]', '0')
            try:
                gain_loss = float(str(gain_loss_str).replace(',', '').replace('%', '').strip())
            except (ValueError, TypeError):
                gain_loss = 0
                
            # 評価単価（円）の取得
            price_jpy_str = row.get('評価単価[円]', '0')
            try:
                price_jpy = float(str(price_jpy_str).replace(',', '').strip())
            except (ValueError, TypeError):
                price_jpy = 0
                
            # 銘柄名の取得
            name = row.get('銘柄', '').strip()
            
            if ticker and value_jpy > 0:
                portfolio_holdings[ticker] = {
                    'ticker': ticker,
                    'name': name,
                    'value_jpy': value_jpy,
                    'shares': shares,
                    'price_jpy': price_jpy,
                    'gain_loss_rate': gain_loss
                }
        
        # 処理結果を保存
        analysis_result = {
            "analysis_date": datetime.now().isoformat(),
            "source_csv": csv_file_path,
            "csv_holdings": portfolio_holdings,
            "csv_holdings_count": len(portfolio_holdings),
            "total_csv_value": sum(holding['value_jpy'] for holding in portfolio_holdings.values()),
            "raw_csv_sample": csv_data[:3]  # 最初の3行のサンプル
        }
        
        # 分析結果を保存
        analysis_file_path = f"investment_data/output/portfolio_analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        save_json(analysis_file_path, analysis_result)
        
        total_value = analysis_result['total_csv_value']
        return f"""CSV処理完了: {analysis_file_path}

📊 抽出結果:
- 銘柄数: {len(portfolio_holdings)}件
- 総評価額: ¥{total_value:,.0f}
- 主要銘柄: {', '.join(list(portfolio_holdings.keys())[:5])}

⚠️ 次のステップ:
1. 3つのリソースを参照してください:
   - investment://barbell_strategy
   - investment://stock_mapping  
   - investment://fixed_assets
2. 固定資産データと統合して完全なポートフォリオを構築
3. バーベル戦略分析を実行"""
    
    except Exception as e:
        record_error(str(e))
        return f"CSV処理中にエラーが発生しました: {str(e)}"

# --------------- Resources ---------------- #
@mcp.resource("investment://barbell_strategy")
def barbell_strategy_rules() -> str:
    """
    バーベル戦略の投資ルールと基本思想。
    investment_data/philosophy/barbell_strategy.mdファイルから読み込み。
    """
    try:
        rules_path = safe_join("investment_data", "philosophy", "barbell_strategy.md")
        
        if os.path.exists(rules_path):
            with open(rules_path, "r", encoding="utf-8") as f:
                return f.read()
        else:
            return "バーベル戦略ルールファイルが見つかりません。philosophy/barbell_strategy.mdを確認してください。"
    except Exception as e:
        record_error(str(e))
        return f"[Error] バーベル戦略ルール読み込み失敗: {str(e)}"

@mcp.resource("investment://fixed_assets")
def fixed_assets_data() -> str:
    """
    固定資産データ（現金・投資信託等）。
    investment_data/philosophy/fixed_assets.jsonファイルから読み込み。
    """
    try:
        fixed_assets_path = safe_join("investment_data", "philosophy", "fixed_assets.json")
        
        if os.path.exists(fixed_assets_path):
            with open(fixed_assets_path, "r", encoding="utf-8") as f:
                return f.read()
        else:
            return "固定資産データファイルが見つかりません。philosophy/fixed_assets.jsonを確認してください。"
    except Exception as e:
        record_error(str(e))
        return f"[Error] 固定資産データ読み込み失敗: {str(e)}"

@mcp.resource("investment://stock_mapping")
def stock_classification_mapping() -> str:
    """
    銘柄分類マッピング（攻め・守り・中間の定義）。
    investment_data/philosophy/stock_mapping.jsonファイルから読み込み。
    """
    try:
        mapping_path = safe_join("investment_data", "philosophy", "stock_mapping.json")
        
        if os.path.exists(mapping_path):
            with open(mapping_path, "r", encoding="utf-8") as f:
                return f.read()
        else:
            return "銘柄分類マッピングファイルが見つかりません。philosophy/stock_mapping.jsonを確認してください。"
    except Exception as e:
        record_error(str(e))
        return f"[Error] 銘柄分類マッピング読み込み失敗: {str(e)}"

# --------------- Entry Point ---------------- #
if __name__ == "__main__":
    mcp.run()