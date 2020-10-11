import {Injectable} from '@angular/core';

export interface Notes {
  id: number;
  title: string;
  content: string;
  date: Date;
}

@Injectable({providedIn: 'root'})
export class DataService {

  public checkNewNote = true;
  public arrayNotes: Notes[] = [];
  public id = 0;
  private note: any;
  public idChecked: number = null;

  getCheckNewNote(): boolean {
    return this.checkNewNote;
  }
  setCheckNewNote(): void {
    this.checkNewNote = !this.checkNewNote;
  }
  createNewNote(titleNew: string, contentNew: string): void {
    this.id++;
    this.arrayNotes.push({id: this.id, title: titleNew, content: contentNew, date: new Date()});
  }
  getAllNote() {
    return this.arrayNotes;
  }

  setCheckedNote(id: number) {
    this.idChecked = id;
  }

  getOneNoteByIdChecked() {
    this.note = Object.create(null);
    this.arrayNotes.forEach(element => {
      if (element.id === this.idChecked) {
        this.note = element;
      }
    });
    return this.note;
  }

  getOneNoteById(idNote: number) {
    this.note = Object.create(null);
    this.arrayNotes.forEach(element => {
      if (element.id === idNote) {
        this.note = element;
      }
    });
    return this.note;
  }
}
