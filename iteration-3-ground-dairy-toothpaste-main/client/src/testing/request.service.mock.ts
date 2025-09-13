import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Request, ItemType, FoodType } from 'src/app/requests/request';
import { RequestService } from 'src/app/requests/request.service';

@Injectable({
  providedIn: AppComponent
})
export class MockRequestService extends RequestService {
  public static testRequests: Request[] = [
    {
      _id: '1_id',
      itemType: 'food',
      description: 'I would like some ground beef',
      foodType: 'meat',
      dateAdded: '2023-4-20',
      generalNeed: false
    },
    {
      _id: '2_id',
      itemType: 'toiletries',
      description: 'I need more toothpaste',
      foodType: '',
      dateAdded: '1998-6-12',
      generalNeed: false
    },
    {
      _id: '3_id',
      itemType: 'other',
      description: 'I need more paper plates',
      foodType: '',
      dateAdded: '2023-2-28',
      generalNeed: false
    },
    {
      _id: '4_id',
      itemType: 'food',
      description: 'I would like some milk',
      foodType: 'dairy',
      dateAdded: '2023-3-19',
      generalNeed: false
    }
  ];

  public addedClientRequests: Partial<Request>[] = [];
  public addedDonorRequests: Partial<Request>[] = [];

  public deletedClientRequests: Partial<Request>[] = [];
  public deletedDonorRequests: Partial<Request>[] = [];

  constructor() {
    super(null);
  }

  getClientRequests(filters?: { itemType?: ItemType; foodType?: FoodType }): Observable<Request[]> {
      return of(MockRequestService.testRequests);
  }

  getDonorRequests(filters?: { itemType?: ItemType; foodType?: FoodType }): Observable<Request[]> {
    return of(MockRequestService.testRequests);
  }
  deleteClientRequest(request: Partial<Request>): Observable<object> {
    this.deletedClientRequests.push(request);
    // Send delete request to delete a request
    return of (Object);
  }

  // deleteRequest(request: Partial<Request>): Observable<object> {
  //   // Send delete request to delete a request
  //   return of (Object);
  // }

  deleteDonorRequest(request: Partial<Request>): Observable<object> {
    this.deletedDonorRequests.push(request);
    // Send delete request to delete a request
    return of (Object);
  }


  addClientRequest(newRequest: Partial<Request>): Observable<string> {
    this.addedClientRequests.push(newRequest);
    return of('added! :)');
  }

  addDonorRequest(newRequest: Partial<Request>): Observable<string> {
    this.addedDonorRequests.push(newRequest);
    return of('added! <3');
  }

  getDonorRequestById(id: string): Observable<Request> {
    return of(MockRequestService.testRequests[2]);
  }
}
