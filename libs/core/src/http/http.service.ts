import { inject, injectable } from 'inversify';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../symbols';

export enum RequestMedod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

@injectable()
export class HttpService {
  constructor(@inject(API_BASE_URL) private baseUrl: string) {}

  public get<T = unknown>(path: string, headers?: object): Observable<T> {
    const url = this.buildUrl(path);
    return ajax.getJSON<T>(url, headers);
  }

  public post<T = {}>(url: string, body: any, headers?: object) {
    return this.request<T>(RequestMedod.POST, url, body, headers);
  }

  public put<T = {}>(url: string, body: any, headers?: object) {
    return this.request<T>(RequestMedod.PUT, url, body, headers);
  }

  public patch(url: string, body: any, headers?: object) {
    return this.request(RequestMedod.PATCH, url, body, headers) as any;
  }

  public delete(url: string, headers?: object) {
    return this.request(RequestMedod.DELETE, url, null, headers);
  }

  public request<T = {}>(method: RequestMedod, path: string, body?: any, customHeaders: object = {}): Observable<T> {
    const url = this.buildUrl(path);
    const headers = { 'Content-Type': 'application/json', ...customHeaders };

    return ajax({ method, url, body, headers }).pipe(
      map((response: AjaxResponse) => {
        return response.response as T;
      })
    );
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${this.baseUrl}/${path}`;
  }
}
