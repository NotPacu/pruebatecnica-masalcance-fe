import { MessageService } from 'primeng/api';
import { AlbumDTO } from './../../Interface/Models/album-dto';
import { Component, OnInit } from '@angular/core';
import { UsersDTO } from 'src/app/Interface/Models/users-dto';
import { AlbumService } from 'src/app/Services/album.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  // Variable para mostrar u ocultar los skeletons
  loading: boolean = true;

  // Variable para almacenar los albums
  albums: AlbumDTO[] = [];

  // Variable para la lista de usuarios
  users : UsersDTO [] = []; 

  userOptions: any[] = [];
  selectedUserId: number | null = null;
  filteredAlbums: AlbumDTO[] = [];

  constructor(private albumService: AlbumService, private userService : UsersService,  private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.getAlbums();
    this.getUsers();
  }

  // Obtiene los usuarios
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.userOptions = response.map(user => ({ name: user.name, code: Number(user.id) }) );
        this.userOptions.unshift({name : 'Todos' , code : 0})
      }
    });
  }

  // Obtiene los albumes
  getAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (response) => {
        this.loading = false;
        this.albums = response;
        this.filterAlbums();
      }
    });
  }

  onUserChange() {
    this.filterAlbums();
  }


  // Filtra los albunes por el usuario 
  // Se realiza una peticion back para obtener los albums por userId
  filterAlbums() {
    // Si no hay usuario seleccionado, mostrar todos los albums
    console.log('Selected User ID:', this.selectedUserId);
    if (!this.selectedUserId || this.selectedUserId === 0){
      this.filteredAlbums = this.albums;
      return;
    }

    this.userService.getAlbumsByUserId(this.selectedUserId.toString()).subscribe({
      next: (response) => {
        this.filteredAlbums = response;
        if (this.filteredAlbums.length === 0){
          this.messageService.add({severity:'error', summary:'No encontrado', detail:'El usuarió no tiene albumes'});
        }
      },
      error: (Response) => {
        this.filteredAlbums = [];
        this.messageService.add({severity:'error', summary:'No encontrado', detail:'El usuarió no tiene albumes'});
      }
    });
  }

}
