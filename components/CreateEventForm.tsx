/* 
component used to allow user input to create events and store inputs as needed

entire file made by Rohan except for changes to adapt code to backend by Isaac

Isaac sections commented, all else is Rohan
*/

'use client';
import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Checkbox, FormControlLabel} from '@mui/material';
import { createEvent } from '@/lib/events';
import getData from '@/lib/getData';
import { evaluateWeatherForEvent } from '@/lib/evaluateWeatherForEvent';
import styled from 'styled-components';

const StyledModal = styled.div`
  background-color: #5ea7f6ff;
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

export default function CreateEventForm({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [city, setCity] = useState(''); /* all city references added by Isaac */
  const [isOutside, setIsOutside] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = await getData(city);
  
    /* payload and weatherWarning by Isaac*/
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
  
    await createEvent(payload);
  
    // reset
    onCreated();
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
            Submit
          </Button>
        </form>
      </StyledModal>
    </Modal>
  );
}
