import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Work } from '../models/work.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  private SERVER_URL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getWorks(): Observable<Work[]> {
    const url = `${this.SERVER_URL}/works`;
    return this.httpClient.get<Work[]>(url).pipe(catchError(this.handleError));
  }
  getWorkById(id: number): Observable<Work> {
    const url = `${this.SERVER_URL}/works/${id}`;
    return this.httpClient.get<Work>(url).pipe(catchError(this.handleError));
  }

  addWork(work: Work): Observable<Work> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    const options = {
      headers: httpHeaders,
    };
    const url = `${this.SERVER_URL}/works`;
    return this.httpClient
      .post<Work>(url, work, options)
      .pipe(catchError(this.handleError));
  }

  updateWork(id: number): Observable<Work> {
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    const options = {
      headers: httpHeaders,
    };
    const url = `${this.SERVER_URL}/works/`;
    const work = this.getWorkById(id);
    console.log(work);
    return this.httpClient
      .put<Work>(url, work, options)
      .pipe(catchError(this.handleError));
  }

  deleteWork(key: number): Observable<{}> {
    const url = `${this.SERVER_URL}/works/${key}`;
    const httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    const options = {
      headers: httpHeaders,
    };
    return this.httpClient
      .delete(url, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
