'use client';
import Header from '@/components/Header';
import { useState } from 'react';
import CreateEventForm from '@/components/CreateEventForm';
import CreateEventButton from '@/components/CreateEventButton';
import LogoutButton from '@/components/LogoutButton';
import EventList from '@/components/EventList';
import ClearEventsButton from '@/components/ClearEventsButton';
import styled from 'styled-components';

const StyledMain = styled.main`
  background-color: #d0ecff;
  min-height: 100vh;
  font-family: 'Quicksand', sans-serif;
  color: #1b2a49;
  padding-bottom: 3rem;
`;

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <StyledMain>
        <EventList />
        <CreateEventButton openModal={() => setIsModalOpen(true)} />
        <CreateEventForm open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </StyledMain>
    </>
  );
}
