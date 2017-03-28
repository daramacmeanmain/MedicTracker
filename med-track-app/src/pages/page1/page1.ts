import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  
  public items: any = [];
  constructor(public navCtrl: NavController, public http: Http) {
    
  }

  ionViewWillEnter()
   {
      this.load();
   }

   load(){
     this.http.get('http://51.141.26.155/test.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }

}
