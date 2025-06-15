import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ArchetypePostComponentComponent } from './archetype-post-component/archetype-post-component.component';
import { AppNotificationComponent } from './app-notification/app-notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ArchetypePostComponentComponent, AppNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-archetype-clean';

  constructor(private http: HttpClient) {}


}

