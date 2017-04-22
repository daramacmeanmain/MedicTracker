import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  public items: any = [];
  public uItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {}

  ionViewWillEnter(){
      this.load();
      this.loadName();
   }

   load(){
     this.http.get('http://51.141.24.34/login.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }

   loadName(){
     this.http.get('http://51.141.24.34/getName.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.uItems = data;
      });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

}
