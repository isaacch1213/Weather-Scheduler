/* 
Slightly different version of the CreateEventForm for QOL in not retyping inputs

Made by Alex, derived from work by Rohan
*/

'use client';
import { useState, useEffect } from 'react';
import { Modal, Typography, TextField, Button, Checkbox, FormControlLabel} from '@mui/material';
import { updateEvent } from '@/lib/events';
import getData from '@/lib/getData';
import { evaluateWeatherForEvent } from '@/lib/evaluateWeatherForEvent';
import { EventProps } from '@/types/EventProps';
import styled from 'styled-components';

const StyledModal = styled.div`
  background-color: #8ac2feff;
  padding: 2%;
  width: 50%;
  height: 80%;
  margin: 10vh auto;
  border-radius: 15px;
  overflow-y: auto;
  font-family: 'Quicksand', sans-serif;
  color: white;

  & * {
    font-family: 'Quicksand', sans-serif;
  }
`;

export default function EditEventForm({
  open,
  onClose,
  onUpdated,
  event,
}: {
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
  event: EventProps | null;
}) {
  /* hooks to store and change user inputs */
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [city, setCity] = useState('');
  const [isOutside, setIsOutside] = useState(false);

  /* populate form with existing event data when event changes */
  useEffect(() => {
    if (event) {
      setEventName(event.eventName || '');
      setStartTime(event.startTime || '');
      setEndTime(event.endTime || '');
      setCity(event.city || '');
      setIsOutside(event.isOutside || false);
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!event?._id) return;
    
    const data = await getData(city);
  
    const weatherWarning = evaluateWeatherForEvent(
      data,
      startTime,
      endTime,
      isOutside
    );
  
    const payload = {
      eventName,
      startTime,
      endTime,
      city,
      isOutside,
      weatherWarning,
    };
  
    await updateEvent(event._id, payload);
  
    // reset fields and close modal
    onUpdated();
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
        <Typography variant="h6" align="center">
          Edit Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ sx: { color: 'white' } }}
            InputProps={{ sx: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              }
            }}
          />
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
            InputProps={{ sx: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              }
            }}
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
            InputProps={{ sx: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              }
            }}
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ sx: { color: 'white' } }}
            InputProps={{ sx: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              }
            }}
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
          <Button 
          type="submit" 
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#001b67ff',
            color: 'white',
            '&:hover': {
              backgroundColor: '#003adaff',
            },
          }}
          >
            Update Event
          </Button>
        </form>
      </StyledModal>
    </Modal>
  );
}