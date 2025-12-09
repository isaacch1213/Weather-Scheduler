/* 
component used to allow smooth display of all events a user has scheduled. uses a card display system and displays event information

Isaac and Alex sections commented, all else is Rohan
*/

import { useEffect, useState } from 'react';
import { getEvents } from '@/lib/events';
import { EventProps } from '@/types/EventProps';
import styled from 'styled-components';
import DeleteEventButton from '@/components/DeleteEventButton';
import EditEventButton from '@/components/EditEventButton';
import EditEventForm from '@/components/EditEventForm';

export const NoEventsText = styled.p`
  text-align: center;
  font-size: 125%;
  margin-top: 10%;
  color: #1b2a49;
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 2% 1%;
  padding-bottom: 15vh;
`;

export const EventTitleBox = styled.div`
  background-color: rgba(255, 255, 255, 0.67);
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #a3d3f5;
  margin-bottom: 5px;
  width: 160px;
  margin-left: auto;
  margin-right: auto;
  z-index: 5;
  position: relative;
`;

export const EventCard = styled.div`
  background-color: #a2f3ff;
  width: 280px;
  padding-top: 1%;
  padding-bottom: 3%;
  border-radius: 16px;
  border: 2px solid #a3d3f5;
  font-family: 'Quicksand', sans-serif;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EventDetailsBox = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  border: 1px solid #a3d3f5;
  width: 240px;
  padding: 12px;
`;

export const EventTitle = styled.h3`
  font-size: 140%;
  font-weight: 700;
  color: #1b2a49;
  text-align: center;
`;

export const EventLine = styled.p`
  font-size: 100%;
  color: #1b2a49;
  margin: 8px 0;
`;

export const EventLabel = styled.span`
  font-weight: 600;
  color: #1e3a8a;
`;
/* weather warning by Isaac */
export const WeatherWarning = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 12px;
  white-space: pre-line; /* collapse space and wrap text but keep line breaks */
  display: flex;
  align-items: center;
  gap: 3%;
`;

export default function EventList({ refreshSignal }: { refreshSignal: number }) {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<EventProps | null>(null);

useEffect(() => {
  async function fetchEvents() {
    const data = await getEvents();

    // Sort by startTime ("HH:mm"), done by Alex
    const sorted = [...data].sort((a, b) => {
      const [hA, mA] = a.startTime.split(':').map(Number);
      const [hB, mB] = b.startTime.split(':').map(Number);

      const minutesA = hA * 60 + mA;
      const minutesB = hB * 60 + mB;

      return minutesA - minutesB;
    });

    setEvents(sorted);
  }

  fetchEvents();
}, [refreshSignal]);
  /* delete button and associated functionality added by Alex */
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event._id !== eventId));
  };

  /* edit button and associated functionality by Alex */
  const handleEventPlacement = async () => {
    const data = await getEvents();
    const sorted = [...data].sort((a, b) => {
      const [hA, mA] = a.startTime.split(':').map(Number);
      const [hB, mB] = b.startTime.split(':').map(Number);
      const minutesA = hA * 60 + mA;
      const minutesB = hB * 60 + mB;
      return minutesA - minutesB;
    });
    setEvents(sorted);
  };

  /* if no events then display no events scheduled */
  if (events.length === 0) {
    return <NoEventsText>No events scheduled.</NoEventsText>;
  }

  /* show each piece of info for events, each part styled with EventLine */
  return (
    <>
      <EventsContainer>
        {/* from class, iterate over events array to display all, make delete button for each one */}
        {events.map((event) => (
          <EventCard key={event._id}>
            {event._id && (
              /* both buttons added by Alex */
              <>
                <DeleteEventButton
                  eventId={event._id} 
                  onDelete={handleDeleteEvent}
                />
                <EditEventButton
                  eventId={event._id}
                  onEdit={() => {
                    setEventToEdit(event);
                    setEditModalOpen(true);
                  }}
                />
              </>
            )}
          <EventTitleBox>
            <EventTitle>{event.eventName}</EventTitle>
          </EventTitleBox>
          <EventDetailsBox>
            <EventLine>
              <EventLabel>Time:</EventLabel> {event.startTime} – {event.endTime}
            </EventLine>

            <EventLine>
              <EventLabel>Location:</EventLabel> {event.city}
            </EventLine>

            <EventLine>
              <EventLabel>Outside:</EventLabel> {event.isOutside ? "Yes" : "No"}
            </EventLine>
            {/* weather warning added by Isaac */}
            {event.weatherWarning && (
              <WeatherWarning>
                {event.weatherWarning}
              </WeatherWarning>
            )}
            </EventDetailsBox>
          </EventCard>
        ))}
      </EventsContainer>

      <EditEventForm
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdated={handleEventPlacement}
        event={eventToEdit}
      />
    </>
  );
}