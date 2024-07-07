// import React from "react";
import { useAuthActions } from "../context/actions/auth";
import Btn from "../components/Button";
import { useAuthContext } from "../context/providers/auth";

export default function Home() {
  const { logOut } = useAuthActions();
  const { state } = useAuthContext();
  console.log(state);
  return (
    <div>
      <Btn text="Logout" onClick={logOut} />
    </div>
  );
}
