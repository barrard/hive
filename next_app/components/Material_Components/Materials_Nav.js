import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Router from "next/router";
import styled from "styled-components";
import { set_materials_type } from "../../redux/actions/materials_actions.js";

import Link from "next/link";
class Materials_Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { pathname, query } = this.props.router;
    console.log(this.props.router);
    console.log({ pathname });
    console.log(query.type);
    return (
      <div className="row flex_center">
        <div className="col-sm-8 flex_evenly">
          {this.props.materials.material_types.map(type => (
            <Material_Nav_Button
              key={type}
              onClick={() => {
                this.props.router.push(`${pathname}?type=${type}`);
                this.props.dispatch(set_materials_type(type));
              }}
              query={query.type}
              type={type}
            >
              <p>{type}</p>
            </Material_Nav_Button>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(withRouter(Materials_Nav));

let Material_Nav_Button = styled.div`
  padding: 0em 0.8em;
  background: ${({ type, query }) =>
    query == type ? "palevioletred" : "goldenrod"};
  color: black;
  font-size: 1.3em;
  line-height: 3em;
  cursor: pointer;
  /* min-height: 3em; */
  height: 3em;
  &:hover {
    background: palevioletred;
  }
`;
