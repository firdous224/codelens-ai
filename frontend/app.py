import streamlit as st
import requests

API = "http://127.0.0.1:8000"

st.set_page_config(page_title="CodeLens AI", layout="wide")

if "user" not in st.session_state:
    st.session_state.user = None

# AUTH
if not st.session_state.user:

    st.title("🔐 CodeLens AI")

    tab1, tab2 = st.tabs(["Login", "Register"])

    with tab1:
        u = st.text_input("Username")
        p = st.text_input("Password", type="password")

        if st.button("Login"):
            res = requests.post(f"{API}/login", json={"username": u, "password": p}).json()

            if res["msg"] == "Success":
                st.session_state.user = u
                st.success("Logged in")
                st.rerun()
            else:
                st.error(res["msg"])

    with tab2:
        u = st.text_input("New Username")
        p = st.text_input("New Password", type="password")

        if st.button("Register"):
            res = requests.post(f"{API}/register", json={"username": u, "password": p}).json()
            st.success(res["msg"])

# MAIN APP
else:
    st.sidebar.title(st.session_state.user)
    page = st.sidebar.radio("Menu", ["Analyze", "History", "Logout"])

    if page == "Logout":
        st.session_state.user = None
        st.rerun()

    if page == "Analyze":
        code = st.text_area("Paste code here:")

        if st.button("Analyze"):
            res = requests.post(
                f"{API}/analyze",
                json={"username": st.session_state.user, "code": code}
            ).json()

            st.subheader("Intent")
            st.write(res["intent"])

            st.subheader("Bugs")
            st.write(res["bugs"])

            st.subheader("Suggestions")
            st.write(res["suggestions"])

            st.subheader("Score")
            st.progress(res["score"])

            st.subheader("Explanation")
            st.write(res["explanation"])

    if page == "History":
        res = requests.get(f"{API}/history/{st.session_state.user}").json()

        for item in res:
            st.code(item["code"][:200])
            st.write(item["result"])