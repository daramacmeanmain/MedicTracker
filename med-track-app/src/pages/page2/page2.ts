import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  public form : FormGroup;
  public testWord : String;
  public testNum : number;
  private baseURI : String  = "http://51.141.26.155/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public fb: FormBuilder) {
    this.form = fb.group({
      "word": ["", Validators.required],
      "num": ["", Validators.required]
    })
  }

  selectPost(item)
   {
      this.testWord = item.word;
      this.testNum = item.num;
   }

   testPost(testWord, testNum)
  {
    let body: String = "key=create&word" + testWord + "&num" + testNum,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "testPost.php";

    this.http.post(url, body, options).subscribe((data) => {});
    
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }
}
