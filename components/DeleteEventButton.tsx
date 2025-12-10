/*
Format for delete button
Made by Alex
Minor modularization hotfix by moving delete button prop to types folder by Isaac
*/
import styled from 'styled-components';
import { deleteEvent } from '@/lib/events';
import { DeleteEventButtonProps } from '@/types/DeleteEventButtonProps';

const DeleteButton = styled.button`
  position: absolute;
  top: 20px;
  left: 5%;
  margin-botton: 1%;
  background-color: #2563eb;
  color: white;
  border: 2px solid #1e40af;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 200%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1e40af;
  }
`;


interface DeleteEventButtonProps {
  eventId: string;
  onDelete: (eventId: string) => void;
}
// helper function to allow for deleting by ID
export default function DeleteEventButton({ eventId, onDelete }: DeleteEventButtonProps) {
  const handleDelete = async () => {
    await deleteEvent(eventId);
    onDelete(eventId);
  };

  return ( //button calls helper on click
    <DeleteButton onClick={handleDelete}>
      ×
    </DeleteButton>
  );
}