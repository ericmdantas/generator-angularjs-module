import {
  Component,
  EventEmitter,
  OnInit,
  Inject,
  forwardRef
} from 'angular2/web_worker/worker';

@Component({
  selector: 'app',
  templateUrl: 'src/app.html',
  styleUrls: ['src/app.css'],
  providers: [forwardRef(() => AppService)]
})
export class AppCmp implements OnInit {
    constructor(@Inject(AppService) private _appService: AppService) {

    }

    onInit() {
      console.log('app init');

      this._appService
          .doSomething()
          .subscribe((info) => {
            console.log(info);
          });
    }
}

class AppService {
  private _ee: EventEmitter = new EventEmitter();

  doSomething():Rx.Observable<any> {
    setTimeout(() => this._ee.next('hello :D'));

    return this._ee.toRx();
  }
}
