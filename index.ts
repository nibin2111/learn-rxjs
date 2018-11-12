import { concat, from, fromEvent, interval, Observable, of } from 'rxjs';

import { allBooks, allReaders } from './data';

/**
 *  Obseravale.create or new Obsrvable 
 * */
let bookSubscriber$ = Observable.create((observer) => {
    if(document.title != 'RXJS') {
        observer.error('Not Rxjs');
    }
    for(let book of allBooks) {
        observer.next(book);
    }
    setTimeout(() => {
        observer.complete();
    }, 2000);

    return () => console.log('Inside observable');
});

// bookSubscriber$.subscribe((book:any)=> console.log(book.title));

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 *  of method for observables 
 * */

let source1$ = of('hello', 10, true, allReaders[0].name );
// source1$.subscribe(value => console.log(value));

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 *  from method for observables 
 * */

// let source2$ = from(['hello', 10, true, allReaders[0].name]);
// let source2$ = from(allReaders);
let source2$ = concat(source1$, bookSubscriber$);
from(source2$).subscribe(value => console.log(value));

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/

/**
 *  fromEvent method for observables 
 * */

let button =  document.getElementById('readerBtn');
fromEvent(button, 'click').subscribe(event => {
    let readersListWrapper = document.getElementById('readersList');
    for (let reader of allReaders) {
        readersListWrapper.innerHTML += `${reader.name}<br>`;
    }
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/

/*
Observers vs Subscribers
    Observers - Receives the value
    Subscribers - Produce value from  Observables.
*/
let cancelSubsBtn =  document.getElementById('cancelSubscriptionBtn');
let source3$ = interval(1000);
let timerSubscription = source3$.subscribe((event)=>console.log(event));
fromEvent(cancelSubsBtn, 'click').subscribe((event) => {
    timerSubscription.unsubscribe();
})

/*-------------------------------------------------**********Operators**************---------------------------------------------------------------------*/

/**
 * Pipe - Treeshaking
 * Map
 * Filter
 * map
 * Mergemap
 * tap
 * catchError
 * throwError
 * take
 * takeUntil
 */