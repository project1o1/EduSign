import React, { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);
  return (
    <div>
      <h1>EduSign</h1>
      <div>
        <p>{username}</p>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
