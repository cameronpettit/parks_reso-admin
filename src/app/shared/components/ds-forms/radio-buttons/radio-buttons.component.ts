import { Component, Input, OnInit } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
})
export class RadioButtonsComponent
  extends BaseInputComponent
  implements OnInit
{
  @Input() options;
  @Input() optionsLabels;
  @Input() inactiveClasses;
  @Input() activeClasses;
  @Input() group: boolean = true;

  public buttonWidth;

  ngOnInit() {
    this.inactiveClasses = this.inactiveClasses
      ? this.inactiveClasses
      : 'btn btn-outline-primary';
    this.activeClasses = this.activeClasses
      ? this.activeClasses
      : 'btn btn-primary active';
  }

  setClass(option) {
    if (this.control.value === option) {
      return this.activeClasses;
    }
    return this.inactiveClasses;
  }

  changeValue(option) {
    this.control.setValue(option);
  }
}
