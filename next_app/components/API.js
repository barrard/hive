import { toastr } from "react-redux-toastr";
import fetch from "isomorphic-fetch";

// import { is_loading } from "../redux/actions/meta_actions.js";

// import {
//   new_worker,
//   worker_model
// } from "../components/models/add_worker_model.js";
// import {
//   new_project,
//   project_model
// } from "../components/models/add_project_model.js";
// import {
//   new_proposal,
//   proposal_model
// } from "../components/models/add_proposal_model.js";

const API_SERVER = process.env.API_SERVER;

export default {
  add_worker,
  get_worker,
  get_workers,

};

async function add_worker(worker, _csrf) {
  let resp;
console.log('add worker')

  try {
    // const proposal = new_proposal(data);
    // event.preventDefault();
    // dispatch(is_loading(true));
    resp = await fetch("/hive/worker", POST({ ...worker, _csrf }));
    resp = await resp.json();
    console.log({resp})

    if (resp.err) throw resp.err.msg;
    // dispatch(is_loading(false));

    toastr.success(`New Worker Added`);
    return resp;
  } catch (err) {
    // dispatch(is_loading(false));
    console.log(err)
    return handle_error(err);
  }
}



async function get_workers(ctx) {
  let http = await fetch(
    `${API_SERVER}/hive/allworkers`,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie
          }
        }
      : {}
  );
  http = await http.json();
  return http;
}

async function get_worker(ctx, worker_id) {
  let http = await fetch(
    `${API_SERVER}/hive/worker/${worker_id}`,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie
          }
        }
      : {}
  );
  http = await http.json();

  return http;
}

async function get_proposals(ctx) {
  let http = await fetch(
    `${API_SERVER}/proposal/proposals`,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie
          }
        }
      : {}
  );
  http = await http.json();

  return http;
}

async function get_proposal(ctx, proposal_id) {
  console.log({ proposal_id });
  let http = await fetch(
    `${API_SERVER}/proposal/${proposal_id}`,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie
          }
        }
      : {}
  );
  http = await http.json();

  return http;
}


/* Helper methods */

const handle_error = (err) => {
  console.log("err");
  console.log(err);
  toastr.error("Error Message", `${err}`);

  return err;
};
const POST = data => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};

const PUT = data => {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};
