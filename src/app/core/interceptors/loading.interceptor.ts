import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingRequests = 0;
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip loading for certain requests
    if (this.shouldSkipLoading(request)) {
      return next.handle(request);
    }

    this.showLoading();

    return next.handle(request).pipe(
      finalize(() => {
        this.hideLoading();
      })
    );
  }

  private shouldSkipLoading(request: HttpRequest<any>): boolean {
    // Skip loading for background requests or specific endpoints
    const skipUrls = [
      '/auth/refresh',
      '/analytics',
      '/ping'
    ];

    return skipUrls.some(url => request.url.includes(url)) ||
           request.headers.has('X-Skip-Loading');
  }

  private async showLoading(): Promise<void> {
    this.loadingRequests++;

    if (this.loadingRequests === 1 && !this.loading) {
      this.loading = await this.loadingController.create({
        message: 'Cargando...',
        spinner: 'crescent',
        cssClass: 'custom-loading'
      });
      await this.loading.present();
    }
  }

  private async hideLoading(): Promise<void> {
    this.loadingRequests--;

    if (this.loadingRequests === 0 && this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}