import { ChangeDetectorRef, Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { BaseFormComponent } from 'src/app/shared/components/ds-forms/base-form/base-form.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-metrics-filter',
  templateUrl: './metrics-filter.component.html',
  styleUrls: ['./metrics-filter.component.scss'],
})
export class MetricsFilterComponent extends BaseFormComponent {
  public params;
  public timeSpanOptions = ['year', 'month', 'week'];
  public timeSpanLabels = ['12M', '30D', '7D'];
  constructor(
    protected formBuilder: UntypedFormBuilder,
    protected router: Router,
    protected dataService: DataService,
    protected loadingService: LoadingService,
    protected changeDetector: ChangeDetectorRef
  ) {
    super(formBuilder, router, dataService, loadingService, changeDetector);
    this.subscriptions.add(
      this.dataService
        .watchItem(Constants.dataIds.METRICS_FILTERS_PARAMS)
        .subscribe((res) => {
          if (res) {
            this.params = res;
            this.data = this.params;
            this.setForm();
          }
        })
    );
    this.setForm();
  }

  setForm() {
    if (!this.data?.timeSpan) {
      this.data.timeSpan = this.timeSpanOptions[0];
    }
    this.form = new UntypedFormGroup({
      timeSpan: new UntypedFormControl(this.data.timeSpan),
      startDate: new UntypedFormControl(
        this.data.startDate,
        Validators.required
      ),
      endDate: new UntypedFormControl(this.data.endDate, Validators.required),
      park: new UntypedFormControl(this.data.park),
      facility: new UntypedFormControl(this.data.facility),
      fileType: new UntypedFormControl(this.data.fileType),
      exportPassBreakdownByStatus: new UntypedFormControl(
        this.data.exportPassBreakdownByStatus
      ),
      exportPassTrendsByHour: new UntypedFormControl(
        this.data.exportPassTrendsByHour
      ),
      exportReturningGuests: new UntypedFormControl(
        this.data.exportReturningGuests
      ),
      exportPassActivityByDay: new UntypedFormControl(
        this.data.exportPassActivityByDay
      ),
      exportBusiestDays: new UntypedFormControl(this.data.exportBusiestDays),
    });
    super.updateForm();
  }

  async onSubmit() {
    let res = await super.submit();
  }
}
