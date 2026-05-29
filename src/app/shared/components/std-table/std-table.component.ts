import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Istudent } from '../../models/student';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {
  @Input() getStdData !: Istudent[];
  @Output() emitRemoveID : EventEmitter<string> = new EventEmitter<string>();
  @Output() emitEditStd : EventEmitter<Istudent> = new EventEmitter<Istudent>();

  constructor() { }

  ngOnInit(): void {
  }

  trackBystdId(index:number, std: Istudent){
    return std.stdID;
  }

  onRemove(removeID: string){
    this.emitRemoveID.emit(removeID);
  }

  onEdit(editstd: Istudent){
    this.emitEditStd.emit(editstd);
  }
}
