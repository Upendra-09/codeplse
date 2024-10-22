import { Component, OnDestroy, OnInit } from '@angular/core';
import { addBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/Category-model';
import { ImageSelectorService } from 'src/app/shared/components/image-selector/image-selector.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit , OnDestroy {
  model : addBlogPost;
  categories ? : Observable<Category[]>;
  isImageSelectorVisible : boolean = false;
  imageSelectorsubcrption?: Subscription;

  constructor(private blogpostservice: BlogPostService,
     private router:Router,
    private categoryservice: CategoryService,
    private imageSevice:ImageSelectorService
    
     ){
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle : '',
      content: '',
      featuredImageUrl:'',
      author: '',
      isVisible:true,
      publishedDate:new Date(),
      categories:[]
    }
  }

  ngOnDestroy(): void {
    this.imageSelectorsubcrption?.unsubscribe();
  }

  ngOnInit(): void {
   this.categories = this.categoryservice.getAllCategories();

  this.imageSelectorsubcrption = this.imageSevice.onSelectImage().subscribe({
    next:(selectedImage) =>{
      this.model.featuredImageUrl = selectedImage.url;
      this.onClose();
    }
   })
  }

  onFormSubmit() : void {
    console.log(this.model);
    this.blogpostservice.createBlogPost(this.model).subscribe({
      next:(response) => {
          this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }

  onClose(){
    this.isImageSelectorVisible = false;
  }
}
