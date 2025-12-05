'use client';
import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Checkbox, FormControlLabel} from '@mui/material';
import { createEvent } from '@/lib/events';
import styled from 'styled-components';

const StyledModal = styled.div`
  background-color: white;
  padding: 2rem;
  width: 20rem;
  height: 25rem;
  margin: 10vh auto;
  border-radius: 16px;
  overflow-y: auto;
  font-family: 'Quicksand', sans-serif;

  & * {
    font-family: 'Quicksand', sans-serif;
  }
`;

export default function CreateEventForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [city, setCity] = useState('');
  const [isOutside, setIsOutside] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createEvent({
      eventName,
      startTime,
      endTime,
      city,
      isOutside,
    });

    // reset form
    setEventName('');
    setStartTime('');
    setEndTime('');
    setCity('');
    setIsOutside(false);

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModal>
        <Typography variant="h6">
          Create Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isOutside}
                onChange={(e) => setIsOutside(e.target.checked)}
              />
            }
            label="Event is Outside"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </StyledModal>
    </Modal>
  );
}
