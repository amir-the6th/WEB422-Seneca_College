import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import albumData from '../data/SearchResultsAlbum.json';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: Array<any> | undefined;
  private albumSubscribe: Subscription | undefined;
  private id: any;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.albumSubscribe = this.musicDataService
      .getAlbumById(this.id)
      .subscribe((data) => {
        return (this.album = data);
      });
  }

  addToFavourites(trackID: any) {
    if (this.musicDataService.addToFavourites(trackID)) {
      this.snackBar.open('Adding to Favourites...', 'Done', { duration: 1500 });
    }
  }

  ngOnDestroy() {
    this.albumSubscribe?.unsubscribe();
  }
}
