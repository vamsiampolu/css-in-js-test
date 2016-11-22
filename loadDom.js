const jsdom = require('jsdom');
const Canvas = require('canvas');

const Image = Canvas.Image;

const html = `<html>
  <head></head>
  <body></body>
</html>`;

export default function loadDOM(documentLoaded) {
  global.Image = Image;

  global.navigator = {
    userAgent: 'node.js',
  };

  jsdom.env({
    html,
    features: {
      FetchExternalResources: ['img'],
      ProcessExternalResources: ['img'],
    },
    done(err, win) {
      global.window = win;
      global.window.Image = Image;
      global.document = win.document;
      Object.keys(win).forEach((property) => {
        if (typeof global[property] === 'undefined') {
          global[property] = win[property];
        }
      });
      documentLoaded();
    },
  });
}

