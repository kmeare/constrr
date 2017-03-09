import { Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PhaseServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PhaseServices {
  private headers: Headers;
  data: any = null;
  constructor(private http: Http) {}

  getPhases() {
    if (this.data) {
     // already loaded data
     return Promise.resolve(this.data);
   }
   // don't have the data yet
   return new Promise(resolve => {
     // We're using Angular HTTP provider to request the data,
     // then on the response, it'll map the JSON data to a parsed JS object.
     // Next, we process the data and resolve the promise with the new data.
     this.http.get('http://intranet.sicosa.mx:8088/phase/')
     .map(res => res.json())
     .subscribe(res => {
       this.data = res;
       resolve(this.data);
     });
   });
 }

 savePhases(obj) {
    if (this.data) {
     // already loaded data
     return Promise.resolve(this.data);
   }
   // don't have the data yet
   return new Promise(resolve => {
     // We're using Angular HTTP provider to request the data,
     // then on the response, it'll map the JSON data to a parsed JS object.
     // Next, we process the data and resolve the promise with the new data.
     this.http.post('http://intranet.sicosa.mx:8088',obj)
     .map(res => res.json())
     .subscribe(res => {
       this.data = res;
       resolve(this.data);
     });
   });
 }

 addPhaseToWork(id_work,id_phase) {
  //   if (this.data) {
  //    // already loaded data
  //    return Promise.resolve(this.data);
  //  }
   // don't have the data yet
   return new Promise(resolve => {
     // We're using Angular HTTP provider to request the data,
     // then on the response, it'll map the JSON data to a parsed JS object.
     // Next, we process the data and resolve the promise with the new data.
     this.http.post('http://162.243.249.187:8088/work/'+id_work+'/phase/'+id_phase,null)
     .map(res => res.json())
     .subscribe(res => {
       this.data = res;
       resolve(this.data);
     });
   });
 }

 deletePhase(id) {
  //   if (this.data) {
  //    // already loaded data
  //    return Promise.resolve(this.data);
  //  }
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
   // don't have the data yet
   return new Promise(resolve => {

      return this.http.delete('http://intranet.sicosa.mx:8088'+id,{ headers: this.headers })
      .map(res => res.json()).subscribe(res => {
       this.data = res;
       resolve(this.data);
      });
   });
 }

}
