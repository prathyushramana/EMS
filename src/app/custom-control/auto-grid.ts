import {Component,Input} from '@angular/core';
//Needed for triggering events
import {Subject}    from 'rxjs/Subject';
import {Observable}     from 'rxjs/Observable';


@Component({
    selector : 'AutoGrid',//tag name in when calling the component
    templateUrl : './auto-grid.html'//path of the HTML can be replaced with template:...
  })
  export class AutoGrid
  {
    SortBy : string = "";//This param is used to determine which column to use for sorting
    Direction: number = 1;//1 is ascending -1 is descending
  
    Pages : any = [];//Dummy array to load the pagination
    Data : any = [];//Main data container
    Width:string;
    @Input() AllowDelete : boolean= true;//Can a row be deleted
    @Input() Columns : any = [];//Name of the columns to display / order
    @Input() AllowSorting : boolean= true;//Allow client side sorting
    @Input() TotalRows : number = 0;//Total number of rows for paging
    @Input() PageSize : number = 0;
    @Input() PageIndex : number = 0;//To control the start page index
  
    public RowDeleted$ = new Subject<any>();//Subscribe to this to handle delete event
    public PageIndexChanged$ = new Subject<any>();//Subscribe to this to handle "page index change" event
  
    public LoadData(_data : any)
    {//Main method to load the data
      this.Data = _data;
      this.TotalRows=this.Data.length;     
    }
    OnDeleteRow(Row2Delete:any)
    {//private method to raise RowDeleted        
      this.RowDeleted$.next(Row2Delete);
      //client side delete for data can be done here
    }
    OnPageIndexChange(index:number)
    {//private method to raise RowDeleted
      console.log(index);
      this.PageIndex = index-1;
      this.Data = [];
      this.PageIndexChanged$.next(index-1);
    }
    ngOnInit(){
      //used for pagination style
      let totalPages : any = (this.TotalRows / this.PageSize);
      this.Width = ((totalPages * 38) + totalPages * 2) + "px";
    }
    ngAfterViewInit() {
      //fill the dummy array
      for(let i=0;i<this.TotalRows / this.PageSize;i++)
      this.Pages.push(i+1);
    }
     Sort(key:string,dir:number){
       //Change the sorting criteria
         this.SortBy = key;
         this.Direction = dir;
     }
  }
