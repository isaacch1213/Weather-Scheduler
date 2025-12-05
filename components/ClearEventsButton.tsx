'use client';
import { clearEvents } from '@/lib/events';
import { useState } from 'react';
import styled from 'styled-components';

const StyledClearButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;

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
