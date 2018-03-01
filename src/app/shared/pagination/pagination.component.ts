import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor() { }


  private pageArray: number[] = [];
  private displayRowCount: number = 5;

  @Input("RowCount")
  totalRowCount: number;

  @Output()
  onParameterChange: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.calculatenumberofPagesAndIndex();
  }

  pageSizeChange() {
    this.calculatenumberofPagesAndIndex();
    let outPutResult = {
      rowCount: this.displayRowCount
      , startIndex: undefined
      , endIndex: undefined
    }
    this.onParameterChange.emit(outPutResult);
  }

  loadEmployeeWithPagination(argPageIndex: number) {
    if (argPageIndex <= this.pageArray.length && this.pageArray.length > 1) {
      let l_StartIndex: number = ((argPageIndex - 1) * this.displayRowCount) + 1;
      let l_EndIndex: number = argPageIndex * this.displayRowCount;
      if (l_EndIndex > this.totalRowCount)
        l_EndIndex = this.totalRowCount;
      let outPutResult = {
        rowCount: this.displayRowCount
        , startIndex: l_StartIndex
        , endIndex: l_EndIndex
      }
      this.onParameterChange.emit(outPutResult);
    }

  }

  private calculatenumberofPagesAndIndex() {
    this.pageArray = [];
    let totalPages_pre: number = (this.totalRowCount / this.displayRowCount);
    let totalPages: number = (this.totalRowCount % this.displayRowCount) == 0 ? totalPages_pre : totalPages_pre + 1;
    for (let i: number = 1; i <= totalPages; i++)
      this.pageArray.push(i);
  }

}
