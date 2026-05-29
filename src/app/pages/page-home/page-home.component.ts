import { Component } from '@angular/core';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss',
  imports: [
    HeroBannerComponent
  ]
})

export class PageHomeComponent {

}
