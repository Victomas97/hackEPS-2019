import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  password: string;

  constructor(public router: Router) {}

  login() {
    if (this.username === "SensorFlow" && Md5.hashStr(this.password)=="935829321ef51d52486deac2e04aa3cb") {
      this.router.navigateByUrl('/graph');
    }
    else {
      alert("Login incorrecte");
    }
  }

}
