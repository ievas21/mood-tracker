// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import JournalPage from "./pages/JournalPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserEntryPage from "./pages/UserEntryPage";
import LogoutPage from "./pages/LogoutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Navbar />
        <Content>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/user_entry" element={<UserEntryPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/user-entry" element={<UserEntryPage />} />
            </Routes>
          </Router>
        </Content>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
