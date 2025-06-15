import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$ = new Subject<{message: string, type: 'success' | 'error'}>();

  getNotification() {
    return this.notification$.asObservable();
  }

  showError(message: string) {
    this.notification$.next({message, type: 'error'});
  }

  showSuccess(message: string) {
    this.notification$.next({message, type: 'success'});
  }
}
