// import * as meta_actions from "../actions/meta_actions.js";

const initial_state = {
  workers:[],
  selected_worker:{}
}

export default (state = initial_state, action) => {
  switch (action.type) {
    case "SET_WORKERS":{
      return{
        ...state, workers:action.workers
      }
    }
    case "SET_SELECTED_WORKER": {
      return { ...state, selected_worker: action.worker };
    }

    case 'SET_UPDATED_WORKER': {
      let workers = [...state.workers]
      console.log({workers})
      const worker_index = workers.findIndex((worker)=> {
        console.log({worker})
        return worker._id == action.updated_worker._id
      })
      console.log({worker_index})
      console.log(action.updated_worker)
      workers[worker_index] = action.updated_worker
      return {...state, workers}

    }

    default:
      return state;
  }
};
