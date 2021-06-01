import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IColumnObject } from 'app/shared/components/table-template/table-object';
import { Constants } from 'app/shared/utils/constants';
import { FacilityTableRowComponent } from './facility-table-row/facility-table-row.component';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss']
})
export class FacilityListComponent implements OnInit {
  // Component
  public loading = true;
  // This will be changed to service.
  public tempData;
  public tableRowComponent = FacilityTableRowComponent;

  // Table
  public tableColumns: IColumnObject[] = [
    {
      name: 'Name',
      value: 'name',
      width: 'col-3'
    },
    {
      name: 'Type',
      value: 'type',
      width: 'col-2'
    },
    {
      name: 'Time',
      value: 'time',
      width: 'col-2'
    },
    {
      name: 'Capacity',
      value: 'capacity',
      width: 'col-1'
    },
    {
      name: 'Status',
      value: 'status',
      width: 'col-2'
    },
    {
      name: 'Actions',
      value: '',
      width: 'col-2',
      nosort: true
    }
  ];

  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.tempData = Array.from(Constants.mockFacilityList);
    this._changeDetectionRef.detectChanges();
    this.loading = false;
  }
}