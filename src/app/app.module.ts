import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { AddNotesBarComponent } from './add-notes-bar/add-notes-bar.component';
import { NotesBarComponent } from './notes-bar/notes-bar.component';
import { NoteComponent } from './note/note.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

registerLocaleData(localeRu, 'ru');

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'note/:id', component: NoteComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ContentComponent,
    AddNotesBarComponent,
    NotesBarComponent,
    NoteComponent,
    MainComponent
  ],
  entryComponents: [ NoteComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
