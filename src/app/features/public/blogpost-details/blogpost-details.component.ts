import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../Blog-post/models/blog-post.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../Blog-post/services/blog-post.service';

@Component({
  selector: 'app-blogpost-details',
  templateUrl: './blogpost-details.component.html',
  styleUrls: ['./blogpost-details.component.css']
})
export class BlogpostDetailsComponent implements OnInit {
  url: string | null = null;
  blogPost$? : Observable<BlogPost>;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService) {

  }
  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next: (params) => {
        this.url = params.get('url');
      }
    });

    // Fetch blog details by url
    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }
}


