import React, { useState } from "react";
import Menu from "./menu";
import Home from "./home";
import { useUser } from "../lib/hooks";
import Link from "next/link";

export default function IndexPage() {
  // let user = true;
  const user = useUser();
  // const user = useUser({ redirectTo: "/menu", redirectIfFound: true });
  // useUser({ redirectTo: '/', redirectIfFound: true });
  return <div className="App">{!user ? <Home /> : <Menu />}</div>;
}
