import { Injectable } from '@angular/core';
import { addBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
baseurl = environment.BaseUrl
  constructor(private http: HttpClient) { }

  createBlogPost(data: addBlogPost):Observable<BlogPost>{
   return this.http.post<BlogPost>(this.baseurl + '/api/blogposts', data)
  }

  getAllBlogPosts() : Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(this.baseurl+'/api/BlogPosts');

  }
   
  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(this.baseurl+'/api/blogposts/'+ id.toString());
  }
  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(this.baseurl+'/api/blogPosts/'+ urlHandle);
  }
  updateBlogPost(id: string, updateBlogPost:UpdateBlogPost):Observable<BlogPost>{
    return this.http.put<BlogPost>(this.baseurl+'/api/blogposts/'+ id.toString(),updateBlogPost);
  }
  DeleteBlogPostById(id: string):Observable<BlogPost>{
    return this.http.delete<BlogPost>(this.baseurl+'/api/blogposts/'+ id.toString());
  }

}


