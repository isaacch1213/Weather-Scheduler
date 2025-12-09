/*
Format for Edit button
Made by Alex
*/
import styled from 'styled-components';

const EditButton = styled.button`
  position: absolute;
  top: calc(3% + 40px);
  left: 5%;
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

interface EditEventButtonProps {
  eventId: string;
  onEdit: () => void;
}

export default function EditEventButton({ eventId, onEdit }: EditEventButtonProps) {
  return (
    <EditButton
      onClick={onEdit}
      aria-label="Edit event"
    >
      🖋️
    </EditButton>
  );
}