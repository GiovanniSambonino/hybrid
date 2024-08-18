import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private baseURL: string = 'https://ionic-angular-dawm-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  getResponse(tipo: string) {
    const url = `${this.baseURL}${tipo}_respuestas.json`; // Carga datos de la colección específica
    return this.http.get(url);
  }

  postResponse(tipo: string, data: any) {
    const url = `${this.baseURL}${tipo}_respuestas.json`; // Guarda datos en la colección específica
    return this.http.post(url, data);
  }
}

