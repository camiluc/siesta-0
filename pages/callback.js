import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
// import { OAuthExtension } from '@magic-ext/oauth';
import Router, { useRouter } from "next/router";
// import Layout from '../components/layout';

const Callback = () => {
  const [magic, setMagic] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showValidatingToken, setShowValidatingToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    !magic &&
      setMagic(new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY));
    /* if `provider` is in our query params, the user is logging in with a social provider */
    magic && finishEmailRedirectLogin();
  }, [magic]);

  async function finishEmailRedirectLogin() {
    if (router.query.magic_credential) {
      try {
        let didToken = await magic.auth.loginWithCredential();
        setShowValidatingToken(true);
        await authenticateWithServer(didToken);
      } catch (error) {
        console.log(error);
        setErrorMsg("Error logging in. Please try again.");
      }
    }
  }

  async function authenticateWithServer(didToken) {
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken
      }
    });
    res.status === 200 && Router.push("/");
  }

  return (
    <>
      {errorMsg ? (
        <div className="error">{errorMsg}</div>
      ) : (
        <div className="callback-container">
          <div className="auth-step">Retrieving auth token...</div>
          {showValidatingToken && (
            <div className="auth-step">Validating token...</div>
          )}
        </div>
      )}

      <style jsx>{`
        .callback-container {
          width: 100%;
          text-align: center;
        }
        .auth-step {
          margin: 30px 0;
          font-size: 17px;
        }
        .error {
          color: red;
        }
      `}</style>
    </>
  );
};

export default Callback;
