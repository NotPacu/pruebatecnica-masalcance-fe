import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlbumDTO } from '../Interface/Models/album-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {


  constructor(private http : HttpClient ) { }

  getAlbums(): Observable<AlbumDTO[]> {
      return this.http.get<AlbumDTO[]>(`${environment.apiUrl}/albums`);
  }
}
