import { UsersDTO } from 'src/app/Interface/Models/users-dto';
import { UsersService } from './../../Services/users.service';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersPostsComponent } from '../users-posts/users-posts.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService : UsersService,private dialogService: DialogService ) { }

  // Referencia al modal de posts
  PostsModalref: DynamicDialogRef | undefined;


  users : UsersDTO[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: UsersDTO[]) => {
      this.users = data;
    });
  }

  // Abre el modal de los post y manda el userId
  openPostsModal(userId: string) {
    this.PostsModalref = this.dialogService.open(UsersPostsComponent, {
      header: 'Posts del Usuario',
      width: '80%',
      data: {
        userId: userId
      }
    });

    this.PostsModalref.onClose.subscribe(() => {
      this.getUsers();
    });
  }

}
