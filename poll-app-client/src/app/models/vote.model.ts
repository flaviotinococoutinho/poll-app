export class Vote {
  id?: number;
  name: string;
  voteCount: number;
  code: string;
  public toString = (): string => {
    return `${this.name}`;
  };
}
