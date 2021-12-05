import classes from "./ProfileForm.module.css";
import useInputVal from "../../customHooks/useInputVal";
import { resetPassword } from "../../lib/api";
import useHttp from "../../customHooks/useHttp";
import { useContext } from "react/cjs/react.development";
import AuthContext from "../../store/auth-context";
import { useEffect } from "react";
import { useHistory } from "react-router";
const ProfileForm = () => {
  const history=useHistory();
  const authCtx = useContext(AuthContext);
  const { sendRequest, error, data, status, clearRequest } =
    useHttp(resetPassword);
  const checkValidityPassword = (inputValue) => {
    return inputValue.trim() !== "" && inputValue.length > 5;
  };
  const {
    inputValue: passwordValue,
    inputReset: passwordReset,
    inputIsValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHanlder: passwordBlurHandler,
    inputHasError: passwordHasError,
  } = useInputVal(checkValidityPassword);

  //if password is valid then  only show button for reset password
  const resetSubmitHandler = (event) => {
    event.preventDefault();
    if (!passwordIsValid) {
      return;
    }
    console.log("sending request for Resetting password!");
    sendRequest({
      data: {
        idToken:authCtx.token,
        password:passwordValue,
        returnSecureToken:false,
      },
      type: "resetPassword",
    });
    passwordReset();
  };
  useEffect(()=>{
    if(error){
      console.log(error);
    }
    if(status==="pending"){
      console.log("pending reset password!, request sent!");
    }
    if(status==="completed"){
      //password reset done.
      console.log("reset done!");
      localStorage.removeItem('token');
      authCtx.logout();
      history.replace('/auth');
    }
  },[data,error,status]);
  let showButton = <button>change Password</button>;
  let disabledButton = <button disabled>Loading...</button>;
  const passwordClasses = `${classes.control} ${
    passwordHasError ? classes.invalid : ""
  }`;
  return (
    <form className={classes.form} onSubmit={resetSubmitHandler}>
      <div className={passwordClasses}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
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
      <div className={classes.action}>
        {status === "pending" ? disabledButton : showButton}
      </div>
    </form>
  );
};

export default ProfileForm;
