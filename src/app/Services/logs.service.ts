import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogDTO } from '../Interface/Models/log-dto';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private httpClient : HttpClient ) { }


  getLogs() : Observable<LogDTO[]> {
    return this.httpClient.get<LogDTO[]>(`${environment.apiUrl}/logs`);
  }

  updateLogs(log: LogDTO): Observable<LogDTO> {
    return this.httpClient.put<LogDTO>(`${environment.apiUrl}/logs/${log.id}`, log);
  }

  deleteLogs(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/logs/${id}`);
  }
}
