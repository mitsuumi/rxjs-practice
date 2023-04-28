import { fromEvent, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const startButton = document.querySelector('#start');
const countButton = document.querySelector('#count');
const errorButton = document.querySelector('#error');
const completeButton = document.querySelector('#complete');

const statusLabel = document.querySelector('#status');
const currentCounterLabel = document.querySelector('#currentCounter');
const evenCounterLabel = document.querySelector('#evenCounter');

let counter = 0;
// 自訂subject來通知計數器數值改變
let counter$: Subject<number>;

fromEvent(startButton, 'click').subscribe(() => {
  counter$ = new Subject();
  counter = 0;
  statusLabel.innerHTML = '目前狀態：開始計數';

  // counter$.subscribe((data) => {
  //   currentCounterLabel.innerHTML = `目前計數: ${data}`;
  //   if (data % 2 == 0) {
  //     evenCounterLabel.innerHTML = `偶數計數: ${data}`;
  //   }
  // });

  counter$.subscribe((data) => {
    currentCounterLabel.innerHTML = `目前計數：${data}`;
  });
  const evenCounter$ = counter$.pipe(filter((data) => data % 2 === 0));
  evenCounter$.subscribe((data) => {
    evenCounterLabel.innerHTML = `偶數計數：${data}`;
  });

  counter$.subscribe({
    next: () => {},
    error: (message) => {
      statusLabel.innerHTML = `目前狀態：錯誤 -> ${message}`;
    },
    complete: () => {
      statusLabel.innerHTML = '目前狀態：完成';
    },
  });

  // 一開始送出的預設值
  counter$.next(counter);
});

fromEvent(countButton, 'click').subscribe(() => {
  counter$.next(++counter);
});

fromEvent(errorButton, 'click').subscribe(() => {
  const reason = prompt('輸入錯誤訊息');
  counter$.error(reason || 'error');
});

fromEvent(completeButton, 'click').subscribe(() => {
  counter$.complete();
});
