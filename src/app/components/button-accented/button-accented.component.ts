import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-accented',
  templateUrl: './button-accented.component.html',
  styleUrls: ['./button-accented.component.scss']
})
export class ButtonAccentedComponent {
  @Input() text?: string = '';
  @Input() src?: string = '';
  @Input() disabled?: boolean = false;
}
