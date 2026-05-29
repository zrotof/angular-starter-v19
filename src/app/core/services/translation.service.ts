import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lang, AVAILABLE_LANGS, DEFAULT_LANG } from '../types/lang.types';

@Injectable({ providedIn: 'root' })
export class TranslationService {

  private http = inject(HttpClient);

  readonly lang = signal<Lang>(this.getInitialLang());
  private readonly translations = signal<Record<string, any>>({});

  constructor() {
    this.load(this.lang());
  }

  private getInitialLang(): Lang {
    const saved = localStorage.getItem('lang') as Lang | null;
    return saved && AVAILABLE_LANGS.includes(saved)
      ? saved
      : DEFAULT_LANG;
  }

  private load(lang: Lang) {
    this.http
      .get<Record<string, any>>(`/i18n/${lang}.json`)
      .subscribe(data => this.translations.set(data));
  }

  setLang(lang: Lang) {
    if (!AVAILABLE_LANGS.includes(lang)) return;

    this.lang.set(lang);
    localStorage.setItem('lang', lang);
    this.load(lang);
  }

  translate(key: string): string {
    const dict = this.translations();
    const value = key
      .split('.')
      .reduce((acc, part) => acc?.[part], dict);

    return typeof value === 'string' ? value : key;
  }
}