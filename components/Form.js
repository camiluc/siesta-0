import { useState } from "react";
import { validateEmail } from "../lib/helpers";

const Form = ({ onEmailSubmit, disabled }) => {
  const [email, setEmail] = useState("");

  const addToast = () => {
    console.error({ message: "Invalid email" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !email || !validateEmail(email) ? addToast() : onEmailSubmit(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="block bg-blue-200" onClick={handleSubmit}>
          Send Magic Link
        </button>
      </form>
    </>
  );
};

export default Form;
