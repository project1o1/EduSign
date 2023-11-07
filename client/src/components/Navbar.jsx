import React, { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "80px",
      }}
    >
      <div
      style={{
        backgroundColor: "#F8F9FA",
        color: "#212529",
        fontFamily: "Arial, sans-serif",
        height: "80px",
        padding: "0 2rem 0 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 2,
      }}
        >
        <h1 style={{ fontSize: "2rem", cursor:"pointer" }} onClick={()=>{navigate('/')}}>EduSign</h1>
        <div style={{ display: "flex", alignItems: "center" , paddingRight:"2rem" }}>
          {/* <p style={{ paddingRight: "1rem" }}>Profile</p> */}
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
