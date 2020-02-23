import React from "react";
import styled from "styled-components";

const Proposal_List = ({ proposals, onProposalSelect }) => {
  return (
    <>
      <ProposalListHeading />
      <StyledProposalListContainer>
        {proposals &&
          proposals.map &&
          proposals.map(proposal => (
            <Proposal_Item
              onProposalSelect={onProposalSelect}
              key={proposal._id}
              proposal={proposal}
            />
          ))}
      </StyledProposalListContainer>
    </>
  );
};

export default Proposal_List;

const ProposalListHeading = () => {
  return (
    <div className="row">
      <div className="col-sm-12 flex_center">
        <StyledHeading>Proposal List</StyledHeading>
      </div>
    </div>
  );
};

const Proposal_Item = ({ proposal, onProposalSelect }) => {
  return (
    <StyledProposalItemDiv onClick={(e)=> onProposalSelect(proposal)}>
      <StyledProposalName>{proposal.street_address}</StyledProposalName>
    </StyledProposalItemDiv>
  );
};

const StyledProposalName = styled.p`
  margin: 1em;
`;

const StyledProposalItemDiv = styled.div`
  width: 100%;
  border: 1px solid black;
  /* padding: 1em; */
`;

const StyledProposalListContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  min-height: 40vh;
  max-height: 40vh;
  overflow-y: auto;
`;
const StyledHeading = styled.h3`
  /* padding-bottom: 2em; */
`;
