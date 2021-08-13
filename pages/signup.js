import Meta from "../components/Meta";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../redux/actions/authActions";
import { ContactsOutlined } from "@material-ui/icons";

const signupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userState = useSelector(state => state.authReducer);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      console.log("nu ai pus aceeasi parola");
      console.log("pass", password);
      console.log("conf pass", confirmPassword);
      alert("Parola difera!");
      return;
    }
    dispatch(signup(name, email, password));
  };
  console.log("user state", userState);
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

export default signupPage;
