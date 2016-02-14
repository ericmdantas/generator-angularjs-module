/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {
  Component,
  OnInit,
  Inject,
  forwardRef
} from 'angular2/core';

import {
  Observable
} from 'rxjs/Observable';

@Component({
  selector: 'app',
  templateUrl: 'src/app.html',
  styleUrls: ['src/app.css'],
  providers: [forwardRef(() => AppService)]
})
export class AppCmp implements OnInit {
    constructor(@Inject(AppService) private _appService: AppService) {

    }

    ngOnInit() {
      this._appService
          .doSomething()
          .subscribe((info) => {
            console.log(info);
          });
    }
}

class AppService {
  doSomething():Observable<any> {
    return new Observable((o) => {
      o.next('hello :D');
    })
  }
}
