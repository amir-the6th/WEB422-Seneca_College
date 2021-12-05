import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  // albums: Array<any> | undefined;
  // artist: Array<any> | undefined;
  private albumsSubscribe: Subscription | undefined;
  private artistSubscribe: Subscription | undefined;
  albums: any;
  artist: any;
  private id: any;

  constructor(
    private musicDataService: MusicDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.artistSubscribe = this.musicDataService
      .getArtistById(this.id)
      .subscribe((data) => {
        return (this.artist = data);
      });

    this.albumsSubscribe = this.musicDataService
      .getAlbumsByArtistId(this.id)
      .subscribe((data) => {
        return (this.albums = data.items.filter(
          (curValue: any, index: any, self: any) =>
            self.findIndex(
              (t: any) => t.name.toUpperCase() === curValue.name.toUpperCase()
            ) === index
        ));
      });
  }

  ngOnDestroy() {
    this.albumsSubscribe?.unsubscribe();
    this.artistSubscribe?.unsubscribe();
  }
}
