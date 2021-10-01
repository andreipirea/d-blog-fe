import Meta from "../components/Meta";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {login} from "../redux/actions/authActions";
import {useRouter} from "next/router";
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



const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
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

  const handleSubmit = () => {
    dispatch(login(email, password));
    router.push('/');
  };

  return (
    <div className={formStyles.formContainer}>
      <Meta title="Autentificare" />
      <h1 className={formStyles.formTitle}>Autentificare</h1>
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
          <a className={formStyles.submitButton} onClick={handleSubmit}>Autentificare</a>
        </Box>
      {/* </form> */}
    </div>
    // <div>
    //   <Meta title="Creeaza-ti cont" />
    //   <h1>Autentifica-te</h1>
    //   <form>
    //     <label>
    //       E-mail
    //       <input
    //         type="email"
    //         name="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </label>
    //     <label>
    //       Parola
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </label>
    //     <a onClick={handleSubmit}>Logheaza-te</a>
    //   </form>
    // </div>
  );
};

export default loginPage;
