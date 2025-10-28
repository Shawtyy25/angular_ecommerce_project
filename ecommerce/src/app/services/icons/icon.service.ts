import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, shareReplay} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private http = inject(HttpClient);
  private iconsCache$?: Observable<string[]>;

  private readonly PRIMEICONS_CSS_URL = 'https://unpkg.com/primeicons@7.0.0/primeicons.css';


  getAllPrimeIcons(): Observable<string[]> {
    if (!this.iconsCache$) {
      this.iconsCache$ = this.http.get(this.PRIMEICONS_CSS_URL, {responseType: 'text'})
        .pipe(
          map(cssContent => this.parseIconsFromCss(cssContent)),
          catchError(error => {
            console.error('Cannot get icons: ', error);
            return of(this.getFallbackIcons());
          }),
          shareReplay(1)
        );
    }

    return this.iconsCache$;

  }

  private parseIconsFromCss(cssContent: string): string[] {
    const iconRegex = /\.pi-([a-z0-9-]+):before/g;
    const icons = new Set<string>();
    let match;

    while ((match = iconRegex.exec(cssContent)) !== null) {
      const iconName = match[1];

      if (iconName && !iconName.includes('spin')) {
        icons.add(iconName);
      }
    }

    return Array.from(icons).sort();
  }

  private getFallbackIcons(): string[] {
    return [
      'home', 'star', 'star-fill', 'heart', 'heart-fill', 'check', 'times',
      'search', 'user', 'users', 'inbox', 'bell', 'calendar', 'clock',
      'shopping-cart', 'shopping-bag', 'box', 'tag', 'tags', 'bookmark',
      'briefcase', 'wallet', 'credit-card', 'desktop', 'mobile', 'tablet',
      'camera', 'image', 'images', 'video', 'file', 'folder', 'download',
      'upload', 'cloud', 'envelope', 'send', 'comment', 'comments',
      'map-marker', 'map', 'globe', 'book', 'database', 'cog', 'trash',
      'pencil', 'lock', 'unlock', 'eye', 'flag', 'building', 'car', 'gift'
    ].sort();
  }
}
