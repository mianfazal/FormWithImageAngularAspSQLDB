import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'saveImageWebApiDB';
  imageNameFromParent?:string  
  UrlPostform: FormGroup ;
  show=false;
  resData?:any=[]

  constructor(private fb:FormBuilder,private http: HttpClient, private router: Router) {
    this.UrlPostform = this.fb.group({
      image: [null,Validators.required],
      imageName : ['', Validators.required],
    });
  }
  ngOnInit(): void {
 
  }

  uploadFile( event:any){
    
    const inputImage = event.target.files[0];
    this.UrlPostform.patchValue({
    image: inputImage,
    });
    this.UrlPostform.get('image')?.updateValueAndValidity();
   
  }
    
  postImage() {

    if(this.UrlPostform.get('imageName')?.value !='' && this.UrlPostform.get('image')?.value !=null){
      
      var formData: any = new FormData();
      formData.append('ImageName', this.UrlPostform.get('imageName')?.value);
      formData.append('ProfilePicture', this.UrlPostform.get('image')?.value);
    
      this.http.post("https://localhost:7106/api/CreateRecord/createRecord", formData).subscribe({
        next:  async (response) =>  {
          this.resData = response; 
          await this.setValue();
          this.UrlPostform.reset()
         },  
        error: (error) => console.log(error)
    })
    }

    else{
      alert("Please insert Data")
    }
  }
 async setValue(){
    this.imageNameFromParent = this.resData.message;
    this.show=true;
  }

  back(){

    this.show=false;
    const path = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange:true}).then(()=>{
      this.router.navigate([path])
    })
  }
  
}
