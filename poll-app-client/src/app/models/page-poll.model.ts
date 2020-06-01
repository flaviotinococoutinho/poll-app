import { Poll } from "./poll.model";

export class PagePoll {
    content: Poll[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    first: boolean;
    sort: string;
    numberOfElements: number;
  }