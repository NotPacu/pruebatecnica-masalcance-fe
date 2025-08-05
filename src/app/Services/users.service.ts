import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersDTO } from '../Interface/Models/users-dto';
import { environment } from 'src/environments/enviroment';
import { PostsDTO } from '../Interface/Models/posts-dto';
import { AlbumDTO } from '../Interface/Models/album-dto';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersDTO[]> {
    return this.http.get<UsersDTO[]>(environment.apiUrl + '/users');
  }

  getPostsByUserId(userId: string): Observable<PostsDTO[]> {
    return this.http.get<PostsDTO[]>(`${environment.apiUrl}/users/${userId}/posts`);
  }

  getAlbumsByUserId(userId: string): Observable<AlbumDTO[]> {
    return this.http.get<AlbumDTO[]>(`${environment.apiUrl}/users/${userId}/albums`);
  }

  getSimularErrores() {
    return this.http.get((`${environment.apiUrl}/users/simularErrores`))
  }
}
