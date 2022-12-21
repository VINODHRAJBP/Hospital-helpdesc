import { Component, OnInit } from '@angular/core';
import { book } from '../book'
import { ValidateService } from '../validate.service';
import { Location } from '@angular/common';
import { AdminDashboardComponent } from '../Component/admin-dashboard/admin-dashboard.component'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private validserv: ValidateService, public g: AdminDashboardComponent, private location: Location,) { }

  ngOnInit(): void {

  }


}
