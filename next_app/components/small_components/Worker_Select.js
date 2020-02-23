import React from "react";
import styled from 'styled-components'





const Worker_Select = ({onSelect, data, id, label})=>{
  return (<Select  onSelect={onSelect} data={data} id={id} label={label}/>)
}


const Select = ({ onSelect, data, id, label }) => {
  return (
    <div className="form-group">
      <Label label={label}/>
      <StyledSelect
        style={{width:'fit-content', display:'inline'}}
        onChange={e => onSelect(e)}
        className="form-control"
        id={id}
        >
        {data && data.map && data.map(d => {
          console.log(d);
          return (
            <option key={d} value={d}>{d}</option>
            )
        })}
      </StyledSelect>
    </div>
  );
};

/* label */
const Label = ({label}) => {
  return <StyledLabel  htmlFor={label}>{label}</StyledLabel>;
};

export default Worker_Select

const StyledLabel = styled.label`
  padding:1em;
  font-size:1.5em;
`
const StyledSelect = styled.select`
  display: inline;
  font-size:1.5em;
  /* width:'fit-content' */
`
const StyledWaveDirectionIcon = styled.i`
  -webkit-text-stroke-color: black;
  background: ${props => props.color_ft};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${props => props.size_period + 'px'};
`
const StyledWindIcon = styled.i`
  font-weight: 900;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* padding: 3px; */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  background: linear-gradient(
    ${props => `${props.color_spd}, ${props.color_gst}`}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${props => props.size + 'px'};
`

const StyledI = styled.i`
  font-size: ${props => props.size_period + 'px'};
  /* padding: 3px; */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  background: linear-gradient(
    ${props => `${(props.color[0], props.color[1] || props.color[0])}`}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`
