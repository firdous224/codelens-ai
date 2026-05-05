import streamlit as st
import requests
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

# Page config
st.set_page_config(
    page_title="CodeLens AI",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Amazing CSS styling
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

* {
    font-family: 'Inter', sans-serif;
}

.main {
    background: linear-gradient(
        135deg,
        #0a0a0a 0%,
        #0d1117 50%,
        #0a0f1e 100%
    );
}

.stApp {
    background: linear-gradient(
        135deg,
        #0a0a0a 0%,
        #0d1117 100%
    );
}

/* Hero Section */
.hero {
    text-align: center;
    padding: 40px 20px;
    background: linear-gradient(
        135deg,
        rgba(0,255,136,0.05),
        rgba(0,122,255,0.05)
    );
    border-radius: 20px;
    border: 1px solid rgba(0,255,136,0.1);
    margin-bottom: 30px;
}

.hero h1 {
    font-size: 3.5em;
    font-weight: 700;
    background: linear-gradient(
        135deg, #00ff88, #007aff
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
}

.hero p {
    color: #8b949e;
    font-size: 1.2em;
    margin-top: 10px;
}

/* Score Card */
.score-card {
    background: linear-gradient(
        135deg,
        rgba(0,255,136,0.1),
        rgba(0,122,255,0.1)
    );
    border: 2px solid rgba(0,255,136,0.3);
    border-radius: 20px;
    padding: 30px;
    text-align: center;
    margin: 20px 0;
}

.score-number {
    font-size: 5em;
    font-weight: 700;
    background: linear-gradient(
        135deg, #00ff88, #007aff
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Result Cards */
.result-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 15px;
    padding: 20px;
    margin: 15px 0;
}

.result-card h3 {
    color: #00ff88;
    margin-bottom: 10px;
    font-size: 1.1em;
}

.result-card p {
    color: #c9d1d9;
    line-height: 1.6;
}

/* Gap Item */
.gap-item {
    background: rgba(255,59,48,0.1);
    border-left: 3px solid #ff3b30;
    border-radius: 8px;
    padding: 10px 15px;
    margin: 8px 0;
    color: #ff6b6b;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9em;
}

/* Alternative Card */
.alt-card {
    background: rgba(0,122,255,0.08);
    border: 1px solid rgba(0,122,255,0.2);
    border-radius: 12px;
    padding: 15px;
    margin: 10px 0;
}

/* Improvement Item */
.improve-item {
    background: rgba(255,204,0,0.08);
    border-left: 3px solid #ffcc00;
    border-radius: 8px;
    padding: 10px 15px;
    margin: 8px 0;
    color: #ffd60a;
}

/* Buttons */
.stButton > button {
    background: linear-gradient(
        135deg, #00ff88, #007aff
    ) !important;
    color: #000000 !important;
    font-weight: 700 !important;
    border: none !important;
    border-radius: 12px !important;
    padding: 15px 30px !important;
    font-size: 1.1em !important;
    width: 100% !important;
    transition: all 0.3s ease !important;
}

/* Text Area */
.stTextArea textarea {
    background: #0d1117 !important;
    color: #00ff88 !important;
    font-family: 'JetBrains Mono',
        monospace !important;
    border: 1px solid rgba(
        0,255,136,0.2
    ) !important;
    border-radius: 12px !important;
    font-size: 0.95em !important;
}

/* Select Box */
.stSelectbox > div > div {
    background: #0d1117 !important;
    border: 1px solid rgba(
        0,255,136,0.2
    ) !important;
    color: #c9d1d9 !important;
    border-radius: 12px !important;
}

/* Sidebar */
.css-1d391kg {
    background: #0d1117 !important;
}

/* Metrics */
.metric-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(
        255,255,255,0.08
    );
    border-radius: 12px;
    padding: 20px;
    text-align: center;
}

.metric-value {
    font-size: 2em;
    font-weight: 700;
    color: #00ff88;
}

.metric-label {
    color: #8b949e;
    font-size: 0.9em;
    margin-top: 5px;
}

/* Badge */
.badge-good {
    background: rgba(0,255,136,0.15);
    color: #00ff88;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 600;
    display: inline-block;
}

.badge-avg {
    background: rgba(255,204,0,0.15);
    color: #ffcc00;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 600;
    display: inline-block;
}

.badge-poor {
    background: rgba(255,59,48,0.15);
    color: #ff3b30;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 600;
    display: inline-block;
}

/* Divider */
.custom-divider {
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(0,255,136,0.3),
        transparent
    );
    margin: 30px 0;
}
</style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.markdown("""
    <div style='text-align:center;
    padding:20px 0;'>
        <h2 style='color:#00ff88;
        font-size:1.5em;'>
        🔍 CodeLens AI
        </h2>
        <p style='color:#8b949e;
        font-size:0.85em;'>
        Your Code's Second Brain
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("---")
    
    page = st.radio(
        "Navigation",
        ["🔍 Analyze Code", 
         "📁 History",
         "ℹ️ About"],
        label_visibility="hidden"
    )
    
    st.markdown("---")
    
    st.markdown("""
    <div style='color:#8b949e;
    font-size:0.8em;padding:10px 0;'>
        <b style='color:#00ff88;'>
        Score Guide:</b><br><br>
        🟢 71-100 = Good Code<br>
        🟡 41-70 = Average Code<br>
        🔴 0-40 = Poor Code
    </div>
    """, unsafe_allow_html=True)

# ==================
# ANALYZE PAGE
# ==================
if "Analyze" in page:
    
    # Hero Section
    st.markdown("""
    <div class='hero'>
        <h1>🔍 CodeLens AI</h1>
        <p>Paste your messy code and let
        AI understand the intention,
        find gaps and suggest fixes</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Input Section
    col1, col2 = st.columns([3, 1])
    
    with col1:
        code = st.text_area(
            "Paste your code here:",
            height=300,
            placeholder="""# Paste any messy or 
# undocumented code here...

def calculate(x, y):
    z = x * y
    return x + y  # bug here!""",
            label_visibility="collapsed"
        )
    
    with col2:
        st.markdown(
            "<br>", 
            unsafe_allow_html=True
        )
        language = st.selectbox(
            "Language",
            ["Python", "Java", 
             "JavaScript", "C++",
             "C", "TypeScript",
             "Go", "Rust"]
        )
        
        st.markdown("<br>", 
            unsafe_allow_html=True)
        
        lines = len(code.split('\n')) if code else 0
        chars = len(code) if code else 0
        
        st.markdown(f"""
        <div class='metric-card'>
            <div class='metric-value'>
                {lines}
            </div>
            <div class='metric-label'>
                Lines of Code
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("<br>", 
            unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class='metric-card'>
            <div class='metric-value'>
                {chars}
            </div>
            <div class='metric-label'>
                Characters
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    analyze_btn = st.button(
        "🔍 Analyze My Code"
    )
    
    if analyze_btn:
        if not code.strip():
            st.error(
                "Please paste your code first!"
            )
        else:
            with st.spinner(
                "🧠 AI is analyzing your code..."
            ):
                try:
                    response = requests.post(
                        "http://localhost:8000/analyze",
                        json={
                            "code": code,
                            "language": language
                        },
                        timeout=60
                    )
                    result = response.json()
                    
                    # Store in session
                    st.session_state['result'] = result
                    st.session_state['code'] = code
                    st.session_state['language'] = language
                    
                except Exception as e:
                    st.error(f"Error: {str(e)}")
                    st.stop()
            
            st.success("✅ Analysis Complete!")
    
    # Show Results
    if 'result' in st.session_state:
        result = st.session_state['result']
        score = result.get('score', 0)
        
        st.markdown(
            "<div class='custom-divider'></div>",
            unsafe_allow_html=True
        )
        
        # Score Section
        if score >= 71:
            badge = "<span class='badge-good'>🟢 Good Code</span>"
            color = "#00ff88"
        elif score >= 41:
            badge = "<span class='badge-avg'>🟡 Average Code</span>"
            color = "#ffcc00"
        else:
            badge = "<span class='badge-poor'>🔴 Poor Code</span>"
            color = "#ff3b30"
        
        st.markdown(f"""
        <div class='score-card'>
            <div class='score-number'
            style='color:{color}'>
                {score}
                <span style='font-size:0.4em;
                color:#8b949e'>/100</span>
            </div>
            <div style='margin-top:10px'>
                {badge}
            </div>
            <div style='color:#8b949e;
            margin-top:10px;font-size:0.9em'>
                Code Health Score
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # 4 Column Metrics
        m1, m2, m3, m4 = st.columns(4)
        gaps = result.get('gaps','').count('\n')
        alts = len(result.get('alternatives',[]))
        
        with m1:
            st.markdown(f"""
            <div class='metric-card'>
                <div class='metric-value'
                style='color:#ff3b30'>
                    {gaps}
                </div>
                <div class='metric-label'>
                    Gaps Found
                </div>
            </div>
            """, unsafe_allow_html=True)
        
        with m2:
            st.markdown(f"""
            <div class='metric-card'>
                <div class='metric-value'
                style='color:#007aff'>
                    {alts}
                </div>
                <div class='metric-label'>
                    Alternatives
                </div>
            </div>
            """, unsafe_allow_html=True)
        
        with m3:
            st.markdown(f"""
            <div class='metric-card'>
                <div class='metric-value'
                style='color:#ffcc00'>
                    {100-score}%
                </div>
                <div class='metric-label'>
                    Improvement Needed
                </div>
            </div>
            """, unsafe_allow_html=True)
        
        with m4:
            st.markdown(f"""
            <div class='metric-card'>
                <div class='metric-value'
                style='color:#00ff88'>
                    {score}%
                </div>
                <div class='metric-label'>
                    Correct Logic
                </div>
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown("<br>", 
            unsafe_allow_html=True)
        
        # Tab Results
        tab1, tab2, tab3, tab4, tab5 = st.tabs([
            "🎯 Intention & Gaps",
            "💡 Alternatives",
            "✅ Fixed Code",
            "📖 Explanation",
            "🚀 Improvements"
        ])
        
        with tab1:
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("""
                <div class='result-card'>
                    <h3>✅ Programmer's Intention</h3>
                """, unsafe_allow_html=True)
                st.write(
                    result.get('intention',
                    'Not found')
                )
                st.markdown(
                    "</div>",
                    unsafe_allow_html=True
                )
            
            with col2:
                st.markdown("""
                <div class='result-card'>
                    <h3>⚠️ Actual Behavior</h3>
                """, unsafe_allow_html=True)
                st.write(
                    result.get('actual_behavior',
                    'Not found')
                )
                st.markdown(
                    "</div>",
                    unsafe_allow_html=True
                )
            
            st.markdown("""
            <div class='result-card'>
                <h3>❌ Gaps Found</h3>
            """, unsafe_allow_html=True)
            
            gaps_text = result.get('gaps', '')
            for gap in gaps_text.split('\n'):
                if gap.strip():
                    st.markdown(f"""
                    <div class='gap-item'>
                        {gap}
                    </div>
                    """, 
                    unsafe_allow_html=True)
            
            st.markdown(
                "</div>",
                unsafe_allow_html=True
            )
        
        with tab2:
            alts = result.get('alternatives', [])
            for i, alt in enumerate(alts, 1):
                st.markdown(f"""
                <div class='alt-card'>
                    <h4 style='color:#007aff'>
                    💡 Alternative {i}
                    </h4>
                """, unsafe_allow_html=True)
                st.code(alt, 
                    language=st.session_state.get(
                        'language','python'
                    ).lower()
                )
                st.markdown(
                    "</div>",
                    unsafe_allow_html=True
                )
        
        with tab3:
            st.markdown("""
            <div class='result-card'>
                <h3>✅ Corrected Code</h3>
            """, unsafe_allow_html=True)
            
            fixed = result.get(
                'corrected_code', ''
            )
            if fixed:
                st.code(
                    fixed,
                    language=st.session_state.get(
                        'language','python'
                    ).lower()
                )
            else:
                st.info(
                    "No corrected code available"
                )
            
            st.markdown(
                "</div>",
                unsafe_allow_html=True
            )
        
        with tab4:
            st.markdown("""
            <div class='result-card'>
                <h3>📖 Simple English Explanation</h3>
            """, unsafe_allow_html=True)
            
            st.write(
                result.get('explanation',
                'Not available')
            )
            st.markdown(
                "</div>",
                unsafe_allow_html=True
            )
        
        with tab5:
            st.markdown("""
            <div class='result-card'>
                <h3>🚀 Improvements to Make</h3>
            """, unsafe_allow_html=True)
            
            improvements = result.get(
                'improvements', ''
            )
            for imp in improvements.split('\n'):
                if imp.strip():
                    st.markdown(f"""
                    <div class='improve-item'>
                        {imp}
                    </div>
                    """,
                    unsafe_allow_html=True)
            
            st.markdown(
                "</div>",
                unsafe_allow_html=True
            )

# ==================
# HISTORY PAGE
# ==================
elif "History" in page:
    st.markdown("""
    <h2 style='color:#00ff88'>
    📁 Analysis History
    </h2>
    """, unsafe_allow_html=True)
    
    if st.button("🔄 Load History"):
        try:
            history = requests.get(
                "http://localhost:8000/history"
            ).json()
            
            if not history:
                st.info("No history yet!")
            
            for item in history:
                score = item.get('score', 0)
                if score >= 71:
                    color = "#00ff88"
                    status = "🟢 Good"
                elif score >= 41:
                    color = "#ffcc00"
                    status = "🟡 Average"
                else:
                    color = "#ff3b30"
                    status = "🔴 Poor"
                
                with st.expander(
                    f"{status} | Score: {score}/100 | {item.get('language','N/A')} | {item.get('timestamp','')}"
                ):
                    col1, col2 = st.columns(2)
                    with col1:
                        st.markdown(
                            "**✅ Intention:**"
                        )
                        st.write(
                            item.get('intention','')
                        )
                    with col2:
                        st.markdown(
                            "**❌ Gaps:**"
                        )
                        st.write(
                            item.get('gaps','')
                        )
                    
                    st.markdown(
                        "**📖 Explanation:**"
                    )
                    st.write(
                        item.get('explanation','')
                    )
                    
                    st.markdown(
                        "**Original Code:**"
                    )
                    st.code(
                        item.get('code',''),
                        language=item.get(
                            'language','python'
                        ).lower()
                    )
        except:
            st.error(
                "Could not load history. "
                "Make sure backend is running!"
            )

# ==================
# ABOUT PAGE
# ==================
elif "About" in page:
    st.markdown("""
    <div class='hero'>
        <h1>🔍 CodeLens AI</h1>
        <p>Your Code's Second Brain</p>
    </div>
    
    <div class='result-card'>
        <h3>What is CodeLens AI?</h3>
        <p>CodeLens AI is an intelligent
        code analyzer that goes beyond
        finding bugs. It understands the
        INTENTION behind your code and
        finds gaps between what you meant
        to write and what you actually wrote.
        </p>
    </div>
    
    <div class='result-card'>
        <h3>Key Features</h3>
        <p>
        ✅ Intent Extraction Engine<br>
        ❌ Bug vs Intent Gap Detection<br>
        💡 3 Alternative Implementations<br>
        📊 Code Health Score (0-100)<br>
        📖 Plain English Explanation<br>
        🚀 Improvement Suggestions
        </p>
    </div>
    
    <div class='result-card'>
        <h3>Tech Stack</h3>
        <p>
        🎨 Frontend: Streamlit<br>
        ⚙️ Backend: FastAPI<br>
        🗄️ Database: MongoDB Atlas<br>
        🤖 AI: Gemini 1.5 Pro API
        </p>
    </div>
    """, unsafe_allow_html=True)