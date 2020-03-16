import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  
  public jwtToken: any = "";
  public baseUrl:any="https://fileupload.influxhostserver.com/";
  constructor(private http: HttpClient) {
  }

  /* read site setting data */
  public getSiteSettingData(url): Observable<any> {
    return this.http.get(url);
  }

  /* call api via post method */
  httpViaPost(endpoint, jsonData): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.jwtToken
      })
    };
    return this.http.post(this.baseUrl + endpoint, jsonData);
  }

  /* call api via get method */
  httpViaGet(endpoint, jsonData): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.jwtToken
      })
    };
    return this.http.get(this.baseUrl + endpoint, jsonData);
  }

  /* Resolve service */
  ResolveViaPost(requestdata: any, endpoint: any): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };

    return this.http.post(this.baseUrl + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  }

  checkingDuplicateEmail(requestdata: any): Observable<any> {
    let data: any = { "email": requestdata, "source": "users" };
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.CookieService.get('jwtToken')
      })
    };

    return this.http.post(this.baseUrl + 'duplicate-email-checking', JSON.stringify(data), httpOptions).pipe(map(res => res));
  }

  /* call api via get method */
  httpViaGetExt(url, jsonData): Observable<any> {
    /* set common header */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.http.get(url, jsonData);
  }

}


