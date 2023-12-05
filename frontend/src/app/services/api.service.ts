import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../shared/constants/constants';
import { Bio } from "../models/bio";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private editBioUrl = this.baseUrl + Constants.EDIT_BIO.BIOS;
  private bioUrl = this.baseUrl + Constants.BIO.BIOS;
  private getTokenUrl = this.baseUrl + Constants.GET_TOKEN.BIOS;

  constructor(private http: HttpClient) {}

  getBio(id: string) {
    return this.http.get<any>(this.bioUrl + '/' + id);
  }

  editBio(requestParams: any, id: string): Observable<any> {
    return this.http.put<any>(this.editBioUrl + '/' + id, requestParams);
  }

  getToken(queryParam: string): Observable<any>{
    const headers = new HttpHeaders({
      'code': queryParam
    });
    console.log(headers);

    return this.http.get<any>(this.getTokenUrl, { headers: headers });

  }

}
