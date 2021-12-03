import {useReducer} from 'react';
import { act } from 'react-dom/test-utils';

const initialInputState = {
    value:'',
    isTouched:false,
}
const inputReducer=(state,action)=>{
    if(action.type==="INPUT"){
        return{
            value:action.value,
            isTouched:state.isTouched,
        }
    }
    if(action.type==="BLUR"){
        return{
            value:state.value,
            isTouched:true,
        }
    }
    if(action.type==="RESET"){
        return {
            value:'',
            isTouched:false,
        }
    }
    return initialInputState;
}
const useInputVal=(checkValidity)=>{

    const [inputState,dispatchState]=useReducer(inputReducer,initialInputState);

    const inputIsValid = checkValidity(inputState.value);
    const inputHasError = inputState.isTouched && !inputIsValid;

    const inputChangeHandler=(event)=>{
        dispatchState({
            type:"INPUT",
            value:event.target.value,
        })
    }
    const inputBlurHanlder=()=>{
        dispatchState({
            type:"BLUR",
        })
    }
    const inputReset=()=>{
        dispatchState({
            type:"RESET",
        })
    }
    return{
        inputValue:inputState.value,
        inputReset,
        inputIsValid,
        inputChangeHandler,
        inputBlurHanlder,
        inputHasError,
    }
}
export default useInputVal;