import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import { Page2 } from '../page2/page2';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMedPage');
  }

}
