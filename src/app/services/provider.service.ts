import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private URL: string = 'https://ionic-angular-dawm-default-rtdb.firebaseio.com/collection.json';

  constructor(private http: HttpClient) { }
  getResponse() {
    return this.http.get(this.URL);
  }

  /* 5. Método con la petición HTTP */
  postResponse(data: any) {
    return this.http.post(this.URL, data);
  }
}
