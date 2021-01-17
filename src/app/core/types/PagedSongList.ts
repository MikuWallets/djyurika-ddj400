import { Song } from './Song';

export interface PagedSongList {
  list: Array<Song>;
  fetchCount: number;
  totalPages: number;
  currentPage: number;
  totalElements: number;
}
