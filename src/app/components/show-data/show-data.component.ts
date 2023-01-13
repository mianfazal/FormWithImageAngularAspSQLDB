import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit{
  imageSource: any ;
  image:any =[]
  path:any;

@Input() showImage?:string 
  constructor(private sanitizer: DomSanitizer, private http: HttpClient){
   
  }

   ngOnInit () {
   this.loadImage()

  }

  loadImage(){
  
    const Name = this.showImage
    console.log("name ",Name)
    this.http.get("https://localhost:7106/api/CreateRecord/getRecordByImageName/"+Name)
   . subscribe({
       next:  async (response) =>  {
         this.image = response; 
         this.path = this.image.path;      
         await this.setValue();
        
        },  
       error: (error) => console.log(error)
     })
     
  }

  async setValue(){
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.path}`);
  }
  
  
}
