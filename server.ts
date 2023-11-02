import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';
import { Product } from 'src/app/products/model/product';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/types-of-rendering-angular/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('/api/products', (req, res) => {
    let products: Product[] = [
      {
        id: "123",
        name: "PlayStation 5 Console (PS5)",
        description: "The PS5 console unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
        price: 499
      },
      {
        id: "124",
        name: "PlayStation Classic",
        description: "Introducing PlayStation Classic A miniature recreation of the iconic PlayStation console, pre loaded with 20 fan favorite games along with two wired controllers for local multiplayer showdowns and a virtual memory card for vital game saves.",
        price: 99
      }
    ]
    res.json(products)
  });

  server.get('/api/products/:id', (req, res) => {
    let products: Product[] = [
      {
        id: "123",
        name: "PlayStation 5 Console (PS5)",
        description: "The PS5 console unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
        price: 499
      },
      {
        id: "124",
        name: "PlayStation Classic",
        description: "Introducing PlayStation Classic A miniature recreation of the iconic PlayStation console, pre loaded with 20 fan favorite games along with two wired controllers for local multiplayer showdowns and a virtual memory card for vital game saves.",
        price: 99
      }
    ]
    let id = req.params['id'];
    res.json(products.find((p: Product) => p.id == id))
  });

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';