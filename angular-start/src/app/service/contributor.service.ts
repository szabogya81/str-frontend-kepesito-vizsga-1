import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contributor } from '../model/contributor';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {

  endpoint: string = 'https://api.github.com/repos/angular/angular/contributors';

  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  }

  constructor(
    private http: HttpClient
  ) { }

  getItems(pageNumber: number = 1): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.endpoint}?page=${pageNumber}&per_page=25`);
  }
}


