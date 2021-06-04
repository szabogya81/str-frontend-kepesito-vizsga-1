import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from '../model/repository';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  
  urlTemplate = 'https://api.github.com/users/{USER}/repos';

  constructor(private http: HttpClient) { }

  getItems(user: string = ''): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.urlTemplate.replace('{USER}', user), 
    { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().set('sort', 'pushed') });
  }
}