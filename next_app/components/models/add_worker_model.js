export {
  new_worker, worker_model
};

const worker_model = {
  firstname: "",
  lastname: "",
  street_address: "",
  city: "",
  zip: "",
  state:"",
  phone: "",
  email: "",
  services:[]
};

function new_worker(data) {
  let new_worker = {};
  for (let prop in worker_model) {
    new_worker[prop] = data[prop];
  }
  return new_worker;
}
