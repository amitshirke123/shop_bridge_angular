import { TestBed } from '@angular/core/testing';
import { Item } from '../models/item';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should return expected data', (done) => {
    const returnedData: Item[] = [
      { 'id': '1', 'name': 'prod1', 'description': 'desc1', 'price': 200 }
    ];
    const expectedData: Item[] = [
      { 'id': '1', 'name': 'prod1', 'description': 'desc1', 'price': 200 }
    ];
    const url = environment.baseUrl;
    service.get(url).subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne('http://localhost:3000/items/');
    testRequest.flush(returnedData);
    expect(testRequest.request.method).toEqual('GET');
  });

  it('should add an item and return it', () => {
    const item: Item = { 'id': '1', 'name': 'prod1', 'description': 'desc1', 'price': 200 };
    const url = environment.baseUrl;
    service.post(url,item).subscribe(
      data => expect(data).toEqual(item, 'should return the item'),
      fail
    );

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(item);
  });

  it('should update an item and return it', () => {
    const item: Item = { 'id': '1', 'name': 'prod1', 'description': 'desc1', 'price': 200 };
    const url = environment.baseUrl;
    service.put(url,item).subscribe(
      data => expect(data).toEqual(item, 'should return the item'),
      fail
    );

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(item);
  });

  it('should delete an item', () => {
    const item: Item = { 'id': '1', 'name': 'prod1', 'description': 'desc1', 'price': 200 };
    const url = environment.baseUrl+"/"+item.id;
    service.delete(url).subscribe(
      data => 
      fail
    );

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
  });


});
