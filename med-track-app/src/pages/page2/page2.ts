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
  public userName : any;
  public userEmail : any;
  public userPass : any;
  //public userConfirm : any;
  private baseURI : String  = "http://51.141.24.34/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public fb: FormBuilder, public modalCtrl: ModalController) {
    this.form = fb.group({
      "name": [""],
      "email": [""],
      "password": [""]
    })
  }

  /*addMedication(){
    let addMedModal = this.modalCtrl.create(AddMedPage);  
    addMedModal.present();
    addMedModal.onDidDismiss(data=>{
        console.log("Data =>", data)
    })
  }*/

  setUser(item)
   {
      this.userName = item.name;
      this.userEmail = item.email;
      this.userPass = item.password;
   }

   createUser(name, email, password)
  {
    let body: String = "key=create&name=" + name + "&email=" + email + "&password=" + password,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "userPost.php";

    this.http.post(url, body, options).subscribe((data) => {});
    
  }

  saveUser()
  {
    let name : string	= this.form.controls["name"].value,
        email : string	= this.form.controls["email"].value,
        password : string	= this.form.controls["password"].value;

        this.createUser(name, email, password);
        this.navCtrl.push(Page1);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }
}
