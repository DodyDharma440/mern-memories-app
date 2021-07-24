import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPage: 1,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage,
      };

    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };

    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
