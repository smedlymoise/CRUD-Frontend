import React, { useState } from "react";
import NavBar from "./NavBar";

function isUnauthenicated() {
  const [user, setUser] = useState(null); //useState is the intal value because noone has login yet

  const navBar = { user }; //creates a box
  return;
  <nav>
    <ul>
      <li>
        <Link to="/">home</Link>
      </li>
    </ul>

    {!user && (
      <>
        <li>
          <link to="login">Login</link>
        </li>
        <li>
          <link to="signup">signup</link>
        </li>
      </>
    )}
    {user && (
      <>
        <li>
          <link to="create">create</link>
        </li>
        <li>
          <link to="logout">logout</link>
        </li>
      </>
    )}
  </nav>;
}
