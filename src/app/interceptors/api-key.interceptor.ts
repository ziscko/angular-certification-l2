import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private apiKey = '71c78c39659bcc7b82cb430c9541b9bb';

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    const cacheKey = req.method + '-' + req.url;
    const cachedResponse = localStorage.getItem(cacheKey);
    const lastCacheTimeKey = cacheKey + '-lastCacheTime';
    const lastCacheTime = localStorage.getItem(lastCacheTimeKey);

    if (cachedResponse && lastCacheTime) {
      const currentTime = new Date().getTime();
      const secondsLastCache = (currentTime - parseInt(lastCacheTime, 10)) / 1000;

      if (secondsLastCache < 14400) {
        const response = new HttpResponse({
          body: JSON.parse(cachedResponse),
          status: 200,
          statusText: 'OK',
          url: req.url
        });

        return of(response);
      }
    }

    const modifiedReq = req.clone({
      setHeaders: {
        'x-rapidapi-key': this.apiKey
      }
    });

    return next.handle(modifiedReq).pipe(
      switchMap((event) => {
        if (event instanceof HttpResponse) {
          localStorage.setItem(cacheKey, JSON.stringify(event.body));
          localStorage.setItem(lastCacheTimeKey, new Date().getTime().toString());
        }
        return of(event);
      })
    );
  }
}
