import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../contents/contents.component';
import {Method, NewObject, RestfulService} from '../shared/restful.service';

@Component({
  selector: 'app-content-dialog-open',
  templateUrl: './contents-dialog-open.component.html',
  styleUrls: ['./content-dialog-open.component.css']
})
export class ContentsDialogOpenComponent implements OnInit {

  currentObject: NewObject;

  constructor(
    public dialogRef: MatDialogRef<ContentsDialogOpenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private restfulService: RestfulService) { }

  ngOnInit(): void {
    this.currentObject = this.data.value;
    this.setElement(this.currentObject);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private setElement(currentObject: NewObject): void {
    currentObject.elements.forEach(elem => {
      if (elem.data.restful) {
        this.restfulService.call(Method.GetAll, elem.data.model).subscribe(res => {
          elem.data.data = res;
        });
      }
    });
  }

  selectValue(id, field): void {
    this.currentObject.dataNewObject[field] = id;
  }

}
