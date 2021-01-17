import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PagedSongList, PlayHistorySortParam } from '../types/';

@Injectable()
export class WebService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getList(apiKey: string, page: number, fetchCount: number, sort?: PlayHistorySortParam | Array<PlayHistorySortParam>) {
    const headers = new HttpHeaders({
      'X-ACCESS-KEY': apiKey,
    });
    const params = {
      page: page.toString(10),
      fetchCount: fetchCount.toString(10)
    };

    if (sort) {
      Object.assign(params, { sort });
    }

    return this.http.get(`${this.apiUrl}/song`, {
      headers,
      params,
      observe: 'body',
      responseType: 'json',
    }) as Observable<PagedSongList>;
  }

  public sendRestart(apiKey: string) {
    const headers = new HttpHeaders({
      'X-ACCESS-KEY': apiKey,
    });

    return this.http.post(`${this.apiUrl}/restart`, null, {
      headers,
      responseType: 'text',
    }) as Observable<string>;
  }

  public removeSong(apiKey: string, id: string) {
    const headers = new HttpHeaders({
      'X-ACCESS-KEY': apiKey,
    });
    return this.http.delete(`${this.apiUrl}/song/${id}`,{
      headers,
    }) as Observable<any>;
  }
}
