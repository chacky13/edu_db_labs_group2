/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "e2f0e9f051c6c814128869e8c34b701f"
  },
  {
    "url": "assets/css/0.styles.79226024.css",
    "revision": "1d2dd05b9a3f5b2a2ce69130b9945c46"
  },
  {
    "url": "assets/img/img_1.65375615.png",
    "revision": "65375615ccae8c72d01b1fe14b42639d"
  },
  {
    "url": "assets/img/img_2.0660f269.png",
    "revision": "0660f269a458b40648619b260264346b"
  },
  {
    "url": "assets/img/img_3.28d9a466.png",
    "revision": "28d9a466f04cc766dc87517f41282b0e"
  },
  {
    "url": "assets/img/img_4.7db003ed.png",
    "revision": "7db003ed4c835ab60ce3919e5b311660"
  },
  {
    "url": "assets/img/img_5.de210633.png",
    "revision": "de210633fe6ee1541d9103b2c96a8044"
  },
  {
    "url": "assets/img/relationalSchema.4d0bdb0b.png",
    "revision": "4d0bdb0b4bb3551211c4ab0253c38a6c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.ede44feb.js",
    "revision": "a5fdc61680aa686098ead5585865520b"
  },
  {
    "url": "assets/js/11.cf759c35.js",
    "revision": "4a4cbe9dba2fe96205db2667a78b4de9"
  },
  {
    "url": "assets/js/12.dcaae35a.js",
    "revision": "43fa593a39277d240494bb4077ec736e"
  },
  {
    "url": "assets/js/13.6d57025d.js",
    "revision": "14c8688192f8d4dbd27d771aa4ecf70f"
  },
  {
    "url": "assets/js/14.ad841c24.js",
    "revision": "38e2c092db585d56425e69d625f9916d"
  },
  {
    "url": "assets/js/15.a1150af9.js",
    "revision": "eac604ff9653af21fe4e4794c561f7d1"
  },
  {
    "url": "assets/js/16.b4438fab.js",
    "revision": "80d237b15950bacae244c6626b2eef82"
  },
  {
    "url": "assets/js/17.0cbdea60.js",
    "revision": "8e05a7fb35e7e69af812a56833265969"
  },
  {
    "url": "assets/js/18.99656196.js",
    "revision": "59101f0b7fd88cbc62fc1ce0c9c12e8c"
  },
  {
    "url": "assets/js/19.4e374db1.js",
    "revision": "832f923dc97ec852b68832b05c79b8c3"
  },
  {
    "url": "assets/js/2.f9466e7d.js",
    "revision": "524b9945ed9f80ce63265ae643f21781"
  },
  {
    "url": "assets/js/20.f58fb38a.js",
    "revision": "707d2e65020236b101d596a98df24de1"
  },
  {
    "url": "assets/js/21.fa4fafea.js",
    "revision": "2b5a367b4f1c2066b72b8a5375dd6b57"
  },
  {
    "url": "assets/js/22.c13b727d.js",
    "revision": "36f655e973106761bb003a32128d6e51"
  },
  {
    "url": "assets/js/23.0df8018d.js",
    "revision": "7ba1f54a38667dfcc6e8f6d8808f915a"
  },
  {
    "url": "assets/js/24.7714a237.js",
    "revision": "8e0c816977c09efbcc239ee171bdce2e"
  },
  {
    "url": "assets/js/26.8925e476.js",
    "revision": "60c5ae44e9de26fbdaa7a983ce917288"
  },
  {
    "url": "assets/js/3.ee611bb4.js",
    "revision": "edf1cc287f962a9e9e2bf350f568bfdc"
  },
  {
    "url": "assets/js/4.f30e1360.js",
    "revision": "d9042273521183a90e925fe690034b05"
  },
  {
    "url": "assets/js/5.3a0edf6f.js",
    "revision": "6ba691cc700894dbe46faf663730d326"
  },
  {
    "url": "assets/js/6.25248cf9.js",
    "revision": "5a1c1cc355e8994abe7746c1377d2ee1"
  },
  {
    "url": "assets/js/7.6e1ea854.js",
    "revision": "0914f2622c583bd33bfc7dfe003e8363"
  },
  {
    "url": "assets/js/8.61c8255a.js",
    "revision": "4f12fce2211baaff23252e11083a04b2"
  },
  {
    "url": "assets/js/9.3ad67b1c.js",
    "revision": "ef633e2b831144d7ddc305fb227c9865"
  },
  {
    "url": "assets/js/app.2ec1377a.js",
    "revision": "f0bb31d81e1ca96df18294bc2bb24b01"
  },
  {
    "url": "conclusion/index.html",
    "revision": "160ac31e6bea6efac76fa74dbb09e9d1"
  },
  {
    "url": "design/index.html",
    "revision": "9cd0f26f4cb35b1ffcfbfa691c40ba76"
  },
  {
    "url": "index.html",
    "revision": "af70604b87aa96fb8ff444909f8ec5b2"
  },
  {
    "url": "intro/index.html",
    "revision": "0cfb0b058a924445e2bc7320dceec59e"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "110ecc5786ee66ca4db89531c055a058"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "2592b49a4bc6fd193fbf6429dd5f0014"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "1de07a5bb357cbb298f428b829355dde"
  },
  {
    "url": "software/index.html",
    "revision": "fe747bb8b518f53e74c751034f773186"
  },
  {
    "url": "test/index.html",
    "revision": "0bb127c3eef36145c1b8441d265b15ee"
  },
  {
    "url": "use cases/index.html",
    "revision": "67f2267767d9e31c3661b56bcf47513b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
