import { Component, OnInit } from '@angular/core';
import { SlideShow } from 'src/app/model/slideshow';
import { CakesService } from 'src/app/service/cakes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slideshows: SlideShow[] = [];

  constructor(private service: CakesService) {}

  ngOnInit(): void {
    this.getSlideShows();
  }

  getSlideShows(): void {
    this.service.getSlideInfo().subscribe({
      next: (response: SlideShow[]) => {
        this.slideshows = response;
      },
      error: (response: any) => {
        console.log('Error: ', response.statusText);
      },
    });
  }
}
