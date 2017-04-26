import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, AlertController } from 'ionic-angular'
import { Http, RequestOptions, Headers } from '@angular/http';
import { Page1 } from  '../page1/page1';

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

//Initialise variables
  public items: any = [];
  public uItems: any = [];
  public idItems: any = [];
  public medName: any;
  public newMed: any;
  public medDose: any;
  public medFrq: any;
  public userId: any;
  public userIdCheck: any;
  public userName: string;
  private baseURI : String  = "http://51.141.24.34/"; 

  constructor(public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.userName = this.navParams.get('username'); //retrieve username for passing in app
    this.userId = this.navParams.get('uid'); // retrieve id
  }

//calling load functions
  ionViewWillEnter(){
      this.load();
      this.loadName();
   }

//get profile data from the server
   load(){
     this.http.get('http://51.141.24.34/login.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.items = data;
      });
   }

//call the session_destroy() function on the server and end the user session
   logout(){
     this.http.get('http://51.141.24.34/logout.php')
      .map(res => res.json())
      .subscribe(data =>
      {});
   }

//retrieve the user's name to display in the navbar
   loadName(){
     this.http.get('http://51.141.24.34/getName.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.uItems = data;
      });
   }


   loadId(){
     this.http.get('http://51.141.24.34/getUid.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.idItems = data;
         for(let idItem of this.idItems){
           this.userIdCheck = idItem;
         }
      });
   }

//post request for edit funciton
   editMed(med, nMed, dose, frq, username, uid)
  {
    let body: String = "key=create&med=" + med + "&nMed=" + nMed + "&dose=" + dose + "&frq=" + frq + "&username=" + username + "&uid=" + uid,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "medUpdate.php";

    this.http.post(url, body, options).subscribe((data) => {
      
    });
    
  }

//post request for delete function
  delMed(med, username, uid)
  {
    let body: String = "key=create&med=" + med + "&username=" + username + "&uid=" + uid,
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
      this.newMed = item.nMed;
      this.medDose = item.dose;
      this.medFrq = item.frq;
      this.userName = item.username;
      this.userId = item.uid;
   }

//open action sheet for options
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
         text: 'Logout',
         role: 'out',
         handler: () => {
           console.log('out clicked');
           this.navCtrl.push(Page1);
           this.logout();
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

//open edit alert
   presentEdit() {
      let editAlert = this.alertCtrl.create({
      title: 'Edit',
      inputs: [
        {
          name: 'mEdit',
          placeholder: 'Medication to Edit'
        },
        {
          name: 'newEdit',
          placeholder: 'New Medication Name'
        },
        {
          name: 'dEdit',
          type: 'number',
          placeholder: 'Dosage'
        },
        {
          name: 'fEdit',
          type: 'number',
          placeholder: 'Number of Times per Day'
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
              let med : string = data.mEdit,
                  nMed: string = data.newEdit,
                  dose : string = data.dEdit,
                  frq : string = data.fEdit,
                  username: string = this.userName,
                  uid: string = this.userId

                  this.editMed(med, nMed, dose, frq, username, uid);//pass the data into the post method for edit
                  this.navCtrl.push(UserProfilePage, {username});//push to reload the page and pass the username with is
          }
        }
      ]
    });

    editAlert.present();

   }

//show delete alert
    presentDelete() {
      let delAlert = this.alertCtrl.create({
      title: 'Delete',
      inputs: [
        {
          name: 'mDelete',
          placeholder: 'Medication'
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
               username: string = this.userName,
               uid: string = this.userId

               this.delMed(med, username, uid);//pass data to the post method for delete
               this.navCtrl.push(UserProfilePage, {username});//reload page / pass username
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
