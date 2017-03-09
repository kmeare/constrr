import {Pipe} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'SerialPipe'
})
export class SerialPipe {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, args) {
    // ES6 array destructuring
    let [serial] = args;
    return value.filter(ware => {
      return ware.serie;
    });
  }

}