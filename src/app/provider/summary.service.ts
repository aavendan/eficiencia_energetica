import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor() { }

  private subject: BehaviorSubject<any> = new BehaviorSubject({} as any);
  
  object: { [key: string]: any} = {}
 
    replaceValue(key: string, value: string) {

      // let object: { [key: string]: any} = {}
      
      this.object[key] = value

      this.subject.next(this.object);
    }
 
    // clearMessages() {
    //     this.subject.next();
    // }
 
    getResult(): Observable<any> {
        return this.subject.asObservable();
    }
}
