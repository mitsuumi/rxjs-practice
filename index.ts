import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    filter((_, index) => index % 2 === 0),
    map((event: MouseEvent) => ({ x: event.x, y: event.y }))
  )
  .subscribe((position) => {
    console.log(`x: ${position.x}, y: ${position.y}`);
  });