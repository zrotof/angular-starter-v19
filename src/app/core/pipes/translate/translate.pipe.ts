import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {

  private translation = inject(TranslationService);

  transform(key: string): string {
    this.translation.lang();
    return this.translation.translate(key);
  }
}