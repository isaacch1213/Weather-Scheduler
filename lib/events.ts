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
    });
}