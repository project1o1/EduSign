import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import LearnPage from "./pages/LearnPage";
import LearnHome from "./pages/LearnHome";
import TestHome from "./pages/TestHome";
import TestPage from "./pages/TestPage";
import Learn from "./pages/Learn";
import Working from "./pages/Working";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import variables from "../config/index";
import "./App.css";
import LoadingScreen from "./pages/Loading";

const clerkPubKey = "pk_test_bHVja3ktaGVuLTc0LmNsZXJrLmFjY291bnRzLmRldiQ";

function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ display: "flex", flexGrow: 1 }}>
          <Sidebar />
          <div style={{ flexGrow: 1 }}>
            <SignedIn>
              <div style={{ padding: "2rem" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Add other routes here */}
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/learn/:type" element={<LearnHome />} />
                  <Route path="/learn/:type/:id" element={<LearnPage />} />
                  <Route path="/test" element={<TestHome />} />
                  <Route path="/test/:type" element={<TestPage />} />
                  <Route path="/working" element={<Working />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/load" element={<LoadingScreen />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}

export default App;
