import { useState } from 'react';
import styled from 'styled-components';
import { deleteEvent } from '@/lib/events';

const DeleteButton = styled.button`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: 2px solid #1e40af;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e40af;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;


interface DeleteEventButtonProps {
  eventId: string;
  onDelete: (eventId: string) => void;
}

export default function DeleteEventButton({ eventId, onDelete }: DeleteEventButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteEvent(eventId);
      onDelete(eventId);
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteButton
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Delete event"
    >
      {isDeleting ? '...' : '×'}
    </DeleteButton>
  );
}