import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cake } from 'src/app/model/cake';
import { CakesService } from 'src/app/service/cakes.service';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css'],
})
export class CakesComponent implements OnInit {
  cakes: Cake[] = [];
  ingredients: string[] = [];

  params = {
    sort: 'name',
    sortDirection: 'asc',
    filter: {
      ingredients: '',
    },
  };

  constructor(private service: CakesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCakes();
    this.getIngredients();
  }

  getCakes(): void {
    this.route.params.subscribe((params: Params) => {
      this.service.getAllCakes(this.params).subscribe({
        next: (response: Cake[]) => {
          this.cakes = response;
        },
        error: (response: any) => {
          console.log('Error: ', response.statusText);
        },
      });
    });
  }
  getIngredients(): void {
    this.service.getAllIngredients().subscribe({
      next: (response: string[]) => {
        this.ingredients = response;
      },
      error: (response: any) => {
        console.log('Error: ', response.statusText);
      },
    });
  }
  filterIngredients(event: any) {
    this.params.filter.ingredients = event.target.value;
    this.getCakes();
  }
}
