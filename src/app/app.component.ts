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
  public inputID = '';
  public idSelected = false;
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
  private currentPage = 1;

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

  public searchClick() {
    if (this.inputID) {
      this.searchById(this.inputID);
    }
    else {
      this.searchAll(1, this.fetchCount);
    }
  }

  public searchById(id: string) {
    this.webService.getListBySongID(this.inputKey, id).subscribe(
      res => {
        this.authenticated = true;
        this.authFailed = false;
        this.idSelected = true;
        if (!this.songList) {
          this.songList = new Array<Song>();
        }
        this.songList.length = 0;
        this.songList.push(res);
        this.cdRef.markForCheck();
      },
      (err: HttpErrorResponse) => {
        this.failMessage = err.status + ' ' + err.error.message;
        this.authFailed = true;
        this.cdRef.markForCheck();
      }
    );
  }

  public searchAll(page: number, fetchCount: number) {
    this.currentPage = page;
    this.fetchCount = fetchCount;
    this.applySortOption();
    this.webService.getList(this.inputKey, page, fetchCount, this.sortParam).subscribe(
      res => {
        this.authenticated = true;
        this.authFailed = false;
        this.idSelected = false;
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
    let confirmed = confirm('체크한 곡들을 확인 처리합니다. 기 확인처리된 곡은 체크 해제되어 있어도 취소되지 않습니다.');
    if (confirmed) {
      const targetSongIdList = new Array<string>();
      this.songList.forEach(song => {
        if (song.reviewed) {
          targetSongIdList.push(song.id);
        }
      });
      
      this.webService.reviewSong(this.inputKey, targetSongIdList).subscribe(
        res => {
          alert(`${targetSongIdList.length}곡 요청, 새로 ${res.length}곡이 업데이트 되었습니다.`);
          this.searchAll(this.currentPage, this.fetchCount);
        },
        (err: HttpErrorResponse) => {
          this.failMessage = err.status + ' ' + err.error.message;
          this.authFailed = true;
          this.cdRef.markForCheck();
        }
      );
    }
  }

  public restart() {
    let confirmed = confirm('DJ 유리카를 재시작합니다.');
    if (confirmed) {
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
  }

  public removeSong(id: string) {
    let confirmed = confirm(`곡 ID '${id}'를 삭제합니다.`);
    if (confirmed) {
      this.webService.removeSong(this.inputKey, id).subscribe(
        res => {
          this.searchAll(this.currentPage, this.fetchCount);
          alert('Delete success');
        },
        (err: HttpErrorResponse) => {
          this.failMessage = err.status + ' ' + err.error.message;
          this.authFailed = true;
          this.cdRef.markForCheck();
        }
      )
    }
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
