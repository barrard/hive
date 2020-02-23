// import * as meta_actions from "../actions/meta_actions.js";

const initial_state = {
  proposals: [],
  selected_proposal: {},
  new_proposal: {
    address_same_as_worker: false,
    worker: "Select Worker",
    type: "Solar"
  }
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case "ADD_NEW_PROPOSAL": {
      let { proposals } = state;
      let new_proposals = [...proposals, action.new_proposal];

      return {
        ...state,
        proposals: new_proposals
      };
    }
    case "SET_ADDRESS_SAME_AS_WORKER": {
      let { flag, worker } = action;
      var { street_address, city, zip, email, phone } = worker;
      console.log({ flag, worker });
      if (flag) {
        console.log({ street_address, city, flag });
        return {
          ...state,
          new_proposal: {
            ...state.new_proposal,

            street_address,
            city,
            zip,
            state: worker.state,
            email,
            phone
          }
        };
      } else {
        console.log({ street_address, city, flag });

        return {
          ...state,
          new_proposal: {
            ...state.new_proposal,
            street_address: "",
            city: "",
            zip: "",
            state: "",
            email: "",
            phone: ""
          }
        };
      }
    }
    case "UPDATE_NEW_PROPOSAL": {
      let { key, val } = action;
      let { new_proposal } = state;
      new_proposal[key] = val;
      console.log({ key, val, new_proposal });

      return {
        ...state,
        new_proposal
      };
    }
    case "SET_PROPOSALS": {
      return {
        ...state,
        proposals: action.proposals
      };
    }
    case "SET_SELECTED_PROPOSAL": {
      return { ...state, selected_proposal: action.proposal };
    }

    case "SET_UPDATED_PROPOSAL": {
      let proposals = [...state.proposals];
      console.log({ proposals });
      const proposal_index = proposals.findIndex(proposal => {
        console.log({ proposal });
        return proposal._id == action.updated_proposal._id;
      });
      console.log({ proposal_index });
      console.log(action.updated_proposal);
      proposals[proposal_index] = action.updated_proposal;
      return { ...state, proposals };
    }

    default:
      return state;
  }
};
