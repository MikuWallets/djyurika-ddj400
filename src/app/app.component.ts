import { Component } from '@angular/core';
import { GetBoothSortParam } from './core/types/GetBoothSortParam';
import { SortOption } from './core/types/SortOption';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'djyurika-ddj400';
  public apiKey: string = '';
  
  public readonly Sort = GetBoothSortParam;
  public sortByNameParam: GetBoothSortParam;
  public sortByAliasParam: GetBoothSortParam;

  public currentPageNumber: number;

  public sortByNameOption: SortOption[];
  public sortByAliasOption: SortOption[];

  public sortParam: GetBoothSortParam[] = [];

  public constructor() {
    this.sortByNameOption = [
      { label: 'MARKET.BOOTH.SORT_NONE', value: null },
      { label: 'MARKET.BOOTH.SORT_ASC', value: this.Sort.NAME_ASC },
      { label: 'MARKET.BOOTH.SORT_DESC', value: this.Sort.NAME_DESC }
    ];
    this.sortByAliasOption = [
      { label: 'MARKET.BOOTH.SORT_NONE', value: null },
      { label: 'MARKET.BOOTH.SORT_ASC', value: this.Sort.ALIAS_ASC },
      { label: 'MARKET.BOOTH.SORT_DESC', value: this.Sort.ALIAS_DESC }
    ]
  }

  public applySort(pageNumber: number) {
    this.sortParam.length= 0; // clear array
    if (this.sortByAliasParam) { this.sortParam.push(this.sortByAliasParam); }
    if (this.sortByNameParam) { this.sortParam.push(this.sortByNameParam); }
    //this.fetchData(pageNumber);
  }
}
