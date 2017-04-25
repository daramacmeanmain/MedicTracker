import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams, ModalController, Modal, ViewController } from 'ionic-angular';
import { Page2 } from '../page2/page2';
import { UserProfilePage } from '../user-profile/user-profile';

/*
  Generated class for the AddMed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-med',
  templateUrl: 'add-med.html'
})
export class AddMedPage {
  public form : FormGroup;
  public items: any = [];
  public medName : any;
  public medDose : any;
  public medFrq : any;
  public uId : any;
  public userId : number;
  private baseURI : String  = "http://51.141.24.34/";

  userProfile = UserProfilePage;
  
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public fb: FormBuilder) {
    this.form = fb.group({
      "med": [""],
      "dose": [""],
      "frq": [""],
      "uid": [""]
    })
  }

  ionViewWillEnter(){
      this.loadId();
   }

  loadId(){
     this.http.get('http://51.141.24.34/getUid.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }

  createMed(med, dose, frq, uid)
  {
    let body: String = "key=create&med=" + med + "&dose=" + dose + "&frq=" + frq + "&uid=" + uid,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "medPost.php";

    this.http.post(url, body, options).subscribe((data) => {});
    
  }

  setMed(item)
   {
      this.medName = item.med;
      this.medDose = item.dose;
      this.medFrq = item.frq;
      this.userId = item.uid;
   }

  saveMed(){
    let med	: string 	= this.form.controls["med"].value,
        dose : string	= this.form.controls["dose"].value,
        frq	: string 	= this.form.controls["frq"].value,
        uid	: string 	= this.form.controls["uid"].value;

    //console.log(this.loadId().userId);

    this.createMed(med, dose, frq, uid);
    this.navCtrl.push(UserProfilePage, {uid});
  }

  reload(){
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMedPage');
  }

}
