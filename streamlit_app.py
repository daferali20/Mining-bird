from nbformat import v4, writes
from pathlib import Path

# إعادة إنشاء دفتر مع واجهة المستخدم باستخدام ipywidgets
nb = v4.new_notebook()

nb.cells = [
    v4.new_markdown_cell("""# 📈 توصيات لحظية للأسهم باستخدام GPT وبيانات Alpha Vantage
هذا المشروع يستخدم بيانات السوق الحقيقية ويحللها باستخدام GPT لإعطاء توصيات فنية لحظية.
"""),

    v4.new_code_cell("!pip install openai pandas pandas_ta requests ipywidgets --quiet"),

    v4.new_code_cell("""
import openai
import requests
import pandas as pd
import pandas_ta as ta
import ipywidgets as widgets
from IPython.display import display
"""),

    v4.new_code_cell("""
# 🔐 أدخل مفاتيحك هنا
openai.api_key = "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"
alpha_vantage_key = "X5QLR930PG6ONM5H"),

    v4.new_code_cell("""
def get_stock_data(symbol):
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=5min&apikey={alpha_vantage_key}&outputsize=compact"
    res = requests.get(url)
    data = res.json().get("Time Series (5min)")
    if data is None:
        raise ValueError("لم يتم العثور على بيانات. تحقق من رمز السهم أو المفتاح.")
    df = pd.DataFrame(data).T.astype(float)
    df.index = pd.to_datetime(df.index)
    df = df.sort_index()
    return df
"""),

    v4.new_code_cell("""
def get_rsi(df):
    df['rsi'] = ta.rsi(df['4. close'], length=14)
    return df['rsi'].iloc[-1]
"""),

    v4.new_code_cell("""
def generate_ai_recommendation(symbol):
    df = get_stock_data(symbol)
    latest_price = df['4. close'].iloc[-1]
    rsi = get_rsi(df)
    volume = df['5. volume'].iloc[-1]

    prompt = f\"\"\"
    أعطني توصية لحظية عن سهم {symbol} بناءً على:
    - السعر: {latest_price:.2f}
    - RSI: {rsi:.2f}
    - حجم التداول: {volume}
    \"\"\"

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "أنت محلل فني للأسهم تعطي توصيات سريعة ودقيقة."},
            {"role": "user", "content": prompt}
        ]
    )

    return response['choices'][0]['message']['content']
"""),

    v4.new_markdown_cell("## 🧑‍💻 واجهة المستخدم"),

    v4.new_code_cell("""
# واجهة المستخدم التفاعلية داخل Colab
symbol_input = widgets.Text(
    value='TSLA',
    placeholder='أدخل رمز السهم مثل TSLA أو AAPL',
    description='🧾 السهم:',
    disabled=False
)

button = widgets.Button(description="🔍 احصل على التوصية")
output = widgets.Output()

def on_button_click(b):
    with output:
        output.clear_output()
        symbol = symbol_input.value.upper()
        print("⏳ جاري تحليل السهم:", symbol)
        try:
            print(generate_ai_recommendation(symbol))
        except Exception as e:
            print("❌ خطأ:", e)

button.on_click(on_button_click)

display(symbol_input, button, output)
""")
]

# حفظ الملف الجديد
path_with_ui = Path("/mnt/data/stock_ai_recommender_with_ui.ipynb")
with path_with_ui.open("w", encoding="utf-8") as f:
    f.write(writes(nb))

str(path_with_ui)  # إرجاع مسار الملف الجديد

