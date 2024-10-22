import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { CategoryService } from '../services/category.service';
import { Route, Router } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  {

  model:AddCategoryRequest;

  addCategorySubscribtion?: Subscription;
  
  constructor(private categoryservice:CategoryService,private router:Router){
    this.model={
      name:'',
      urlHandle:''
    };
  }

  onFormSubmit(){
   this.addCategorySubscribtion = this.categoryservice.addcategory(this.model )
    .subscribe({
      next:(response)=>{
       this.router.navigateByUrl("admin/categories");
      }
    })
  }

}
