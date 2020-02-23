




export function set_workers (workers){
  console.log('set_workers')
  return dispatch =>{
    dispatch({
      type:"SET_WORKERS",
      workers
    })
  }
}

export function set_updated_worker (updated_worker){
  console.log('set_updated_worker')
  return dispatch =>{
    dispatch({
      type:"SET_UPDATED_WORKER",
      updated_worker
    })
  }
}




export function set_selected_worker (worker){
  console.log('set_selected_worker')
  console.log({worker})
  return dispatch =>{
    dispatch({
      type:'SET_SELECTED_WORKER',
      worker

    })
  }
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
