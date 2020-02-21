import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

class WorkerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: props.workers,
      selected_worker: {},
      editMode: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.save = this.save.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.handle_input = this.handle_input.bind(this);
  }

  save() {
    let { selected_worker } = this.state;
    console.log("Save");
    console.log(selected_worker);
  }
  setEditMode(editMode) {
    this.setState({
      editMode
    });
  }
  handle_input(input, type) {
    this.setState({ [type]: input });
    // console.log({ input, type });
    // this.props.handle_input(input, type)
  }
  handleSelect(_id) {
    console.log({ _id });
    let workerIndex = this.state.workers.findIndex(
      worker => worker._id === _id
    );
    console.log(this.state.workers[workerIndex]);
    this.setState({
      selected_worker: this.state.workers[workerIndex],
      _temp_worker: this.state.workers[workerIndex]
    });
  }
  workerList() {
    return this.props.workers.map(worker =>
      WorkerName(worker, this.handleSelect)
    );
  }

  render() {
    let { editMode, selected_worker, _temp_worker } = this.state;
    let { setEditMode, save, handle_input } = this;
    let isWorkerSelected = selected_worker.firstname;

    return (
      <div className="row ">
        <div className="col-sm-3 ">{this.workerList()}</div>
        <div className="col-sm-9">
          <h3>
            {isWorkerSelected && (
              <WorkerDisplay
                worker={selected_worker}
                editMode={editMode}
                setEditMode={setEditMode}
                save={save}
                handle_input={handle_input}
              />
            )}
            {!isWorkerSelected && "Select Worker"}
          </h3>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, csrf, locals, crowdsales, two_factor_auth } = state;
  return { ...user, ...csrf, ...locals, ...crowdsales, ...two_factor_auth };
}

export default connect(mapStateToProps)(WorkerList);

function WorkerName({ firstname, lastname, _id }, handleSelect) {
  return (
    <WorkerItem key={_id}>
      <span onClick={() => handleSelect(_id)}>
        {firstname} {lastname}
      </span>
    </WorkerItem>
  );
}

const WorkerItem = styled.div`
  cursor: pointer;
  /* background-color: red; */
  text-align: center;
  border: solid 1px blue;
  padding: 0.5em;
`;

const WorkerDisplay = ({ worker, save, handle_input }) => {
  let [tmp_worker_data, set_tmp_worker_data] = useState({});
  let [edit_mode, set_edit_mode] = useState(false);

  let {
    firstname,
    lastname,
    primary_email,
    primary_phone,
    services
  } = worker;
  const edit_tmp_worker = (value, property) => {
    console.log({ value, property, tmp_worker_data });
    set_tmp_worker_data({ ...tmp_worker_data, [property]: value });
  };
  return (
    <DisplayDiv>
      <EditButtonsDiv>
        {!edit_mode && (
          <EditBtn
            onClick={() => {
              set_edit_mode(true);
              set_tmp_worker_data(worker);
            }}
          >
            EDIT
          </EditBtn>
        )}
        {edit_mode && (
          <>
            <SaveBtn onClick={() => save()}>SAVE</SaveBtn>
            <CancelBtn onClick={() => set_edit_mode(false)}>CANCEL</CancelBtn>
          </>
        )}{" "}
      </EditButtonsDiv>
      <NameHeading>
        {firstname} {lastname}
      </NameHeading>

      <p>Primary Email: {primary_email}</p>
      <p>Primary Phone: {primary_phone}</p>

      {/* <Client_Address
        handle_input={edit_tmp_worker}
        editMode={edit_mode}
        worker={worker}
        _temp_worker={tmp_worker_data}
      /> */}

      <p>Services:</p>
      {services.map(service => serviceItem(service))}
    </DisplayDiv>
  );
};

const DisplayDiv = styled.div`
  padding: 1em;
  position: relative;
  min-height: 400px;
  width: 100%;
  border: 1px solid black;
`;
const ServiceItem = styled.div`
display:inline-block;
  margin: 0.2em;
  padding: 0.2em;
  border: 1px solid goldenrod;
  border-radius: 15px;
  background-color: lawngreen;
  color: whitesmoke;
  text-shadow: 1px 1px 3px black;
`;

const serviceItem = service => (
  <ServiceItem key={service}>{service}</ServiceItem>
);

const NameHeading = styled.h3`
  text-align: center;
  text-decoration: underline;
`;
const EditBtn = styled.span`
  transition: all 0.3s ease;
  box-shadow: 1px 1px 3px 1px black;

  padding: 0.2em;
  cursor: pointer;
  margin: 0.2em;
  color: blue;
  &:hover {
    box-shadow: 1px 1px 4px 2px black;
  }
`;
const SaveBtn = styled.span`
  transition: all 0.3s ease;
  box-shadow: 1px 1px 3px 1px black;

  padding: 0.2em;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 4px 2px black;
  }

  margin: 0.2em;
  background-color: blue;
  color: white;
`;
const CancelBtn = styled.span`
  transition: all 0.3s ease;
  box-shadow: 1px 1px 3px 1px black;

  cursor: pointer;
  padding: 0.2em;
  margin: 0.2em;
  color: red;
  &:hover {
    box-shadow: 1px 1px 4px 2px black;
  }
`;

const EditButtonsDiv = styled.div`
  top: 0.2em;
  right: 0.2em;
  position: absolute;
`;

const Input = ({ name, type, value, handle_input, required, label }) => {
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

const Client_Address = ({ worker, editMode, handle_input, _temp_worker }) => {
  if (editMode) {
    return (
      <div className="col-6">
        {/* street */}
        <Input
          handle_input={handle_input}
          type="text"
          label="Street Address"
          name="address.street_number"
          value={_temp_worker.address.street_number}
        />
        {/* city */}
        <Input
          handle_input={handle_input}
          label="City"
          type="text"
          name="address.city"
          value={_temp_worker.address.city}
        />
        {/* zip */}
        <Input
          handle_input={handle_input}
          label="Zip Code"
          type="text"
          name="address.zip"
          value={_temp_worker.address.zip}
        />
      </div>
    );
  }
  return (
    <>
      <h5>Address</h5>
      <p>{worker.address.street_address}</p>
      <p>{worker.address.locality}</p>
      <p>{worker.address.region}</p>
      <p>{worker.address.postal_code}</p>
    </>
  );
};
