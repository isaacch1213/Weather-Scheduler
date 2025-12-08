/* 
component used to allow users to remove all events they have scheduled, calls helper function

entire file made by Rohan
*/

'use client';
import { clearEvents } from '@/lib/events';
import { useState } from 'react';
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

  &:hover {
    background-color: #3459c0;
  }
`;

export default function ClearEventsButton() {

  const handleClear = async () => {
    await clearEvents();
    window.location.reload();
  };

  return (
    <StyledClearButton onClick={handleClear}>
      Clear All Events
    </StyledClearButton>
  );
}
