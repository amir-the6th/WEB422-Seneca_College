import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
//import data from '../data/NewReleasesAlbums.json';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: Array<any> | undefined;
  //dataSubscribe: any;
  dataSubscribe: Subscription | undefined;

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit(): void {
    this.dataSubscribe = this.musicDataService
      .getNewReleases()
      .subscribe((data) => {
        this.releases = data.albums.items;
      });
  }

  ngOnDestroy(): void {
    this.dataSubscribe?.unsubscribe();
  }
}
