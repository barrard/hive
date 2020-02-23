import React from "react";
import styled from "styled-components";

const Worker_List = ({ workers, onWorkerSelect }) => {
  return (
    <>
      <WorkerListHeading />
      <StyledWorkerListContainer>
        {workers &&
          workers.map &&
          workers.map(worker => (
            <Worker_Item
              onWorkerSelect={onWorkerSelect}
              key={worker._id}
              worker={worker}
            />
          ))}
      </StyledWorkerListContainer>
    </>
  );
};

export default Worker_List;

const WorkerListHeading = () => {
  return (
    <div className="row">
      <div className="col-sm-12 flex_center">
        <StyledHeading>Worker List</StyledHeading>
      </div>
    </div>
  );
};

const Worker_Item = ({ worker, onWorkerSelect }) => {
  return (
    <StyledWorkerItemDiv onClick={(e)=> onWorkerSelect(worker)}>
      <StyledWorkerName>{worker.firstname}</StyledWorkerName>
    </StyledWorkerItemDiv>
  );
};

const StyledWorkerName = styled.p`
  margin: 1em;
`;

const StyledWorkerItemDiv = styled.div`
  width: 100%;
  border: 1px solid black;
  /* padding: 1em; */
`;

const StyledWorkerListContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  min-height: 40vh;
  max-height: 40vh;
  overflow-y: auto;
`;
const StyledHeading = styled.h3`
  /* padding-bottom: 2em; */
`;
