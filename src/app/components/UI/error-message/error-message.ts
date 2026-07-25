import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ucFirst } from '@/utils/string.util';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.html',
})
export class ErrorMessage {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) name!: string;

  ucFirst = ucFirst
}
