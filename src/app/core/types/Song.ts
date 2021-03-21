import { SongSource } from ".";

export class Song {
  regNo: number;
  id: string;
  title?: string;
  reviewed: boolean;
  playCount: number;
  pickCount: number;
  createdAt?: Date;
  lastPlayedAt?: Date;
  source: SongSource;
  guild: string;
}
