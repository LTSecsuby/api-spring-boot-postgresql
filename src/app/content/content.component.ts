import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  getOneNoteForContent() {
    return this.dataService.getOneNoteByIdChecked();
  }
}
