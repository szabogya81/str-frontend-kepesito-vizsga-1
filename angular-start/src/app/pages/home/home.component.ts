import { Component, HostListener, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Contributor } from 'src/app/model/contributor';
import { ContributorService } from 'src/app/service/contributor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  page_number = 1;
  dataList: Contributor[] = [];

  constructor(private svc: ContributorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getContributors();
  }

  @HostListener("window:scroll", [])
  onWindowScroll(): void {
    if (this.bottomReached()) {
      this.getContributors();
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  getContributors() {
    this.svc.getItems(this.page_number)
      .subscribe((data: any) => {

        for (let i = 0; i < data.length; i++) {
          this.dataList.push(data[i]);
        }

        this.page_number++;
      }, error => {
        this.toastr.error('Error occured while getting contributors', 'Contributors');
      })
  }
}