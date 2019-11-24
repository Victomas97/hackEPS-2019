import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class RestProvider {

    baseUrl: string = "http://craftyourvoice.tk:5000";

    constructor(private http: HttpClient) { }

    getTemperature() {
        const url = this.baseUrl + '/getAllData';
        return this.http.get(url);
    }

    postTemperature(temperature: number) {
        console.log(temperature);
        const url = this.baseUrl + '/postTemperature';
        const body = {
            temperature
        }
        this.http.post(url, body).subscribe(data => {
            console.log(data);
   
           }, error => {
            console.log(error);
          });
    }
}