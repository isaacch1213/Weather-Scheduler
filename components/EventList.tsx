import { useEffect, useState } from 'react';
import { getEvents } from '@/lib/events';
import { EventProps } from '@/types/EventProps';
import styled from 'styled-components';
import DeleteEventButton from '@/components/DeleteEventButton';

export const NoEventsText = styled.p`
  text-align: center;
  font-size: 125%;
  margin-top: 2rem;
  color: #1b2a49;
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5%;
  padding: 2% 1%;
  padding-bottom: 15vh;
`;

export const EventCard = styled.div`
  background-color: #a2f3ff;
  width: 260px;
  padding: 3%;
  border-radius: 16px;
  border: 2px solid #a3d3f5;
  font-family: 'Quicksand', sans-serif;
  position: relative;
`;

export const EventTitle = styled.h3`
  font-size: 125%;
  font-weight: 700;
  color: #1b2a49;
  text-align: center;
`;

export const EventLine = styled.p`
  font-size: 100%;
  color: #1b2a49;
`;

export const EventLabel = styled.span`
  font-weight: 600;
  color: #1e3a8a;
`;

export const WeatherWarning = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-top: 3%;
  white-space: pre-line;
  display: flex;
  align-items: center;
  gap: 3%;
`;

export default function EventList({ refreshSignal }: { refreshSignal: number }) {
  const [events, setEvents] = useState<EventProps[]>([]);

useEffect(() => {
  async function fetchEvents() {
    const data = await getEvents();

    // Sort by startTime ("HH:mm")
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

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event._id !== eventId));
  };

  if (events.length === 0) {
    return <NoEventsText>No events scheduled.</NoEventsText>;
  }

  return (
    <EventsContainer>
      {events.map((event) => (
        <EventCard key={event._id}>
          {event._id && (
            <DeleteEventButton 
              eventId={event._id} 
              onDelete={handleDeleteEvent}
            />
          )}

          <EventTitle>{event.eventName}</EventTitle>

          <EventLine>
            <EventLabel>Time:</EventLabel> {event.startTime} – {event.endTime}
          </EventLine>

          <EventLine>
            <EventLabel>Location:</EventLabel> {event.city}
          </EventLine>

          <EventLine>
            <EventLabel>Outside:</EventLabel> {event.isOutside ? "Yes" : "No"}
          </EventLine>

          {event.weatherWarning && (
            <WeatherWarning>
              {event.weatherWarning}
            </WeatherWarning>
          )}
        </EventCard>
      ))}
    </EventsContainer>
  );
}