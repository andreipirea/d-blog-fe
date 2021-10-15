import Meta from "../components/Meta";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearErrorMessage } from "../redux/actions/authActions";
import { ContactsOutlined } from "@material-ui/icons";
import formStyles from "../styles/FormPages.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import Alert from '@mui/material/Alert';



const signupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.authReducer);
  const router = useRouter();


  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });
  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (userState.message !== null && userState.isAuthenticated == false) {
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage(userState.message);
      return;
    } 
    if (userState.message === null && userState.isAuthenticated == true) {
      router.push('/');
    }
    
  }, [userState]);

  useEffect(() => {
    return () => {
      dispatch(clearErrorMessage());
    };
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setShowAlert(true);
      setAlertType("warning");
      setAlertMessage("Toate câmpurile trebuiesc completate!");
      return;
    }
    if (password !== confirmPassword) {
      setShowAlert(true);
      setAlertType("warning");
      setAlertMessage("Parola diferă!");
      return;
    }
    let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidation.test(email)) {
      setShowAlert(true);
      setAlertType("warning");
      setAlertMessage("Trebuie sa pui o adresa de email validă!");
      return;
    }


    dispatch(signup(name, email, password));
    console.log("user state", userState);
  };

  

  return (
    <div className={formStyles.formContainer}>
      <Meta title="Creeaza-ti cont" />
      <h1 className={formStyles.formTitle}>Creeaza-ti cont</h1>
      <Alert className={`${formStyles.alert} ${showAlert ? formStyles.showAlert : ""}`} variant="filled" severity={alertType}>
        {alertMessage}
      </Alert>
      <Box
        className={formStyles.form}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" }
        }}
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
        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password" color="success">
            Parola
          </InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="success"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Parola"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password" color="success">
            Confirma parola
          </InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            color="success"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Parola"
          />
        </FormControl>
        <a className={formStyles.submitButton} onClick={handleSubmit}>Trimite</a>
      </Box>
      {/* </form> */}
    </div>
  );
};

export default signupPage;
