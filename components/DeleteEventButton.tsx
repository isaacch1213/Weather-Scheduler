/*
Format for delete button
Made by Alex
*/
import styled from 'styled-components';
import { deleteEvent } from '@/lib/events';

const DeleteButton = styled.button`
  position: absolute;
  top: 7%;
  left: 5%;
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

export default function DeleteEventButton({ eventId, onDelete }: DeleteEventButtonProps) {
  const handleDelete = async () => {
    await deleteEvent(eventId);
    onDelete(eventId);
  };

  return (
    <DeleteButton
      onClick={handleDelete}
      aria-label="Delete event"
    >
      ×
    </DeleteButton>
  );
}