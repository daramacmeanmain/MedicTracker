import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';

/*
  Generated class for the LogIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {

  public form : FormGroup;
  public userEmail : any;
  private baseURI : String  = "http://51.141.24.34/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public fb: FormBuilder) {
    this.form = fb.group({
      "email": [""]
    })
  }

  setLogIn(item){
    this.userEmail = item.email;
  }

  logInUser(email)
  {
    let body: String = "key=create&email=" + email,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "login.php";

    this.http.post(url, body, options).subscribe((data) => {});
    
  }

  saveLogin(){
    let email : string	= this.form.controls["email"].value;

    this.logInUser(email);
    this.navCtrl.push(UserProfilePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

}
