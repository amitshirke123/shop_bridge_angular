import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  get<T>(url: string, headers: any = null): Observable<any> {
    return this.httpClient.get<T>(url, { headers: headers });
  }

  post<T, V>(url: string, body?: T, headers: any = null): Observable<V> {
    return this.httpClient.post<V>(url, body, { headers: headers });
  }

  put<T, V>(url: string, body: T, headers: any = null): Observable<V> {
    return this.httpClient.put<V>(url, body, { headers: headers });
  }

  delete<T>(url: string, body?: any, headers: any = null): Observable<any> {
    return this.httpClient.delete<T>(url, { headers: headers, params: body });
  }


}