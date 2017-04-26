# MedicTracker - Third Year Project

## Installation and Configuration

In order to run this application in either a browser or an android device, the following components must be installed. 

* Node.js
* Cordova
* Ionic

Node.js can be downloaded [here](http://nodejs.org/), select a version to download and install it. When Node.js is installed, you can install Cordov ausing the following command

`$ npm install -g cordova`

Once Cordova is installed, you can in install Ionic in a similar fashion

`$ npm install -g ionic`

Once Ionic is installed, the git repository can be then cloned onto your PC to a directory of your choosing. Once this is complete, perform a `cd` command into the directory that you cloned the repository and run the command

`$ ionic serve`, should you wish to run the app in your browser, or  
`$ ìonic run android`, to export the app to an Android device which is connected to your PC via USB.

It's important to note that in order to run it on a device, the device in question must have USB debugging options enabled. Instructions on how to do this can be found [here](https://developer.android.com/studio/run/device.html) as they vary between manufacturers.

I would recommend exporting to Android instead of running via `ionic serve`, as significants parts of the app appear not to function when the latter method is used.


## User Guide

To use the features of this app, you must first create a profile by tapping the "CREATE PROFILE" button on the launch screen. This will bring you to a form which will allow you to enter your profile details. Fillout the form and tap continue

![create-profile](http://i.imgur.com/FJEsajG.png)

You will then be returned to the home screen where you can enter the username and password you created to log in. Type in your credentials and tap "LOG IN".  
Once in the profile page, tapping the button in the top left corner will open a side menu, from which you can tap "Add Prescription" to add a new prescription to your profile.  
To add a new prescription, fill out the form with the relevant details, then tap "Confirm ID". An alert will pop up along with a number. Tap the number and hit OK, then tap FINISH to continue and return to the user profile.

![add-pre](http://i.imgur.com/fZw75mp.png)

The profile page should now display the new prescription you just added. In the top right corner is an options menu. Tap that to bring up the option to either edita prescription, delete a prescription or log out.  
To edit a prescription, input the name of the medication you with to modify, then input the updated details and select CONFIRM.  
To delete a prescription, input the name of the medication you with to delete and select CONFIRM.  

![options](http://i.imgur.com/mn8PRz7.png)  ![edit-pre](http://i.imgur.com/z4TCfJl.png)  ![del-pre](http://i.imgur.com/lw83X74.png)

When you're finished, you can open the options menu again and tap Logout to end the session and return to the main screen. To exit the app, hit the back button on your device and the app will close.
