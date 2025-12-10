/* 
component used to allow user input to create events and store inputs as needed

entire file made by Rohan except for changes to adapt code to backend by Isaac

Isaac sections commented, all else is Rohan
*/

'use client';
import { useState } from 'react';
import { Modal, Typography, TextField, Button, Checkbox, FormControlLabel} from '@mui/material';
import { createEvent } from '@/lib/events';
import getData from '@/lib/getData';
import { evaluateWeatherForEvent } from '@/lib/evaluateWeatherForEvent';
import styled from 'styled-components';

const StyledModal = styled.div`
  background-color: #8ac2feff;
  padding: 2%;
  width: 50%;
  height: 80%;
  margin: 10vh auto;
  border-radius: 15px;
  overflow-y: auto; /* allows scrolling inside the form modal */
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
  /* hooks to store and change user inputs */
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [city, setCity] = useState(''); /* all city references added by Isaac */
  const [isOutside, setIsOutside] = useState(false);

  // Entire function logic made by Isaac
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Added logic for bad city input by Isaac
    try {
      // data call by Isaac
      const data = await getData(city);
    
      /* props and weatherWarning by Isaac*/
      const weatherWarning = evaluateWeatherForEvent(
        data,
        startTime,
        endTime,
        isOutside
      );
    
      const props = {
        eventName,
        startTime,
        endTime,
        city,
        isOutside,
        weatherWarning,
      };
      
      /* call createEvent function to updated event list by Isaac*/
      await createEvent(props);
    
      // reset fields and close modal
      onCreated();
      setEventName('');
      setStartTime('');
      setEndTime('');
      setCity('');
      setIsOutside(false);
    
      onClose();
    } catch (err) {
      console.error(err);
      setCity('');
      alert("City not found. Please enter a valid city.");
    }
  };
  
  /* style comments will only be shown for first instance of each use */
  return (
    /* MUI modal to bring form "out of page" towards user */
    <Modal open={open} onClose={onClose}>
      <StyledModal>
        {/* MUI typography for form header */}
        <Typography variant="h6" align="center">
          Create Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth /* stretch text across full container */
            required /* required part of form */
            margin="normal" /* standard vertical spacing for TextField */
            /* code below is deprecated but used since we learned in class*/
            InputLabelProps={{ sx: { color: 'white' } }}
            InputProps={{ sx: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            sx={{ /* set input outline to white */
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
          <FormControlLabel /*make some control (checkbox for us) and put label next to it*/
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
          variant="contained" /* MUI button variant with filled background */
          fullWidth
          sx={{
            backgroundColor: '#001b67ff',
            color: 'white',
            '&:hover': { /* style for when hovering over button */
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
