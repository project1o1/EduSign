import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <ClerkProvider publishableKey={clerkPubKey}>
  //   <SignedIn>
  //       {/* <App /> */}
  //       <h1>Hello</h1>
  //   </SignedIn>
  //   <SignedOut>
  //     <RedirectToSignIn />
  //   </SignedOut>
  // </ClerkProvider>
  <BrowserRouter>
  <App />
  </BrowserRouter>
);



