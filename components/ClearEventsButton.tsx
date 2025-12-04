'use client';
import { clearEvents } from '@/lib/mockEvents';
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
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClear = async () => {
    await clearEvents();
    window.location.reload(); // reload
  };

  return (
    <StyledClearButton onClick={handleClear}>
      Clear All Events
    </StyledClearButton>
  );
}
