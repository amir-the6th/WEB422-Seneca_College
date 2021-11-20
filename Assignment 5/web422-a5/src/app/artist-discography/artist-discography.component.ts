import { Component, OnInit } from '@angular/core';
import albumData from '../data/SearchResultsAlbums.json';
import artistData from '../data/SearchResultsArtist.json';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums: any;
  artist: any;
  constructor() {}

  ngOnInit(): void {
    this.albums = albumData.items.filter(
      (curValue: any, index: any, self: any) =>
        self.findIndex(
          (t: any) => t.name.toUpperCase() === curValue.name.toUpperCase()
        ) === index
    );

    this.artist = artistData;
  }
}
