import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Page2 } from '../page2/page2';
import { UserProfilePage } from '../user-profile/user-profile';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  public form : FormGroup;
  public userEmail : any;
  public userPassword : any;
  private baseURI : String  = "http://51.141.24.34/";
  
  page2 = Page2;
  public items: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public fb: FormBuilder) {
    this.form = fb.group({
      "email": [""],
      "password": [""]
    })
  }

   setLogIn(item){
    this.userEmail = item.email;
  }

   logInUser(email, password)
  {
    let body: String = "key=create&email=" + email + "&password=" + password,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "login.php";

    this.http.post(url, body, options).subscribe((data) => {});
    
  }

  saveLogin(){
    let email : string	= this.form.controls["email"].value,
        password : string	= this.form.controls["password"].value;

    this.logInUser(email, password);
    this.navCtrl.push(UserProfilePage);
  }

}
