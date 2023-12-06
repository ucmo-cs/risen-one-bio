// shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userIdSource = new BehaviorSubject<string>('');

  currentUserId = this.userIdSource.asObservable();

  constructor() {}

  setUserId(userId: string) {
    this.userIdSource.next(userId);
  }
}
