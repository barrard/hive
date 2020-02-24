import React, { useState } from "react";
import styled from "styled-components";
import API from "../API.js";
import Loading_Button from "../small_components/Loading_button";

const Worker_Details_View = ({ worker, csrf, updatedWorker }) => {
  let [is_loading, set_is_loading] = useState(false);
  let [edit_mode, set_edit_mode] = useState(false);
  let [tmp_worker_data, set_tmp_worker_data] = useState({});
  if (!worker || !worker.firstname) return <p>Select a worker.</p>;

  console.log({ tmp_worker_data: tmp_worker_data.services });

  const Edit_Buttons = ({ worker, set_edit, edit_mode }) => {
    /* return save or cancel buttons */
    return (
      <Edit_Worker_Buttons_Container>
        {/* If in edit mode retuen SAVE and CANCEL buttons */}
        {edit_mode && (
          <>
            <Loading_Button
              onClick={async () => {
                set_is_loading(true);
                let worker = await API.save_worker(tmp_worker_data, csrf);
                setTimeout(() => {
                  updatedWorker(worker);
                  set_edit(!edit_mode);
                  set_is_loading(false);
                }, 500);
              }}
              is_loading={is_loading}
              className="btn btn-success btn-block"
              name="Save"
              type="submit"
              text="Save"
            >
              Save
            </Loading_Button>
            <button
              onClick={() => set_edit(!edit_mode)}
              type="button"
              className="btn btn-danger"
            >
              Cancel
            </button>
          </>
        )}
        {/* If in edit mode retuen SAVE and CANCEL buttons */}
        {!edit_mode && (
          <>
            <button
              onClick={() => {
                set_edit(!edit_mode);
                set_tmp_worker_data(worker);
              }}
              type="button"
              className="btn btn-info"
            >
              Edit
            </button>
          </>
        )}
      </Edit_Worker_Buttons_Container>
    );
  };

  const edit_tmp_worker = (value, property) => {
    console.log({ value, property });
    set_tmp_worker_data({ ...tmp_worker_data, [property]: value });
  };

  return (
    <>
      <StyledHeading>{"Worker Details"}</StyledHeading>
      <View_Container>
        <Edit_Buttons
          worker={worker}
          set_edit={set_edit_mode}
          edit_mode={edit_mode}
        />
        <Worker_Name
          edit_tmp_worker={edit_tmp_worker}
          mode={edit_mode}
          worker={worker}
          tmp_worker_data={tmp_worker_data}
        />
        <Worker_Address
          edit_tmp_worker={edit_tmp_worker}
          mode={edit_mode}
          worker={worker}
          tmp_worker_data={tmp_worker_data}
        />
        <Worker_Contact
          edit_tmp_worker={edit_tmp_worker}
          mode={edit_mode}
          worker={worker}
          tmp_worker_data={tmp_worker_data}
        />
        <Worker_Services
          edit_tmp_worker={edit_tmp_worker}
          mode={edit_mode}
          worker={worker}
          tmp_worker_data={tmp_worker_data}
        />
      </View_Container>
    </>
  );
};

export default Worker_Details_View;

/* Components */
const TextArea = ({ name, value, handle_input, required, hint }) => (
  <>
    <textarea
      onChange={event => handle_input(event.target.value.split(","), name)}
      value={value}
      className="form-control"
      required={required}
    />
    {hint && <HintSpan>{hint}</HintSpan>}
  </>
);

const HintSpan = styled.span`
  font-size: 12px;
`;

const Worker_Services = ({
  worker,
  mode,
  edit_tmp_worker,
  tmp_worker_data
}) => {
  if (mode) {
    return (
      <div className="col-6">
        <span>Services</span>
        <TextArea
          handle_input={edit_tmp_worker}
          name="services"
          value={tmp_worker_data.services.join(",")}
          hint="Comma, seperated, list, of, services"
        />
      </div>
    );
  } else {
    return (
      <div className="col-6">
        <span>Services</span>
        {worker.services.map(service => (
          <div key={service}>{service}</div>
        ))}
      </div>
    );
  }
};

