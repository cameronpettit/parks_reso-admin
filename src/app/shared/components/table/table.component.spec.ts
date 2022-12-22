import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerService } from 'src/app/services/logger.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TableComponent } from './table.component';
import { BehaviorSubject } from 'rxjs';
import { HomeComponent } from 'src/app/home/home.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  let mockLastEvaluatedKey = {
    LastEvaluatedKeyPK: 'pk',
    LastEvaluatedKeySK: 'sk',
  };

  let mockColumnSchema1 = {
    id: 'col1',
    displayHeader: 'column 1',
    mapValue: (value) => value.col1,
  };

  let mockColumnSchema2 = {
    id: 'col2',
    displayHeader: 'column 2',
    mapValue: (value) => value.col2,
    mapDisplay: (value) => 'display' + value.col2,
  };

  let mockColumnSchema3 = {
    id: 'col3',
    displayHeader: 'column 3',
    mapValue: (value) => value.col3,
    cellTemplate: (value) => {
      return {
        component: HomeComponent,
        inputs: {
          mockInput: value.col3,
        },
      };
    },
  };

  let mockTableSchema = {
    id: 'table',
    rowClick: (item) => {
      return function () {
        return 'mockRowClick';
      };
    },
    columns: [mockColumnSchema1, mockColumnSchema2, mockColumnSchema3],
  };

  let mockData = [
    {
      col1: 'data1col1',
      col2: 'data1col2',
      col3: 'data1col3',
    },
    {
      col1: 'data2col1',
      col2: 'data2col2',
      col3: 'data2col3',
    },
    {
      col1: 'data3col1',
      col2: 'data3col2',
      col3: 'data3col3',
    },
  ];

  let mockLoadingService = {
    getLoadingStatus: () => {
      return new BehaviorSubject(true);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        LoggerService,
        { provide: LoadingService, useValue: mockLoadingService },
        ConfigService,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.tableSchema = mockTableSchema;
    component.data = mockData;
    component.lastEvaluatedKey = mockLastEvaluatedKey;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.loading).toBeTrue();
  });

  it('updates on changes', async () => {
    component.ngOnChanges();
    await fixture.isStable();
    fixture.detectChanges();
    const rows = component.rows;
    expect(rows.length).toEqual(3);
    for (const index in rows) {
      expect(rows[index].onClick()).toEqual('mockRowClick');
      // value
      expect(rows[index]['col1'].value).toEqual(mockData[index].col1);
      expect(rows[index]['col2'].value).toEqual(mockData[index].col2);
      expect(rows[index]['col3'].value).toEqual(mockData[index].col3);
      // display
      expect(rows[index]['col1'].display).toBeUndefined();
      expect(rows[index]['col2'].display).toEqual(
        'display' + mockData[index].col2
      );
      expect(rows[index]['col3'].display).toBeUndefined();
      // cellTemplate
      expect(rows[index]['col1'].cellTemplate).toBeUndefined();
      expect(rows[index]['col2'].cellTemplate).toBeUndefined();
      expect(rows[index]['col3'].cellTemplate).toEqual({
        component: HomeComponent,
        inputs: {
          mockInput: mockData[index].col3,
        },
      });
      // raw
      expect(rows[index].raw).toEqual(mockData[index]);
      expect(rows[index].raw).toEqual(mockData[index]);
      expect(rows[index].raw).toEqual(mockData[index]);
    }
  });

  it('loads more', async () => {
    const loadMoreSpy = spyOn(component.loadMore, 'emit');
    component.loadMoreClicked();
    expect(loadMoreSpy).toHaveBeenCalledOnceWith(mockLastEvaluatedKey);
  });
});
