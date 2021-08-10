import Meta from "../components/Meta";
import { useState } from "react";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    
    try {
      const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await response.json();
      console.log("login data", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Meta title="Creeaza-ti cont" />
      <h1>Logheaza-te</h1>
      <form>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Parola
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <a onClick={handleSubmit}>Logheaza-te</a>
      </form>
    </div>
  );
};

export default signup;
