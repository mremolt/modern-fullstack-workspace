import { inject, injectable } from 'inversify';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
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

  public post(url: string, body: any, headers?: object) {
    return this.request(RequestMedod.POST, url, body, headers);
  }

  public put(url: string, body: any, headers?: object) {
    return this.request(RequestMedod.PUT, url, body, headers);
  }

  public patch(url: string, body: any, headers?: object) {
    return this.request(RequestMedod.PATCH, url, body, headers);
  }

  public delete(url: string, headers?: object) {
    return this.request(RequestMedod.DELETE, url, null, headers);
  }

  public request(method: RequestMedod, path: string, body?: any, headers: object = {}): Observable<AjaxResponse> {
    const url = this.buildUrl(path);
    return ajax({ method, url, body, headers });
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${this.baseUrl}/${path}`;
  }
}
