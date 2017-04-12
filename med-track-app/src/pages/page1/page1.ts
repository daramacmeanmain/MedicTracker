import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Page2 } from '../page2/page2';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  
  page2 = Page2;
  public items: any = [];
  constructor(public navCtrl: NavController, public http: Http) {
    //this.navCtrl.push(Page2)
  }

  ionViewWillEnter(){
      this.load();
   }

   load(){
     this.http.get('http://51.141.24.34/test.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }

}
