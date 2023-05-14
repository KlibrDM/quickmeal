import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.patrickcc.quickmeal',
  appName: 'QuickMeal',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
