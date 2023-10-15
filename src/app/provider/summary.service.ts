import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor() { }

  private subject: BehaviorSubject<any> = new BehaviorSubject({} as any);
  
  object: { [key: string]: any} = {}
 
    replaceData(key: string, value: any) {

      // let object: { [key: string]: any} = {}
      
      // this.object[key] = value
      // this.subject.next(this.object);

      if(key in this.object  ) {
        
        // Object.assign(  this.object  , { [key]:  value })

        this.object = { ...this.object, [key]:value} 

      } else {
        this.object[key] =  value
      }

      this.subject.next(this.object);
    }

    replaceDataObject(keyOut: string, keyIn:string, value: any ) {
      if(keyOut in this.object  ) {
        
        this.object[keyOut] = { ...this.object[keyOut], [keyIn]:value} 

      } else {
        this.object[keyOut] = {}
        this.object[keyOut][keyIn] =  value
      }

      this.subject.next(this.object);
    }
 
    clearMessages() {
      // Resetting
      this.object = {};
      this.subject.next(this.object);
    }
 
    getResult(): Observable<any> {
        return this.subject.asObservable();
    }
}
