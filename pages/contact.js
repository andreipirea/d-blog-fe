import Meta from "../components/Meta";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import formStyles from "../styles/FormPages.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Alert from '@mui/material/Alert';
import { getUser } from '../redux/actions/authActions';


const contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      dispatch(getUser());
    }
  }, []);

  const handleSubmit = async () => {

    if (!name || !email || !message) {
      setShowAlert(true);
      setAlertType("warning");
      setAlertMessage("Toate campurile trebuiesc completate!");
      return;
    }
    let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidation.test(email)) {
      setShowAlert(true);
      setAlertType("warning");
      setAlertMessage("Trebuie sa pui o adresa de email validă!");
      return;
    }
    

    const response = await fetch(`${process.env.API_URL}/contact`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    });

    const data = await response.json();

    setName("");
    setEmail("");
    setMessage("");

    if (data.message == "success") {
      setShowAlert(true);
      setAlertType("success");
      setAlertMessage("Mesajul tău a fost trimis cu succes!");
    }
    if (data.message == "error") {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage("A apărut o eroare! Mesajul nu a fost trimis. Te rugăm sa încerci puțin mai târziu.");
    }

    // setTimeout(() => {
    //   setShowAlert(false);
    // }, 5000);

    // router.push("/");


  };
  return (
    <div className={formStyles.formContainer}>
      <Meta title="Creeaza-ti cont" />
      <h1 className={formStyles.formTitle}>Contactează-ne!</h1>
      <Alert className={`${formStyles.alert} ${showAlert ? formStyles.showAlert : ""}`} variant="filled" severity={alertType}>
        {alertMessage}
      </Alert>
      <Box
        className={formStyles.form}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "400px", maxWidth: "90vw", margin: "0" }
        }}
        // sx={{
        //   width: 300,
        //   maxWidth: '70%',
        // }}
        noValidate
        autoComplete="off"
      >

        <TextField
          id="outlined-basic"
          label="Nume"
          variant="filled"
          color="success"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="E-mail"
          variant="filled"
          color="success"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField
          id="filled-multiline-flexible"
          label="Lasa mesajul tău aici"
          multiline
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="filled"
        />
        <a className={formStyles.submitButton} onClick={handleSubmit}>Trimite</a>
      </Box>
      {/* </form> */}
    </div>
  );
};

export default contact;
