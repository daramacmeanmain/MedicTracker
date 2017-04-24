import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, AlertController } from 'ionic-angular'
import { Http, RequestOptions, Headers } from '@angular/http';

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
  public medName: any;
  public medDose: any;
  public medFrq: any;
  public userId: any;
  private baseURI : String  = "http://51.141.24.34/"; 

  constructor(public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {}

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

   editMed(med, dose, frq, uid)
  {
    let body: String = "key=create&med=" + med + "&dose=" + dose + "&frq=" + frq + "&uid=" + uid,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "medUpdate.php";

    this.http.post(url, body, options).subscribe((data) => {
      
    });
    
  }

  delMed(med, uid)
  {
    let body: String = "key=create&med=" + med + "&uid=" + uid,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "medDelete.php";

    this.http.post(url, body, options).subscribe((data) => {
      
    });
    
  }

  setMed(item)
   {
      this.medName = item.med;
      this.medDose = item.dose;
      this.medFrq = item.frq;
      this.userId = item.uid;
   }

   presentActionSheet(){
     let actionSheet = this.actionSheetCtrl.create({
       title: 'What would you like to do?',
     buttons: [
       {
         text: 'Edit Prescription',
         role: 'edit',
         handler: () => {
           console.log('edit clicked');
           this.presentEdit();
         }
       },
       {
         text: 'Delete Prescription',
         role: 'del',
         handler: () => {
           console.log('del clicked');
           this.presentDelete();
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('cancel clicked');
         }
       }

     ]
    });
    
    actionSheet.present();
   }

   presentEdit() {
      let editAlert = this.alertCtrl.create({
      title: 'Edit',
      inputs: [
        {
          name: 'mEdit',
          placeholder: 'Medication'
        },
        {
          name: 'dEdit',
          placeholder: 'Dosage'
        },
        {
          name: 'fEdit',
          placeholder: 'Number of Times per Day'
        },
        {
          name: 'uEdit',
          placeholder: 'ID'
        }
      ],
      buttons: [
        {
          text: 'Confirm',
          handler: data => {
              let med : string = data.mEdit,
                  dose : string = data.dEdit,
                  frq : string = data.fEdit,
                  uid : string = data.uEdit

                  this.editMed(med, dose, frq, uid);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    editAlert.present();

   }

    presentDelete() {
      let delAlert = this.alertCtrl.create({
      title: 'Delete',
      inputs: [
        {
          name: 'mDelete',
          placeholder: 'Medication'
        },
        {
          name: 'uDelete',
          placeholder: 'ID'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
           let med : string = data.mDelete,
               uid : string = data.uDelete;

               this.delMed(med, uid);
          }
        },
      ]
    });

    delAlert.present();

   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

}
