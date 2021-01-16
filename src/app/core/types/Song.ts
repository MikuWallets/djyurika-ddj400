export class Song {
  id: string;
  title?: string;
  reviewed: boolean;
  playCount: number;
  pickCount: number;
  createdAt?: Date;
  lastPlayedAt?: Date;
}
