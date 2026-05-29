import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Istudent } from '../../models/student';
import { StudentService } from '../../services/students.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit, OnChanges {
  isInEditMode: boolean = false;
  @ViewChild('stdForm') stdForm !: NgForm;
  @Output() emitNewStd: EventEmitter<Istudent> = new EventEmitter<Istudent>();
  @Output() emitUpdatedStd: EventEmitter<Istudent> = new EventEmitter<Istudent>();
  @Input() getEditStd !: Istudent;


  constructor(
    private _stdService: StudentService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getEditStd'].currentValue) {
      this.isInEditMode = true;
      this.stdForm.form.patchValue(this.getEditStd);
    }
  }

  onSubmit() {
    if (this.stdForm.valid) {
      let newStd: Istudent = {
        ...this.stdForm.form.value,
        stdID: this._stdService.uuid()
      }
      this.emitNewStd.emit(newStd);
      this.stdForm.resetForm();
    }
  }

  onUpdateStd() {
    if (this.stdForm.valid) {
      let updateStd: Istudent = {
        ...this.stdForm.value, stdID: this.getEditStd.stdID
      }
      this.emitUpdatedStd.emit(updateStd);
      this.stdForm.resetForm();
      this.isInEditMode = false;
    }
  }

}
