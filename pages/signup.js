import Meta from "../components/Meta";
import { useState } from "react";

const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      console.log("nu ai pus aceeasi parola");
      console.log("pass", password);
      console.log("conf pass", confirmPassword);
      return;
    }
    try {
      const response = await fetch(`${process.env.API_URL}/auth/signup`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });
      const data = await response.json();
      console.log("signup data", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Meta title="Creeaza-ti cont" />
      <h1>Creeaza-ti cont</h1>
      <form>
        <label>
          Nume
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <label>
          Confirma Parola
          <input
            type="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <a onClick={handleSubmit}>Inscrie-te</a>
      </form>
    </div>
  );
};

export default signup;
