import React, { useImperativeHandle, useRef } from "react";
import styles from "../../css/Input.module.css";
// import useInputVal from "../customHooks/useInputVal";
const Input = React.forwardRef((props, ref) => {
  // useImperativeHandle(ref, () => {});
//   const {
//     inputValue,
//     inputReset,
//     inputIsValid,
//     inputChangeHandler,
//     inputBlurHanlder,
//     inputHasError,
//   } = useInputVal(props.checkValidity);

  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
