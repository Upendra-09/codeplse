import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Category } from '../../category/models/Category-model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blog-post';
import { ImageSelectorService } from 'src/app/shared/components/image-selector/image-selector.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit , OnDestroy{
 id: string | null = null;
 model?: BlogPost;
 categories$? : Observable<Category[]>;
 selectedCategories?: string[];
 isImageSelectorVisible : boolean = false;
  
 routeSubscription? : Subscription
 getBlogPostSubscription?: Subscription;
 updateBlogPostSubscription? : Subscription;
 deleteBlogPostSubscription?: Subscription;
 imageSelectSubscricption?: Subscription;
 

  constructor(private route:ActivatedRoute,
              private blogPostService:BlogPostService,
              private categoryService:CategoryService ,
              private router:Router,
              private imageService: ImageSelectorService
  ){}


  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get BlogPost From API
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
        }
      }
    });
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get BlogPost From API
        
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
          
        }
        this.imageService.onSelectImage()
        .subscribe({
          next:(response)=>{
            if(this.model){
            this.model.featuredImageUrl = response.url;
            this.isImageSelectorVisible = false;
          }
        }
        });
      }
    });

    
  
  }

  onFormSubmit():void{
    // convert domain model to request object

    if(this.model && this.id){
      var updateBlogPost: UpdateBlogPost={
        author: this.model.author,
        content:this.model.content,
        shortDescription:this.model.shortDescription,
        featuredImageUrl:this.model.featuredImageUrl,
        isVisible:this.model.isVisible,
        publishedDate:this.model.publishedDate,
        title:this.model.title,
        urlHandle:this.model.urlHandle,
        categories:this.selectedCategories?? []
      };
     this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next:(response) => {
        console.log(response)
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (error) => {
          console.error('Error updating blog post', error);
      }
      });
    }
  }

  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }

  onClose(){
    this.isImageSelectorVisible = false;
  }

  onDelete():void{
    if(this.id){
      // call service and delete blogpost
     this.deleteBlogPostSubscription = this.blogPostService.DeleteBlogPostById(this.id).subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/blogposts')
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscricption?.unsubscribe();
  }
}
