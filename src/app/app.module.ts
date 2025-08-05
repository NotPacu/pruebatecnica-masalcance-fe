import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './Components/users/users.component';
import { HomeComponent } from './Views/home/home.component';
import { TabViewModule } from 'primeng/tabview';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { UsersPostsComponent } from './Components/users-posts/users-posts.component';
import { DialogService } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkeletonModule } from 'primeng/skeleton';

import { ButtonModule } from 'primeng/button';
import { LogsComponent } from './Components/logs/logs.component';
import { CardModule } from 'primeng/card';
import { EditLogComponent } from './Components/logs/edit-log/edit-log.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AlbumComponent } from './Components/album/album.component';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    UsersPostsComponent,
    LogsComponent,
    EditLogComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
    SkeletonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    DropdownModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
  providers: [DialogService,MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
