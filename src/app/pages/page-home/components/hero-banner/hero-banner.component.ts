import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConvertStringLabelToFontawesomeIconPipe } from '../../../../core/pipes/convertStringLabelToFontawesomeIcon/convert-string-label-to-fontawesome-icon.pipe';


interface Slide {
  id: number;
  title: string;
  description: string;
  backgroundUrl: string;
}

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    ConvertStringLabelToFontawesomeIconPipe
  ]
})

export class HeroBannerComponent {

    currentSlideIndex = signal(0);
  
  // État de pause pour l'interaction utilisateur (non utilisé ici, mais bonne pratique)
  isPaused = signal(false); 
  
  // Durée du timer en millisecondes. Doit correspondre à l'animation CSS (5s = 5000ms)
  readonly timerDuration = 5000; 

  // --- Données du Slider ---

  protected slides: Slide[] = [
    {
      id: 1,
      title: "Dans l’œil de… Ysé, sur la route des Balkans",
      description: "Présentation de la fédération le 18 Avril 2026",
      backgroundUrl: "/images/home/hero/first.jpg",
    },
    {
      id: 2,
      title: "Du 14 au 30 novembre 2025, découvrez le Festival des Solidarités (Festisol)",
      description: "Du 14 au 30 novembre 2025, découvrez le Festival des Solidarités (Festisol)",
      backgroundUrl: "/images/home/hero/second.webp",
    },
    {
      id: 3,
      title: "Guinée : L’indispensable adaptation au changement climatique",
      description: "Guinée : L’indispensable adaptation au changement climatique",
      backgroundUrl: "/images/home/hero/third.webp",
    }
  ];

  // --- Logique du Slider (Sans SetInterval) ---
  
  constructor() {
    // La logique de transition est gérée par l'événement d'animation CSS 'animationiteration'
    // qui se déclenche à la fin de chaque boucle (voir le template HTML).
  }
  
  /**
   * Navigue vers une slide spécifique.
   * @param index L'index (0, 1, 2) de la slide cible.
   */
  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlideIndex.set(index);
      // Réinitialise le timer en forçant l'application de la nouvelle animation
      // (Le DOM gère lui-même la réinitialisation de l'animation lors du changement de slide actif)
    }
  }

  /**
   * Déclenché lorsque l'animation CSS 'timer-progress' est terminée.
   * Fait passer automatiquement à la slide suivante.
   * @param slideIndex L'index de la slide qui vient d'expirer.
   */
  onTimerEnd(slideIndex: number): void {
    // Vérifie si le timer qui vient de se terminer correspond bien à la slide actuelle
    if (this.currentSlideIndex() === slideIndex) {
      const nextIndex = (slideIndex + 1) % this.slides.length;
      this.currentSlideIndex.set(nextIndex);
      // L'animation pour le nouvel élément actif redémarre automatiquement
    }
  }
}
