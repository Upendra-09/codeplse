import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageSelectorService } from './image-selector.service';
import { BlogImage } from './models/blog-image.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = '';
  title:string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form',{static:false}) imageUploadform?: NgForm;

  constructor(private imageService:ImageSelectorService){

  }
  ngOnInit(): void {
   this.getImages();
  }

  onFileUploadChange(event: Event):void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  
  uploadImage(): void {
    if(this.file && this.fileName !== '' && this.title !== ''){
      this.imageService.uploadImage(this.file, this.fileName,this.title).subscribe({
        next:(response) =>{
          this.imageUploadform?.resetForm();
           this.getImages();
        }
      });
    }
   }
   private getImages(){
    this.images$ = this.imageService.getAllImages();
   }

   selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }
}
