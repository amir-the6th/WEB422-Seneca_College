import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: any;
  favouritesSubscribe: Subscription | undefined;
  removeFavouritesSubscribe: Subscription | undefined;

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit(): void {
    this.favouritesSubscribe = this.musicDataService
      .getFavourites()
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }

  removeFromFavourites(id: any) {
    this.removeFavouritesSubscribe = this.musicDataService
      .removeFromFavourites(id)
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }

  ngOnDestroy(): void {
    this.favouritesSubscribe?.unsubscribe();
    this.removeFavouritesSubscribe?.unsubscribe();
  }
}
