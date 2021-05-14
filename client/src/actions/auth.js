import { SIGN_UP, SIGN_IN, AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signUp = (formData, history) => {
  return async (dispatch) => {
    try {
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const signIn = (formData, history) => {
  return async (dispatch) => {
    try {
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
};
