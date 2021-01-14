import { Component } from '@angular/core';
import { PlayHistorySortParam } from './core/types/PlayHistorySortParam';
import { SortOption } from './core/types/SortOption';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'djyurika-ddj400';
  
  public apiKey: string = '';
  
  public authenticated: boolean = false;
  public authFailed: boolean = false;
  
  public readonly Sort = PlayHistorySortParam;
  public filterByReviewedParam: PlayHistorySortParam;
  public sortByTitleParam: PlayHistorySortParam;
  public sortByCreatedDateParam: PlayHistorySortParam;
  public sortByPickCountParam: PlayHistorySortParam;

  public dropdownStyle = {
    "width": '150px'
  };
  public checkValue: SortOption[];

  public filterByReviewedOption: SortOption[];
  public sortByTitleOption: SortOption[];
  public sortByCreatedDateOption: SortOption[];
  public sortByPickCountOption: SortOption[];

  public sortParam: PlayHistorySortParam[] = [];

  public constructor() {
    this.filterByReviewedOption = [
      { label: '모두보기', value: null },
      { label: '확인완료', value: this.Sort.FILTER_CHECKED },
      { label: '미확인', value: this.Sort.FILTER_UNCHECKED }
    ];
    this.sortByTitleOption = [
      { label: '해당없음', value: null },
      { label: '오름차순', value: this.Sort.ASC },
      { label: '내림차순', value: this.Sort.DESC }
    ];
    this.sortByCreatedDateOption = [
      { label: '해당없음', value: null },
      { label: '오름차순', value: this.Sort.ASC },
      { label: '내림차순', value: this.Sort.DESC }
    ];
    this.sortByPickCountOption = [
      { label: '해당없음', value: null },
      { label: '오름차순', value: this.Sort.ASC },
      { label: '내림차순', value: this.Sort.DESC }
    ];
  }

  public search() {

  }
}
