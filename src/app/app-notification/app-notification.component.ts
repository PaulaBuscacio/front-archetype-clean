import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-notification.component.html',
  styleUrl: './app-notification.component.css'
})
export class AppNotificationComponent {
 message: string = '';

  constructor(private notificationService: NotificationService) {
    this.notificationService.getNotification().subscribe(notification => {
      this.message = notification.message;
       setTimeout(() => this.message = '', 5000);
    });
  }

  close() {
    this.message = '';
  }

}
