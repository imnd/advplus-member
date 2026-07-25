import JwtService from '@/services/jwt.service';
import { inject, Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @description service to call HTTP request via Axios
 */
@Injectable({ providedIn: 'root' })
export default class ApiService {
  private apiUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  /**
   * @description get the default HTTP request headers
   */
  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${JwtService.getAccessToken()}`);
    headers = headers.set('Accept', 'application/json');

    return headers;
  }

  /**
   * @description set the default HTTP request headers
   */
  private setHeaders(params?: {}) {
    return {
      ...params,
      headers: this.getHeaders()
    };
  }

  public prepareParams(params: {}) {
    return {
      params: {
        ...params
      },
    };
  }

  /**
   * @description send the GET HTTP request
   * @returns Observable<T>
   * @param resource
   * @param params
   */
  public query<T = unknown>(resource: string, params?: {}): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${resource}`, this.setHeaders(params));
  }

  /**
   * @description send the GET HTTP request
   * @returns Observable<T>
   * @param resource
   * @param slug
   */
  public get<T = unknown>(resource: string, slug = null as string | null): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${resource}` + (slug ? `/${slug}` : ''), {
      headers: this.getHeaders()
    });
  }

  /**
   * @description set the POST HTTP request
   * @returns Observable<T>
   * @param resource
   * @param params
   */
  public post<T = unknown>(resource: string, params?: {}): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${resource}`, this.setHeaders(params));
  }

  /**
   * @description send the UPDATE HTTP request
   * @returns Observable<T>
   * @param resource
   * @param slug
   * @param params
   */
  public update<T = unknown>(resource: string, slug: string, params?: {}): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${resource}/${slug}`, this.setHeaders(params));
  }

  /**
   * @description Send the PUT HTTP request
   * @returns Observable<T>
   * @param resource
   * @param params
   */
  public put<T = unknown>(resource: string, params?: {}): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${resource}`, this.setHeaders(params));
  }

  /**
   * @description Send the DELETE HTTP request
   * @returns Observable<T>
   * @param resource
   */
  public delete<T = unknown>(resource: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${resource}`, {
      headers: this.getHeaders()
    });
  }
}

