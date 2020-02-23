// import * as meta_actions from "../actions/meta_actions.js";

const initial_state = {
  user: {},
  is_loggedin:false

};

export default (state = initial_state, action) => {
  switch (action.type) {
    case "SET_USER": {
      console.log('setting user loggedin')
      return { ...state, user:action.user, is_loggedin:true };
    }


    default:
      return state;
  }
};
