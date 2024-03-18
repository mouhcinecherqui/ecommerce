import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Weekshop';
  showButton: boolean = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 70) {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
  }
  constructor(
    private router: Router) { }

  navigateToAnotherComponent() {
    this.router.navigate(['/home']);
  }
}
