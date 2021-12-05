import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: string | undefined;
  private searchSubscribe: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    // through Params service & subscribing to queryParams property */
    this.searchSubscribe = this.route.queryParams.subscribe(
      (params: Params) => {
        this.searchQuery = params['q'];
        this.musicDataService
          .searchArtists(this.searchQuery)
          .subscribe((data) => {
            this.results = data.artists.items.filter(
              (artist: any) => artist.images.length > 0
            );
          });
      }
    );

    // problem with this method is that it only works for the first search
    // this.searchQuery = this.route.snapshot.queryParams['q'];
    // this.searchSubscribe = this.musicDataService
    //   .searchArtists(this.searchQuery)
    //   .subscribe((data) => {
    //     this.results = data.artists.items.filter(
    //       (artist: any) => artist.images.length > 0
    //     );
    //   });
  }

  ngOnDestroy(): void {
    this.searchSubscribe?.unsubscribe();
  }
}
