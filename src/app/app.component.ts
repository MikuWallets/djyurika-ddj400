import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { WebService } from './core/services';
import { PlayHistorySortParam, Song, SortOption } from './core/types';

@Component({
  selector: 'kawaii-yurika',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'djyurika-ddj400';

  public dropdownStyle = {
    width: '170px'
  };

  public songList: Array<Song>;
  public totalElements: number;

  public inputKey = '';
  public failMessage = '';

  public authenticated = false;
  public authFailed = false;

  public readonly Sort = PlayHistorySortParam;
  public sortByReviewedParam: PlayHistorySortParam;
  public sortByTitleParam: PlayHistorySortParam;
  public sortByCreatedDateParam: PlayHistorySortParam;
  public sortByPickCountParam: PlayHistorySortParam;

  public sortByReviewedOption: SortOption[];
  public sortByTitleOption: SortOption[];
  public sortByCreatedDateOption: SortOption[];
  public sortByPickCountOption: SortOption[];

  public sortParam: PlayHistorySortParam[] = [];

  checkedAll: boolean;
  fetchCount = 30;

  public constructor(
    private cdRef: ChangeDetectorRef,
    private webService: WebService
    ) {
    this.sortByReviewedOption = [
      { label: '해당없음', value: null },
      { label: '확인완료 우선', value: this.Sort.CHECKED_FIRST },
      { label: '미확인 우선', value: this.Sort.UNCHECKED_FIRST }
    ];
    this.sortByTitleOption = [
      { label: '해당없음', value: null },
      { label: '오름차순', value: this.Sort.TITLE_ASC },
      { label: '내림차순', value: this.Sort.TITLE_DESC }
    ];
    this.sortByCreatedDateOption = [
      { label: '해당없음', value: null },
      { label: '오름차순', value: this.Sort.CREATED_ASC },
      { label: '내림차순', value: this.Sort.CREATED_DESC }
    ];
    this.sortByPickCountOption = [
      { label: '해당없음', value: null },
      { label: '오름차순', value: this.Sort.PICK_ASC },
      { label: '내림차순', value: this.Sort.PICK_DESC }
    ];
  }

  public search(page: number, fetchCount: number) {
    this.fetchCount = fetchCount;
    this.applySortOption();
    this.webService.getList(this.inputKey, page, fetchCount, this.sortParam).subscribe(
      res => {
        this.authenticated = true;
        this.authFailed = false;
        this.songList = res.list;
        this.totalElements = res.totalElements;
        this.cdRef.markForCheck();
      },
      (err: HttpErrorResponse) => {
        this.failMessage = err.status + ' ' + err.error.message;
        this.authFailed = true;
        this.cdRef.markForCheck();
      }
    );
  }

  public commit() {
    console.log('commit');
  }

  public restart() {
    this.webService.sendRestart(this.inputKey).subscribe(
      res => {
        console.log(res);
        alert('Success');
      },
      (err: HttpErrorResponse) => {
        this.failMessage = err.status + ' ' + err.error.message;
        this.authFailed = true;
        this.cdRef.markForCheck();
      },
    );
  }

  public makeYoutubeLink(id: string) {
    return `https://youtu.be/${id}`;
  }

  public toggleAllSongs() {
    this.songList.forEach(s => {
      s.reviewed = this.checkedAll;
    });
  }

  private applySortOption() {
    this.sortParam.length = 0;
    if (this.sortByReviewedParam) { this.sortParam.push(this.sortByReviewedParam); }
    if (this.sortByTitleParam) { this.sortParam.push(this.sortByTitleParam); }
    if (this.sortByPickCountParam) { this.sortParam.push(this.sortByPickCountParam); }
    if (this.sortByCreatedDateParam) { this.sortParam.push(this.sortByCreatedDateParam); }
  }
}
