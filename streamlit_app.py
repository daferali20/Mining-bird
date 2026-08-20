import os
import streamlit as st

st.set_page_config(page_title="📈 توصيات الأسهم اللحظية", layout="wide")

st.title("📈 توصيات لحظية للأسهم باستخدام GPT وبيانات Alpha Vantage")
st.write("هذا التطبيق يستخدم بيانات السوق الحقيقية ويحللها باستخدام الذكاء الاصطناعي لإعطاء توصيات فنية لحظية.")

# المفاتيح
openai_key = os.environ.get("OPENAI_API_KEY", "")
alpha_vantage_key = os.environ.get("ALPHA_VANTAGE_KEY", "")

with st.sidebar:
    st.header("🔑 إعدادات المفاتيح")
    user_openai_key = st.text_input("OpenAI API Key", value=openai_key, type="password")
    user_alpha_key = st.text_input("Alpha Vantage Key", value=alpha_vantage_key, type="password")

symbol = st.text_input("🧾 أدخل رمز السهم (مثال: TSLA, AAPL, NVDA):", value="TSLA")

if st.button("🔍 احصل على التوصية"):
    if not user_openai_key or not user_alpha_key:
        st.error("⚠️ يرجى تزويد مفاتيح API الخاصة بـ OpenAI و Alpha Vantage في الشريط الجانبي.")
    else:
        st.info(f"⏳ جاري تحليل السهم: {symbol.upper()}...")
        # يمكنك استدعاء الدوال هنا عند توفر مفاتيح شغالّة
