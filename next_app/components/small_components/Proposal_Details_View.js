import React, { useState } from "react";
import styled from "styled-components";
import API from "../API.js";
import Loading_Button from "../small_components/Loading_button";

const Proposal_Details_View = ({
  proposal,
  csrf,
  updatedProposal,
  worker,
  workers,
  materials
}) => {
  let [is_loading, set_is_loading] = useState(false);
  let [edit_mode, set_edit_mode] = useState(false);
  let [tmp_proposal_data, set_tmp_proposal_data] = useState({});
  if (!proposal || !proposal._id) return <p>Select a proposal.</p>;

  const Edit_Buttons = ({ proposal, set_edit, edit_mode }) => {
    /* return save or cancel buttons */
    return (
      <Edit_Proposal_Buttons_Container>
        {/* If in edit mode retuen SAVE and CANCEL buttons */}
        {edit_mode && (
          <>
            <Loading_Button
              onClick={async () => {
                set_is_loading(true);
                let proposal = await API.save_proposal(tmp_proposal_data, csrf);
                setTimeout(() => {
                  updatedProposal(proposal);
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
                set_tmp_proposal_data(proposal);
              }}
              type="button"
              className="btn btn-info"
            >
              Edit
            </button>
          </>
        )}
      </Edit_Proposal_Buttons_Container>
    );
  };

  const edit_tmp_proposal = (value, property) => {
    console.log({ value, property });
    set_tmp_proposal_data({ ...tmp_proposal_data, [property]: value });
  };

  return (
    <>
      <StyledHeading>{"Proposal Details"}</StyledHeading>
      <View_Container>
        <Edit_Buttons
          proposal={proposal}
          set_edit={set_edit_mode}
          edit_mode={edit_mode}
        />
        <Proposal_Worker
          workers={workers}
          edit_tmp_proposal={edit_tmp_proposal}
          mode={edit_mode}
          worker={worker}
          tmp_proposal_data={tmp_proposal_data}
        />
        <Proposal_Address
          edit_tmp_proposal={edit_tmp_proposal}
          mode={edit_mode}
          proposal={proposal}
          tmp_proposal_data={tmp_proposal_data}
        />
        <Proposal_Contact
          edit_tmp_proposal={edit_tmp_proposal}
          mode={edit_mode}
          proposal={proposal}
          tmp_proposal_data={tmp_proposal_data}
        />
        <Proposal_Materials
          materials={materials}
          edit_tmp_proposal={edit_tmp_proposal}
          mode={edit_mode}
          proposal={proposal}
          tmp_proposal_data={tmp_proposal_data}
        />
        <Proposal_Price
          edit_tmp_proposal={edit_tmp_proposal}
          mode={edit_mode}
          proposal={proposal}
          tmp_proposal_data={tmp_proposal_data}
        />
      </View_Container>
    </>
  );
};

export default Proposal_Details_View;

/* Components */

const Proposal_Materials = ({
  proposal,
  mode,
  edit_tmp_proposal,
  tmp_proposal_data,
  materials
}) => {
  const get_panel = id =>
    materials.solar_panels.filter(panel => panel._id == id);

  const get_battery = id =>
    materials.batterys.filter(battery => battery._id == id);

  const get_inverter = id =>
    materials.inverters.filter(inverter => inverter._id == id);
  if (mode) {
    return (
      /* SOLAR PANEL MODEL */
      <div className="col-6">
        <span>Panel Model</span>

        <select
          onChange={e => {
            edit_tmp_proposal(e.target.value, "panel_model");
          }}
          className="form-control"
          name=""
          id=""
          value={tmp_proposal_data.panel_model}
        >
          {materials.solar_panels.map(solar_panel => {
            return (
              <option key={solar_panel._id} value={solar_panel._id}>
                {solar_panel.manufacturer} {solar_panel.model} -{" "}
                {solar_panel.watt}
                {"w"}
              </option>
            );
          })}{" "}
        </select>
        {/* SOLAR PANEL COUNT */}
        <Input
          handle_input={edit_tmp_proposal}
          type="number"
          name="panel_count"
          value={tmp_proposal_data.panel_count}
        />

        {/* INVERTER */}
        <span>Inverter Model</span>

        <select
          onChange={e => {
            edit_tmp_proposal(e.target.value, "inverter_model");
          }}
          className="form-control"
          name=""
          id=""
          defaultValue={"Select Inverter"}
          value={tmp_proposal_data.inverter_model}
        >
          <option disabled value="Select Inverter">
            Select Inverter Model
          </option>
          {materials.inverters.map(inverter => {
            return (
              <option key={inverter._id} value={inverter._id}>
                {inverter.manufacturer} {inverter.model} - {inverter.volt}
                {"w"}
              </option>
            );
          })}{" "}
        </select>

        {/* BATTERY STORAGE */}

        <span>Battery Storage</span>

        <select
          onChange={e => {
            edit_tmp_proposal(e.target.value, "battery");
          }}
          className="form-control"
          name=""
          id=""
          defaultValue={"0"}
          value={tmp_proposal_data.battery}
        >
          <option disabled value="0">
            No Battery Storage
          </option>
          {materials.batterys.map(battery => {
            return (
              <option key={battery._id} value={battery._id}>
                {battery.manufacturer} {battery.model} - {battery.kwh}
                {"Kwh"}
              </option>
            );
          })}{" "}
        </select>
      </div>
    );
  }
  let [panel] = get_panel(proposal.panel_model);
  let [battery] = get_battery(proposal.battery);
  let [inverter] = get_inverter(proposal.inverter_model);
  console.log({ panel });
  return (
    <div className="row">
      <div className="col-sm-12">
        <h5>Panel Model</h5>
        <p>
          {proposal.panel_count} {panel.manufacturer} {panel.model}
        </p>
      </div>
      <div className="col-sm-12">
        <h5>Inverter Model</h5>
        <p>
          {proposal.inverter_count} {inverter.manufacturer} {inverter.model}
        </p>
      </div>
      <div className="col-sm-12">
        <h5>Battery</h5>
        <p>
          {battery.manufacturer} {battery.model}
        </p>
      </div>
    </div>
  );
};

const Proposal_Price = ({
  proposal,
  mode,
  edit_tmp_proposal,
  tmp_proposal_data
}) => {
  if (mode) {
    return (
      <div className="col-6">
        <Input
          handle_input={edit_tmp_proposal}
          type="number"
          name="price"
          value={tmp_proposal_data.price}
        />
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-sm-12">
        <h5>Price</h5>
        <p>${proposal.price}</p>
      </div>
    </div>
  );
};

const Proposal_Contact = ({
  proposal,
  mode,
  edit_tmp_proposal,
  tmp_proposal_data
}) => {
  if (mode) {
    return (
      <div className="col-6">
        <Input
          handle_input={edit_tmp_proposal}
          type="email"
          name="email"
          value={tmp_proposal_data.email}
        />
        <Input
          handle_input={edit_tmp_proposal}
          type="phone"
          name="phone"
          value={tmp_proposal_data.phone}
        />
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-sm-12">
        <h5>Contact</h5>
        <p>{proposal.email}</p>
        <p>{proposal.phone}</p>
      </div>
    </div>
  );
};

const Proposal_Worker = ({
  worker,
  mode,
  edit_tmp_proposal,
  tmp_proposal_data,
  workers
}) => {
  if (mode) {
    return (
      <div className="col-6">
        <select
          onChange={e => {
            edit_tmp_proposal(e.target.value, "worker");
            // this.props.dispatch(set_selected_worker(this.get_worker()))
          }}
          className="form-control"
          name=""
          id=""
          value={tmp_proposal_data.worker}
        >
          <option disabled value="Select Worker">
            Select Worker
          </option>
          {workers.map(worker => {
            return (
              <option key={worker._id} value={worker._id}>
                {worker.firstname} {worker.lastname}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  return (
    <p>
      {worker.firstname} {worker.lastname}
    </p>
  );
};

const Proposal_Address = ({
  proposal,
  mode,
  edit_tmp_proposal,
  tmp_proposal_data
}) => {
  if (mode) {
    return (
      <div className="col-6">
        {/* street */}
        <Input
          handle_input={edit_tmp_proposal}
          type="text"
          name="street_address"
          value={tmp_proposal_data.street_address}
        />
        {/* city */}
        <Input
          handle_input={edit_tmp_proposal}
          type="text"
          name="city"
          value={tmp_proposal_data.city}
        />
        {/* zip */}
        <Input
          handle_input={edit_tmp_proposal}
          type="text"
          name="zip"
          value={tmp_proposal_data.zip}
        />
      </div>
    );
  }
  return (
    <>
      <h5>Address</h5>
      <p>{proposal.street_address}</p>
      <p>{proposal.city}</p>
      <p>{proposal.state}</p>
      <p>{proposal.zip}</p>
    </>
  );
};

const Input = ({ name, type, value, handle_input, required }) => {
  let label = name.replace("_", " ");
  label = label
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
const Edit_Proposal_Buttons_Container = styled.div`
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
