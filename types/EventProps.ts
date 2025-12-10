/*
EventProps defined by Isaac
*/
export type EventProps = {
    _id?: string;
    eventName: string;
    startTime: string;
    endTime: string;
    city: string;
    isOutside: boolean;
    weatherWarning?: string;
}