/* 
component used to allow users to remove all events they have scheduled, calls helper function

styling and overall structure made by Rohan
clear event functionality made by Isaac
*/

'use client';
import { clearEvents } from '@/lib/events';
import styled from 'styled-components';

const StyledClearButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 2% 4%;
  font-size: 100%;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;

  &:hover { /* set color while hovering over button */
    background-color: #3459c0;
  }
`;

/* helper function to delete all events then refresh the page */
export default function ClearEventsButton() {

  const handleClear = async () => {
    await clearEvents();
    window.location.reload();
  };

  /* button calls helper function to allow the user to remove all their existing events */
  return (
    <StyledClearButton onClick={handleClear}>
      Clear All Events
    </StyledClearButton>
  );
}
