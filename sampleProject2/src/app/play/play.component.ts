import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { play } from '../book';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private http:HttpClient,private valid:ValidateService) { }

  ngOnInit(): void {
      this.valid.getqns()
  }
qns:play[]=[]
b=''
c=''
d=''
show=false
check1:play[]=[]
ans=['Uttarakhand','Goa','NASA','Moon','elected members of the legislative assembly']
start(){
  this.qns=this.valid.qns
  this.show=!this.show
}
  

  qn(a:any){
    console.log(a);
    this.http.post('https://login-9a0c9-default-rtdb.firebaseio.com/play.json',a).subscribe()
    this.b=''
    this.c=''
    this.d=''
    
  }
count=0
save=false
coupan=false
coupan1=false
  check(a:any,b:play){
   
    for (let i = 0; i < this.ans.length; i++) {
      console.log(a,this.ans[i] );
      if(a==this.ans[i] && !this.check1.includes(a)){
        console.log(a);
        this.save=true
        this.count++
      }  
    }
    this.check1.push(a)
    this.qns.splice(this.qns.indexOf(b),1)
    console.log(this.check1.length);
    if(this.check1.length==5){
      if(this.count>3){
        this.coupan=true
      }
      else{
        this.coupan1=true
      }

      
    }
  }

  
}
