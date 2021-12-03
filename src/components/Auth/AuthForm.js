import { useEffect, useState } from "react";
import useHttp from "../../customHooks/useHttp";
import useInputVal from "../../customHooks/useInputVal";
import classes from "./AuthForm.module.css";
import { userAuth } from "../../lib/api";

const AuthForm = () => {
  const { sendRequest, error, data, status, clearRequest } =
    useHttp(userAuth);
  const [isLogin, setIsLogin] = useState(true);
  const checkValidityEmail = (inputValue) => {
    return inputValue.includes("@");
  };
  const checkValidityPassword = (inputValue) => {
    return inputValue.trim() !== "" && inputValue.length > 5;
  };
  const {
    inputValue: emailValue,
    inputReset: emailReset,
    inputIsValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHanlder: emailBlurHandler,
    inputHasError: emailHasError,
  } = useInputVal(checkValidityEmail);
  const {
    inputValue: passwordValue,
    inputReset: passwordReset,
    inputIsValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHanlder: passwordBlurHandler,
    inputHasError: passwordHasError,
  } = useInputVal(checkValidityPassword);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    // console.log("not diabled");
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    if (isLogin) {
      console.log("sending request for Logging In!");
      sendRequest({
        data:{
          email: emailValue,
          password: passwordValue,
          // returnSecureToken: true,
        },
        type:"logIn",
      });
    } else {
      //sign up case
      console.log("sending request for sign up!!");
      sendRequest({
        data:{
          email: emailValue,
          password: passwordValue,
          // returnSecureToken: true,
        },
        type:"signIn",
      });
    }
    emailReset();
    passwordReset();
  };

  let showButton = <button>{isLogin ? "Login" : "Create Account"}</button>;
  let disabledButton = (
    <button disabled>{isLogin ? "Logging In.." : "Signing Up..."}</button>
  );

  useEffect(() => {
    if (error) {
      //show a modal or error
      console.log("error is>: ", error);
      alert(error);
      clearRequest();
    }
    if (status === "pending") {
      console.log("status is>: ", status);
    }
    if (status === "completed" && data) {
      console.log("data is: ", data);
      // if(isLogin){
      //   alert("successfully Logged In!");
      // }else{
      //   alert("successfully signed up!");
      // }
      // showButton = <button>{isLogin ? "Login" : "Create Account"}</button>;
      clearRequest();
    }
  }, [error, status, data]);
  
  const emailClasses = `${classes.control} ${
    emailHasError ? classes.invalid : ""
  }`;
  const passwordClasses = `${classes.control} ${
    passwordHasError ? classes.invalid : ""
  }`;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={emailClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={emailValue}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
          {emailHasError && (
            <p className="error-text">Please enter a valid Email!</p>
          )}
        </div>
        <div className={passwordClasses}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={passwordValue}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />
          {passwordHasError && (
            <p className="error-text">
              Please enter a valid Password! (min 6 character)
            </p>
          )}
        </div>
        <div className={classes.actions}>
          {status === "pending" ? disabledButton : showButton}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
