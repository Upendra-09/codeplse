import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  id : string | null = null;

  constructor(private categoryservice:CategoryService,
              private route : ActivatedRoute
              ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(Params)=>{
        this.id = Params.get('id');
      }
    });
  }

}
