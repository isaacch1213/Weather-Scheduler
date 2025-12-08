/* 
component used to allow user to see all scheduled events and create more if wanted. landing page after login is completed

entire file made by Rohan except for changes to adapt code to backend by Isaac

Isaac sections commented, all else is Rohan
*/

'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import CreateEventForm from '@/components/CreateEventForm';
import CreateEventButton from '@/components/CreateEventButton';
import EventList from '@/components/EventList';
import styled from 'styled-components';

const StyledMain = styled.main`
  background-color: #d0ecff;
  height: 90vh;
  font-family: 'Quicksand', sans-serif;
  color: #1b2a49;
  padding-bottom: 3%;
`;

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0); /* all refresh references added by Isaac */

  /* show events and refresh if the counter changes, button to open...
  form sits on screen, open modal if clicked, then add to ...
  counter when new event is made
  */
  return (
    <>
      <Header />
      <StyledMain>
        <EventList refreshSignal={refreshCounter} />
        <CreateEventButton openModal={() => setIsModalOpen(true)} />
        <CreateEventForm open={isModalOpen} onClose={() => setIsModalOpen(false)} onCreated={() => setRefreshCounter(prev => prev + 1)}  />
      </StyledMain>
    </>
  );
}
