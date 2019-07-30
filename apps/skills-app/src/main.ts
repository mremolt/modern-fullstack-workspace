import './app/store/root';
import './config';

import './app/app.element';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        // tslint:disable-next-line: no-console
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        // tslint:disable-next-line: no-console
        console.log('SW registration failed: ', registrationError);
      });
  });
}
