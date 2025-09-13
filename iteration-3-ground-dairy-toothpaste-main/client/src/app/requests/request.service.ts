import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request, ItemType, FoodType } from './request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  // The URL for the requests part of the server API
  readonly requestClientUrl: string = `${environment.apiUrl}clientRequests`;
  readonly newRequestClientUrl: string = `${environment.apiUrl}clientRequests`;
  readonly requestDonorUrl: string = `${environment.apiUrl}donorRequests`;
  readonly newRequestDonorUrl: string = `${environment.apiUrl}donorRequests`;

  private readonly itemTypeKey = 'itemType';
  private readonly foodTypeKey = 'foodType';
  private readonly descriptionKey = 'description';

  constructor(private httpClient: HttpClient) {
  }
// eslint-disable-next-line max-len
  getClientRequests(filters?: {itemType?: ItemType; foodType?: FoodType; description?: string; generalNeed?: boolean}): Observable<Request[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.itemType) {
        httpParams = httpParams.set(this.itemTypeKey, filters.itemType);
      }
      if (filters.foodType) {
        httpParams = httpParams.set(this.foodTypeKey, filters.foodType);
      }
      if (filters.description) {
        httpParams = httpParams.set(this.descriptionKey, filters.description);
      }
    }
// We'll need to add a conditional in here that handles a donor get request as well
    return this.httpClient.get<Request[]>(this.requestClientUrl, {
      params: httpParams,
    });

  }

  getRequestById(id: string): Observable<Request>{
    return this.httpClient.get<Request>(this.requestClientUrl + '/' + id);
  }

  getDonorRequestById(id: string): Observable<Request>{
    return this.httpClient.get<Request>(this.requestDonorUrl + '/' + id);
  }

 // eslint-disable-next-line max-len
  getDonorRequests(filters?: {itemType?: ItemType; foodType?: FoodType; description?: string; generalNeed?: boolean}): Observable<Request[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.itemType) {
        httpParams = httpParams.set(this.itemTypeKey, filters.itemType);
      }
      if (filters.foodType) {
        httpParams = httpParams.set(this.foodTypeKey, filters.foodType);
      }
      if (filters.description) {
        httpParams = httpParams.set(this.descriptionKey, filters.description);
      }
    }
// We'll need to add a conditional in here that handles a donor get request as well
    return this.httpClient.get<Request[]>(this.requestDonorUrl, {
      params: httpParams,
    });

  }

  filterRequests(requests: Request[]): Request[] {
    const filteredRequests = requests;

    return filteredRequests;
  }
// This is the method that submit form calls on the new request component.
// My idea is to add another function that handles newRequestDonor stuff
  addClientRequest(newRequest: Partial<Request>): Observable<string> {
    // Send post request to add a new Request with the Request data as the body.
    return this.httpClient.post<{id: string}>(this.newRequestClientUrl, newRequest).pipe(map(res => res.id));
  }

  addDonorRequest(newRequest: Partial<Request>): Observable<string> {
    // Send post request to add a new Request with the Request data as the body.
    return this.httpClient.post<{id: string}>(this.newRequestDonorUrl, newRequest).pipe(map(res => res.id));
  }

  deleteClientRequest(request: Partial<Request>): Observable<object> {
    // Send delete request to delete a request
    return this.httpClient.delete(this.requestClientUrl + '/' + request._id).pipe(map(res => res));
  }

  deleteDonorRequest(request: Partial<Request>): Observable<object> {
    // Send delete request to delete a request
    return this.httpClient.delete(this.requestDonorUrl + '/' + request._id).pipe(map(res => res));
  }

}
