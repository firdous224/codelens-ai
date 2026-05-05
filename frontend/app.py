import streamlit as st
import time

st.set_page_config(page_title="CodeLens AI", layout="wide")

# ---------------- SESSION ----------------
if "page" not in st.session_state:
    st.session_state.page = "home"

if "user" not in st.session_state:
    st.session_state.user = None

# ---------------- STYLE ----------------
st.markdown("""
<style>
body {
    background-color: #0b0f1a;
    color: white;
}
.main-title {
    font-size: 60px;
    font-weight: bold;
}
.gradient {
    background: linear-gradient(90deg, #4facfe, #00f2fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.card {
    background: #111827;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    margin: 10px 0;
}
</style>
""", unsafe_allow_html=True)

# ---------------- HOME ----------------
if st.session_state.page == "home":

    col1, col2 = st.columns([1.2, 1])

    with col1:
        st.markdown('<div class="main-title">Decode Code.</div>', unsafe_allow_html=True)
        st.markdown('<div class="main-title gradient">Reveal Intent.</div>', unsafe_allow_html=True)

        st.write("AI that analyzes messy or undocumented code.")

        if st.button("🚀 Get Started"):
            st.session_state.page = "login"
            st.rerun()

    with col2:
        st.image("https://cdn-icons-png.flaticon.com/512/4712/4712109.png")

    st.markdown("##")

    c1, c2, c3 = st.columns(3)

    with c1:
        st.markdown('<div class="card">🧠 Intent Extraction</div>', unsafe_allow_html=True)

    with c2:
        st.markdown('<div class="card">⚠️ Gap Detection</div>', unsafe_allow_html=True)

    with c3:
        st.markdown('<div class="card">💡 Smart Suggestions</div>', unsafe_allow_html=True)

# ---------------- LOGIN ----------------
elif st.session_state.page == "login":

    st.title("🔐 Login")

    user = st.text_input("Username")
    pwd = st.text_input("Password", type="password")

    if st.button("Login"):
        if user:
            st.session_state.user = user
            st.session_state.page = "dashboard"
            st.rerun()
        else:
            st.error("Enter username")

# ---------------- DASHBOARD ----------------
elif st.session_state.page == "dashboard":

    st.sidebar.title(f"👤 {st.session_state.user}")
    menu = st.sidebar.radio("Menu", ["Analyze", "Logout"])

    if menu == "Logout":
        st.session_state.page = "home"
        st.session_state.user = None
        st.rerun()

    if menu == "Analyze":

        st.title("🧠 Code Analyzer")

        code = st.text_area("Paste your code here", height=250)

        if st.button("Analyze Code"):

            if not code.strip():
                st.warning("Enter code first")
            else:
                st.session_state.page = "processing"
                st.session_state.code = code
                st.rerun()

# ---------------- PROCESSING ----------------
elif st.session_state.page == "processing":

    st.title("🔍 Analyzing Code...")

    progress = st.progress(0)

    for i in range(100):
        time.sleep(0.01)
        progress.progress(i + 1)

    st.session_state.page = "results"
    st.rerun()

# ---------------- RESULTS ----------------
elif st.session_state.page == "results":

    st.title("📊 Analysis Results")

    col1, col2, col3 = st.columns(3)

    col1.metric("Intent Score", "84%", "Good")
    col2.metric("Bugs Found", "2", "- Issues")
    col3.metric("Confidence", "91%", "High")

    st.markdown("### 🧠 Intent")
    st.success("The code performs an operation and may fail under certain conditions.")

    st.markdown("### ⚠️ Issues")
    st.error("Potential runtime error detected (e.g., division by zero).")

    st.markdown("### 💡 Suggestions")
    st.info("Add validation checks before performing operations.")

    st.markdown("### 🔁 Alternatives")
    st.write("Use safe programming patterns or exception handling.")

    if st.button("🔙 Back to Dashboard"):
        st.session_state.page = "dashboard"
        st.rerun()