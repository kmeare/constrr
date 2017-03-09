import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WorkServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorkServices {

  data: any = null;
  constructor(private http: Http) {}

  getWorks() {
    if (this.data) {
     // already loaded data
     return Promise.resolve(this.data);
   }
   // don't have the data yet
   return new Promise(resolve => {
     // We're using Angular HTTP provider to request the data,
     // then on the response, it'll map the JSON data to a parsed JS object.
     // Next, we process the data and resolve the promise with the new data.
     this.http.get('http://intranet.sicosa.mx:8088/work/')
     .map(res => res.json())
     .subscribe(res => {
       this.data = res;
       resolve(this.data);
     });
   });
 }

 getWorkById(id) {
   if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
   }
    // don't have the data yet
   return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('http://intranet.sicosa.mx:8088/work/'+id)
      .map(res => res.json())
      .subscribe(res => {
        this.data = res;
        resolve(this.data);
      });
    });
  }
}
