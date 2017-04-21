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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {}

  ionViewWillEnter(){
      this.load();
   }

   load(){
     this.http.get('http://51.141.24.34/getData.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

}
