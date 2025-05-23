import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(async () => {
      if (Capacitor.isNativePlatform()) {
        await this.setupNativeFeatures();
      }
      
      // Hide splash screen after app is ready
      setTimeout(async () => {
        if (Capacitor.isNativePlatform()) {
          await SplashScreen.hide();
        }
      }, 2000);
    });
  }

  private async setupNativeFeatures() {
    try {
      // Configure status bar
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#6366f1' });
    } catch (error) {
      console.log('Native features setup error:', error);
    }
  }
}