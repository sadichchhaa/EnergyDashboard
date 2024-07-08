import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectPeriodService {

  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data: Observable<any> = this.dataSubject.asObservable();

  setData(value: any) {
    this.dataSubject.next(value);
  }

  constructor() { }
}
