import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../shared/constants/constants';
import { Bio } from "../models/bio";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private editBioUrl = this.baseUrl + Constants.EDIT_BIO.BIOS;
  private bioUrl = this.baseUrl + Constants.BIO.BIOS;

  constructor(private http: HttpClient) {}

  getBio(id: string) {
    return this.http.get<any>(this.bioUrl + '/' + id);
  }

  editBio(requestParams: any) {
    return this.http.put<any>(this.editBioUrl, requestParams);
  }

}
