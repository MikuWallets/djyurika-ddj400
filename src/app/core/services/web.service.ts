import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Guild, PagedSongList, PlayHistorySortParam, Song } from '../types/';

@Injectable()
export class WebService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getServerList() {
    return this.http.get(`${this.apiUrl}/guild`, {
      observe: 'body',
      responseType: 'json',
    }) as Observable<Array<Guild>>;
  }

  public getList(apiKey: string, page: number, fetchCount: number, server?: string, sort?: PlayHistorySortParam | Array<PlayHistorySortParam>) {
    const headers = new HttpHeaders({
      'X-ACCESS-KEY': apiKey,
    });
    const params = {
      page: page.toString(10),
      fetchCount: fetchCount.toString(10),
    };

    if (sort) {
      Object.assign(params, { sort });
    }
    if (server) {
      Object.assign(params, { server });
    }

    return this.http.get(`${this.apiUrl}/song`, {
      headers,
      params,
      observe: 'body',
      responseType: 'json',
    }) as Observable<PagedSongList>;
  }

  public getListBySongID(apiKey: string, id: string, server?: string) {
    const headers = new HttpHeaders({
      'X-ACCESS-KEY': apiKey,
    });

    const params = {};
    if (server) {
      Object.assign(params, { server });
    }

    return this.http.get(`${this.apiUrl}/song/search/${id}`, {
      headers,
      params,
      observe: 'body',
      responseType: 'json',
    }) as Observable<Array<Song>>;
  }

  public sendRestart(apiKey: string) {
    const headers = new HttpHeaders({
      'X-ACCESS-KEY': apiKey,
    });

    return this.http.post(`${this.apiUrl}/restart`, null, {
      headers,
      responseType: 'json',
    }) as Observable<string>;
  }

  public removeSong(apiKey: string, no: number) {
    const headers = new HttpHeaders({
      'X-ACCESS-KEY': apiKey,
    });
    return this.http.delete(`${this.apiUrl}/song/${no}`,{
      headers,
    }) as Observable<any>;
  }

  public reviewSong(apiKey: string, ids: Array<string>) {
    const headers = new HttpHeaders({
      'X-ACCESS-KEY': apiKey,
    });

    return this.http.patch(`${this.apiUrl}/song/update`, ids, {
      headers,
      observe: 'body',
      responseType: 'json',
    }) as Observable<Array<Song>>;
  }
}
