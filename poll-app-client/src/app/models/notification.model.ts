import { Poll } from "./poll.model";

export interface Notification {
    id: number;
    message: string;
    read: boolean;
    createdAt: Date;
    poll: Poll;
}