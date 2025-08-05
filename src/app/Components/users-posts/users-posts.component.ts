import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostsDTO } from 'src/app/Interface/Models/posts-dto';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-users-posts',
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.css'],
})
export class UsersPostsComponent implements OnInit {

  // Variable para mostrar u ocultar los skeletons
  loading : boolean = true;

  // Variable para almacenar el ID del usuario
  userId: string = '';

  posts: PostsDTO[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private userService : UsersService,
  ) {}

  ngOnInit(): void {

    // Obtener el ID del usuario desde la configuración del modal o dialog
    this.userId = this.config.data.userId;
    console.log('User ID:', this.userId);

    // Si no hay userId se cierra el modal
    if (!this.userId || this.userId.trim() === '') {
      console.error('No se encontró el ID del usuario.');
      this.ref.close();
    }
    this.getPosts();
  }

  // Se obtiene los post del backend
  getPosts(): void {

    this.userService.getPostsByUserId(this.userId).subscribe({
      next: (response) => {

        // Se oculta el skeleton y se asignan los posts obtenidos
        this.loading = false;
        this.posts = response;
        console.log('Posts del usuario:', this.posts);
      }
    });
  }
}
