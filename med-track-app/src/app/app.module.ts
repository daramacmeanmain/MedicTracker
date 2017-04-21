import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AddMedPage } from '../pages/add-med/add-med';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { LogInPage } from '../pages/log-in/log-in';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    AddMedPage,
    UserProfilePage,
    LogInPage


  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    AddMedPage,
    UserProfilePage,
    LogInPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