const Worker_Contact = ({ worker, mode, edit_tmp_worker, tmp_worker_data }) => {
  if (mode) {
    return (
      <div className="col-6">
        <Input
          handle_input={edit_tmp_worker}
          type="email"
          name="email"
          value={tmp_worker_data.email}
        />
        <Input
          handle_input={edit_tmp_worker}
          type="number"
          name="phone"
          value={tmp_worker_data.phone}
        />
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-sm-12">
        <h5>Contact</h5>
        <p>{worker.email}</p>
        <p>{worker.phone}</p>
      </div>
    </div>
  );
};

const Worker_Name = ({ worker, mode, edit_tmp_worker, tmp_worker_data }) => {
  if (mode) {
    return (
      <div className="col-6">
        <Input
          handle_input={edit_tmp_worker}
          type="text"
          name="firstname"
          value={tmp_worker_data.firstname}
        />
        <Input
          handle_input={edit_tmp_worker}
          type="text"
          name="lastname"
          value={tmp_worker_data.lastname}
        />
      </div>
    );
  }
  return (
    <p>
      {worker.firstname} {worker.lastname}
    </p>
  );
};

const Worker_Address = ({ worker, mode, edit_tmp_worker, tmp_worker_data }) => {
  if (mode) {
    return (
      <div className="col-6">
        {/* street */}
        <Input
          handle_input={edit_tmp_worker}
          type="text"
          name="street_address"
          value={tmp_worker_data.street_address}
        />
        {/* city */}
        <Input
          handle_input={edit_tmp_worker}
          type="text"
          name="city"
          value={tmp_worker_data.city}
        />
        {/* zip */}
        <Input
          handle_input={edit_tmp_worker}
          type="text"
          name="zip"
          value={tmp_worker_data.zip}
        />
      </div>
    );
  }
  return (
    <>
      <h5>Address</h5>
      <p>{worker.street_address}</p>
      <p>{worker.city}</p>
      <p>{worker.state}</p>
      <p>{worker.zip}</p>
    </>
  );
};

const Input = ({ name, type, value, handle_input, required }) => {
  let label = name.replace("_", " ");
  label = name
    .split(" ")
    .map(word => {
      const first_letter = word.split("")[0].toUpperCase();
      return `${first_letter}${word
        .split("")
        .slice(1)
        .join("")}`;
    })
    .join(" ");
  return (
    <>
      <span>{label}</span>
      <input
        onChange={event => handle_input(event.target.value, name)}
        type={type}
        value={value}
        className="form-control"
        required={required}
      />
    </>
  );
};

const StyledHeading = styled.h3`
  display: flex;
  justify-content: center;
  /* padding-bottom: 2em; */
`;

const View_Container = styled.div`
  padding: 1em;
  width: 100%;
  border: 1px solid black;
  min-height: 40vh;
  overflow-y: auto;
  position: relative;
`;
const Edit_Worker_Buttons_Container = styled.div`
  position: absolute;
  right: 1em;
  display: flex;
`;

// const StyledWaveDirectionIcon = styled.i`
//   -webkit-text-stroke-color: black;
//   background: ${props => props.color_ft};
//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-size: ${props => props.size_period + "px"};
// `;
// const StyledWindIcon = styled.i`
//   font-weight: 900;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   /* padding: 3px; */
//   -webkit-text-stroke-width: 1px;
//   -webkit-text-stroke-color: black;
//   background: linear-gradient(
//     ${props => `${props.color_spd}, ${props.color_gst}`}
//   );
//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;
//   font-size: ${props => props.size + "px"};
// `;

// const StyledI = styled.i`
//   font-size: ${props => props.size_period + "px"};
//   /* padding: 3px; */
//   -webkit-text-stroke-width: 1px;
//   -webkit-text-stroke-color: black;
//   background: linear-gradient(
//     ${props => `${(props.color[0], props.color[1] || props.color[0])}`}
//   );
//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;
