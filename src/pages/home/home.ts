import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ScreenOrientation
  ]
})
export class HomePage {

  displayNumber1: any;
  displayNumber2: any;
  displayTemp: any;
  displayOperator: any;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public screenOrientation: ScreenOrientation
  ) {
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  numberPad(tap) {
    this.displayNumber1 = parseInt(this.displayNumber1 == undefined ? tap : this.displayNumber1 + tap);
  }

  operatorPad(tap) {
    if (this.displayOperator == undefined) {
      this.displayOperator = tap;
      this.displayTemp = this.displayNumber1;
      this.displayNumber1 = undefined;
    }
    else {
      if (this.displayNumber1 != undefined) {
        if (this.displayOperator == '+') {
          this.displayTemp = this.displayNumber1 + this.displayTemp;
          this.displayOperator = tap;
          this.displayNumber1 = undefined;
        }
        else if (this.displayOperator == '-') {
          this.displayTemp = this.displayTemp - this.displayNumber1;
          this.displayOperator = tap;
          this.displayNumber1 = undefined;
        }
        else if (this.displayOperator == '/') {
          this.displayTemp = this.displayTemp / this.displayNumber1;
          this.displayOperator = tap;
          this.displayNumber1 = undefined;
        }
        else if (this.displayOperator == '*') {
          this.displayTemp = this.displayNumber1 * this.displayTemp;
          this.displayOperator = tap;
          this.displayNumber1 = undefined;
        }
      }
      else{
        this.displayOperator = tap;
      }
    }
  }

  equalPad(tap) {
    if (this.displayNumber1 != undefined) {
      if (this.displayOperator == '+') {
        this.displayNumber1 = this.displayNumber1 + this.displayTemp;
        this.displayOperator = undefined;
        this.displayTemp = undefined;
      }
      else if (this.displayOperator == '-') {
        this.displayNumber1 = this.displayTemp - this.displayNumber1;
        this.displayOperator = undefined;
        this.displayTemp = undefined;
      }
      else if (this.displayOperator == '/') {
        this.displayNumber1 = this.displayTemp / this.displayNumber1;
        this.displayOperator = undefined;
        this.displayTemp = undefined;
      }
      else if (this.displayOperator == '*') {
        this.displayNumber1 = this.displayNumber1 * this.displayTemp;
        this.displayOperator = undefined;
        this.displayTemp = undefined;
      }
    }
    else{
      this.displayNumber1 = this.displayTemp;
      this.displayOperator = undefined;
      this.displayTemp = undefined;
    }
  }

  clear(tap) {
    this.displayNumber1 = undefined;
    this.displayOperator = undefined;
    this.displayTemp = undefined;
  }

}
