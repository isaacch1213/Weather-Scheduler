'use client';
import { Button } from '@mui/material';
import styled from 'styled-components';

const StyledCreateButton = styled.button`
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

const PositionWrapper = styled.div`
  position: fixed;
  top: 90vh;
  width: 100%;
  text-align: center;
  z-index: 10;
`;

export default function CreateEventButton({ openModal }: { openModal: () => void }) {
  return (
    <PositionWrapper>
    <Button variant="contained" color="primary" onClick={openModal}>
      Create Event
    </Button>
    </PositionWrapper>
  );
}
