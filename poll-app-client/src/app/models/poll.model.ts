import { Vote } from "./vote.model";

export class Poll {
    id: number;
    title: string;
    description: string;
    votes: Vote[];
    multipleAnswer: boolean;
    postDate: Date;
    allowSameIp: boolean;
    nonPublic: boolean;
    code: string;
  }