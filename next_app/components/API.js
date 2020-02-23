import { toastr } from "react-redux-toastr";
import fetch from "isomorphic-fetch";

import { is_loading } from "../redux/actions/meta_actions.js";

import {
  new_worker,
  worker_model
} from "../components/models/add_worker_model.js";
import {
  new_project,
  project_model
} from "../components/models/add_project_model.js";
import {
  new_proposal,
  proposal_model
} from "../components/models/add_proposal_model.js";

const API_SERVER = process.env.API_SERVER;

export default {
  add_worker,
  get_worker,
  get_workers,
  save_worker,
  save_proposal,
  add_proposal,
  get_proposal,
  get_proposals
};

async function add_proposal(data, props) {
  let { meta, dispatch } = props;
  let resp;

  try {
    const _csrf = meta.csrf;
    const proposal = new_proposal(data);
    // event.preventDefault();
    dispatch(is_loading(true));
    resp = await fetch("/proposal", POST({ ...proposal, _csrf }));
    resp = await resp.json();

    if (resp.err) throw resp.msg;
    dispatch(is_loading(false));

    toastr.success(`New Proposal Added`);
    return resp;
  } catch (err) {
    dispatch(is_loading(false));

    return handle_error(err, resp);
  }
}

async function save_proposal(proposal, csrf) {
  let _csrf = csrf;
  const post_data = { ...proposal, _csrf };
  try {
    console.log({ post_data });
    let resp = await fetch(`/proposal/${proposal._id}`, PUT(post_data));
    let json = await resp.json();
    return json;
  } catch (err) {
    return handle_error(err);
  }
}

async function save_worker(worker, csrf) {
  let _csrf = csrf;
  const post_data = { ...worker, _csrf };
  try {
    console.log({ post_data });
    let resp = await fetch(`/worker/${worker._id}`, PUT(post_data));
    let json = await resp.json();
    return json;
  } catch (err) {
    return handle_error(err);
  }
}

async function get_workers(ctx) {
  let http = await getWithCreds(`${API_SERVER}/worker/workers`, ctx);
  http = await http.json();

  return http;
}

async function get_worker(ctx, worker_id) {
  let http = await getWithCreds(`${API_SERVER}/worker/${worker_id}`, ctx);
  http = await http.json();

  return http;
}

async function get_proposals(ctx) {
  let http = await getWithCreds(`${API_SERVER}/proposal/proposals`, ctx);
  http = await http.json();

  return http;
}

async function get_proposal(ctx, proposal_id) {
  console.log({ proposal_id });
  let http = await getWithCreds(`${API_SERVER}/proposal/${proposal_id}`, ctx);
  return http;
}

async function add_worker(data, props) {
  let { meta, dispatch } = props;
  let resp;

  try {
    const _csrf = meta.csrf;
    const worker = new_worker(data);
    // event.preventDefault();
    dispatch(is_loading(true));
    resp = await fetch("/worker/add_worker", POST({ ...worker, _csrf }));
    resp = await resp.json();

    if (resp.err) throw resp.msg;
    dispatch(is_loading(false));

    toastr.success(`New Worker Added`, `${resp.firstname} ${resp.lastname} `);
    return resp;
  } catch (err) {
    dispatch(is_loading(false));

    return handle_error(err, resp);
  }
}

/* Helper methods */

const handle_error = (err, resp) => {
  console.log("err");
  console.log(err);
  if (resp) toastr.error("Error Message", `${resp.msg}`);

  return resp;
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

async function getWithCreds(url, ctx) {
  let http = await fetch(
    url,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie
          }
        }
      : {}
  );
  // http = await http.json();
  return http;
}
