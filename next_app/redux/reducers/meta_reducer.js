// import * as meta_actions from "../actions/meta_actions.js";

const initial_state = {
  csrf:'', is_loading:false
}

export default (state = initial_state, action) => {
  switch (action.type) {
    case "IS_LOADING":{
      return{
        ...state, is_loading:action.is_loading
      }
    }
    case "SET_CSRF": {
      return { ...state, csrf: action.csrf };
    }

    case 'GET_CSRF': {
      const { csrf } = state;
      return { csrf };
    }

    default:
      return state;
  }
};
