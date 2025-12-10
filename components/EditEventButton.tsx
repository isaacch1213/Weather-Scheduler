/*
Format for Edit button

Made by Alex
Minor modularization hotfix by moving edit button prop to types folder by Isaac
*/
import styled from 'styled-components';
import { EditEventButtonProps } from '@/types/EditEventButtonProps';

const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: 5%;
  background-color: #16a34a;
  color: white;
  border: 2px solid #15803d;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 120%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #15803d;
  }
`;

// allows for recieving an event triggering onEdit 
export default function EditEventButton({ eventId, onEdit }: EditEventButtonProps) {
  return (
    <EditButton onClick={onEdit}>
      ✎
    </EditButton>
  );
}