import { EventProps } from "@/types/EventProps";

export async function createEvent(event: EventProps) {
    await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(event),
    });
}
  
export async function getEvents() {
    const res = await fetch("/api/events", { 
        cache: "no-store",
        credentials: "include",
    });
    return res.json();
}


export async function clearEvents() {
    await fetch("/api/events", {
        method: "DELETE",
        credentials: "include",
    });
}

export async function deleteEvent(eventId: string): Promise<void> {
    const response = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: eventId }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete event');
    }
}

export async function updateEvent(eventId: string, event: EventProps): Promise<void> {
    const response = await fetch("/api/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ _id: eventId, ...event }),
    });

    if (!response.ok) {
        throw new Error('Failed to update event');
    }
}