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

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0); /* all refresh references added by Isaac */

  /* show events and refresh if the counter changes, button to open
  form sits on screen, open modal if clicked, then add to
  counter when new event is made
  */
  return (
    <>
      <Header />
      {/* switched to Tailwind to avoid hydration error with styled components by Isaac */}
      <main className="bg-[#d0ecff] h-[90vh] font-['Quicksand'] text-[#1b2a49] pb-[3%]">
        <EventList refreshSignal={refreshCounter} />
        <CreateEventButton openModal={() => setIsModalOpen(true)} />
        <CreateEventForm open={isModalOpen} onClose={() => setIsModalOpen(false)} onCreated={() => setRefreshCounter(prev => prev + 1)}  />
      </main>
    </>
  );
}
