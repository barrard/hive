// import * as meta_actions from "../actions/meta_actions.js";

const initial_state = {
  projects:[],
  selected_project:{}
}

export default (state = initial_state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":{
      return{
        ...state, projects:action.projects
      }
    }
    case "SET_SELECTED_PROJECT": {
      return { ...state, selected_project: action.project };
    }

    case 'SET_UPDATED_PROJECT': {
      let projects = [...state.projects]
      console.log({projects})
      const project_index = projects.findIndex((project)=> {
        console.log({project})
        return project._id == action.updated_project._id
      })
      console.log({project_index})
      console.log(action.updated_project)
      projects[project_index] = action.updated_project
      return {...state, projects}

    }

    default:
      return state;
  }
};
