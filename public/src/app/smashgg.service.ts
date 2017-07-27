import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class SmashggService {

  constructor(private _http: Http) { }
  retrieveSetData(setId) {
    console.log("in the service, printing the setId", setId)
    return this._http.get(`/smashgg/${setId}`).map(data=>data.json()).toPromise();
  }
  retrieveSetsFromDB() {
    return this._http.get('/get_sets').map(data=>data.json()).toPromise();

  }

}
