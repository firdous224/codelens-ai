import streamlit as st
import requests

st.set_page_config(
    page_title="CodeLens AI",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
* { font-family: 'Inter', sans-serif; }
.stApp { background: #0d1117; }
.hero {
    text-align: center; padding: 40px 20px;
    background: linear-gradient(135deg, rgba(0,255,136,0.05), rgba(0,122,255,0.05));
    border-radius: 20px; border: 1px solid rgba(0,255,136,0.15); margin-bottom: 30px;
}
.hero h1 {
    font-size: 3em; font-weight: 700;
    background: linear-gradient(135deg, #00ff88, #007aff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;
}
.hero p { color: #8b949e; font-size: 1.1em; margin-top: 8px; }
.score-card {
    background: linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,122,255,0.08));
    border: 2px solid rgba(0,255,136,0.25); border-radius: 20px;
    padding: 30px; text-align: center; margin: 20px 0;
}
.score-number {
    font-size: 4.5em; font-weight: 700;
    background: linear-gradient(135deg, #00ff88, #007aff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; padding: 20px; margin: 12px 0;
}
.card h4 { color: #00ff88; margin-bottom: 8px; font-size: 1em; }
.card p, .card div { color: #c9d1d9; line-height: 1.7; }
.gap-item {
    background: rgba(255,59,48,0.08); border-left: 3px solid #ff3b30;
    border-radius: 8px; padding: 10px 14px; margin: 6px 0;
    color: #ff6b6b; font-family: 'JetBrains Mono', monospace; font-size: 0.88em;
}
.security-item {
    background: rgba(255,149,0,0.08); border-left: 3px solid #ff9500;
    border-radius: 8px; padding: 10px 14px; margin: 6px 0; color: #ffb347;
}
.perf-item {
    background: rgba(90,200,250,0.08); border-left: 3px solid #5ac8fa;
    border-radius: 8px; padding: 10px 14px; margin: 6px 0; color: #5ac8fa;
}
.alt-card {
    background: rgba(0,122,255,0.06); border: 1px solid rgba(0,122,255,0.2);
    border-radius: 12px; padding: 16px; margin: 10px 0;
}
.improve-item {
    background: rgba(255,214,10,0.06); border-left: 3px solid #ffd60a;
    border-radius: 8px; padding: 10px 14px; margin: 6px 0; color: #ffd60a; font-size: 0.92em;
}
.metric-box {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 18px; text-align: center;
}
.metric-val { font-size: 1.9em; font-weight: 700; }
.metric-lbl { color: #8b949e; font-size: 0.82em; margin-top: 4px; }
.badge-good { background: rgba(0,255,136,0.15); color: #00ff88; padding: 5px 16px; border-radius: 20px; font-weight: 600; }
.badge-avg  { background: rgba(255,204,0,0.15);  color: #ffcc00; padding: 5px 16px; border-radius: 20px; font-weight: 600; }
.badge-poor { background: rgba(255,59,48,0.15);  color: #ff3b30; padding: 5px 16px; border-radius: 20px; font-weight: 600; }
.stButton > button {
    background: linear-gradient(135deg, #00ff88, #007aff) !important;
    color: #000 !important; font-weight: 700 !important; border: none !important;
    border-radius: 12px !important; padding: 14px 28px !important;
    font-size: 1.05em !important; width: 100% !important;
}
.stTextArea textarea {
    background: #0d1117 !important; color: #00ff88 !important;
    font-family: 'JetBrains Mono', monospace !important;
    border: 1px solid rgba(0,255,136,0.2) !important;
    border-radius: 12px !important; font-size: 0.92em !important;
}
</style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.markdown("""
    <div style='text-align:center;padding:20px 0'>
        <div style='font-size:2.5em'>🔍</div>
        <h2 style='color:#00ff88;margin:4px 0'>CodeLens AI</h2>
        <p style='color:#8b949e;font-size:0.82em'>Your Code's Second Brain</p>
    </div>
    """, unsafe_allow_html=True)
    st.markdown("---")
    page = st.radio("", ["🔍 Analyze", "📁 History", "ℹ️ About"], label_visibility="hidden")
    st.markdown("---")
    st.markdown("""
    <div style='color:#8b949e;font-size:0.82em;padding:8px 0'>
        <b style='color:#00ff88'>Score Guide</b><br><br>
        🟢 71–100 → Good Code<br>
        🟡 41–70 → Average Code<br>
        🔴 0–40 → Poor Code
    </div>
    """, unsafe_allow_html=True)

# ── ANALYZE PAGE ──────────────────────────────────────
if "Analyze" in page:
    st.markdown("""
    <div class='hero'>
        <h1>🔍 CodeLens AI</h1>
        <p>Paste any messy code — AI uncovers intent, finds gaps, and scores quality</p>
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns([3, 1])
    with col1:
        code = st.text_area(
            "Code Input",
            height=320,
            placeholder="# Paste any messy or undocumented code here...\n\ndef calc(x, y):\n    z = x * y\n    return x + y  # bug!",
            label_visibility="collapsed"
        )
    with col2:
        st.markdown("<br>", unsafe_allow_html=True)
        language = st.selectbox("Language", [
            "Python", "Java", "JavaScript", "TypeScript",
            "C++", "C", "C#", "Go", "Rust", "Ruby",
            "PHP", "Swift", "Kotlin", "Scala", "R"
        ])
        lines_count = len(code.split('\n')) if code else 0
        chars_count = len(code) if code else 0
        st.markdown(f"""
        <div class='metric-box' style='margin-top:12px'>
            <div class='metric-val' style='color:#00ff88'>{lines_count}</div>
            <div class='metric-lbl'>Lines</div>
        </div>
        <div class='metric-box' style='margin-top:8px'>
            <div class='metric-val' style='color:#007aff'>{chars_count}</div>
            <div class='metric-lbl'>Characters</div>
        </div>
        """, unsafe_allow_html=True)

    if st.button("🔍 Analyze My Code"):
        if not code.strip():
            st.error("Please paste your code first!")
        else:
            with st.spinner("🧠 AI is deeply analyzing your code..."):
                try:
                    resp = requests.post(
                        "http://localhost:8000/analyze",
                        json={"code": code, "language": language},
                        timeout=90
                    )
                    result = resp.json()
                    st.session_state['result'] = result
                    st.session_state['lang'] = language
                except Exception as e:
                    st.error(f"Backend error: {e}. Make sure backend is running!")
                    st.stop()
            st.success("✅ Analysis Complete!")

    if 'result' in st.session_state:
        r = st.session_state['result']
        score = r.get('score', 0)
        lang = st.session_state.get('lang', 'python').lower()

        if score >= 71:
            badge = "<span class='badge-good'>🟢 Good Code</span>"
            score_color = "#00ff88"
        elif score >= 41:
            badge = "<span class='badge-avg'>🟡 Average Code</span>"
            score_color = "#ffcc00"
        else:
            badge = "<span class='badge-poor'>🔴 Poor Code</span>"
            score_color = "#ff3b30"

        st.markdown(f"""
        <div class='score-card'>
            <div class='score-number' style='color:{score_color}'>{score}<span style='font-size:0.3em;color:#8b949e'>/100</span></div>
            <div style='margin-top:10px'>{badge}</div>
            <div style='color:#8b949e;margin-top:8px;font-size:0.88em'>Code Health Score</div>
        </div>
        """, unsafe_allow_html=True)

        m1, m2, m3, m4 = st.columns(4)
        gap_count = len(r.get('gaps', []))
        sec_count = len(r.get('security_issues', []))
        alt_count = len(r.get('alternatives', []))
        imp_count = len(r.get('improvements', []))

        for col, val, lbl, clr in zip(
            [m1, m2, m3, m4],
            [gap_count, sec_count, alt_count, imp_count],
            ["Gaps Found", "Security Issues", "Alternatives", "Improvements"],
            ["#ff3b30", "#ff9500", "#007aff", "#ffd60a"]
        ):
            col.markdown(f"""
            <div class='metric-box'>
                <div class='metric-val' style='color:{clr}'>{val}</div>
                <div class='metric-lbl'>{lbl}</div>
            </div>
            """, unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)
        tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
            "🎯 Intent & Gaps", "🔒 Security & Perf",
            "💡 Alternatives", "✅ Fixed Code",
            "📖 Explanation", "🚀 Improvements"
        ])

        with tab1:
            c1, c2 = st.columns(2)
            with c1:
                st.markdown("<div class='card'><h4>✅ Programmer's Intention</h4>", unsafe_allow_html=True)
                st.write(r.get('intention', 'N/A'))
                st.markdown("</div>", unsafe_allow_html=True)
            with c2:
                st.markdown("<div class='card'><h4>⚠️ Actual Behavior</h4>", unsafe_allow_html=True)
                st.write(r.get('actual_behavior', 'N/A'))
                st.markdown("</div>", unsafe_allow_html=True)
            st.markdown("<div class='card'><h4>⏱ Complexity</h4>", unsafe_allow_html=True)
            st.write(r.get('complexity', 'N/A'))
            st.markdown("</div>", unsafe_allow_html=True)
            st.markdown("<div class='card'><h4>❌ Gaps Found</h4>", unsafe_allow_html=True)
            for g in r.get('gaps', []):
                st.markdown(f"<div class='gap-item'>{g}</div>", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)

        with tab2:
            st.markdown("<div class='card'><h4>🔒 Security Issues</h4>", unsafe_allow_html=True)
            issues = r.get('security_issues', [])
            for s in issues:
                st.markdown(f"<div class='security-item'>{s}</div>", unsafe_allow_html=True)
            if not issues:
                st.success("No security issues found!")
            st.markdown("</div>", unsafe_allow_html=True)
            st.markdown("<div class='card'><h4>⚡ Performance Issues</h4>", unsafe_allow_html=True)
            perf = r.get('performance_issues', [])
            for p in perf:
                st.markdown(f"<div class='perf-item'>{p}</div>", unsafe_allow_html=True)
            if not perf:
                st.success("No performance issues found!")
            st.markdown("</div>", unsafe_allow_html=True)

        with tab3:
            for i, alt in enumerate(r.get('alternatives', []), 1):
                st.markdown(f"<div class='alt-card'><b style='color:#007aff'>💡 Alternative {i}: {alt.get('title','')}</b></div>", unsafe_allow_html=True)
                st.code(alt.get('code', ''), language=lang)

        with tab4:
            fixed = r.get('fixed_code', '') or r.get('corrected_code', '')
            if fixed:
                st.code(fixed, language=lang)
            else:
                st.info("No corrected code available")

        with tab5:
            st.markdown("<div class='card'><h4>📖 Plain English Explanation</h4>", unsafe_allow_html=True)
            st.write(r.get('explanation', 'N/A'))
            st.markdown("</div>", unsafe_allow_html=True)
            breakdown = r.get('score_breakdown', {})
            if breakdown:
                st.markdown("<div class='card'><h4>📊 Score Breakdown</h4>", unsafe_allow_html=True)
                for k, v in breakdown.items():
                    st.write(f"**{k}:** {v}")
                st.markdown("</div>", unsafe_allow_html=True)

        with tab6:
            st.markdown("<div class='card'><h4>🚀 Recommended Improvements</h4>", unsafe_allow_html=True)
            for imp in r.get('improvements', []):
                st.markdown(f"<div class='improve-item'>{imp}</div>", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)

# ── HISTORY PAGE ──────────────────────────────────────
elif "History" in page:
    st.markdown("<h2 style='color:#00ff88'>📁 Analysis History</h2>", unsafe_allow_html=True)
    if st.button("🔄 Load History"):
        try:
            history = requests.get("http://localhost:8000/history", timeout=10).json()
            if not history:
                st.info("No analyses yet. Go analyze some code!")
            for item in history:
                s = item.get('score', 0)
                status = "🟢 Good" if s >= 71 else ("🟡 Average" if s >= 41 else "🔴 Poor")
                with st.expander(f"{status} | {s}/100 | {item.get('language','?')} | {item.get('timestamp','')}"):
                    c1, c2 = st.columns(2)
                    with c1:
                        st.markdown("**✅ Intention:**")
                        st.write(item.get('intention', ''))
                    with c2:
                        st.markdown("**❌ Gaps:**")
                        for g in item.get('gaps', []):
                            st.write(g)
                    st.markdown("**📖 Explanation:**")
                    st.write(item.get('explanation', ''))
        except Exception as e:
            st.error(f"Could not load history: {e}")

# ── ABOUT PAGE ────────────────────────────────────────
elif "About" in page:
    st.markdown("""
    <div class='hero'>
        <h1>🔍 CodeLens AI</h1>
        <p>Your Code's Second Brain</p>
    </div>
    <div class='card'><h4>What is CodeLens AI?</h4>
    <p>An intelligent code analyzer that understands the INTENTION behind your code
    and identifies gaps between what you meant to write and what you actually wrote.
    Supports any programming language with deep Gemini 2.0 analysis.</p></div>
    <div class='card'><h4>Key Features</h4>
    <p>✅ Intent Extraction &nbsp;|&nbsp; ❌ Gap Detection &nbsp;|&nbsp; 🔒 Security Analysis<br>
    ⚡ Performance Review &nbsp;|&nbsp; 💡 3 Alternatives &nbsp;|&nbsp; 📊 Health Score (0-100)<br>
    📖 Plain English Explanation &nbsp;|&nbsp; 🚀 Improvement Suggestions</p></div>
    <div class='card'><h4>Tech Stack</h4>
    <p>🎨 Frontend: Streamlit &nbsp;|&nbsp; ⚙️ Backend: FastAPI<br>
    🗄️ Database: MongoDB Atlas &nbsp;|&nbsp; 🤖 AI: Gemini 2.0 Flash</p></div>
    """, unsafe_allow_html=True)