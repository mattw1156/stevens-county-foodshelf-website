import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { MockRequestService } from 'src/testing/request.service.mock';
import { ItemType, Request } from './request';
import { RequestVolunteerComponent } from './request-volunteer.component';
import { RequestService } from './request.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

const COMMON_IMPORTS: unknown[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('Volunteer Request View', () => {
  let volunteerList: RequestVolunteerComponent;
  let fixture: ComponentFixture<RequestVolunteerComponent>;
  const service = new MockRequestService();
  let dialogStub: {
    open: (stuff) => void;
    calledWith: any;
  };

  beforeEach(() => {
    dialogStub = {
      open: (stuff) => { dialogStub.calledWith = stuff; },
      calledWith: undefined
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [RequestVolunteerComponent],
      providers: [{ provide: RequestService, useValue: service },
        {provide: MatDialog, useValue: dialogStub},
      ]
    });
  });



  beforeEach(waitForAsync (() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RequestVolunteerComponent);
      volunteerList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be able to open the dialog', () => {
    expect(dialogStub.calledWith).toBeUndefined();
    volunteerList.openDialog();
    expect(dialogStub.calledWith).toBeDefined();
  });

  it('contains all requests', () => {
    volunteerList.updateFilter();
    expect(volunteerList.serverFilteredRequests.length).toBe(4);
  });

  it('contains a request for food', () => {
    expect(volunteerList.serverFilteredRequests.some((request: Request) => request.itemType === 'food')).toBe(true);
  });

  it('contains a request for toiletries', () => {
    expect(volunteerList.serverFilteredRequests.some((request: Request) => request.itemType === 'toiletries')).toBe(true);
  });

  it('contains a request for other', () => {
    expect(volunteerList.serverFilteredRequests.some((request: Request) => request.itemType === 'other')).toBe(true);
  });

  it('contains a request for itemType food and foodType meat', () => {
    expect(volunteerList.serverFilteredRequests.some((request: Request) => request.itemType === 'food'
     && request.foodType === 'meat')).toBe(true);
  });

  describe('Can we delete requests', ()=>{
    it('should not get angy', ()=> {
      volunteerList.deleteRequest(MockRequestService.testRequests[0]);

      expect(service.deletedClientRequests[0]).toEqual(MockRequestService.testRequests[0]);
    });
  });

  describe('Can we post requests', ()=>{
    it('should not get angy', ()=> {
      volunteerList.postRequest(MockRequestService.testRequests[0]);

      expect(service.deletedClientRequests[0]).toEqual(MockRequestService.testRequests[0]);
      expect(service.addedDonorRequests[0].description).toEqual(MockRequestService.testRequests[0].description);
      expect(service.addedDonorRequests[0].foodType).toEqual(MockRequestService.testRequests[0].foodType);
      expect(service.addedDonorRequests[0].itemType).toEqual(MockRequestService.testRequests[0].itemType);
    });
  });
});

describe('Misbehaving Volunteer view', () => {
  let volunteerList: RequestVolunteerComponent;
  let fixture: ComponentFixture<RequestVolunteerComponent>;
  let hasCalledDelete = false;
  let hasCalledAddDonor = false;

  let requestServiceStub: {
    getClientRequests: () => Observable<Request[]>;
    getDonorRequests: () => Observable<Request[]>;
    deleteClientRequest: () => Observable<object>;
    addDonorRequest: () => Observable<string>;
  };

  let snackbarModuleStub: {
    open: (msg, buttons, settings) => void;
    called: boolean;
  };

  let dialogStub: {
    open: (stuff) => void;
    calledWith: any;
  };

  beforeEach(() => {
    requestServiceStub = {
      getClientRequests: () => new Observable(observer => {
        observer.error('getClientRequests() Observer generates an error');
      }),
      getDonorRequests: () => new Observable(observer => {
        observer.error('getDonorRequests() Observer generates an error');
      }),
      deleteClientRequest: () => new Observable(observer => {
        hasCalledDelete = true;
        observer.error('getDonorRequest() Observer generates an error');
      }),
      addDonorRequest: () => new Observable(observer => {
        hasCalledAddDonor = true;
        observer.error('addDonorRequest() Observer generates an error');
      })
    };

    dialogStub = {
      open: (stuff: any) => {
        dialogStub.calledWith = stuff;
      },
      calledWith: undefined
    };

    snackbarModuleStub = {
      open: (msg, buttons, settings) => {
        snackbarModuleStub.called = true;
      },
      called: false
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [RequestVolunteerComponent],
      providers: [{provide: RequestService, useValue: requestServiceStub},
        {provide: MatDialog, useValue: dialogStub},
        {provide: MatSnackBar, useValue: snackbarModuleStub}]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RequestVolunteerComponent);
      volunteerList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a RequestVolunteerService', () => {
    expect(volunteerList.serverFilteredRequests).toBeUndefined();
  });

  it('opens snackbar on failures', () => {
    snackbarModuleStub.called = false;
    volunteerList.deleteRequest(null);
    expect(snackbarModuleStub.called).toBeTrue();
  });

  it('does not call delete if the post failed when calling `postRequest`', () => {
    hasCalledDelete = false;
    hasCalledAddDonor = false;
    volunteerList.postRequest(null);
    expect(hasCalledDelete).toBeFalse();
    expect(hasCalledAddDonor).toBeTrue();
  });

  it('updateFilter properly reassigns our request list', ()=>{
    volunteerList.updateFilter();
    expect(volunteerList.filteredRequests === volunteerList.serverFilteredRequests).toBeTruthy();
  });

});

describe('Partially misbehaving Volunteer view', () => {
  let volunteerList: RequestVolunteerComponent;
  let fixture: ComponentFixture<RequestVolunteerComponent>;
  let hasCalledDelete = false;
  let hasCalledAddDonor = false;

  let requestServiceStub: {
    getClientRequests: () => Observable<Request[]>;
    getDonorRequests: () => Observable<Request[]>;
    deleteClientRequest: () => Observable<object>;
    addDonorRequest: () => Observable<string>;
  };
  let dialogStub: {
    open: (stuff) => void;
    calledWith: any;
  };

  beforeEach(() => {
    requestServiceStub = {
      getClientRequests: () => new Observable(observer => {
        observer.error('getClientRequests() Observer generates an error');
      }),
      getDonorRequests: () => new Observable(observer => {
        observer.error('getDonorRequests() Observer generates an error');
      }),
      deleteClientRequest: () => new Observable(observer => {
        hasCalledDelete = true;
        observer.error('getDonorRequest() Observer generates an error');
      }),
      addDonorRequest: () => {
        hasCalledAddDonor = true;
        return of('<3');
      }
    };

    dialogStub = {
      open: (stuff: any) => {
        dialogStub.calledWith = stuff;
      },
      calledWith: undefined
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [RequestVolunteerComponent],
      providers: [{provide: RequestService, useValue: requestServiceStub},
        {provide: MatDialog, useValue: dialogStub},]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RequestVolunteerComponent);
      volunteerList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('does call delete if the post succeeded when calling `postRequest`, even if the delete call fails too', () => {
    hasCalledDelete = false;
    hasCalledAddDonor = false;
    volunteerList.postRequest(null);
    expect(hasCalledDelete).toBeTrue();
    expect(hasCalledAddDonor).toBeTrue();
  });
});
