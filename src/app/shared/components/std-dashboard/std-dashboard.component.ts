import { Component, OnInit } from '@angular/core';
import { Istudent } from '../../models/student';
import { studentsData3 } from '../../consts/students';
import { SnackBarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-std-dashboard',
  templateUrl: './std-dashboard.component.html',
  styleUrls: ['./std-dashboard.component.scss']
})
export class StdDashboardComponent implements OnInit {
  stdArr: Istudent[] = [];
  editStd !: Istudent;

  constructor(
    private _snackbar: SnackBarService,
    private _matdialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.stdArr = studentsData3;
  }

  getNewStudent(newStd: Istudent) {
    this.stdArr.unshift(newStd);
    this._snackbar.openSnackbar(`The new Student ${newStd.fname} is added succesfully!!!`);
  }

  getRemoveID(removeID: string) {
    let config = new MatDialogConfig();
    config.data = `Are you sure to remove this student with id ${removeID}`;
    config.disableClose = true;
    config.width = '400px';
    let dialogRef = this._matdialog.open(GetConfirmComponent, config);
    dialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            let getIndex = this.stdArr.findIndex(s => s.stdID === removeID);
            this.stdArr.splice(getIndex, 1);
            this._snackbar.openSnackbar(`The student is removed successfully!!!`);
          }
        },
        error: err => {
          this._snackbar.openSnackbar(err.msg);
        }
      })
  }

  getEditStd(editStd: Istudent) {
    this.editStd = editStd;
  }

  getUpdatedStd(updatedStd:Istudent){
    let getIndex = this.stdArr.findIndex(s => s.stdID === updatedStd.stdID);
    this.stdArr[getIndex] = updatedStd;
    this._snackbar.openSnackbar(`The student ${updatedStd.fname} is updated successfully!!!`);
  }

}
