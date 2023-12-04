import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class BioService {
  constructor(private cookieService: CookieService) {}

  setBioInfo(bioInfo: any): void {
    this.cookieService.set('userBio', JSON.stringify(bioInfo));
  }

  getBioInfo(): any {
    const bioInfoString = this.cookieService.get('userBio');
    return JSON.parse(bioInfoString);
  }
}
