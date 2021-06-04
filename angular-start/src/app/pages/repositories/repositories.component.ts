import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Repository } from 'src/app/model/repository';
import { RepositoryService } from 'src/app/service/repository.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  repositories$: Observable<Repository[]> = this.activatedRoute.params.pipe(
    switchMap( params => {
      if (params.userId === '') {
        return of([]);
      }

      return this.svc.getItems(params.userId);
    })
  );

  constructor(
    private svc: RepositoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
  }

}
