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
  padding-bottom: 3rem;
`;

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

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
