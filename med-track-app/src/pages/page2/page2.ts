import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ModalController, NavParams, Platform, ViewController } from 'ionic-angular';
import { AddMedPage } from '../add-med/add-med';


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  public form : FormGroup;
  public userName : any;
  public medName : any;
  public medDose : any;
  public medFrq : any;
  private baseURI : String  = "http://51.141.24.34/";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public fb: FormBuilder,
              public modalCtrl: ModalController) {
    this.form = fb.group({
      "name": ["", Validators.required],
      "med": ["", Validators.required],
      "dose": ["", Validators.required],
      "frq": ["", Validators.required]
    })
  }

  addMedication(){
    let addMedModal = this.modalCtrl.create(AddMedPage);  
    addMedModal.present();
  }

  selectPost(item)
   {
      this.userName = item.name;
      this.medName = item.med;
      this.medDose = item.dose;
      this.medFrq = item.frq;
   }

   createPost(name, med, dose, frq)
  {
    let body: String = "key=create&word=" + name + "&num=" + med,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "testPost.php";

    this.http.post(url, body, options).subscribe((data) => {});
    
  }

  savePost()
  {
    let name : string	= this.form.controls["name"].value,
        med	: string 	= this.form.controls["med"].value,
        dose : string	= this.form.controls["dose"].value,
        frq	: string 	= this.form.controls["frq"].value;

        this.createPost(name, med, dose, frq);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }
}
