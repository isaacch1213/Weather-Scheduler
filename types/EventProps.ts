export type EventProps = {
    eventName: string;
    startTime: string;
    endTime: string;
    city: string;
    isOutside: boolean;
    weatherWarning?: string;
}