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
