import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ModalController, NavParams, Platform, ViewController } from 'ionic-angular';
import { AddMedPage } from '../add-med/add-med';
import { Page1 } from  '../page1/page1';


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  public data: any = "";
  public form : FormGroup;
  public uName : any;
  public userName : any;
  public userPass : any;
  private baseURI : String  = "http://51.141.24.34/";

//get form data
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public fb: FormBuilder, public modalCtrl: ModalController) {
    this.form = fb.group({
      "name": [""],
      "username": [""],
      "password": [""]
    })
  }

  setUser(item)
   {
      this.uName = item.name;
      this.userName = item.username;
      this.userPass = item.password;
   }

//post request for user creation
   createUser(name, username, password)
  {
    let body: String = "key=create&name=" + name + "&username=" + username + "&password=" + password,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "userPost.php";

    this.http.post(url, body, options).subscribe((data) => {});
    
  }

  saveUser()
  {
    let name : string	= this.form.controls["name"].value,
        username : string	= this.form.controls["username"].value,
        password : string	= this.form.controls["password"].value;

        this.createUser(name, username, password);//pass data to post request
        this.navCtrl.push(Page1);
  }
}
