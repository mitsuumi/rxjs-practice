import { fromEvent, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// 被觀察目標
const youtuber$ = new Subject();

// 影片1上架，尚未有觀察者
youtuber$.next(1);

const observerA = {
  next: (id) => {
    console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
  },
  error: () => {},
  complete: () => {},
};

const observerASubscription = youtuber$.subscribe(observerA);
youtuber$.next(2);

const observerBSubscription = youtuber$.subscribe((id) => {
  console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
});

youtuber$.next(3);

observerBSubscription.unsubscribe();
youtuber$.next(4);
