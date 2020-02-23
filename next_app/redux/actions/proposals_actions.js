export function add_new_proposal(new_proposal) {
  console.log("SET_ADDRESS_SAME_AS_PROPOSAL");
  return {
    type: "ADD_NEW_PROPOSAL",
    new_proposal
  };
}

export function set_address_same_as_worker(flag, worker) {
  console.log("SET_ADDRESS_SAME_AS_WORKER");
  return {
    type: "SET_ADDRESS_SAME_AS_WORKER",
    flag,
    worker
  };
}

export function update_new_proposal(key, val) {
  console.log("UPDATE_NEW_PROPOSAL");
  return {
    type: "UPDATE_NEW_PROPOSAL",
    key,
    val
  };
}

export function set_proposals(proposals) {
  console.log("set_proposals");
  return dispatch => {
    dispatch({
      type: "SET_PROPOSALS",
      proposals
    });
  };
}

export function set_updated_proposal(updated_proposal) {
  console.log("set_updated_proposal");
  return dispatch => {
    dispatch({
      type: "SET_UPDATED_PROPOSAL",
      updated_proposal
    });
  };
}

export function set_selected_proposal(proposal) {
  return dispatch => {
    dispatch({
      type: "SET_SELECTED_PROPOSAL",
      proposal
    });
  };
}

// export function register_success (payload) {
//   return {
//     type: REGISTER_ATTEMPT_SUCCESS,
//     payload
//   }
// }

// export function login_attempt (user){
//   const {email, password} = user;
//   return dispatch =>{
//     dispatch({
//       type:LOGIN_ATTEMPT,
//       username:email,
//       password

//     })
//   }
// }

// export function login_success (payload) {
//   return {
//     type: 'SET_USER',
//     user:payload
//   }
// }
