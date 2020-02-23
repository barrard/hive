




export function set_projects (projects){
  console.log('set_projects')
  return dispatch =>{
    dispatch({
      type:"SET_PROJECTS",
      projects
    })
  }
}

export function set_updated_project (updated_project){
  console.log('set_updated_project')
  return dispatch =>{
    dispatch({
      type:"SET_UPDATED_PROJECT",
      updated_project
    })
  }
}




export function set_selected_project (project){
  return dispatch =>{
    dispatch({
      type:'SET_SELECTED_PROJECT',
      project

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
