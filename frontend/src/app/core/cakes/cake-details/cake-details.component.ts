import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cake } from 'src/app/model/cake';
import { CakesService } from 'src/app/service/cakes.service';

@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html',
  styleUrls: ['./cake-details.component.css'],
})
export class CakeDetailsComponent implements OnInit {
  cake: Cake = new Cake();

  constructor(private service: CakesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getOneCake();
  }

  getOneCake(): void {
    this.route.params.subscribe((params: Params) => {
      this.service.getCake(params['id']).subscribe({
        next: (response: Cake) => {
          this.cake = response;
        },
        error: (response: any) => {
          console.log('Error: ', response.statusText);
        },
      });
    });
  }
}
