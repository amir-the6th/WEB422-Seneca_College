/*********************************************************************************************
 * WEB422 – Assignment 6
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Amirhossein Sabagh     Student ID: 152956199     Date: 2021-12-04
 *
 * ******************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'web422-a6';
  searchString: string | undefined;
  token: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }
}
