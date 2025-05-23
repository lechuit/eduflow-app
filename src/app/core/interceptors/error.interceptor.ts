import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  private async handleError(error: HttpErrorResponse): Promise<void> {
    let message = 'Ha ocurrido un error inesperado';
    let shouldShowToast = true;

    switch (error.status) {
      case 0:
        message = 'No se puede conectar al servidor. Verifica tu conexión a internet.';
        break;
      case 400:
        message = error.error?.message || 'Solicitud inválida';
        break;
      case 401:
        message = 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.';
        await this.authService.logout();
        this.router.navigate(['/auth/login']);
        break;
      case 403:
        message = 'No tienes permisos para realizar esta acción';
        break;
      case 404:
        message = 'El recurso solicitado no fue encontrado';
        break;
      case 429:
        message = 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.';
        break;
      case 500:
        message = 'Error interno del servidor. Intenta nuevamente más tarde.';
        break;
      case 503:
        message = 'Servicio no disponible temporalmente';
        break;
      default:
        if (error.error?.message) {
          message = error.error.message;
        }
    }

    if (shouldShowToast) {
      await this.showErrorToast(message);
    }
  }

  private async showErrorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 4000,
      position: 'top',
      color: 'danger',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    
    await toast.present();
  }
}