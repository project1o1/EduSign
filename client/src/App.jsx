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
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import variables from "../config/index";

const clerkPubKey = variables.REACT_APP_CLERK_PUBLISHABLE_KEY;
console.log(clerkPubKey);

function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <SignedIn>
        <Routes>
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:type" element={<LearnHome />} />
          <Route path="/learn/:type/:id" element={<LearnPage />} />
          <Route path="/test" element={<TestHome />} />
          <Route path="/test/:type" element={<TestPage />} />
          <Route path="/working" element={<Working />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
