export { new_proposal, proposal_model };

const proposal_model = {
  /* should come from the worker unless different */
  worker: "",
  street_address: "",
  city: "",
  zip: "",
  state: "",
  phone: "",
  email: "",
  /* should come from the worker unless different */
  type: "", //solar
  panel_model: "",
  panel_count: "",
  battery: "",
  total_kw: "",
  inverter_model: "",
  inverter_count: "",
  price: ""
};

function new_proposal(data) {
  let new_proposal = {};
  console.log({ data });
  for (let prop in proposal_model) {
    new_proposal[prop] = data[prop];
  }
  return new_proposal;
}
