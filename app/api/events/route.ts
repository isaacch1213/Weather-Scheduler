import { NextResponse } from "next/server";
import { auth } from "@/auth";
import getCollection from "@/db";

export async function GET() {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json([], { status: 200 });
    }

    const eventsCollection = await getCollection("events");

    const events = await eventsCollection
        .find({ userId: session.user.email })
        .toArray();

    return NextResponse.json(events);
}

export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const event = {
        eventName: data.eventName,
        startTime: data.startTime,
        endTime: data.endTime,
        city: data.city,
        isOutside: data.isOutside,
        userId: session.user.email,
        createdAt: new Date(),
    };

    const eventsCollection = await getCollection("events");
    await eventsCollection.insertOne(event);

    return NextResponse.json({ success: true });
}

export async function DELETE() {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const coll = await getCollection("events");
    await coll.deleteMany({ userId: session.user.email });
  
    return NextResponse.json({ success: true });
}
