import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = {
  authData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem(
        "userDataMemories",
        JSON.stringify({ ...action?.data })
      );
      return {
        ...state,
        authData: action?.data,
      };

    case LOGOUT:
      localStorage.setItem("userDataMemories", null);
      return {
        ...state,
        authData: null,
      };
    default:
      return state;
  }
};

export default reducer;
