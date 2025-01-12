import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/Blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/Blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/Blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogpostDetailsComponent } from './features/public/blogpost-details/blogpost-details.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  {
    path : '',
    component:HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'blog/:url',
    component: BlogpostDetailsComponent
  },
  {
    path:'admin/categories',
    component: CategoryListComponent
  },
  {
    path:'admin/categories/add',
    component: AddCategoryComponent
  },
  {
    path:'admin/categories/:id',
    component: EditCategoryComponent
  },
  {
    path:'admin/blogposts',
    component: BlogpostListComponent
  },
  {
    path:'admin/blogposts/add',
    component: AddBlogpostComponent
  },
  {
    path:'admin/blogposts/:id',
    component: EditBlogpostComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
