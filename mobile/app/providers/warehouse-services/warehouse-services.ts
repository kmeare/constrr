import { Injectable } from '@angular/core';
import { HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WarehouseServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WarehouseServices {
  private headers: Headers;
  data: any = null;
  constructor(private http: Http) {
        // this.headers = new Headers();
        // this.headers.append('Content-Type', 'application/json');
        // this.headers.append('Method', 'PUT');
        
  }
        

  getWares() {
    if (this.data) {
     // already loaded data
     return Promise.resolve(this.data);
   }
   // don't have the data yet
   return new Promise(resolve => {
     // We're using Angular HTTP provider to request the data,
     // then on the response, it'll map the JSON data to a parsed JS object.
     // Next, we process the data and resolve the promise with the new data.
     this.http.get('http://intranet.sicosa.mx:8088/warehouse/')
     .map(res => res.json())
     .subscribe(res => {
       this.data = res;
       resolve(this.data);
     });
   });
 }

 getWaresById(id) {
    if (this.data) {
     // already loaded data
     return Promise.resolve(this.data);
   }
   // don't have the data yet
   return new Promise(resolve => {
     // We're using Angular HTTP provider to request the data,
     // then on the response, it'll map the JSON data to a parsed JS object.
     // Next, we process the data and resolve the promise with the new data.
     this.http.get('http://intranet.sicosa.mx:8088/warehouse?work='+id)
     .map(res => res.json())
     .subscribe(res => {
       this.data = res;
       resolve(this.data);
     });
   });
 }

 saveWare(obj) {
   
		// if (this.data) {
    //   console.log(this.data);
		// 	// already loaded data
		// 	return Promise.resolve(this.data);
		// }
    
		// don't have the data yet
		return new Promise(resolve => {
			// We're using Angular HTTP provider to request the data,
			// then on the response, it'll map the JSON data to a parsed JS object.
			// Next, we process the data and resolve the promise with the new data.
			this.http.post('http://intranet.sicosa.mx:8088/warehouse',obj)
			.map(res => res.json())
			.subscribe(res => {
				this.data = res;
				resolve(this.data);
			});
		});
	}

 updateWares(ware_id,obj) {
    if (this.data) {
     // already loaded data
     return Promise.resolve(this.data);
   }

  console.log(ware_id);
  console.log(obj);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  let body = JSON.stringify(obj);
   // don't have the data yet
   return new Promise(resolve => {

      return this.http.put('http://intranet.sicosa.mx:8088/warehouse/'+ware_id,body,{ headers: this.headers })
      .map(res => res.json()).subscribe(res => {
       this.data = res;
       resolve(this.data);
      });
   });
 }

 deleteWare(id) {
  //   if (this.data) {
  //    // already loaded data
  //    return Promise.resolve(this.data);
  //  }
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
   // don't have the data yet
   return new Promise(resolve => {

      return this.http.delete('http://intranet.sicosa.mx:8088/warehouse/'+id,{ headers: this.headers })
      .map(res => res.json()).subscribe(res => {
       this.data = res;
       resolve(this.data);
      });
   });
 }
}
