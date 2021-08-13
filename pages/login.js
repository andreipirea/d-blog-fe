import Meta from "../components/Meta";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {login} from "../redux/actions/authActions";
import {useRouter} from "next/router";


const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = () => {
    dispatch(login(email, password));
    router.push('/');
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

export default loginPage;
