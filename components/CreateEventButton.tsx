/* button uses to let user make events, full file by Rohan except minor styling by Alex */

'use client';
import styled from 'styled-components';

const StyledCreateButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 2% 4%;
  font-size: 100%;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;

  &:hover { /* set color when hovering button */
    background-color: #3459c0;
  }
`;

const PositionWrapper = styled.div`
  position: fixed; /* ignores other elements, manually place relative to nearest ancestor */
  display: flex;
  justify-content: flex-end;/* forces button to right side of the screen */
  padding: 2%;
  width: 100%;
  bottom: 0; /* forces button to the bottom of its container */
  text-align: center;
  z-index: 10; /* ensures button stays above anything else */

`;

/* button calls helper function to allow user to create events */
export default function CreateEventButton({ openModal }: { openModal: () => void }) {
  return (
    <PositionWrapper>
      <StyledCreateButton color="primary" onClick={openModal}>
        + New Event
      </StyledCreateButton>
    </PositionWrapper>
  );
}

