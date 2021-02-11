import { useState, useEffect } from "react";
import Router from "next/router";
import { Magic } from "magic-sdk";
import { useUser } from "../lib/hooks";
// import Layout from "../components/layout";
import Form from "../components/Form";

const Home = () => {
  useUser({ redirectTo: "/menu", redirectIfFound: true });
  const [magic, setMagic] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    !magic &&
      setMagic(new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY));
    magic?.preload();
  }, [magic]);

  async function handleLoginWithEmail(email) {
    try {
      setHide(true);
      setDisabled(true); // disable login button to prevent multiple emails from being triggered
      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: `${process.env.NEXT_PUBLIC_SERVER_URL}/callback`
      });
      authenticateWithServer(didToken);
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  async function authenticateWithServer(didToken) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken
      }
    });
    // res.status === 200 && Router.push("/menu");
    res.status === 200 && Router.replace("/menu");
  }

  return (
    <div>{!hide ? <Form onEmailSubmit={handleLoginWithEmail} /> : ""}</div>
  );
};

export default Home;
