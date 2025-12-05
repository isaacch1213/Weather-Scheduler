'use client';
import { useEffect, useState } from 'react';
import { getEvents } from '@/lib/events';
import { Event } from '@/types/event';
import styled from 'styled-components';

export const NoEventsText = styled.p`
  text-align: center;
  font-size: 1.25rem;
  margin-top: 2rem;
  color: #1b2a49;
`;

export const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 1rem;
`;

export const EventCard = styled.div`
  background-color: #a2f3ff;
  width: 260px;
  padding: 1.25rem;
  border-radius: 16px;
  border: 2px solid #a3d3f5;
  font-family: 'Quicksand', sans-serif;
`;

export const EventTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1b2a49;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const EventLine = styled.p`
  font-size: 1rem;
  color: #1b2a49;
  margin: 0.3rem 0;
`;

export const EventLabel = styled.span`
  font-weight: 600;
  color: #1e3a8a;
`;

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const data = await getEvents();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  if (events.length === 0) {
    return <NoEventsText>No events scheduled.</NoEventsText>;
  }

  return (
    <EventsContainer>
      {events.map((event, index) => (
        <EventCard key={index}>
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
        </EventCard>
      ))}
    </EventsContainer>
  );
}
