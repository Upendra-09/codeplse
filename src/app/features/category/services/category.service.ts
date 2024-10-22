import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.BaseUrl;

  constructor(private htttp: HttpClient ) { }

  addcategory( model: AddCategoryRequest): Observable<void>{
    return this.htttp.post<void>(this.baseUrl +'/api/Categories',model);
  }
  getAllCategories() : Observable<Category[]>{
    return this.htttp.get<Category[]>(this.baseUrl+'/api/Categories');
  }
  
}
