import React from "react";
import { useAuthActions } from "../context/actions/auth";
import Btn from "../components/Button";

export default function Home() {
  const { logOut } = useAuthActions();
  return (
    <div>
      <Btn text="Logout" onClick={logOut} />
    </div>
  );
}
