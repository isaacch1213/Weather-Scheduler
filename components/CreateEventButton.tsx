'use client';
import { Button } from '@mui/material';
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

  &:hover {
    background-color: #3459c0;
  }
`;

const PositionWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5%;
  width: 100%;
  bottom: 0;
  text-align: center;
  z-index: 10;
`;

export default function CreateEventButton({ openModal }: { openModal: () => void }) {
  return (
    <PositionWrapper>
    <StyledCreateButton color="primary" onClick={openModal}>
      + New Event
    </StyledCreateButton>
    </PositionWrapper>
  );
}
