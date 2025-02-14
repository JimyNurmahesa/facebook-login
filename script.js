if (self.CavalryLogger) {
  CavalryLogger.start_js_script(document.currentScript);
}

__d(
  'MAria',
  ['createArrayFromMixed', 'nullthrows'],
  function (a, b, c, d, e, f, g) {
    function h(a) {
      return a.length > 1 ? Array.from(a) : c('createArrayFromMixed')(a[0]);
    }
    function i(a) {
      return !a ? null : a.getAttribute('aria-hidden') === 'true';
    }
    function j(a) {
      if (!a) return;
      var b = h(arguments);
      for (var c = 0; c < b.length; c++) b[c].setAttribute('aria-hidden', 'false');
    }
    function k(a) {
      if (!a) return;
      var b = h(arguments);
      for (var c = 0; c < b.length; c++) b[c].setAttribute('aria-hidden', 'true');
    }
    function a(a) {
      if (!a) return;
      var b = h(arguments);
      for (var c = 0; c < b.length; c++) i(b[c]) ? j(b[c]) : k(b[c]);
    }
    function b(a, b) {
      if (!a) return;
      b === null ? a.removeAttribute('aria-label') : a.setAttribute('aria-label', b);
    }
    function d(a) {
      if (!a) return null;
      a = a.getAttribute('aria-label');
      return a !== null && a !== '';
    }
    function e(a, b) {
      var d = b.getAttribute('id');
      d = c('nullthrows')(d);
      a.setAttribute('aria-controls', d);
      a.setAttribute('aria-haspopup', 'true');
      l(a, b);
    }
    function f(a, b) {
      a.setAttribute('aria-pressed', 'true'), b && (b.setAttribute('aria-hidden', 'false'), b.setAttribute('aria-expanded', 'true'));
    }
    function l(a, b) {
      a.setAttribute('aria-pressed', 'false'), b && (b.setAttribute('aria-hidden', 'true'), b.setAttribute('aria-expanded', 'false'));
    }
    g.isHidden = i;
    g.show = j;
    g.hide = k;
    g.toggleVisibility = a;
    g.setLabel = b;
    g.hasLabel = d;
    g.setupPopup = e;
    g.showPopup = f;
    g.hidePopup = l;
  },
  98
);
__d(
  'AsyncSignal',
  ['URI', 'ZeroRewrites', 'eventsMixinDeprecated', 'memoize', 'setTimeout'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a(a, b) {
        (this.data = b || {}), (this.uri = a);
      }
      var b = a.prototype;
      b.send = function () {
        var a = new Image(),
          b = d('ZeroRewrites').rewriteURI(new (c('URI'))(this.uri));
        for (var e in this.data) b.addQueryData(e, this.data[e]);
        a.src = b.toString();
        if (this.handler) {
          var f = c('memoize')(this.handler);
          this.timeout && c('setTimeout')(f, this.timeout);
          a.onload = a.onerror = function () {
            f();
          };
        } else (a.onload = this.invoke.bind(this, 'load')), (a.onerror = this.invoke.bind(this, 'fail')), this.timeout && c('setTimeout')(this.invoke.bind(this, 'timeout'), this.timeout);
        return this;
      };
      b.setHandler = function (a) {
        this.handler = a;
        return this;
      };
      b.setTimeout = function (a) {
        this.timeout = a;
        return this;
      };
      return a;
    })();
    c('eventsMixinDeprecated')(a, ['load', 'fail', 'timeout']);
    Object.assign(a.prototype, { uri: null });
    g['default'] = a;
  },
  98
);
__d(
  'createDeprecatedProperties',
  [],
  function (a, b, c, d, e, f) {
    function g(a) {
      return function (b) {
        this[a] = b;
        return this;
      };
    }
    function h(a) {
      return function () {
        return this[a];
      };
    }
    function a(a, b) {
      a = a.prototype;
      for (var c in b) {
        var d = c.charAt(0).toUpperCase() + c.substr(1),
          e = '__auto__' + c;
        a[e] = b[c];
        a['set' + d] = g(e);
        a['get' + d] = h(e);
      }
    }
    f['default'] = a;
  },
  66
);
__d(
  'MViewportConstraint',
  ['Stratcom', 'createDeprecatedProperties'],
  function (a, b, c, d, e, f) {
    var g = document.createElement('div');
    g.style.paddingBottom = 'max(0px, env(safe-area-inset-bottom))';
    function h() {
      document.body.appendChild(g);
      var a = parseInt(window.getComputedStyle(g).paddingBottom, 10);
      document.body.removeChild(g);
      return a;
    }
    a = (function () {
      'use strict';
      function a(b, c) {
        a.constraints.push(this), this.setExact(c), this.setValue(b);
      }
      var c = a.prototype;
      c.release = function () {
        var c = a.constraints.indexOf(this);
        a.constraints.splice(c, 1);
        b('Stratcom').invoke('mviewport:update');
      };
      c.getValue = function () {
        return this._value;
      };
      c.setValue = function (a) {
        this.getValue() !== a && ((this._value = a), b('Stratcom').invoke('mviewport:update'));
      };
      a.getCalculatedStyles = function (b) {
        var c = 0,
          d = a.constraints,
          e = d.length,
          f = h();
        while (e--) {
          var g = d[e];
          if (g.getExact()) {
            var i = Math.max(b, g.getValue());
            c = Math.max(c, g.getValue());
            var j = '';
            (i === b || (c && c === i)) && (j = i + 'px');
            return { height: j + f, maxHeight: i + f + 'px', minHeight: c + f + 'px' };
          }
          c = Math.max(c, g.getValue());
        }
        return { height: '', maxHeight: '', minHeight: Math.max(b, c) + f + 'px' };
      };
      return a;
    })();
    b('createDeprecatedProperties')(a, { exact: !1 });
    Object.assign(a, { constraints: [] });
    e.exports = a;
  },
  null
);
__d(
  'WebPixelRatio',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a() {
      var a = null;
      document.documentElement &&
        (navigator.userAgent.indexOf('Firefox') !== -1 || (!window.devicePixelRatio && navigator.userAgent.indexOf('Windows Phone') !== -1)) &&
        ((a = screen.width / document.documentElement.offsetWidth), (a = Math.max(1, Math.floor(a * 2) / 2)));
      (a === null || a === 1) &&
        navigator.userAgent.indexOf('IEMobile') !== -1 &&
        Object.prototype.hasOwnProperty.call(screen, 'deviceXDPI') &&
        Object.prototype.hasOwnProperty.call(screen, 'deviceYDPI') &&
        ((a = Math.sqrt(screen.deviceXDPI * screen.deviceYDPI) / 96), (a = Math.max(1, Math.round(a * 2) / 2)));
      return a != null && a != 0 ? a : window.devicePixelRatio || 1;
    }
    f.get = a;
  },
  66
);
__d(
  'cancelAnimationFramePolyfill',
  [],
  function (a, b, c, d, e, f) {
    b = a.__fbNativeCancelAnimationFrame || a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.oCancelAnimationFrame || a.msCancelAnimationFrame || a.clearTimeout;
    c = b;
    f['default'] = c;
  },
  66
);
__d(
  'cancelAnimationFrame',
  ['cancelAnimationFramePolyfill'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      c('cancelAnimationFramePolyfill')(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'camelize',
  [],
  function (a, b, c, d, e, f) {
    var g = /-(.)/g;
    function a(a) {
      return a.replace(g, function (a, b) {
        return b.toUpperCase();
      });
    }
    f['default'] = a;
  },
  66
);
__d(
  'hyphenate',
  [],
  function (a, b, c, d, e, f) {
    var g = /([A-Z])/g;
    function a(a) {
      return a.replace(g, '-$1').toLowerCase();
    }
    f['default'] = a;
  },
  66
);
__d(
  'getStyleProperty',
  ['camelize', 'hyphenate'],
  function (a, b, c, d, e, f, g) {
    function h(a) {
      return a == null ? '' : String(a);
    }
    function a(a, b) {
      var d;
      if (window.getComputedStyle) {
        d = window.getComputedStyle(a, null);
        if (d) return h(d.getPropertyValue(c('hyphenate')(b)));
      }
      if (document.defaultView && document.defaultView.getComputedStyle) {
        d = document.defaultView.getComputedStyle(a, null);
        if (d) return h(d.getPropertyValue(c('hyphenate')(b)));
        if (b === 'display') return 'none';
      }
      return a.currentStyle ? (b === 'float' ? h(a.currentStyle.cssFloat || a.currentStyle.styleFloat) : h(a.currentStyle[c('camelize')(b)])) : h(a.style && a.style[c('camelize')(b)]);
    }
    g['default'] = a;
  },
  98
);
__d(
  'getOuterHeight',
  ['getStyleProperty'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b = 0;
      ['height', 'margin-top', 'margin-bottom', 'padding-top', 'padding-bottom'].forEach(function (d) {
        b += parseInt(c('getStyleProperty')(a, d), 10);
      });
      return b;
    }
    g['default'] = a;
  },
  98
);
__d(
  'setTimeoutWithRetries',
  ['setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a, b, d, e) {
      e = e;
      e || (e = { startImmediatly: !1, maxRetries: 3 });
      var f = e.startImmediatly || !1,
        g = e.maxRetries;
      (g === null || g === void 0) && (g = 3);
      var h = Math.max(0, g || 0),
        i = e.acrossTransitions || !1,
        j = Math.max(b || 0, 0),
        k = 0,
        l = null;
      g = function b() {
        d() ? a() : k < h && (k++, i ? (l = c('setTimeoutAcrossTransitions')(b, j)) : (l = setTimeout(b, j)));
      };
      f ? g() : i ? (l = c('setTimeoutAcrossTransitions')(g, j)) : (l = setTimeout(g, j));
      var m = !1;
      return function () {
        l && !m && clearTimeout(l), (m = !0);
      };
    }
    g['default'] = a;
  },
  98
);
__d(
  'MViewport',
  [
    'CSS',
    'DOM',
    'MJSEnvironment',
    'MViewportConstraint',
    'Stratcom',
    'URI',
    'Vector',
    'WebPixelRatio',
    'cancelAnimationFrame',
    'ge',
    'getOuterHeight',
    'getStyleProperty',
    'isInIframe',
    'nullthrows',
    'requestAnimationFrame',
    'setTimeoutWithRetries',
  ],
  function (a, b, c, d, e, f) {
    var g,
      h = !1,
      i = location.pathname.replace(/^\/v\d+\.\d\d?/, ''),
      j = /^\/plugins\//.test(i),
      k = /^\/dialog\//.test(i),
      l = /^\/dialog\/share/.test(i),
      aa = /^\/dialog\/oauth/.test(i),
      m = window.parent !== window,
      n = window.APP_ENABLED || window.FW_ENABLED;
    i = navigator.userAgent;
    var ba = /iPod/.test(i),
      o = /iPhone/.test(i),
      p = /iPad/.test(i),
      q = o || p || ba,
      r = q && /Safari/.test(i),
      s = b('MJSEnvironment').IS_ANDROID,
      t = /Chrome/.test(i),
      u = /Windows Phone/.test(i),
      v = !k && ((!n && r && !p) || (!n && s)),
      w,
      x = 0,
      y = 0,
      z = 0,
      A,
      B = 0,
      C = 0,
      D,
      E,
      F = b('nullthrows')(document.documentElement),
      G,
      ca = 44,
      da = 44,
      ea = 56;
    function c() {
      if (h) return;
      h = !0;
      E = b('nullthrows')(document.body);
      F = b('nullthrows')(document.documentElement);
      b('Stratcom').listen('m:root:render', null, H);
      b('Stratcom').listen('mviewport:update', null, H);
      b('Stratcom').listen('mviewport:force-update', null, ga);
      u && window.matchMedia && (window.orientation = window.matchMedia('(orientation:portrait)').matches ? 0 : 90);
      Z();
      !q && !N() && L() > K() && (B = 1);
      if (b('isInIframe')()) {
        var a = new (g || (g = b('URI')))(window.location.href).getQueryData();
        a = parseInt(a.parent_height, 10);
        a && (y = a);
      }
      window.screen.mozOrientation ? window.screen.addEventListener('mozorientationchange', V) : window.addEventListener('orientationchange', V);
      u && window.matchMedia && (window.matchMedia('(orientation:landscape)').addListener(W), window.matchMedia('(orientation:portrait)').addListener(W));
      window.addEventListener('resize', na);
      J();
      v && Q(0, 1);
    }
    function d(a) {
      return new (b('MViewportConstraint'))(a, !0);
    }
    function f(a) {
      return new (b('MViewportConstraint'))(a, !1);
    }
    function fa(a) {
      E.appendChild(a);
    }
    function H() {
      G && b('cancelAnimationFrame')(G), (G = b('requestAnimationFrame')(J));
    }
    function ga() {
      G && b('cancelAnimationFrame')(G), J();
    }
    function I(a, c) {
      c = c;
      for (var a = a; a; a = a.offsetParent)
        (c -= a.offsetTop), (c -= parseInt(b('getStyleProperty')(a, 'padding-bottom'), 10)), (c -= parseInt(b('getStyleProperty')(a, 'border-bottom'), 10)), (c -= parseInt(b('getStyleProperty')(a, 'margin-bottom'), 10));
      return Math.max(c, 0);
    }
    function J() {
      G = null;
      var a = b('ge')('root'),
        c = b('ge')('viewport');
      if (j || (l && m)) a && (a.style.minHeight = '0'), c && (c.style.minHeight = '0'), (E.style.minHeight = '0'), (E.style.paddingBottom = '0');
      else if (!m) {
        var d;
        v ? (d = Math.max(K(), M())) : (d = K());
        var e = b('MViewportConstraint').getCalculatedStyles(d),
          f = babelHelpers['extends']({}, e);
        f.minHeight = parseInt(f.minHeight, 10) - O() + 'px';
        a && Object.assign(a.style, f);
        c && Object.assign(c.style, e);
        Object.assign(E.style, e);
        b('Stratcom').invoke('m:viewport:update', null, e);
      } else {
        f = K();
        a && (a.style.minHeight = I(a, f) + 'px');
        c && (c.style.minHeight = I(c, f) + 'px');
        E.style.minHeight = f + 'px';
        b('Stratcom').invoke('m:viewport:iframe-update-complete');
      }
      d !== void 0 && C !== void 0 && (d > C ? b('Stratcom').invoke('m:viewport:resize-taller') : b('Stratcom').invoke('m:viewport:resize-shorter'));
      C = d;
      b('Stratcom').invoke('m:viewport:update-complete', null, e);
    }
    function K(a) {
      a === void 0 && (a = !1);
      if (x) return x;
      if (y) return y;
      return a ? window.screen.height : window.innerHeight;
    }
    function L() {
      return F.offsetWidth;
    }
    function ha() {
      var a = b('ge')('viewport');
      if (a.getBoundingClientRect) return a.getBoundingClientRect();
      a = K();
      var c = L();
      return { bottom: a, height: a, left: 0, top: 0, right: c, width: c };
    }
    function M() {
      if (m || n) return K();
      if (s && !t) return window.outerHeight / b('WebPixelRatio').get();
      else if (r) {
        var a = w ? screen.availWidth : screen.availHeight;
        a -= w ? ea : da;
        return a;
      } else return window.innerHeight;
    }
    function N() {
      w === void 0 && Z();
      return B ? !w : w;
    }
    function O() {
      var a = Y();
      if (aa) {
        a = b('DOM').scry(E, '*', 'MOauthDialogHeader')[0];
        return a != null ? b('getOuterHeight')(a) : 0;
      }
      return a ? ca + X() : 0;
    }
    function ia(a, b) {
      b === void 0 && (b = !1), P(a, 0, b);
    }
    function P(a, c, d) {
      d === void 0 && (d = !1), Q(0, b('Vector').getPos(a).y + c, d);
    }
    function ja(a) {
      var c = b('Vector').getPos(a).y,
        d = R(),
        e = K(),
        f = d + e;
      a = a.offsetHeight;
      var g = c + a;
      c < d ? Q(0, c) : g > f && (e < a ? Q(0, c) : Q(0, g - e));
    }
    function ka() {
      Q(0, 0);
    }
    function Q(a, c, d) {
      d === void 0 && (d = !1);
      c = c;
      c < 1 && v && (c = 1);
      if (R() === c && S() === a) return;
      if (d)
        try {
          window.scrollTo({ top: c, left: a, behavior: 'smooth' });
        } catch (b) {
          window.scrollTo(a, c);
        }
      else window.scrollTo(a, c);
      b('Stratcom').invoke('scroll');
    }
    function la(a, b) {
      var c = U();
      Q(c.x + a, c.y + b);
    }
    function R() {
      return window.pageYOffset;
    }
    function S() {
      return window.pageXOffset;
    }
    function T() {
      return Math.max(F.scrollHeight, E ? E.scrollHeight : 0);
    }
    function U() {
      return new (b('Vector'))(S(), R());
    }
    function ma(a) {
      var c =
        X() -
        b('DOM')
          .scry(E, '*', 'MAppTopBanner')
          .reduce(function (a, b) {
            return a + b.offsetHeight;
          }, 0);
      a && (c += a);
      Q(0, c);
      b('Stratcom').invoke('m:viewport:scroll-to-header');
    }
    function V() {
      Z(), s && !t ? ((z = 1), (A = window.innerHeight), (x = screen.width), H(), (x = 0)) : (H(), b('Stratcom').invoke('m:viewport:orientation-change'));
    }
    function W(a) {
      a.matches && ((z = 1), (window.orientation = a.media.indexOf('landscape') !== -1 ? 90 : 0), Z(), H(), b('Stratcom').invoke('m:viewport:orientation-change'));
    }
    function na() {
      if (!window.innerHeight || window.innerHeight == A) return;
      H();
      z && ((z = 0), b('Stratcom').invoke('m:viewport:orientation-change'));
    }
    function X() {
      var a = document,
        b = Y(),
        c = 0;
      while (b && b !== a) (c += b.offsetTop), (b = b.offsetParent);
      return c;
    }
    function Y() {
      !D && E && (D = b('DOM').scry(E, '*', 'MTopBlueBarHeader')[0]);
      return D || null;
    }
    function Z() {
      w = a.__updateOrientation();
    }
    function oa(a, b) {
      a === void 0 && (a = !1);
      b === void 0 && (b = !0);
      var c = function (a) {
          a && (a.stopImmediatePropagation && a.stopImmediatePropagation(), a.preventDefault());
          return !1;
        },
        d = window.onwheel;
      window.onwheel = c;
      var e = window.onmousewheel;
      window.onmousewheel = c;
      var f = null,
        g = window.ontouchmove;
      b || (window.ontouchmove = c);
      var h = function () {};
      if (q || a) {
        var i = E.style.position;
        E.style.position = 'fixed';
        var j = E.style.width;
        E.style.width = '100vw';
        var k = E.style.height;
        E.style.height = '100vh';
        h = function () {
          i ? (E.style.position = i) : (E.style.position = ''), j ? (E.style.width = j) : (E.style.width = ''), k ? (E.style.height = k) : (E.style.height = '');
        };
      }
      var l = !1;
      return function () {
        if (l) return;
        l = !0;
        window.onwheel = d;
        window.onmousewheel = e;
        window.ontouchmove = g;
        f !== null && (f.remove(), (f = null));
        h();
      };
    }
    function pa(a) {
      a === void 0 && (a = document.body);
      if (!a) return null;
      var b = '';
      if (a) {
        var c = a.style.overflow;
        c !== 'hidden' && ((a.style.overflow = 'hidden'), (b = c));
      }
      return {
        remove: function () {
          a && (a.style.overflow = b);
        },
      };
    }
    var $;
    function qa(a, c) {
      c === void 0 && (c = !1);
      $ && ($(), ($ = null));
      if (!c) {
        Q(0, a);
        return null;
      }
      $ = b('setTimeoutWithRetries')(
        function () {
          ($ = null), Q(0, a);
        },
        250,
        function () {
          return T() >= a;
        },
        { maxRetries: 10 }
      );
      return $;
    }
    function ra(a) {
      var c = Y();
      c && (a ? b('DOM').show(c) : b('DOM').hide(c));
    }
    function sa(a, c) {
      c ? b('CSS').addClass(E, a) : b('CSS').removeClass(E, a);
    }
    function ta(a) {
      v = a;
    }
    o = {
      addHeightConstraint: d,
      addMinHeightConstraint: f,
      appendNode: fa,
      getHeaderTop: X,
      getHeaderHeight: O,
      getHeaderElement: Y,
      getHeight: K,
      getUseableHeight: K,
      getUseableWidth: L,
      getWidth: L,
      getScrollPos: U,
      getScreenHeight: M,
      getScroll: U,
      getScrollHeight: T,
      getScrollLeft: S,
      getScrollTop: R,
      init: c,
      isLandscape: N,
      getBoundingRect: ha,
      scrollBy: la,
      scrollTo: Q,
      scrollToTop: ka,
      scrollToHeader: ma,
      scrollToNode: ia,
      scrollToNodeWithOffset: P,
      scrollToNodeIfNecessary: ja,
      scrollToY: qa,
      MViewportConstraint: b('MViewportConstraint'),
      disableScroll: oa,
      disableScrollWithOverflowHidden: pa,
      toggleHeader: ra,
      toggleBodyClass: sa,
      overrideMayHideAddressBar: ta,
    };
    e.exports = o;
  },
  null
);
__d(
  'MLinkHack',
  ['$', 'CurrentUser', 'DOM', 'MJSEnvironment', 'MViewport', 'Stratcom', 'URI', 'Vector'],
  function (a, b, c, d, e, f, g) {
    var h = '#!';
    function i(a) {
      if (!c('CurrentUser').isLoggedIn()) return !1;
      var b = a.getAttribute('href') || '';
      if (b.indexOf(h) !== 0) {
        a.setAttribute('href', h + b);
        return !0;
      }
      return !1;
    }
    function j(a) {
      var b = a.getAttribute('href') || '';
      if (b.indexOf(h) === 0) {
        a.setAttribute('href', b.substr(2));
        return !0;
      }
      return !1;
    }
    function a(a) {
      if (!c('MJSEnvironment').IS_APPLE_WEBKIT_IOS) return;
      a = c('Vector').getPos(a);
      a = document.elementFromPoint(a.x, a.y - d('MViewport').getScrollTop());
      var b = c('$')('root');
      while (a && a !== b) {
        if (a.tagName === 'A') {
          i(a);
          break;
        }
        a = a.parentElement;
      }
    }
    function b(a, b) {
      var c = j(a);
      b(a);
      c && i(a);
    }
    function e(a) {
      a = a.getAttribute('href');
      if (!a) return null;
      return a.indexOf(h) === 0 ? a.substr(2) : a;
    }
    (function () {
      if (window.APP_ENABLED || !('ontouchstart' in window)) return;
      function a(a, b) {
        return (' ' + a.className + ' ').indexOf(' ' + b + ' ') > -1;
      }
      function b(b, c) {
        b = b;
        while (b && !a(b, c)) b = b.parentNode;
        return b;
      }
      c('Stratcom').listen('touchend', 'tag:a', function (a) {
        a = a.getNode('tag:a');
        if (a.getAttribute('target')) return;
        var e = a.getAttribute('href');
        if (!e || e.indexOf('#') === 0) return;
        e = new (c('URI'))(e).getProtocol();
        if (e && e !== 'http' && e !== 'https') return;
        e = [a];
        if (c('Stratcom').hasSigil(a, 'ajaxify')) {
          var f = a.getAttribute('data-ajaxify-class') || 'async_elem',
            g = b(a, f);
          g || (g = b(a, f + '_saving'));
          g && (e = d('DOM').scry(g, 'a', 'ajaxify'));
        }
        e.forEach(function (a) {
          i(a);
        });
      });
    })();
    g.PREFIX = h;
    g.add = i;
    g.remove = j;
    g.preventFromPoint = a;
    g.safe = b;
    g.getHref = e;
  },
  98
);
__d(
  'XAsyncRequest',
  ['MRequest'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a(a) {
        var b = this;
        this.setAllowCrossPageTransition = function (a) {
          return b;
        };
        this.$1 = new (c('MRequest'))(a);
      }
      var b = a.prototype;
      b.setURI = function (a) {
        this.$1.setURI(a);
        return this;
      };
      b.setMethod = function (a) {
        this.$1.setMethod(a);
        return this;
      };
      b.setType = function (a) {
        this.$1.setType(a);
        return this;
      };
      b.setAutoProcess = function (a) {
        this.$1.setAutoProcess(a);
        return this;
      };
      b.setData = function (a, b) {
        if (b !== void 0 && b) {
          b = {};
          for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && a[c] !== void 0 && (b[c] = a[c]);
          this.$1.setData(b);
        } else this.$1.setData(a);
        return this;
      };
      b.setRawData = function (a) {
        this.$1.setRawData(a);
        return this;
      };
      b.setHandler = function (a) {
        this.$1.listen('done', a);
        return this;
      };
      b.setPayloadHandler = function (a) {
        this.setHandler(function (b) {
          return a(b.payload);
        });
        return this;
      };
      b.setErrorHandler = function (a) {
        this.$1.listen('error', a);
        return this;
      };
      b.setResponseHandler = function (a) {
        this.$1.listen('response', a);
        return this;
      };
      b.setReadOnly = function (a) {
        this.$1.setReadOnly(a);
        return this;
      };
      b.send = function () {
        this.$1.send();
        return this;
      };
      b.abort = function () {
        this.$1.abort();
      };
      b.setAllowCrossOrigin = function (a) {
        this.$1.setCORS(a);
        return this;
      };
      b.setAllowCredentials = function (a) {
        this.$1.setAllowCredentials(a);
        return this;
      };
      b.setRequestHeader = function (a, b) {
        this.$1.setRequestHeader(a, b);
        return this;
      };
      b.setUploadProgressHandler = function (a) {
        this.$1.listen('uploadprogress', a);
        return this;
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'EventListenerImplForCacheStorage',
  ['EventListener'],
  function (a, b, c, d, e, f) {
    e.exports = b('EventListener');
  },
  null
);
__d(
  'CacheStorage',
  ['ErrorGuard', 'EventListenerImplForCacheStorage', 'ExecutionEnvironment', 'FBJSON', 'WebStorage', 'emptyFunction', 'err', 'killswitch'],
  function (a, b, c, d, e, f, g) {
    var h = '_@_',
      i = '3b',
      j = 'CacheStorageVersion',
      k = { length: 0, getItem: c('emptyFunction'), setItem: c('emptyFunction'), clear: c('emptyFunction'), removeItem: c('emptyFunction'), key: c('emptyFunction') };
    a = (function () {
      function a(a) {
        this._store = a;
      }
      var b = a.prototype;
      b.getStore = function () {
        return this._store;
      };
      b.keys = function () {
        var a = [];
        for (var b = 0; b < this._store.length; b++) {
          var c = this._store.key(b);
          c != null && a.push(c);
        }
        return a;
      };
      b.get = function (a) {
        return this._store.getItem(a);
      };
      b.set = function (a, b) {
        this._store.setItem(a, b);
      };
      b.remove = function (a) {
        this._store.removeItem(a);
      };
      b.clear = function () {
        this._store.clear();
      };
      b.clearWithPrefix = function (a) {
        a = a || '';
        var b = this.keys();
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          d != null && d.startsWith(a) && this.remove(d);
        }
      };
      return a;
    })();
    b = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        var b;
        return a.call(this, (b = c('WebStorage').getLocalStorage()) != null ? b : k) || this;
      }
      b.available = function () {
        return !!c('WebStorage').getLocalStorage();
      };
      return b;
    })(a);
    e = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        var b;
        return a.call(this, (b = c('WebStorage').getSessionStorage()) != null ? b : k) || this;
      }
      b.available = function () {
        return !!c('WebStorage').getSessionStorage();
      };
      return b;
    })(a);
    var l = (function () {
        function a() {
          this._store = {};
        }
        var b = a.prototype;
        b.getStore = function () {
          return this._store;
        };
        b.keys = function () {
          return Object.keys(this._store);
        };
        b.get = function (a) {
          return this._store[a] === void 0 ? null : this._store[a];
        };
        b.set = function (a, b) {
          this._store[a] = b;
        };
        b.remove = function (a) {
          a in this._store && delete this._store[a];
        };
        b.clear = function () {
          this._store = {};
        };
        b.clearWithPrefix = function (a) {
          a = a || '';
          var b = this.keys();
          for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.startsWith(a) && this.remove(d);
          }
        };
        a.available = function () {
          return !0;
        };
        return a;
      })(),
      m = { memory: l, localstorage: b, sessionstorage: e };
    g = (function () {
      function a(a, b) {
        this._changeCallbacks = [];
        this._key_prefix = '_cs_';
        this._exception = null;
        b && (this._key_prefix = b);
        a === 'AUTO' || !a ? (b = 'memory') : (b = a);
        b && (!m[b] || !m[b].available() ? (c('ExecutionEnvironment').canUseDOM, (this._backend = new l())) : (this._backend = new m[b]()));
        a = this.useBrowserStorage();
        a && c('EventListenerImplForCacheStorage').listen(window, 'storage', this._onBrowserValueChanged.bind(this));
        b = a ? this._backend.getStore().getItem(j) : this._backend.getStore()[j];
        b !== i && (c('killswitch')('CACHE_STORAGE_MODULE_CLEAR_OWN_KEYS') ? this.clear() : this.clearOwnKeys());
      }
      var b = a.prototype;
      b.useBrowserStorage = function () {
        return this._backend.getStore() === c('WebStorage').getLocalStorage() || this._backend.getStore() === c('WebStorage').getSessionStorage();
      };
      b.addValueChangeCallback = function (a) {
        var b = this;
        this._changeCallbacks.push(a);
        return {
          remove: function () {
            b._changeCallbacks.slice(b._changeCallbacks.indexOf(a), 1);
          },
        };
      };
      b._onBrowserValueChanged = function (a) {
        this._changeCallbacks &&
          String(a.key).startsWith(this._key_prefix) &&
          this._changeCallbacks.forEach(function (b) {
            b(a.key, a.oldValue, a.newValue);
          });
      };
      b.keys = function () {
        var a = this,
          b = [];
        c('ErrorGuard').guard(
          function () {
            if (a._backend) {
              var c = a._backend.keys(),
                d = a._key_prefix.length;
              for (var e = 0; e < c.length; e++) c[e].substr(0, d) == a._key_prefix && b.push(c[e].substr(d));
            }
          },
          { name: 'CacheStorage' }
        )();
        return b;
      };
      b.set = function (b, e, f) {
        if (this._backend) {
          if (this.useBrowserStorage() && a._persistentWritesDisabled) {
            this._exception = c('err')('writes disabled');
            return !1;
          }
          var g;
          typeof e === 'string' ? (g = h + e) : !f ? ((g = { __t: Date.now(), __v: e }), (g = d('FBJSON').stringify(g))) : (g = d('FBJSON').stringify(e));
          f = this._backend;
          e = this._key_prefix + b;
          b = !0;
          var i = null;
          while (b)
            try {
              (i = null), f.set(e, g), (b = !1);
            } catch (a) {
              i = a;
              var j = f.keys().length;
              this._evictCacheEntries();
              b = f.keys().length < j;
            }
          if (i !== null) {
            this._exception = i;
            return !1;
          } else {
            this._exception = null;
            return !0;
          }
        }
        this._exception = c('err')('no back end');
        return !1;
      };
      b.getLastSetExceptionMessage = function () {
        return this._exception ? this._exception.message : null;
      };
      b.getLastSetException = function () {
        return this._exception;
      };
      b.getStorageKeyCount = function () {
        var a = this._backend;
        return a ? a.keys().length : 0;
      };
      b._evictCacheEntries = function () {
        var b = [],
          c = this._backend;
        c.keys().forEach(function (e) {
          if (e === j) return;
          var g = c.get(e);
          if (g === void 0) {
            c.remove(e);
            return;
          }
          if (a._hasMagicPrefix(g)) return;
          try {
            g = d('FBJSON').parse(g, f.id);
          } catch (a) {
            c.remove(e);
            return;
          }
          g && g.__t !== void 0 && g.__v !== void 0 && b.push([e, g.__t]);
        });
        b.sort(function (a, b) {
          return a[1] - b[1];
        });
        for (var e = 0; e < Math.ceil(b.length / 2); e++) c.remove(b[e][0]);
      };
      b.get = function (b, e) {
        var g;
        if (this._backend) {
          c('ErrorGuard').applyWithGuard(
            function () {
              g = this._backend.get(this._key_prefix + b);
            },
            this,
            [],
            {
              onError: function () {
                g = null;
              },
              name: 'CacheStorage:get',
            }
          );
          if (g != null)
            if (a._hasMagicPrefix(g)) g = g.substr(h.length);
            else
              try {
                (g = d('FBJSON').parse(g, f.id)), g && g.__t !== void 0 && g.__v !== void 0 && (g = g.__v);
              } catch (a) {
                g = void 0;
              }
          else g = void 0;
        }
        g === void 0 && e !== void 0 && ((g = e), this.set(b, g));
        return g;
      };
      b.remove = function (a) {
        this._backend && c('ErrorGuard').applyWithGuard(this._backend.remove, this._backend, [this._key_prefix + a], { name: 'CacheStorage:remove' });
      };
      b._setVersion = function () {
        var a = this;
        c('ErrorGuard').applyWithGuard(
          function () {
            a.useBrowserStorage() ? a._backend.getStore().setItem(j, i) : (a._backend.getStore()[j] = i);
          },
          this,
          [],
          { name: 'CacheStorage:setVersion' }
        );
      };
      b.clear = function () {
        this._backend && (c('ErrorGuard').applyWithGuard(this._backend.clear, this._backend, [], { name: 'CacheStorage:clear' }), this._setVersion());
      };
      b.clearOwnKeys = function () {
        this._backend && (c('ErrorGuard').applyWithGuard(this._backend.clearWithPrefix, this._backend, [this._key_prefix], { name: 'CacheStorage:clearOwnKeys' }), this._setVersion());
      };
      a.getAllStorageTypes = function () {
        return Object.keys(m);
      };
      a._hasMagicPrefix = function (a) {
        return a.substr(0, h.length) === h;
      };
      a.disablePersistentWrites = function () {
        a._persistentWritesDisabled = !0;
      };
      return a;
    })();
    g._persistentWritesDisabled = !1;
    f.exports = g;
  },
  34
);
__d(
  'MCache',
  ['CacheStorage', 'ErrorGuard', 'MWebStorageMonsterWhiteList', 'WebStorage', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f) {
    var g,
      h,
      i,
      j = {
        _VERSION: '2h',
        _VERSION_KEY: 'version',
        VIEWER_KEY: 'viewer',
        getItem: function (a) {
          i || j.install();
          a = i.get(a);
          return a === void 0 ? null : a;
        },
        setItem: function (a, c, d) {
          (g || (g = b('ErrorGuard'))).guard(
            function () {
              i || j.install(), i.set(a, c, d);
            },
            { name: 'MCache' }
          )();
        },
        removeItem: function (a) {
          i || j.install(), i.remove(a);
        },
        clear: function () {
          k((h || (h = b('WebStorage'))).getLocalStorage()),
            k(h.getSessionStorage()),
            (!(h || (h = b('WebStorage'))).getLocalStorage() || !(h || (h = b('WebStorage'))).getSessionStorage()) && i.clear(),
            i.set(j._VERSION_KEY, j._VERSION, !0);
        },
        install: function (a) {
          if (i && !a) return;
          i = new (b('CacheStorage'))('localstorage', '');
          a = i.get(j._VERSION_KEY);
          a != j._VERSION && j.clear();
        },
      };
    function k(a) {
      if (!a) return;
      var c = [];
      for (var d = 0; d < a.length; d++) {
        var e = a.key(d);
        e != null &&
          !b('MWebStorageMonsterWhiteList').whitelist.some(function (a) {
            return new RegExp(a).test(e);
          }) &&
          c.push(e);
      }
      c.forEach(function (b) {
        a.removeItem(b);
      });
    }
    b('setTimeoutAcrossTransitions')(j.install, 0);
    e.exports = j;
  },
  null
);
__d(
  'MPageCache',
  ['FBLogger', 'LogHistory', 'MResponseData', 'MURI', 'gkx', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    var h = d('LogHistory').getInstance('cache'),
      i = {
        _pageCache: {},
        _pageCacheComplete: {},
        _URIStack: [],
        _iuiResponses: {},
        _scrollHistory: {},
        _scrollUnitHistory: {},
        _fallbacks: {},
        _reset: function () {
          (i._pageCache = {}), (i._URIStack = []), (i._iuiResponses = {}), (i._scrollHistory = {}), (i._scrollUnitHistory = {});
        },
        isPageCachedWithFallbacks: function (a, b) {
          return i._resolveCacheFallbacks(a, b, !1);
        },
        prepareCacheFallbakcs: function (a, b) {
          i._resolveCacheFallbacks(a, b, !0);
        },
        _resolveCacheFallbacks: function (a, b, d) {
          var e = i._getCacheKey(a);
          if (i.isPageCached(a, b)) return !0;
          var f = i._fallbacks[e] || [];
          for (var g = 0; g < f.length; g++) {
            var h = void 0,
              j = f[g];
            try {
              h = j && j(a, b);
            } catch (a) {
              c('FBLogger')('MPageCache').info('Error in fallback cache resolver', j);
            }
            if (h && i.isPageCached(h.uri, h.expiration_ms)) {
              d === !0 && i._duplicateCache(e, i._getCacheKey(h.uri));
              return !0;
            }
          }
          return !1;
        },
        _duplicateCache: function (a, b) {
          (i._pageCache[a] = i._pageCache[b]), (i._iuiResponses[a] = [].concat(i._iuiResponses[b])), (i._pageCacheComplete[a] = i._pageCacheComplete[b]), (i._scrollHistory[a] = i._scrollHistory[b]);
        },
        isPageCached: function (a, b) {
          var d = i._getItemByURI(a);
          if (!d) return !1;
          if (i._hasCacheExpired(d, b)) return !1;
          if (i._pageCacheComplete[i._getCacheKey(a)] === !1 && c('gkx')('712819')) {
            i.removeCachedPage(a);
            i.clearCachedIUIResponses(a);
            return !1;
          }
          return !0;
        },
        addCacheFallback: function (a, b) {
          var c = i._getCacheKey(a);
          i._fallbacks[c] || (i._fallbacks[c] = []);
          i._fallbacks[c].push(b);
          return {
            remove: function () {
              if (i._fallbacks[c]) {
                var a = i._fallbacks[c].indexOf(b);
                a !== -1 && i._fallbacks[c].splice(a, 1);
              }
            },
          };
        },
        getCacheState: function (a, b) {
          if (i.isPageCached(a, b)) return 'page-cache';
          else if (i.isPageCachedWithFallbacks(a, b)) return 'fallback-cache';
          else {
            var c = i._getItemByURI(a);
            if (!c || i._pageCacheComplete[i._getCacheKey(a)] === !1) return 'not-cached';
            else return b === 0 ? 'avoided' : 'expired';
          }
        },
        setPageCacheComplete: function (a, b) {
          i._pageCacheComplete[i._getCacheKey(a)] = b;
        },
        getCachedPage: function (a) {
          h.log('get page', a);
          var b = i._getItemByURI(a);
          if (!b || b.version != window.m_version) {
            h.log('page cache miss', a);
            return null;
          } else {
            h.log('page cache hit', a);
            return new (c('MResponseData'))(b.markup);
          }
        },
        setCachedPage: function (a, b) {
          h.log('set page', a);
          b = { markup: b.prepForCache(!0), time: Date.now(), version: window.m_version };
          a = i._getCacheKey(a);
          i._pageCache[a] = b;
          i._URIStack.push(a);
        },
        removeCachedPage: function (a) {
          h.log('remove page', a), delete i._pageCache[i._getCacheKey(a)];
        },
        clearEntireCache: function () {
          i._reset();
        },
        popCachedPage: function () {
          i.removeCachedPage(i._URIStack.pop());
        },
        addCachedIUIResponse: function (a, b) {
          h.log('add iui:response', a);
          if (b) {
            a = i._getCacheKey(a);
            a = i._iuiResponses[a];
            if (a) {
              b = b.prepForCache(!1);
              b && a.push(b);
            }
          }
        },
        applyCachedIUIResponses: function (a, b) {
          h.log('apply iui:response', a);
          var d = i._getCacheKey(a),
            e = i._iuiResponses[d] || [],
            f = e.length,
            g = !1,
            j = !1,
            k = function () {
              j = !0;
            };
          for (var l = 0; l < e.length; l++) {
            if (f !== e.length && !g) {
              var m;
              m = (m = a) != null ? m : '';
              typeof m !== 'string' && (m = m.toString());
              i.sendWarning(e.length, f, m);
              g = !0;
            }
            h.log('iui:response cache hit', d, l);
            m = new (c('MResponseData'))(e[l]);
            var n = m.listen('discard', k);
            m.process();
            n.remove();
            if (j) {
              h.log('iui:response cache discarded', d, l);
              return;
            }
          }
          b && b();
        },
        sendWarning: function (a, b, d) {
          c('setTimeoutAcrossTransitions')(function () {
            c('FBLogger')('FIXME').warn('iui responses changed from %s to %s while applying cache for uri %s', b, a, d);
          }, 100);
        },
        clearCachedIUIResponses: function (a) {
          h.log('clear iui:response', a), (i._iuiResponses[i._getCacheKey(a)] = []);
        },
        setScrollUnitHistory: function (a, b, c, d) {
          var e = Object.keys(i._scrollUnitHistory);
          e.length > 10 && (i._scrollUnitHistory = {});
          i._scrollUnitHistory[i._getCacheKey(a)] = i._scrollUnitHistory[i._getCacheKey(a)] || {};
          e = Object.keys(i._scrollUnitHistory[i._getCacheKey(a)]);
          e.length > 10 && (i._scrollUnitHistory[i._getCacheKey(a)] = {});
          i._scrollUnitHistory[i._getCacheKey(a)][b] = { top: c, left: d };
        },
        getScrollUnitHistory: function (a, b) {
          a = i._getCacheKey(a);
          if (i._scrollUnitHistory[a]) {
            var c = i._scrollUnitHistory[a][b];
            delete i._scrollUnitHistory[a][b];
            return c;
          }
          return null;
        },
        setScrollHistory: function (a, b) {
          i._scrollHistory[i._getCacheKey(a)] = b;
        },
        getScrollHistory: function (a) {
          a = i._getCacheKey(a);
          var b = i._scrollHistory[a];
          delete i._scrollHistory[a];
          return b;
        },
        _getCacheKey: function (a) {
          return new (c('MURI'))(a).normalize().toString();
        },
        _getItemByURI: function (a) {
          return i._pageCache[i._getCacheKey(a)];
        },
        _hasCacheExpired: function (a, b) {
          if (!a) return !0;
          a = a.time;
          if (b === 0) return !0;
          var c = Date.now();
          if (c >= a + b) return !0;
          return c <= a - 6e5 ? !0 : !1;
        },
      };
    a = i;
    g['default'] = a;
  },
  98
);
__d(
  'IndicatorType',
  [],
  function (a, b, c, d, e, f) {
    a = { ANDROID: 1, ANDROID_NONROTATING: 2, IOS: 3 };
    b = a;
    f['default'] = b;
  },
  66
);
__d(
  'getVendorPrefixedName',
  ['invariant', 'ExecutionEnvironment', 'UserAgent', 'camelize'],
  function (a, b, c, d, e, f, g, h) {
    var i = {},
      j = ['Webkit', 'ms', 'Moz', 'O'],
      k = new RegExp('^(' + j.join('|') + ')'),
      l = d('ExecutionEnvironment').canUseDOM ? document.createElement('div').style : {};
    function m(a) {
      for (var b = 0; b < j.length; b++) {
        var c = j[b] + a;
        if (c in l) return c;
      }
      return null;
    }
    function n(a) {
      switch (a) {
        case 'lineClamp':
          return c('UserAgent').isEngine('WebKit >= 315.14.2') ? 'WebkitLineClamp' : null;
        default:
          return null;
      }
    }
    function a(a) {
      var b = c('camelize')(a);
      if (i[b] === void 0) {
        var e = b.charAt(0).toUpperCase() + b.slice(1);
        k.test(e) && h(0, 957, a);
        d('ExecutionEnvironment').canUseDOM ? (i[b] = b in l ? b : m(e)) : (i[b] = n(b));
      }
      return i[b];
    }
    g['default'] = a;
  },
  98
);
__d(
  'isVisible',
  ['MViewport'],
  function (a, b, c, d, e, f) {
    function a(a) {
      var c = getComputedStyle(a);
      a = a.getBoundingClientRect();
      return c && c.visibility !== 'hidden' && a.height > 0 && a.bottom > 0 && a.top < b('MViewport').getUseableHeight();
    }
    e.exports = a;
  },
  null
);
__d(
  'MJSAnimator',
  ['IndicatorType', 'getVendorPrefixedName', 'isVisible', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f) {
    function a(a, c, d) {
      this._root = a;
      this._elementClassName = a.className;
      var e;
      switch (c) {
        case b('IndicatorType').ANDROID:
          this._framesPerAnim = 30;
          e = 1e3;
          break;
        case b('IndicatorType').ANDROID_NONROTATING:
          this._framesPerAnim = 7;
          e = 860;
          break;
        case b('IndicatorType').IOS:
          this._framesPerAnim = 12;
          e = 1e3;
          break;
      }
      this._shouldRotate = d;
      this._frame = 0;
      this._degreesPerFrame = 360 / this._framesPerAnim;
      this._animationInterval = Math.round(e / this._framesPerAnim);
      this._animatingTimeStamp = 0;
      this._doAnimation = this._doAnimation.bind(this);
    }
    a.prototype.start = function () {
      (this._animating = !0), this._animationTimer || (this._animationTimer = b('setTimeoutAcrossTransitions')(this._doAnimation, this._animationInterval));
    };
    a.prototype.stop = function () {
      (this._animating = !1), this._animationTimer && (clearTimeout(this._animationTimer), (this._animationTimer = 0), (this._animatingTimeStamp = 0));
    };
    a.prototype.pause = a.prototype.stop;
    a.prototype._doAnimation = function () {
      if (this._animating && b('isVisible')(this._root)) {
        var a = Date.now(),
          c = this._animatingTimeStamp ? a - this._animatingTimeStamp : this._animationInterval;
        this._frame = this._frame >= this._framesPerAnim ? 1 : this._frame + 1;
        if (this._shouldRotate) {
          var d = this._frame * this._degreesPerFrame - this._degreesPerFrame;
          this._root.style[b('getVendorPrefixedName')('transform')] = 'rotate(' + d + 'deg)';
        } else this._root.className = this._elementClassName + ' frame' + this._frame;
        d = this._animationInterval + this._animationInterval - c;
        d < 16 && (d = 16);
        this._animationTimer = b('setTimeoutAcrossTransitions')(this._doAnimation, d);
        this._animatingTimeStamp = a;
      } else clearTimeout(this._animationTimer), (this._animationTimer = 0), (this._animating = !1);
    };
    a.prototype.cleanup = function () {
      clearTimeout(this._animationTimer);
    };
    e.exports = a;
  },
  null
);
__d(
  'MStopNGo',
  ['MViewport', 'Stratcom', 'StratcomManager', 'eventsMixinDeprecated', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f) {
    function g() {}
    b('eventsMixinDeprecated')(g, ['stop', 'go']);
    Object.assign(g, {
      TIMER_DELAY: 200,
      _timer: null,
      _touching: !1,
      _interactionStartCallback: function () {
        var a = g;
        clearTimeout(a._timer);
        a._touching || a._instance.invoke('stop');
        a._touching = !0;
      },
      _interactionStopCallback: function () {
        var a = g;
        a._scrollOffset = b('MViewport').getScroll();
        clearTimeout(a._timer);
        a._timer = b('setTimeoutAcrossTransitions')(a._delayedCallback, a.TIMER_DELAY);
      },
      _delayedCallback: function () {
        var a = g,
          c = b('MViewport').getScroll();
        c.y === a._scrollOffset.y && c.x === a._scrollOffset.x ? ((a._touching = !1), a._instance.invoke('go')) : a._interactionStopCallback();
      },
      _scrollCallback: function () {
        var a = g;
        a._touching || a._interactionStartCallback();
        a._interactionStopCallback();
      },
    });
    (function () {
      b('StratcomManager').enableDispatch(document, 'scroll'),
        (g._instance = new g()),
        b('Stratcom').listen(['scroll', 'm:page:render:complete'], null, g._scrollCallback),
        b('Stratcom').listen(['touchend', 'touchcancel', 'MScrollArea:scrollend'], null, g._interactionStopCallback),
        b('Stratcom').listen(['touchstart', 'MScrollArea:scrollstart'], null, g._interactionStartCallback);
    })();
    e.exports = g;
  },
  null
);
__d(
  'MLoadingIndicator',
  ['invariant', 'DOM', 'IndicatorType', 'MJSAnimator', 'MLoadingIndicatorSigils', 'MStopNGo', 'Stratcom', 'clearTimeout', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    var h = {};
    Object.keys(b('IndicatorType')).forEach(function (a) {
      return (h[b('IndicatorType')[a]] = a);
    });
    a = (function () {
      'use strict';
      function a(a) {
        var c = this;
        this.$1 = null;
        this.$2 = !1;
        this.$3 = !1;
        this.$9 = function () {
          c.$10(!0);
        };
        this.$11 = function () {
          c.$7 && c.$7.pause();
        };
        this.willStartAnimation = function () {
          b('clearTimeout')(c.$5), (c.$5 = b('setTimeoutAcrossTransitions')(c.$9.bind(c), 100));
        };
        this.willPauseAnimation = function () {
          b('clearTimeout')(c.$5), (c.$5 = b('setTimeoutAcrossTransitions')(c.$11.bind(c), 100));
        };
        this.$8 = function () {
          if (c.$3) return;
          b('clearTimeout')(c.$5);
          c.$7 && c.$7.cleanup();
          c.$4 = null;
          if (c.$6) {
            for (var a = 0, d = c.$6.length; a < d; ++a) c.$6[a].remove();
            c.$6 = null;
          }
        };
        if (!('getBoundingClientRect' in a)) return;
        var d = parseInt(a.getAttribute('data-animtype'), 10);
        if (!d || isNaN(d) || !(d in h)) return;
        this.$1 = d;
        this.$2 = d !== b('IndicatorType').ANDROID_NONROTATING;
        this.$3 = !1;
        b('Stratcom').hasSigil(a, b('MLoadingIndicatorSigils').ANIMATE) || (a = b('DOM').find(a, 'div', b('MLoadingIndicatorSigils').ANIMATE));
        this.$4 = a;
        this.$5 = null;
        d = this.willStartAnimation.bind(this);
        this.$6 = [
          b('Stratcom').listen(['m:side-area:show', 'm:jewel:flyout:open'], null, d),
          b('Stratcom').listen('m:page:unload', null, this.$8.bind(this)),
          b('MStopNGo').listen('go', d),
          b('MStopNGo').listen('stop', this.willPauseAnimation.bind(this)),
        ];
      }
      var c = a.prototype;
      c.setSpinAcrossPageTransitions = function (a) {
        this.$3 = !0;
        return this;
      };
      c.$10 = function (a) {
        if (document.body == null || !document.body.contains(this.$4)) {
          this.$8();
          return;
        }
        this.$7 || (this.$7 = this.$12());
        a ? this.$7.start() : this.$7.stop();
      };
      c.$12 = function () {
        return new (b('MJSAnimator'))(this.$4, this.$1, this.$2);
      };
      a.init = function (b) {
        b = document.getElementById(b);
        if (b) {
          b = new a(b);
          b.willStartAnimation();
          return b;
        }
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  'getOpacityStyleName',
  [],
  function (a, b, c, d, e, f) {
    var g = !1,
      h = null;
    function a() {
      if (!g) {
        if (document.body && 'opacity' in document.body.style) h = 'opacity';
        else {
          var a = document.createElement('div');
          a.style.filter = 'alpha(opacity=100)';
          a.style.filter && (h = 'filter');
        }
        g = !0;
      }
      return h;
    }
    f['default'] = a;
  },
  66
);
__d(
  'StyleCore',
  ['invariant', 'camelize', 'containsNode', 'err', 'getOpacityStyleName', 'getStyleProperty', 'hyphenate'],
  function (a, b, c, d, e, f, g, h) {
    function i(a, b) {
      a = o.get(a, b);
      return a === 'auto' || a === 'scroll';
    }
    var j = new RegExp('\\s*([^\\s:]+)\\s*:\\s*([^;(\'"]*(?:(?:\\([^)]*\\)|"[^"]*"|\'[^\']*\')[^;(?:\'"]*)*)(?:;|$)', 'g');
    function k(a) {
      var b = {};
      a.replace(j, function (a, c, d) {
        b[c] = d;
        return d;
      });
      return b;
    }
    function l(a) {
      var b = '';
      for (var c in a) a[c] && (b += c + ':' + a[c] + ';');
      return b;
    }
    function m(a) {
      return a !== '' ? 'alpha(opacity=' + a * 100 + ')' : '';
    }
    function n(a, b, d) {
      switch (c('hyphenate')(b)) {
        case 'font-weight':
        case 'line-height':
        case 'opacity':
        case 'z-index':
        case 'animation-iteration-count':
        case '-webkit-animation-iteration-count':
          break;
        case 'width':
        case 'height':
          var e = parseInt(d, 10) < 0;
          e && h(0, 11849, a, b, d);
        default:
          isNaN(d) || !d || d === '0' || h(0, 11850, a, b, d, d + 'px');
          break;
      }
    }
    var o = {
      set: function (a, b, d) {
        n('Style.set', b, d);
        if (a == null) return;
        a = a.style;
        switch (b) {
          case 'opacity':
            c('getOpacityStyleName')() === 'filter' ? (a.filter = m(d)) : (a.opacity = d);
            break;
          case 'float':
            a.cssFloat = a.styleFloat = d || '';
            break;
          default:
            try {
              a[c('camelize')(b)] = d;
            } catch (a) {
              throw c('err')('Style.set: "%s" argument is invalid: %s', b, d);
            }
        }
      },
      apply: function (a, b) {
        var d;
        for (d in b) n('Style.apply', d, b[d]);
        'opacity' in b && c('getOpacityStyleName')() === 'filter' && ((b.filter = m(b.opacity)), delete b.opacity);
        var e = k(a.style.cssText);
        for (d in b) {
          var f = b[d];
          delete b[d];
          var g = c('hyphenate')(d);
          for (var h in e) (h === g || h.indexOf(g + '-') === 0) && delete e[h];
          b[g] = f;
        }
        Object.assign(e, b);
        a.style.cssText = l(e);
      },
      get: c('getStyleProperty'),
      getFloat: function (a, b) {
        return parseFloat(o.get(a, b), 10);
      },
      getOpacity: function (a) {
        if (c('getOpacityStyleName')() === 'filter') {
          var b = o.get(a, 'filter');
          if (b) {
            b = /(\d+(?:\.\d+)?)/.exec(b);
            if (b) return parseFloat(b.pop()) / 100;
          }
        }
        return o.getFloat(a, 'opacity') || 1;
      },
      isFixed: function (a) {
        while (c('containsNode')(document.body, a)) {
          if (o.get(a, 'position') === 'fixed') return !0;
          a = a.parentNode;
        }
        return !1;
      },
      getScrollParent: function (a) {
        if (!a) return null;
        while (a && a !== document.body) {
          if (i(a, 'overflow') || i(a, 'overflowY') || i(a, 'overflowX')) return a;
          a = a.parentNode;
        }
        return window;
      },
    };
    a = o;
    g['default'] = a;
  },
  98
);
__d(
  'Style',
  ['StyleCore'],
  function (a, b, c, d, e, f, g) {
    g['default'] = c('StyleCore');
  },
  98
);
__d(
  'LoadingIndicator',
  ['DOM', 'MLoadingIndicator', 'MLoadingIndicatorSigils', 'MViewport', 'Style'],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j = !1;
    function a(a, b, e) {
      if (j) return;
      h = a;
      c('Style').apply(b, { 'max-height': Math.floor(d('MViewport').getWidth() / 2) + 'px' });
      c('Style').apply(e, { 'max-height': Math.floor(d('MViewport').getHeight() / 2) + 'px' });
      i = new (c('MLoadingIndicator'))(d('DOM').find(h, 'div', c('MLoadingIndicatorSigils').ROOT)).setSpinAcrossPageTransitions(!0);
      j = !0;
    }
    function b() {
      k(!1);
    }
    function e() {
      k(!0);
    }
    function k(a) {
      if (!j) return;
      a ? (i && i.willStartAnimation(), d('DOM').show(h)) : (d('DOM').hide(h), i && i.willPauseAnimation());
    }
    g.init = a;
    g.hide = b;
    g.show = e;
    g._toggle = k;
  },
  98
);
__d(
  'MPageHeaderRight',
  ['DOM', 'Stratcom'],
  function (a, b, c, d, e, f, g) {
    function h() {
      return d('DOM').scry(document.body, '*', 'mChromeHeaderRight')[0];
    }
    function a(a) {
      if (a) {
        var b = h();
        b &&
          (d('DOM').setContent(b, a.node || ''),
          c('Stratcom').listen('m:page:unload', null, function (a) {
            c('Stratcom').removeCurrentListener(), d('DOM').setContent(b, '');
          }));
      }
    }
    function b() {
      var a = h();
      return a ? Array.prototype.slice.call(a.childNodes) : null;
    }
    g.setup = a;
    g.getChromeHeaderRightContent = b;
  },
  98
);
__d(
  'CancelableEventListener',
  ['Stratcom'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function h(a, b, d, e, f) {
      f === void 0 && (f = !1);
      var g = function (a) {
          var b = c('Stratcom').getJavelinEventFromNative(a);
          a = typeof d === 'string' ? [d] : d;
          if (
            a &&
            !a.every(function (a) {
              return b.getNode(a);
            })
          )
            return;
          e(b);
        },
        h = { passive: !1, capture: f },
        i = typeof b === 'string' ? [b] : b;
      i.forEach(function (b) {
        return a.addEventListener(b, g, h);
      });
      return {
        _callback: g,
        remove: function () {
          i.forEach(function (b) {
            return a.removeEventListener(b, g, h);
          });
        },
      };
    }
    function a(a, b, c, d) {
      return h(a, b, c, d, !1);
    }
    function b(a, b, c, d) {
      return h(a, b, c, d, !0);
    }
    g.listen = a;
    g.listenCapture = b;
  },
  98
);
__d(
  'MHybridWebLiteController',
  ['MJSEnvironment', 'gkx', 'qex'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    a = {
      shouldTriggerFullPageNavigation: function (a) {
        return c('MJSEnvironment').IS_ANDROID && !c('MJSEnvironment').IS_TABLET && a.getPath().indexOf('/marketplace') === 0 ? c('gkx')('2341') || c('qex')._('91') || c('qex')._('123') : !1;
      },
      shouldOpenModalInNewTab: function (a) {
        return c('MJSEnvironment').IS_ANDROID && !c('MJSEnvironment').IS_TABLET && (a.getPath().indexOf('/trust/afro/dialog') === 0 || a.getPath().indexOf('/rapid_report') === 0) ? c('gkx')('2223') : !1;
      },
    };
    b = a;
    g['default'] = b;
  },
  98
);
__d(
  'MPageControllerPathsManager',
  ['MPageControllerConfig', 'MURI'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = null,
      i = null;
    function a(a) {
      return a ? h === new (c('MURI'))(a).normalize().toString() : !h;
    }
    function b() {
      return h;
    }
    function e(a) {
      h = a
        ? new (c('MURI'))(a)
            .normalize()
            .addQueryData(d('MPageControllerConfig').SOFT_STATE_KEY, void 0)
            .toString()
        : null;
    }
    function f() {
      return i;
    }
    function j(a) {
      i = a
        ? new (c('MURI'))(a)
            .normalize()
            .addQueryData(d('MPageControllerConfig').SOFT_STATE_KEY, void 0)
            .toString()
        : null;
    }
    g.isRenderedPath = a;
    g.getRenderedPath = b;
    g.setRenderedPath = e;
    g.getRequestPath = f;
    g.setRequestPath = j;
  },
  98
);
__d(
  'MPageControllerInitBase',
  ['LogHistory', 'MHistory', 'MPageControllerPathsManager', 'Stratcom', 'URI', 'ifRequired'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g,
      h = {
        _initialized: !1,
        TRANSPARENT_COLOR_PATTERN: /(rgba\((\d,\s*)+\s*0\))|(transparent)/g,
        _init: function () {
          function a() {
            window.removeEventListener('load', a), b('Stratcom').invoke('m:onload');
          }
          window.addEventListener('load', a);
          b('MHistory').install();
          var c = new (g || (g = b('URI')))(location.href).setProtocol(null).setDomain(null);
          if (window.FW_ENABLED && c.getPath() === '/root.php') return;
          b('MPageControllerPathsManager').setRequestPath(b('MHistory').getPath());
          b('MPageControllerPathsManager').setRenderedPath(c.toString());
          b('ifRequired')('MPageCache', function (a) {
            a.removeCachedPage(c.toString());
          });
        },
        updatePageBackgroundColor: function () {
          var a = document.getElementById('root');
          a = a && a.childNodes.length > 0 && window.getComputedStyle(a);
          a = a ? a.backgroundColor : '';
          var b = !a || h.TRANSPARENT_COLOR_PATTERN.test(a);
          !b && document.body && (document.body.style.backgroundColor = a);
        },
        loadOnInitIfNeeded: function (a) {
          window.FW_ENABLED || b('MPageControllerPathsManager').isRenderedPath(b('MPageControllerPathsManager').getRequestPath()) || a(b('MPageControllerPathsManager').getRequestPath(), { forceIncrementalPageTransition: !0, replace: !0 });
        },
        init: function (a) {
          var c = a.onHistoryChangeDefault,
            d = a.onGo,
            e = a.unload,
            f = a.load;
          a = a.initializingCallback;
          if (h._initialized) return;
          a && a();
          h.updatePageBackgroundColor();
          b('Stratcom').listen('m:history:change-default', null, function (a) {
            a = a.getData().path;
            c(a);
          });
          !window.FW_ENABLED ? b('Stratcom').listen('m:page:error', null, e) : b('Stratcom').listen('go', null, d);
          b('LogHistory').getInstance('page').log('initialize');
          b('Stratcom').invoke('m:page:initialize');
          h._initialized = !0;
          h._init();
          h.loadOnInitIfNeeded(f);
        },
      };
    e.exports = h;
  },
  null
);
__d(
  'MPageControllerDeferred',
  ['LoadingIndicator', 'MHistory', 'MPageControllerInitBase', 'MPageControllerPathsManager', 'requireDeferred'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = c('requireDeferred')('MPageControllerImpl').__setRef('MPageControllerDeferred');
    function a() {
      d('MPageControllerInitBase').init({ onHistoryChangeDefault: i, onGo: j, unload: k, load: l });
    }
    function i(a) {
      h.loadImmediately(function (b) {
        b.onHistoryChangeDefault(a);
      });
    }
    function j(a) {
      h.loadImmediately(function (b) {
        b.onGo(a);
      });
    }
    function k() {
      h.loadImmediately(function (a) {
        a.unload();
      });
    }
    function l(a, b) {
      var e = h.getModuleIfRequired();
      if (e !== null && e !== void 0) {
        e.load(a, b);
        return;
      }
      if (!a) throw new Error('load(): path required.');
      var f = b || {};
      f.skipHistoryState ||
        (f.replace ? c('MHistory').replaceState(a, !1) : c('MHistory').pushState(a, !1),
        (f.previousPath = d('MPageControllerPathsManager').getRequestPath()),
        d('MPageControllerPathsManager').setRequestPath(a),
        (f.skipHistoryState = !0),
        (f.skipPathSettings = !0));
      f.hideLoadingIndicator || d('LoadingIndicator').show();
      h.loadImmediately(function (b) {
        b.load(a, f);
      });
    }
    g.init = a;
    g._onHistoryChangeDefault = i;
    g._onGo = j;
    g._unload = k;
    g.load = l;
  },
  98
);
__d(
  'MPageController',
  ['MPageControllerConfig', 'MPageControllerDeferred', 'MPageControllerPathsManager', 'Stratcom', 'gkx'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      return d('MPageControllerPathsManager').isRenderedPath(a);
    }
    function b() {
      return d('MPageControllerPathsManager').getRenderedPath();
    }
    function e() {
      d('MPageControllerDeferred').init(), c('Stratcom').listen('m:page:controller:impl:reload:DO_NOT_INVOKE', null, i), 'scrollRestoration' in window.history && c('gkx')('1070739') && (window.history.scrollRestoration = 'manual');
    }
    function h(a, b) {
      d('MPageControllerDeferred').load(a, b);
    }
    function i(a) {
      var b = d('MPageControllerPathsManager').getRenderedPath() || d('MPageControllerPathsManager').getRequestPath();
      b && j(b, { replace: !0, queryData: a });
    }
    function j(a, b) {
      b = b || {};
      b.expiration = 0;
      b.force = !0;
      h(a, b);
    }
    g.USER_EXPIRE_MS = d('MPageControllerConfig').USER_EXPIRE_MS;
    g.HISTORY_EXPIRE_MS = d('MPageControllerConfig').HISTORY_EXPIRE_MS;
    g.EXPERIMENTAL_USER_EXPIRE_MS = d('MPageControllerConfig').EXPERIMENTAL_USER_EXPIRE_MS;
    g.isRenderedPath = a;
    g.getRenderedPath = b;
    g.init = e;
    g.load = h;
    g.reload = i;
    g.forceLoad = j;
  },
  98
);
__d(
  'XClearHistoryController',
  ['XController'],
  function (a, b, c, d, e, f) {
    e.exports = b('XController').create('/off_facebook_activity/{?*subpath}', { privacy_mutation_token: { type: 'String' }, subpath: { type: 'String' }, entry_point: { type: 'Enum', enumType: 0 } });
  },
  null
);
__d(
  'MPageControllerEligibility',
  ['MHybridWebLiteController', 'URI', 'WebLite', 'XClearHistoryController'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = {
      '/auth.php': !0,
      '/authorize.php': !0,
      '/canvas.php': !0,
      '/l.php': !0,
      '/login.php': !0,
      '/logout.php': !0,
      '/netego/redirect/': !0,
      '/redirect.php': !0,
      '/click.php': !0,
      '/r.php': !0,
      '/video_redirect/': !0,
      '/wifiauth/redirect/': !0,
      '/login/identify/loggedin/': !0,
      '/offers/url/': !0,
      '/secured_action/continue/': !0,
      '/photo/view_full_size/': !0,
      '/deactivate/lognred/': !0,
    };
    function a(a) {
      a = new (c('URI'))(a);
      var b = a.getDomain();
      b =
        h[a.getPath()] ||
        (b && b !== window.location.hostname) ||
        a.getPath().toLowerCase().indexOf('/dialog/oauth') === 0 ||
        a.getPath().indexOf('/about/basics') === 0 ||
        a.getPath().indexOf('/apps/') === 0 ||
        a.getPath().indexOf('/instantgames/play/') === 0 ||
        a.getPath().indexOf('/download/') === 0 ||
        a.getPath().indexOf('/help/resources') == 0 ||
        a.getPath().indexOf('/marketplace/message') == 0 ||
        a.getPath().indexOf('/marketplace/item') === 0 ||
        a.getPath().indexOf('/gdpr/consent') === 0 ||
        a.getPath().indexOf('/legal_consent') === 0 ||
        (!d('WebLite').isWebLite() && a.getPath().indexOf(c('XClearHistoryController').getURIBuilder().getURI().toString()) === 0) ||
        a.getPath().indexOf('/jrdr/') === 0 ||
        a.getPath().indexOf('/fbwebinstall/') === 0 ||
        c('MHybridWebLiteController').shouldTriggerFullPageNavigation(a);
      return !b;
    }
    g.isEligible = a;
  },
  98
);
__d(
  'MPageControllerHistoryChangeEligibility',
  ['URI', 'XClearHistoryController'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a) {
      if (a == null) return !1;
      a = new (c('URI'))(a);
      a = a.getPath();
      a = a.indexOf(c('XClearHistoryController').getURIBuilder().getURI().toString()) === 0;
      return !a;
    }
    g.isEligible = a;
  },
  98
);
__d(
  'MPageControllerPath',
  ['MAjaxSafety', 'MPageControllerPathsManager', 'MURI', 'gkx'],
  function (a, b, c, d, e, f) {
    function g(a, c) {
      var d = a === c;
      a = b('MAjaxSafety').browserEncodeURI(a) === b('MAjaxSafety').browserEncodeURI(c);
      return d !== a;
    }
    e.exports = {
      isRequestPath: function (a) {
        var c = this.getRequestPath();
        if (!a || !c) return !a && !c;
        c = c;
        a = new (b('MURI'))(a).normalize().toString();
        g(c, a) && b('gkx')('676781') && ((c = b('MAjaxSafety').browserEncodeURI(c)), (a = b('MAjaxSafety').browserEncodeURI(a)));
        return c === a;
      },
      getRequestPath: function () {
        return b('MPageControllerPathsManager').getRequestPath();
      },
      setRequestPath: function (a) {
        b('MPageControllerPathsManager').setRequestPath(a);
      },
    };
  },
  null
);
__d(
  'requestIdleCallback',
  ['cr:694370'],
  function (a, b, c, d, e, f, g) {
    g['default'] = b('cr:694370');
  },
  98
);
__d(
  'onAfterTTI',
  ['NavigationMetrics', 'TimeSlice', 'requestIdleCallback'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = [],
      i = !1;
    function a(a, b) {
      b === void 0 && (b = !0);
      a = c('TimeSlice').guard(a, 'onAfterTTI invocation', { propagationType: c('TimeSlice').PropagationType.ORPHAN });
      i ? a() : h.push(b ? c('requestIdleCallback').bind(null, a) : a);
    }
    c('NavigationMetrics').addRetroactiveListener(c('NavigationMetrics').Events.EVENT_OCCURRED, function (a, b) {
      b.event === 'tti' &&
        !i &&
        ((i = !0),
        h.forEach(function (a) {
          a();
        }),
        c('NavigationMetrics').removeCurrentListener());
    });
    g['default'] = a;
  },
  98
);
__d(
  'MPageFetcherDeferred',
  ['FBLogger', 'onAfterTTI', 'requireDeferred'],
  function (a, b, c, d, e, f, g) {
    var h = c('requireDeferred')('MPageFetcherImpl').__setRef('MPageFetcherDeferred');
    function a(a, b, c, d) {
      h.loadImmediately(function (e) {
        e.fetch(a, b, c, d);
      });
    }
    function b(a, b) {
      b === void 0 && (b = {}),
        c('onAfterTTI')(function () {
          h.loadImmediately(function (c) {
            c.prefetch(a, b);
          });
        });
    }
    function d(a) {
      var b = h.getModuleIfRequired();
      return b !== null && b !== void 0 ? b.getPrefetchState(a) : null;
    }
    function e(a) {
      var b = h.getModuleIfRequired();
      b === null || b === void 0
        ? (h.loadImmediately(function (b) {
            b.initializeAsyncBigPipe(a);
          }),
          c('FBLogger')('MPageFetcherDeferred').warn('Calling `initializeAsyncBigPipe` before module is on page.'))
        : b.initializeAsyncBigPipe(a);
    }
    g.fetch = a;
    g.prefetch = b;
    g.getPrefetchState = d;
    g.initializeAsyncBigPipe = e;
  },
  98
);
__d(
  'MPageFetcher',
  ['MPageFetcherDeferred'],
  function (a, b, c, d, e, f) {
    var g = {
      _handlers: [],
      fetch_DO_NOT_USE: function (a, c, d) {
        b('MPageFetcherDeferred').fetch(a, c, d, g._handlers);
      },
      prefetch: function (a, c) {
        c === void 0 && (c = {}), b('MPageFetcherDeferred').prefetch(a, c);
      },
      getPrefetchState: function (a) {
        return b('MPageFetcherDeferred').getPrefetchState(a);
      },
      addHandler: function (a) {
        g._handlers.push(a);
      },
      initializeAsyncBigPipe: function (a) {
        b('MPageFetcherDeferred').initializeAsyncBigPipe(a);
      },
    };
    e.exports = g;
  },
  null
);
__d(
  'MemoizationInstrumentation',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = null;
    function a(a) {
      i == null || h(0, 2221), (i = a);
    }
    function b(a, b) {
      return i ? i.functionCall(a, b) : null;
    }
    g.inject = a;
    g.onFunctionCall = b;
  },
  98
);
__d(
  'memoizeWithArgs',
  ['MemoizationInstrumentation'],
  function (a, b, c, d, e, f, g) {
    var h = Object.prototype.hasOwnProperty;
    function a(a, b, c) {
      var e,
        f = c || a.name || 'unknown';
      c = function () {
        e || (e = {});
        var c = d('MemoizationInstrumentation').onFunctionCall('memoizeWithArgs', f),
          g = b.apply(void 0, arguments),
          i = !0;
        h.call(e, g) || ((i = !1), (e[g] = a.apply(void 0, arguments)));
        c && c(i);
        return e[g];
      };
      return c;
    }
    g['default'] = a;
  },
  98
);
__d(
  'MPageRootManager',
  ['$', 'DOM', 'MURI', 'URI', 'memoizeWithArgs'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g,
      h = 10 * 60 * 1e3;
    a = {
      _rootMap: {},
      savePageRoot: function () {
        this._rootMap[this._key(location.href)] = { root: b('$')('root').cloneNode(!0), insertTime: Date.now() };
      },
      reinstateRootIfAvailable: function (a, c, d) {
        if (!this._shouldReinstateRoot(a, d)) return;
        c && c();
        d = this._getRootElement(a);
        c = d && d.cloneNode(!0);
        c && b('DOM').replace(b('$')('root'), c);
      },
      _shouldReinstateRoot: function (a, b) {
        return !1;
      },
      _getRootObject: function (a) {
        return this._rootMap[this._key(a)];
      },
      _isRootAvailable: function (a) {
        return this._getRootObject(a) !== void 0;
      },
      _getRootElement: function (a) {
        a = this._getRootObject(a);
        return a && a.root;
      },
      _getRootInsertTime: function (a) {
        a = this._getRootObject(a);
        return a && a.insertTime;
      },
      _hasRootExpired: function (a, b) {
        return Date.now() > this._getRootInsertTime(a) + ((a = b) != null ? a : h);
      },
      _key: b('memoizeWithArgs')(
        function (a) {
          return new (b('MURI'))(new (g || (g = b('URI')))(a).setProtocol(null).setDomain(null)).normalize().toString();
        },
        function (a) {
          return a;
        },
        '_key'
      ),
    };
    e.exports = a;
  },
  null
);
__d(
  'getActiveElement',
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      a === void 0 && (a = document);
      if (a === void 0) return null;
      try {
        return a.activeElement || a.body;
      } catch (b) {
        return a.body;
      }
    }
    f['default'] = a;
  },
  66
);
__d(
  'goURI',
  ['ReloadPage', 'Stratcom', 'URI'],
  function (a, b, c, d, e, f, g) {
    function b(b, e, f) {
      e === void 0 && (e = !1);
      f === void 0 && (f = !1);
      b = new (c('URI'))(b);
      b = b.toString();
      c('Stratcom').invoke('gouri', null, { uri: b });
      !e && a.PageTransitions ? a.PageTransitions.go(b, f) : window.location.href == b ? d('ReloadPage').now() : f ? window.location.replace(b) : (window.location.href = b);
    }
    g['default'] = b;
  },
  98
);
__d(
  'setIntervalBlue',
  ['TimerStorage', 'setIntervalAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      for (var d = arguments.length, e = new Array(d > 2 ? d - 2 : 0), f = 2; f < d; f++) e[f - 2] = arguments[f];
      var g = c('setIntervalAcrossTransitions').apply(void 0, [a, b].concat(e));
      c('TimerStorage').set(c('TimerStorage').INTERVAL, g);
      return g;
    }
    g['default'] = a;
  },
  98
);
__d(
  'setInterval',
  ['setIntervalBlue'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('setIntervalBlue');
  },
  98
);
__d(
  'replaceNativeTimer',
  ['cancelAnimationFrame', 'clearInterval', 'clearTimeout', 'requestAnimationFrame', 'scheduler', 'setInterval', 'setTimeout'],
  function (a, b, c, d, e, f) {
    !b('scheduler');
    a.__fbNativeSetTimeout = a.setTimeout;
    a.__fbNativeClearTimeout = a.clearTimeout;
    a.__fbNativeSetInterval = a.setInterval;
    a.__fbNativeClearInterval = a.clearInterval;
    a.__fbNativeRequestAnimationFrame = a.requestAnimationFrame;
    a.__fbNativeCancelAnimationFrame = a.cancelAnimationFrame;
    b('setTimeout').nativeBackup = a.setTimeout;
    b('clearTimeout').nativeBackup = a.clearTimeout;
    b('setInterval').nativeBackup = a.setInterval;
    b('clearInterval').nativeBackup = a.clearInterval;
    b('requestAnimationFrame').nativeBackup = a.requestAnimationFrame;
    b('cancelAnimationFrame').nativeBackup = a.cancelAnimationFrame;
    a.setTimeout = b('setTimeout');
    a.clearTimeout = b('clearTimeout');
    a.setInterval = b('setInterval');
    a.clearInterval = b('clearInterval');
    a.requestAnimationFrame = b('requestAnimationFrame');
    a.cancelAnimationFrame = b('cancelAnimationFrame');
    function c() {}
    e.exports = c;
  },
  null
);
__d(
  'MPageControllerImpl',
  [
    'invariant',
    '$',
    'DOM',
    'FWLoader',
    'LoadingIndicator',
    'LogHistory',
    'MHistory',
    'MPageCache',
    'MPageControllerConfig',
    'MPageControllerEligibility',
    'MPageControllerGating',
    'MPageControllerHistoryChangeEligibility',
    'MPageControllerInitBase',
    'MPageControllerPath',
    'MPageControllerPathsManager',
    'MPageFetcher',
    'MPageRootManager',
    'MURI',
    'MViewport',
    'MobileAppDetect',
    'PageletSet',
    'ScriptPath',
    'Stratcom',
    'TimerStorage',
    'URI',
    'XReferer',
    'cancelAnimationFrame',
    'cancelIdleCallback',
    'clearImmediate',
    'clearInterval',
    'clearTimeout',
    'getActiveElement',
    'goURI',
    'replaceNativeTimer',
    'setTimeoutAcrossTransitions',
  ],
  function (a, b, c, d, e, f, g, h) {
    b('replaceNativeTimer');
    var i = !1,
      j = null,
      k = d('LogHistory').getInstance('page');
    a = function () {
      d('MPageControllerInitBase').init({
        onHistoryChangeDefault: l,
        onGo: m,
        unload: p,
        load: n,
        initializingCallback: function () {
          c('Stratcom').listen('msticky-header:init', null, function () {
            c('Stratcom').removeCurrentListener();
          });
        },
      });
    };
    function l(a) {
      if (!d('MPageControllerPath').isRequestPath(a)) {
        if (a != null && !d('MPageControllerHistoryChangeEligibility').isEligible(a)) return;
        var b = d('MPageControllerPath').getRequestPath();
        d('MPageControllerPath').setRequestPath(a);
        if (!d('MPageControllerPathsManager').isRenderedPath(a)) {
          b = { expiration: d('MPageControllerConfig').HISTORY_EXPIRE_MS, isFromHistory: !0, previousPath: b };
          o(a, b);
        }
      }
    }
    function m(a) {
      var b = a.getData().uri;
      if (!b) {
        c('Stratcom').invoke('m:page:controller:impl:reload:DO_NOT_INVOKE');
        a.prevent();
        return;
      }
      var d = new (c('URI'))(b),
        e = d.getProtocol();
      !e && d.getPath() ? (n(b), a.prevent()) : e === 'fb' && (c('FWLoader').FW.openInNewWebView(b), a.prevent());
    }
    var n = function (a, b) {
        if (!a) throw new Error('load(): path required.');
        if (!d('MPageControllerEligibility').isEligible(a)) {
          c('goURI')(a);
          return;
        }
        b = b || {};
        var e = b.force || b.method === 'POST' || b.replace || !d('MPageControllerPathsManager').isRenderedPath(a);
        (b.expiration === null || b.expiration === void 0) && (b.expiration = d('MPageControllerConfig').USER_EXPIRE_MS);
        if (window.FW_ENABLED && new (c('URI'))(location.href).getPath() !== '/root.php' && c('FWLoader').FW.isRootless()) {
          if (!e) return;
          c('FWLoader').FW.openInSameWebView(a, b.method || 'GET', {}, b.replace, b.force || !1);
          return;
        }
        b.skipPathSettings || ((b.previousPath = d('MPageControllerPath').getRequestPath()), d('MPageControllerPath').setRequestPath(a));
        b.skipHistoryState || (b.replace ? c('MHistory').replaceState(a, !1) : c('MHistory').pushState(a, !1));
        if (!e) return;
        o(a, b);
      },
      o = function (a, b) {
        k.log('load', a);
        window.ExitTime = Date.now();
        var e = c('MPageCache').getCacheState(a, b.expiration);
        c('Stratcom').invoke('m:page:beforeloading', null, a);
        var f = c('MPageCache').getCacheState(a, b.expiration);
        e !== f && (e = 'forcibly-removed');
        f === 'fallback-cache' && (e = 'fallback-cache');
        c('Stratcom').invoke('m:page:load-start', null, {
          targetPath: a,
          previousPath: b.previousPath,
          previousTopView: d('ScriptPath').getTopViewEndpoint(),
          prefetchState: d('MPageFetcher').getPrefetchState(b.prefetchHref || a),
          cacheType: e,
          isFromHistory: b.isFromHistory,
        });
        u(a) &&
          (s(),
          b.hideLoadingIndicator || d('LoadingIndicator').show(),
          !c('MPageControllerGating').shouldDeferUntilCertainNoRedirect && !b.hideLoadingIndicator ? p() : ((j = d('MPageControllerPathsManager').getRenderedPath()), d('MPageControllerPathsManager').setRenderedPath(null), (i = !0)));
        c('Stratcom').invoke('m:page:loading', null, a);
        window.FW_ENABLED && c('FWLoader').MSkeleton.exec(a);
        if (c('MPageCache').isPageCachedWithFallbacks(a, b.expiration)) {
          c('MPageCache').prepareCacheFallbakcs(a, b.expiration);
          d('XReferer').update(null, new (c('MURI'))(a).normalize().toString(), !0);
          f = c('MPageCache').getCachedPage(a);
          q(a, f, t);
        } else {
          d('MPageRootManager').reinstateRootIfAvailable(a, function () {
            p(), d('MViewport').scrollToTop(), d('LoadingIndicator').hide();
          });
          var g = [],
            l = !1,
            m = !1,
            n = function () {
              !l && g.length && ((l = !0), g.shift().process());
            };
          c('Stratcom').listen('m:page:loading', null, function () {
            c('Stratcom').removeCurrentListener(), (g.length = 0), (m = !0);
          });
          b.shouldRenderAsync404 = c('MPageControllerGating').shouldRenderAsync404;
          d('MPageFetcher').fetch_DO_NOT_USE(a, b, function (e, f) {
            if (m) return;
            if (e) {
              e.listen('complete', function () {
                (l = !1), n();
              });
              e.listen('discard', function () {
                if (!c('MPageControllerGating').shouldDeferUntilCertainNoRedirect) return;
                var a = e.getRedirectURI();
                a !== null || h(0, 2351);
                c('setTimeoutAcrossTransitions')(function () {
                  if (m) return;
                  d('LoadingIndicator').hide();
                }, 300);
              });
              if (e.isPagelet()) {
                g.push(e);
                n();
                return;
              }
              l = !0;
              d('XReferer').update(null, new (c('MURI'))(a).normalize().toString(), !0);
              r(
                a,
                e,
                function () {
                  var a = d('MViewport').getScrollTop();
                  !c('MobileAppDetect').is_kaios && document.body && !b.doNotRefocus && document.body.focus();
                  b.noAutoScroll ||
                    (d('MViewport').scrollTo(0, a),
                    c('setTimeoutAcrossTransitions')(function () {
                      c('getActiveElement')() === document.body && d('MViewport').scrollTo(0, a);
                    }, 0));
                },
                b.noAutoScroll
              );
            } else {
              var i = c('MPageCache').getCachedPage(a);
              i ? q(a, i) : (d('LoadingIndicator').hide(), f && (k.error('error', f), c('Stratcom').invoke('m:page:error', null, f)));
            }
          });
          c('Stratcom').invoke('m:page:request-sent', null, a);
        }
        return v;
      },
      p = function () {
        k.log('unload');
        if (!d('MPageControllerPathsManager').getRenderedPath() && !i) return void 0;
        window.bigPipe !== void 0 &&
          d('PageletSet')
            .getPageletIDs()
            .forEach(function (a) {
              d('PageletSet').hasPagelet(a) && d('PageletSet').removePagelet(a);
            });
        var a = { path: i ? j : d('MPageControllerPathsManager').getRenderedPath() };
        c('Stratcom').invoke('m:page:unload', null, a);
        d('MPageControllerPathsManager').setRenderedPath(null);
        i = !1;
        j = null;
        a = c('$')('root');
        d('DOM').setContent(a);
        c('Stratcom').invoke('m:page:unload-complete');
        c('Stratcom').invoke('m:root:render');
        d('MPageControllerInitBase').updatePageBackgroundColor();
      },
      q = function (a, b, d) {
        k.log('render cache', a),
          c('Stratcom').invoke('m:page:render:cache:start', null, { path: a }),
          r(
            a,
            b,
            function () {
              c('Stratcom').invoke('m:page:render:cache:complete', null, { path: a }), c('MPageCache').applyCachedIUIResponses(a, d), c('Stratcom').invoke('m:page:render:cache:complete-with-replays', null, { path: a });
            },
            d === t
          );
      },
      r = function (a, b, e, f) {
        c('MPageControllerGating').shouldDeferUntilCertainNoRedirect || p(),
          k.log('render', a),
          (!c('MPageControllerGating').shouldDeferUntilCertainNoRedirect || !b.willRedirect()) &&
            (p(),
            c('Stratcom').invoke('m:page:render:start', null, { path: a }),
            b.listen('complete', function () {
              d('MPageControllerPathsManager').setRenderedPath(a);
              b.isContentlessResponse() || d('LoadingIndicator').hide();
              var g = new (c('URI'))(a).getFragment();
              g = g && document.getElementById(g);
              g ? d('MViewport').scrollToNode(g) : f || d('MViewport').scrollToTop();
              c('Stratcom').invoke('m:page:render:complete', null, { path: a });
              e && e();
              d('MPageControllerInitBase').updatePageBackgroundColor();
              c('Stratcom').invoke('m:root:render');
              c('Stratcom').invoke('m:page:iui:response:complete', null, { path: a });
            })),
          b.process();
      },
      s = function () {
        var a = d('MPageControllerPathsManager').getRenderedPath();
        if (a) {
          var b = d('MViewport').getScrollTop();
          c('MPageCache').setScrollHistory(a, b);
        }
      },
      t = function () {
        var a = d('MPageControllerPathsManager').getRenderedPath();
        if (a) {
          var b = c('MPageCache').getScrollHistory(a) || d('MViewport').getHeaderTop();
          c('setTimeoutAcrossTransitions')(function () {
            d('MViewport').scrollTo(0, b);
          }, 0);
        }
      },
      u = function (a) {
        return !d('MPageControllerPathsManager').isRenderedPath(a);
      };
    c('Stratcom').listen('pagelet_content_displayed', null, function () {
      d('LoadingIndicator').hide();
    });
    c('Stratcom').listen('m:page:unload', null, function () {
      c('TimerStorage').clearAll(c('TimerStorage').ANIMATION_FRAME, c('cancelAnimationFrame')),
        c('TimerStorage').clearAll(c('TimerStorage').IDLE_CALLBACK, c('cancelIdleCallback')),
        c('TimerStorage').clearAll(c('TimerStorage').IMMEDIATE, c('clearImmediate')),
        c('TimerStorage').clearAll(c('TimerStorage').INTERVAL, c('clearInterval')),
        c('TimerStorage').clearAll(c('TimerStorage').TIMEOUT, c('clearTimeout'));
    });
    var v = { init: a, load: n, unload: p, onHistoryChangeDefault: l, onGo: m };
    e = v;
    g['default'] = e;
  },
  98
);
__d(
  'MErrorCodes',
  ['fbt', 'FBLogger'],
  function (a, b, c, d, e, f, g) {
    var h = {
      loadPageFailed: 876e3,
      showPageFailed: 876001,
      uncaughtException: 876002,
      noInternetConnection: 876003,
      badStatusCode: 876004,
      getMessage: function (a) {
        switch (a) {
          case h.loadPageFailed:
            return g._(/*FBT_CALL*/ 'Connection error' /*FBT_CALL*/);
          case h.noInternetConnection:
            return g._(/*FBT_CALL*/ 'No internet connection' /*FBT_CALL*/);
          case h.showPageFailed:
          case h.uncaughtException:
          case h.badStatusCode:
            return g._(/*FBT_CALL*/ 'Sorry, something went wrong.' /*FBT_CALL*/);
          default:
            b('FBLogger')('FIXME').mustfix('Unhandled error code %d', a);
            return g._(/*FBT_CALL*/ 'Sorry, something went wrong.' /*FBT_CALL*/);
        }
      },
    };
    e.exports = h;
  },
  null
);
__d(
  'MPageFetcherUtils',
  ['MPageCache', 'MRequest', 'MRequestTypes', 'MURI'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a) {
      var b = new (c('MURI'))(a).addQueryData('__m_async_page__', '').setFaceweb(window.FW_ENABLED);
      c('MPageCache').getCachedPage(a) && b.addQueryData('__cached__', '');
      window.bigPipe !== void 0 && b.addQueryData('__big_pipe_on__', '');
      return b;
    }
    function b(a, b, e) {
      return new (c('MRequest'))(b).setType(d('MRequestTypes').TRANSITION).setData(e).setMethod(a).setFullPage(!0);
    }
    g.createRequestURI = a;
    g.createRequest = b;
  },
  98
);
__d(
  'getUnqualifiedURI',
  ['URI', 'unqualifyURI'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      a = new (c('URI'))(a);
      c('unqualifyURI')(a);
      return a;
    }
    g['default'] = a;
  },
  98
);
__d(
  'MPageFetcherPrefetch',
  ['BanzaiLogger', 'MPageControllerEligibility', 'MPageFetcherUtils', 'MURI', 'clearInterval', 'getUnqualifiedURI', 'gkx', 'setIntervalAcrossTransitions', 'uuid'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = new Map(),
      i = 10 * 60 * 1e3,
      j = ['__cached__'],
      k = 5 * 60 * 1e3,
      l = null;
    function a(a, b) {
      b === void 0 && (b = {});
      if (!m(a)) return null;
      b = Object.assign({}, b);
      b.expiration = b.expiration || Date.now() + i;
      var c = b.requestHeaders,
        e = c === void 0 ? {} : c,
        f = b.onUsed;
      c = b.onRequestDone;
      var g = b.onBeforeUsed;
      a = d('MPageFetcherUtils').createRequestURI(a);
      var j = a.toString(),
        k = d('MPageFetcherUtils').createRequest('GET', j);
      k.setRequestHeader('x-mpagecontroller-prefetch', '');
      Object.keys(e).forEach(function (a) {
        k.setRequestHeader(a, e[a]);
      });
      var l = s(a),
        n = q(j);
      h.set(n, { request: k, options: b, logData: l });
      a = function () {
        h['delete'](n), f && f(), t(r(k), l);
      };
      k.prefetch(a, c, g);
      t('started', l);
      k.shouldFinalizePrefetch() && o();
      return k;
    }
    function m(a) {
      return d('MPageControllerEligibility').isEligible(a);
    }
    function b(a) {
      a = q(a);
      a = n(a);
      return a ? a.request : null;
    }
    function n(a) {
      var b = h.get(a);
      if (!b) return null;
      var c = b.request,
        d = b.options,
        e = b.logData;
      if (d && !p(d)) {
        h['delete'](a);
        c.clearPrefetch();
        c.abort();
        t('invalidated', e);
        return null;
      }
      return b;
    }
    function o() {
      l === null &&
        h.size > 0 &&
        (l = c('setIntervalAcrossTransitions')(function () {
          h.forEach(function (a, b) {
            var c = a.request;
            a = a.options;
            p(a) || (h['delete'](b), c.clearPrefetch());
          }),
            h.size === 0 && (c('clearInterval')(l), (l = null));
        }, k));
    }
    function p(a) {
      a = a.expiration;
      a = a === void 0 ? 0 : a;
      return a >= Date.now();
    }
    function q(a) {
      var b = new (c('MURI'))(a);
      j.forEach(function (a) {
        return (b = b.removeQueryData(a));
      });
      return c('getUnqualifiedURI')(b).toString();
    }
    function r(a) {
      return a.getPrefetchState() === 'done' ? 'done' : 'in-progress';
    }
    function s(a) {
      return { prefetch_id: c('uuid')(), source: window.location.href, destination: a.getQualifiedURI().toString() };
    }
    function t(a, b) {
      c('gkx')('862436') && c('BanzaiLogger').log('MNavigationsPrefetchLoggerConfig', Object.assign({}, b, { prefetch_state: a, client_event_time: Date.now() || 0 }));
    }
    g.prefetch = a;
    g.getPrefetchedRequest = b;
  },
  98
);
__d(
  'MPageFetcherImpl',
  ['Arbiter', 'BigPipe', 'MErrorCodes', 'MPageCache', 'MPageControllerPath', 'MPageFetcherPrefetch', 'MPageFetcherUtils', 'MURI', 'PageEvents', 'Stratcom', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f) {
    var g = {
      FETCH_TIMEOUT_MS: 10 * 1e3,
      _pending: {},
      _contentSubscription: void 0,
      fetch: function (a, c, d, e) {
        var f = c.method || 'GET',
          h = c.queryData || null;
        g._lockAccess(a);
        b('MPageCache').setPageCacheComplete(a, !1);
        var i = b('MPageFetcherUtils').createRequestURI(a),
          j = { path: new (b('MURI'))(a).normalize().toString(), method: f, progress: void 0, success: void 0 };
        b('Stratcom').invoke('m:page:async:start', null, j);
        i.setFragment(null);
        var k = g._createRequest(f, i, h, c.prefetchHref, e);
        k.listen('done', function () {
          b('MPageCache').setPageCacheComplete(a, !0);
        });
        k.listen('progress', function (a) {
          a.loaded && a.loaderLength && ((j.progress = Math.min(a.loaded / a.loaderLength, 1)), b('Stratcom').invoke('m:page:async:progress', null, j));
        });
        k.listen('process', function (c) {
          var e = b('Stratcom').context();
          e && e.stop && e.stop();
          g._releaseAccess(a);
          c.response &&
            ((j.success = !0),
            b('Stratcom').invoke('m:page:async:handle', null, j),
            f === 'GET' && (c.response.isPagelet() ? b('MPageCache').addCachedIUIResponse(a, c.response) : (b('MPageCache').setCachedPage(a, c.response), b('MPageCache').clearCachedIUIResponses(a))),
            b('MPageControllerPath').isRequestPath(a) && d && d(c.response));
        });
        k.listen('fail', function () {
          g._releaseAccess(a), g._handleFail(b('MErrorCodes').loadPageFailed, a, k, j, d);
        });
        k.listen('error', function () {
          var e = k.getTransport().status;
          if (e === 404 && c.shouldRenderAsync404 === !0) return;
          g._releaseAccess(a);
          e = e !== 0 && (e < 200 || e >= 300) ? b('MErrorCodes').badStatusCode : b('MErrorCodes').loadPageFailed;
          g._handleFail(e, a, k, j, d);
        });
        k.listen('finally', function () {
          g._releaseAccess(a);
        });
        k.send();
      },
      prefetch: function (a, c) {
        c === void 0 && (c = {}), b('MPageFetcherPrefetch').prefetch(a, c);
      },
      getPrefetchState: function (a) {
        a = b('MPageFetcherUtils').createRequestURI(a);
        a = b('MPageFetcherPrefetch').getPrefetchedRequest(a.toString());
        return a ? a.getPrefetchState() : null;
      },
      _createRequest: function (a, c, d, e, f) {
        e === void 0 && (e = null);
        var g;
        if (f)
          for (var h = 0; h < f.length; h++) {
            g = f[h](a, c, d);
            if (g) return g;
          }
        g = c.toString();
        if (!d && a === 'GET') {
          f = g;
          e !== null && (f = b('MPageFetcherUtils').createRequestURI(e).toString());
          h = b('MPageFetcherPrefetch').getPrefetchedRequest(f);
          if (h) return h;
        }
        return b('MPageFetcherUtils').createRequest(a, g, d);
      },
      _handleFail: function (a, c, d, e, f) {
        a = a;
        e = babelHelpers['extends']({}, e, { success: !1 });
        b('Stratcom').invoke('m:page:async:handle', null, e);
        if (d.getTransport().status === 0) {
          b('setTimeoutAcrossTransitions')(function () {
            b('MPageControllerPath').isRequestPath(c) && ((a = b('MErrorCodes').noInternetConnection), b('Stratcom').invoke('m:page:error', null, a));
          }, 2e3);
          return;
        }
        b('MPageCache').removeCachedPage(c);
        b('MPageCache').clearCachedIUIResponses(c);
        b('MPageControllerPath').isRequestPath(c) && f && f(null, a);
        b('Stratcom').invoke('m:page:async:complete', null, e);
      },
      _getAccessKeyFromPath: function (a) {
        return new (b('MURI'))(a).normalize().toString();
      },
      _lockAccess: function (a) {
        g._pending[g._getAccessKeyFromPath(a)] = Date.now();
      },
      _isLocked: function (a) {
        a = g._getAccessKeyFromPath(a);
        return g._pending[a] && Date.now() - g._pending[a] < g.FETCH_TIMEOUT_MS;
      },
      _releaseAccess: function (a) {
        delete g._pending[g._getAccessKeyFromPath(a)];
      },
      initializeAsyncBigPipe: function (a) {
        g._contentSubscription && g._contentSubscription.unsubscribe();
        var c = new (b('Arbiter'))();
        window.bigPipe = new (b('BigPipe'))({
          isAjax: !0,
          config: a,
          forceFinish: !0,
          arbiter: c,
          domContentEvt: b('PageEvents').AJAXPIPE_DOMREADY,
          domContentCallback: function () {
            c.inform(b('PageEvents').AJAXPIPE_DOMREADY, !0, 'state'), c.inform('uipage_onload', !0, 'state');
          },
          onloadEvt: b('PageEvents').AJAXPIPE_ONLOAD,
          onloadCallback: function () {
            c.inform(b('PageEvents').AJAXPIPE_ONLOAD, !0, 'state');
          },
        });
        g._contentSubscription = c.subscribeOnce(
          'bigpipe_e2e_reported',
          function () {
            (g._contentSubscription = void 0), b('Stratcom').invoke('m:page:fetcher:bigpipe:e2e', null);
          },
          'new'
        );
      },
    };
    e.exports = g;
  },
  null
);
__d(
  'Qe2JsExposureFalcoEvent',
  ['FalcoLoggerInternal', 'getFalcoLogPolicy_DO_NOT_USE'],
  function (a, b, c, d, e, f) {
    'use strict';
    a = b('getFalcoLogPolicy_DO_NOT_USE')('1837559');
    c = b('FalcoLoggerInternal').create('qe2_js_exposure', a);
    e.exports = c;
  },
  null
);
__d(
  'QE2Logger',
  ['Qe2JsExposureFalcoEvent'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = {};
    function a(a, b) {
      x(a, (a = b) != null ? a : '', 9);
    }
    function b(a, b) {
      x(a, (a = b) != null ? a : '', 9, !0);
    }
    function d(a) {
      x(a, '', 4);
    }
    function e(a, b) {
      x(a, b, 3);
    }
    function f(a) {
      x(a, '', 5);
    }
    function i(a) {
      x(a, '', 5, !0);
    }
    function j(a) {
      x(a, '', 31);
    }
    function k(a) {
      x(a, '', 98);
    }
    function l(a, b) {
      x(a, b, 7);
    }
    function m(a, b) {
      x(a, b, 55);
    }
    function n(a, b) {
      x(a, b, 17);
    }
    function o(a, b) {
      x(a, b, 25);
    }
    function p(a, b) {
      x(a, b, 8);
    }
    function q(a, b) {
      x(a, b, 22);
    }
    function r(a, b) {
      x(a, b, 27);
    }
    function s(a, b) {
      x(a, b, 0);
    }
    function t(a, b) {
      x(a, (a = b) != null ? a : '', 89);
    }
    function u(a, b) {
      x(a, b, 60);
    }
    function v(a, b, c) {
      x(a, b, c);
    }
    function w(a, b, c) {
      x(a, b, c, !0);
    }
    function x(a, b, d, e) {
      var f = a + '|' + b;
      if (h[f]) return;
      e === !0
        ? c('Qe2JsExposureFalcoEvent').logImmediately(function () {
            return { universe: a, unit_id: b, unit_type: d };
          })
        : c('Qe2JsExposureFalcoEvent').log(function () {
            return { universe: a, unit_id: b, unit_type: d };
          });
      h[f] = !0;
    }
    g.logExposureForUser = a;
    g.logExposureForUserImmediately = b;
    g.logExposureForIGDjangoUser = d;
    g.logExposureForEmail = e;
    g.logExposureForDatr = f;
    g.logExposureForDatrImmediately = i;
    g.logExposureForOculusLoggedOut = j;
    g.logExposureForOculusLoggedOutCookieID = k;
    g.logExposureForPage = l;
    g.logExposureForPaymentAccountID = m;
    g.logExposureForBusiness = n;
    g.logExposureForGroup = o;
    g.logExposureForPhoneNumber = p;
    g.logExposureForScimCompanyID = q;
    g.logExposureForAnalyticsEntityID = r;
    g.logExposureForAdAccountID = s;
    g.logExposureForActingAccount = t;
    g.logExposureForMixedUserAndPage = u;
    g.logExposure = v;
    g.logExposureImmediately = w;
  },
  98
);
__d(
  'MRedirectToNative',
  ['Event', 'MPageController', 'QE2Logger', 'URI', 'goURI', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = !1,
      i = null;
    function j() {
      i && (i.remove(), (i = null));
    }
    function k() {
      if (h) return;
      h = !0;
      d('QE2Logger').logExposureForUser('mtouch_messenger_diode_post_return');
    }
    function l() {
      k(),
        j(),
        c('setTimeoutAcrossTransitions')(function () {
          d('MPageController').load('/home.php');
        }, 5);
    }
    function m() {
      (i = c('Event').listen(window, 'blur', function () {
        j(), l();
      })),
        c('setTimeoutAcrossTransitions')(j, 5e3);
    }
    function a(a, b) {
      k();
      j();
      if (b && b.returnToFeed === !0) {
        b = !!b.newTab;
        var d = a.toString();
        m();
        b ? c('URI').goURIOnNewWindow(d) : c('goURI')(d);
      } else a.go();
    }
    function b(a, b) {
      b = !!(b && b.returnToFeed === !0);
      b && a.setAttribute('target', '_blank');
      b = b ? m : k;
      c('Event').listen(a, 'click', b);
    }
    g.redirect = a;
    g.setReturnToFeed = b;
  },
  98
);
__d(
  'MStoriesRing',
  ['cx', 'CSS', 'DOM', 'Stratcom', 'ge'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = 'm:feed:story:all-stories-viewed',
      j = 'm:page:render:cache:complete-with-replays';
    function a(a) {
      c('Stratcom').listen(i, null, function (b) {
        var e = b.getData().ownerID;
        c('Stratcom').listen(j, null, function () {
          var b = c('ge')(a);
          if (!b) return;
          b = d('DOM').scry(b, 'div', 'feed_story_ring'.concat(e.toString())) || [];
          b.forEach(function (a) {
            c('CSS').removeClass(a, '_847o');
          });
        });
      });
    }
    g.setupStoryRingForUpdates = a;
  },
  98
);
__d(
  'MStoriesUIConstants',
  ['fbt'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    a = { DEFAULT_TIMER_DURATION_IN_SEC: 6, STORY_UPDATE_TICK_IN_SEC: 0.1 };
    b = 20;
    c = 10 * 60 * 1e3;
    d = 1e3;
    e = 80;
    f = 150;
    var i = 10 * 60 * 1e3,
      j = ['/stories/view_tray', '/stories/preview/'],
      k = h._(/*FBT_CALL*/ 'Story added' /*FBT_CALL*/),
      l = h._(/*FBT_CALL*/ 'Unable to add story' /*FBT_CALL*/),
      m = h._(/*FBT_CALL*/ 'Unable to load effects' /*FBT_CALL*/);
    h = h._(/*FBT_CALL*/ 'Unable to apply effect' /*FBT_CALL*/);
    g.PROGRESS_BAR = a;
    g.REDIRECT_DELAY_IN_MS = b;
    g.REFRESH_TIMEOUT_IN_MS = c;
    g.SEC_TO_MS = d;
    g.SWIPE_DISTANCE = e;
    g.SWIPE_DOWN_DISTANCE = f;
    g.CACHE_EXPIRATION_IN_MS = i;
    g.HIDE_HEADER_URLS = j;
    g.UPLOAD_SUCCESSFUL = k;
    g.UPLOAD_FAILED = l;
    g.EFFECTS_LIST_FAILED = m;
    g.EFFECT_APPLY_FAILED = h;
  },
  98
);
__d(
  'MFriendingActionError',
  [],
  function (a, b, c, d, e, f) {
    a = 'confirm_incomming_request_error';
    b = 'delete_incomming_request_error';
    c = 'send_outgoing_request_error';
    d = 'cancel_outgoing_request_error';
    f.CONFIRM_INCOMING_REQUEST_ERROR = a;
    f.DELETE_INCOMING_REQUEST_ERROR = b;
    f.SEND_OUTGOING_REQUEST_ERROR = c;
    f.CANCEL_OUTGOING_REQUEST_ERROR = d;
  },
  66
);
__d(
  'MFriendingState',
  [],
  function (a, b, c, d, e, f) {
    a = 'm:friending-state:request-sent';
    b = 'm:friending-state:request-canceled';
    c = 'm:friending-state:unfriended';
    f.REQUEST_SENT = a;
    f.REQUEST_CANCELED = b;
    f.UNFRIENDED = c;
  },
  66
);
__d(
  'MHome',
  ['FBLogger', 'MHistory', 'MURI', 'Stratcom'],
  function (a, b, c, d, e, f, g) {
    function a() {
      c('Stratcom').listen('m:page:unload', null, function (a) {
        c('Stratcom').invoke('m:homepage:unload'), c('Stratcom').removeCurrentListener();
      }),
        c('Stratcom').invoke('m:homepage:load');
    }
    var h = '/home.php';
    d = '/home.php?layoutonly';
    function b(a) {
      a = a;
      a || (a = c('MHistory').getPath());
      if (!a) return !1;
      try {
        var b = new (c('MURI'))(a).normalize();
        b = b.getPath();
      } catch (d) {
        (b = null), c('FBLogger')('mweb').catching(d).warn('Unable to determine if isHome, invalid path: %s', a.toString());
      }
      return b !== null && b !== void 0 && (b === '/' || b === h) && !c('MHistory').hasSoftState();
    }
    g.init = a;
    g.HOME_PATH = h;
    g.HOME_LAYOUT_PATH = d;
    g.isHome = b;
  },
  98
);
__d(
  'MLogState',
  ['FBLogger', 'MLinkHack', 'URI'],
  function (a, b, c, d, e, f) {
    var g,
      h = {
        CLICK_POSITION_BOOKMARK: 1,
        CLICK_POSITION_REQUESTS_FLYOUT: 2,
        CLICK_POSITION_MESSAGES_FLYOUT: 3,
        CLICK_POSITION_NOTIFICATIONS_FLYOUT: 4,
        _refid: null,
        getRefid: function () {
          return h._refid;
        },
        setRefid: function (a) {
          h._refid = a;
        },
        updateLink: function (a, c) {
          var d = h.getRefid();
          if (!d) return;
          var e = a.getNode('tag:a');
          if (!e || e.getAttribute('href') === '#') return;
          b('MLinkHack').safe(e, function () {
            var a = new (g || (g = b('URI')))(e.getAttribute('href'));
            a.addQueryData('refid', d);
            a.addQueryData('pos', c);
            e.setAttribute('href', a.toString());
          });
        },
      };
    e.exports = h;
  },
  null
);
__d(
  'MPopoverVisiblityTracker',
  ['MHistory'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a() {}
    b = function () {
      return c('MHistory').hasSoftState();
    };
    g.init = a;
    g.isPopoverOpen = b;
  },
  98
);
__d(
  'VisibilityTrackingHelper',
  ['MPopoverVisiblityTracker', 'MViewport', 'Stratcom', 'StratcomManager', 'gkx'],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      d('StratcomManager').enableDispatch(document, 'scroll');
      return [c('Stratcom').listen('m:root:render', null, a), c('Stratcom').listen('scroll', null, a), c('Stratcom').listen('MScrollArea:scrollend', null, a)];
    }
    function b() {
      return { width: d('MViewport').getWidth(), height: d('MViewport').getHeight() };
    }
    function e() {
      var a = c('gkx')('820050');
      if (a && d('MPopoverVisiblityTracker').isPopoverOpen()) return !0;
      a = document.getElementById('MPopupControl');
      return !!a;
    }
    g.getEventListeners = a;
    g.getViewportInfo = b;
    g.isSnippetFlyoutVisible = e;
  },
  98
);
__d(
  'XLynxAsyncCallbackController',
  ['XController'],
  function (a, b, c, d, e, f) {
    e.exports = b('XController').create('/si/linkclick/ajax_callback/', { lynx_uri: { type: 'String' } });
  },
  null
);
__d(
  'FBLynxLogging',
  ['MRequest', 'ODS', 'XLynxAsyncCallbackController'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a) {
      var b = c('XLynxAsyncCallbackController').getURIBuilder().getURI();
      b = new (c('MRequest'))(b).setData({ lynx_uri: a });
      b.listen('error', function (a) {
        a.code ? ((a.isHandled = !0), d('ODS').bumpEntityKey(3861, 'linkshim', 'click_log.post.fail.' + a)) : d('ODS').bumpEntityKey(3861, 'linkshim', 'click_log.post.fail.unknown');
      });
      b.send();
    }
    g.log = a;
  },
  98
);
__d(
  'isBulletinDotComURI',
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp('(^|\\.)bulletin\\.com$', 'i'),
      h = ['https'];
    function a(a) {
      if (a.isEmpty() && a.toString() !== '#') return !1;
      return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain());
    }
    f['default'] = a;
  },
  66
);
__d(
  'isLinkshimURI',
  ['isBulletinDotComURI', 'isFacebookURI', 'isMessengerDotComURI'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a) {
      var b = a.getPath();
      return (b === '/l.php' || b.indexOf('/si/ajax/l/') === 0 || b.indexOf('/l/') === 0 || b.indexOf('l/') === 0) && (c('isFacebookURI')(a) || c('isMessengerDotComURI')(a) || c('isBulletinDotComURI')(a)) ? !0 : !1;
    }
    g['default'] = a;
  },
  98
);
__d(
  'FBLynxBase',
  ['$', 'FBLynxLogging', 'LinkshimHandlerConfig', 'URI', 'isLinkshimURI'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g;
    function h(a) {
      if (!b('isLinkshimURI')(a)) return null;
      a = a.getQueryData().u;
      return !a ? null : a;
    }
    var i = {
      logAsyncClick: function (a) {
        i.swapLinkWithUnshimmedLink(a);
        a = a.getAttribute('data-lynx-uri');
        if (!a) return;
        b('FBLynxLogging').log(a);
      },
      originReferrerPolicyClick: function (a) {
        var c = b('$')('meta_referrer');
        c.content = b('LinkshimHandlerConfig').switched_meta_referrer_policy;
        i.logAsyncClick(a);
        setTimeout(function () {
          c.content = b('LinkshimHandlerConfig').default_meta_referrer_policy;
        }, 100);
      },
      swapLinkWithUnshimmedLink: function (a) {
        var c = a.href,
          d = h(new (g || (g = b('URI')))(c));
        if (!d) return;
        a.setAttribute('data-lynx-uri', c);
        a.href = d;
      },
      revertSwapIfLynxURIPresent: function (a) {
        var b = a.getAttribute('data-lynx-uri');
        if (!b) return;
        a.removeAttribute('data-lynx-uri');
        a.href = b;
      },
    };
    e.exports = i;
  },
  null
);
__d(
  'MLynx',
  ['FBLynxBase', 'Stratcom', 'URI', 'isLinkshimURI'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g,
      h = {
        alreadySetup: !1,
        setupDelegation: function (a) {
          a === void 0;
          if (h.alreadySetup) return;
          h.alreadySetup = !0;
          b('Stratcom').listen('click', 'MLynx_originlazy', function (a) {
            a = a.getNode('MLynx_originlazy');
            a instanceof HTMLAnchorElement && b('FBLynxBase').originReferrerPolicyClick(a);
          });
          b('Stratcom').listen('click', 'MLynx_asynclazy', function (a) {
            a = a.getNode('MLynx_asynclazy');
            a instanceof HTMLAnchorElement && b('FBLynxBase').logAsyncClick(a);
          });
        },
        isShimmedLink: function (a) {
          var c = a.getAttribute('href');
          c = c ? b('isLinkshimURI')(new (g || (g = b('URI')))(c)) : !1;
          return c || a.hasAttribute('data-lynx-uri');
        },
      };
    e.exports = h;
  },
  null
);
__d(
  'MMultiPhotoUploaderAttachmentState',
  [],
  function (a, b, c, d, e, f) {
    var g = { SENDING: 'sending', POLLING_TAG_SUGGESTIONS: 'polling', UPLOADED: 'uploaded', ERROR: 'error' };
    g.getDefaultState = function () {
      var a = {};
      for (var b in g) {
        if (!Object.prototype.hasOwnProperty.call(g, b) || typeof g[b] !== 'string') continue;
        a[g[b]] = 0;
      }
      return a;
    };
    e.exports = g;
  },
  null
);
__d(
  'MAnimator',
  ['cancelAnimationFrame', 'requestAnimationFrame'],
  function (a, b, c, d, e, f) {
    a = (function () {
      'use strict';
      function a() {}
      var c = a.prototype;
      c.dispose = function () {
        if (!this._disposed) {
          this.stop();
          for (var a in this) delete this[a];
          this._disposed = !0;
        }
      };
      c.start = function (c, d, e, f, g) {
        var h = this;
        if (this._disposed) return;
        this.stop();
        f = f || 250;
        g = g || a.easeOutCubic;
        var i = 0,
          j = 0,
          k = Date.now();
        this._value = 0;
        this._onStopCallback = e;
        this._animating = !0;
        var l = function () {
          var a = Date.now(),
            e;
          d !== null && !d() ? (e = !0) : ((i = (a - k + 1) / f), i > 1 && (i = 1), (j = g ? g(i) : i), (h._value = j));
          if (e || c(j, h._animating, a) === !1 || i === 1) {
            c = null;
            d = null;
            i = null;
            g = null;
            i = null;
            l = null;
            h.stop();
            return;
          }
          h._animID = b('requestAnimationFrame')(l);
        };
        this._animID = b('requestAnimationFrame')(l);
      };
      c.stop = function () {
        if (this._disposed) return;
        this._animating &&
          ((this._animating = !1), b('cancelAnimationFrame')(this._animID), this._onStopCallback && this._onStopCallback(this._value, this._animating, Date.now()), delete this._animID, delete this._onStopCallback, (this._value = 0));
      };
      a.play = function (b, c, d, e, f) {
        var g = new a(),
          h = c - b,
          i = function (a) {
            return e(b + h * a);
          },
          j = function (a) {
            i(a), (i = null), (h = null), (e = null), (c = null), (b = null);
          };
        g.start(i, null, j, d, f);
        return g;
      };
      a.easeOutCubic = function (a) {
        return Math.pow(a - 1, 3) + 1;
      };
      a.easeInOutCubic = function (a) {
        return (a /= 0.5) < 1 ? 0.5 * Math.pow(a, 3) : 0.5 * (Math.pow(a - 2, 3) + 2);
      };
      return a;
    })();
    Object.assign(a.prototype, { _value: 0 });
    e.exports = a;
  },
  null
);
__d(
  'MTouchClick',
  ['MCache', 'Stratcom', 'Vector'],
  function (a, b, c, d, e, f) {
    var g = 'MTouchClick.RECENT_CLICKS',
      h = 20,
      i = 2e3,
      j = ['click'],
      k = null,
      l = null,
      m = navigator.userAgent.indexOf('Android') === -1 && navigator.userAgent.match(/^Mozilla\/.*Mobile;.*Gecko\/.*Firefox/g),
      n = null,
      o = 0,
      p = 200;
    function q(a) {
      (n = a.target), (o = a.timeStamp);
    }
    function r() {
      (n = null), (o = 0);
    }
    function s() {
      var a = u(),
        c = Date.now();
      a = a.filter(function (a) {
        return c - a.time < i;
      });
      b('MCache').setItem(g, a);
      return a.map(function (a) {
        return a.click;
      });
    }
    function t(a) {
      var c = Date.now();
      a = a.map(function (a) {
        return { click: a, time: c };
      });
      a = a.concat(u());
      b('MCache').setItem(g, a);
    }
    function u() {
      var a = b('MCache').getItem(g);
      return Array.isArray(a) ? a : [];
    }
    function v(a, b, c) {
      var d = document.createEvent('MouseEvents'),
        e = c ? c.getTouch() : {};
      c = c ? c.getRawEvent() : {};
      d.initMouseEvent(b, !0, !0, window, 0, (c == null ? void 0 : c.screenX) || 0, (c == null ? void 0 : c.screenY) || 0, e.clientX || 0, e.clientY || 0, !1, !1, !1, !1, 0, null);
      a.dispatchEvent(d);
      return d;
    }
    var w = {
      _touchEndPosition: null,
      hasTouchEvents: function () {
        return 'ontouchstart' in window;
      },
      click: function (a, b) {
        if (b) {
          if (b._processed) return;
          b._processed = !0;
        }
        if (m && a instanceof HTMLInputElement && a.getAttribute('type') === 'file') {
          a.click();
          return;
        }
        j.forEach(function (c) {
          v(a, c, b);
        });
        var c = b ? b.getRawEvent() : { target: a, timeStamp: Date.now() };
        c && q(c);
        w.killGhostClicksNearTouch();
      },
      killGhostClicksNearTouch: function () {
        t([k, l]);
      },
    };
    (function () {
      if (!w.hasTouchEvents()) return;
      function a(a, b) {
        return Math.abs(a.x - b.x) <= h && Math.abs(a.y - b.y) <= h;
      }
      function c(b) {
        var c = s();
        if (b.detail > 0 && c.length > 0) {
          b = f(b);
          for (var d = 0; d < c.length; d++) {
            var e = c[d];
            if (e != null && (a(b.client, e.client) || a(b.screen, e.screen))) return !0;
          }
        }
        return !1;
      }
      function d(a) {
        var b = s();
        b = b.length > 0 && a.target === n && Math.abs(a.timeStamp - o) < p;
        b && r();
        return b;
      }
      function e(a) {
        (c(a) || d(a)) && (a.preventDefault(), a.stopPropagation());
      }
      j.forEach(function (a) {
        document.addEventListener(a, e, !0);
      });
      function f(a) {
        return { client: new (b('Vector'))(a.clientX, a.clientY), screen: new (b('Vector'))(a.screenX, a.screenY) };
      }
      b('Stratcom').listen('touchstart', null, function (a) {
        a = (a = a.getRawEvent()) == null ? void 0 : a.touches[0];
        a && ((k = f(a)), (l = f(a)));
      });
      b('Stratcom').listen('touchmove', null, function (a) {
        a = (a = a.getRawEvent()) == null ? void 0 : a.touches[0];
        a && (w._touchEndPosition = f(a));
      });
    })();
    e.exports = w;
  },
  null
);
__d(
  'MTouchScroll',
  ['CancelableEventListener'],
  function (a, b, c, d, e, f) {
    var g = {
      _blocks: 0,
      _blocker: null,
      _releaser: null,
      release: function () {
        g._blocks && (g._releaser && (g._releaser.remove(), (g._releaser = null)), g._blocks--, g._blocks || (g._blocker.remove(), (g._blocker = null)));
      },
      block: function () {
        g._blocks ||
          (g._blocker = b('CancelableEventListener').listen(document.body, 'touchmove', null, function (a) {
            a.prevent();
          })),
          g._blocks++;
      },
      blockDuringTouch: function (a) {
        a.prevent(), g._blocks || (g.block(), (g._releaser = b('CancelableEventListener').listen(document.body, ['touchcancel', 'touchend'], null, g.release)));
      },
    };
    e.exports = g;
  },
  null
);
__d(
  'MBlockingTouchable',
  ['CSS', 'CancelableEventListener', 'MLegacyDataStore', 'MTouchClick', 'MTouchScroll', 'Vector', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    var h = 30,
      i = 20;
    function a(a) {
      if (!d('MTouchClick').hasTouchEvents()) return;
      var b,
        e,
        f,
        g,
        j,
        k,
        l,
        m = function (a) {
          l = a.getTarget();
          if (!(l instanceof Element)) return;
          if (l.getAttribute('disabled') !== null) {
            a.prevent();
            l = null;
            return;
          }
          k = [d('CancelableEventListener').listen(l, 'touchmove', null, o), d('CancelableEventListener').listen(l, 'touchend', null, n), d('CancelableEventListener').listen(l, 'touchcancel', null, q)];
          var m = a.getRawEvent().targetTouches[0],
            p = c('Vector').getDim(l);
          b = Math.min(p.x / 2, h);
          e = Math.min(p.y / 2, i);
          j = { x: m.screenX, y: m.screenY };
          d('MLegacyDataStore').get(l).allowScroll
            ? ((g = !1),
              clearTimeout(f),
              (f = c('setTimeoutAcrossTransitions')(function () {
                (g = !0), r(s(a)), d('MTouchScroll').blockDuringTouch(a);
              }, 100)))
            : ((g = !0), r(!0), d('MTouchScroll').blockDuringTouch(a));
        },
        n = function (a) {
          l && s(a) ? d('MTouchClick').click(l, a) : d('MTouchClick').killGhostClicksNearTouch(), q();
        },
        o = function (a) {
          g ? (d('MTouchScroll').blockDuringTouch(a), r(s(a))) : l && p();
        },
        p = function () {
          l && r(!1), clearTimeout(f), (g = !1), (j = null), (l = null);
        },
        q = function () {
          p(),
            k.forEach(function (a) {
              a.remove();
            }),
            (k = []);
        },
        r = function (a) {
          l instanceof Element && c('CSS').conditionClass(l, 'touched', a);
        },
        s = function (a) {
          a = a.getTouch();
          return !j ? !1 : Math.abs(j.y - a.screenY) <= e && Math.abs(j.x - a.screenX) <= b;
        };
      d('CancelableEventListener').listen(a, 'touchstart', null, m);
    }
    g.init = a;
  },
  98
);
__d(
  'MExposeMore',
  ['CSS', 'DOM', 'Stratcom'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = [];
    function i() {
      while (h.length) h.pop().remove();
    }
    var j = 'expose',
      k = !1,
      l = !0,
      m = !1;
    c('Stratcom').listen('click', [j, 'more'], function (a) {
      var b = a.getNode(j);
      c('CSS').conditionClass(b, 'text_exposed', l);
      m ? (l && a.prevent(), (l = !l)) : a.prevent();
    });
    function a(a) {
      if (k) return;
      m = a.seeMoreSwitchExpandOnly;
      k = !0;
    }
    function b(a, b) {
      if (b.children.length !== 0) {
        h.length || h.push(c('Stratcom').listen('m:page:unload', null, i));
        a = d('DOM').scry(a, '*', 'more')[0];
        a &&
          h.push(
            d('DOM').listen(a, 'click', null, function (a) {
              c('CSS').show(b), a.prevent();
            })
          );
      }
    }
    g.init = a;
    g.showMessageSuffixOnClick = b;
  },
  98
);
__d(
  'MScrollPositionSaver',
  ['$', 'MViewport', 'Stratcom', 'Vector', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f) {
    var g,
      h = {
        getElementPositionY: function (a) {
          return b('Vector').getPos(a).y;
        },
        getScrollPosition: function (a) {
          var c = b('$')('root');
          g = a;
          a = a ? a.scrollTop : b('MViewport').getScrollTop();
          if (a < b('MViewport').getHeight() / 3) return { element: document.body, hiddenRatio: 0 };
          do {
            var d = [];
            for (var e = 0; e < c.childNodes.length; e++) {
              var f = c.childNodes[e];
              if (f.nodeType !== 1) continue;
              var i = document.defaultView.getComputedStyle(f, '');
              i.display != 'none' && i.visibility != 'hidden' && d.push(f);
            }
            if (!d.length) break;
            i = a;
            d[0].offsetParent && (i -= h.getElementPositionY(d[0].offsetParent));
            f = 0;
            e = d.length - 1;
            while (f <= e) {
              var j = Math.floor((f + e) / 2);
              d[j].offsetTop <= i ? (f = j + 1) : (e = j - 1);
            }
            c = d[Math.max(e, 0)];
          } while (!b('Stratcom').hasSigil(c, 'marea'));
          j = Math.max(a - h.getElementPositionY(c), 0);
          i = 0;
          c.offsetHeight && (i = Math.min(j / c.offsetHeight, 1));
          return { element: c, hiddenRatio: i };
        },
        setScrollPosition: function (a, c) {
          var d = a.element.offsetHeight * a.hiddenRatio;
          a = h.getElementPositionY(a.element) + parseInt(d, 10);
          d = c ? c.scrollTop : b('MViewport').getScrollTop();
          (a > 0 || d > 0) && (c ? (c.scrollTop = a) : b('MViewport').scrollTo(0, a));
        },
      },
      i = null,
      j = null,
      k = b('MViewport').isLandscape(),
      l = !1,
      m = !1;
    function n() {
      var a = g ? g.scrollTop : b('MViewport').getScrollTop();
      a != i && ((j = h.getScrollPosition(g)), (i = a));
      m = !1;
    }
    b('Stratcom').listen('scroll', null, function (a) {
      if (a.getType() == 'scroll' && l) return;
      m || (b('setTimeoutAcrossTransitions')(n, 50), (m = !0));
    });
    b('Stratcom').listen('resize', null, function () {
      (l = !0),
        b('setTimeoutAcrossTransitions')(function () {
          var a = b('MViewport').isLandscape();
          j && k !== a && ((k = a), h.setScrollPosition(j, g), n());
          l = !1;
        }, 200);
    });
    e.exports = h;
  },
  null
);
__d(
  'MTouchable',
  ['CSS', 'FlowMigrationUtilsForLegacyFiles', 'MLegacyDataStore', 'MTouchClick', 'MTouchableSyntheticClickGK', 'Stratcom', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    var h = 'touchable',
      i = 3,
      j = 160,
      k,
      l,
      m,
      n,
      o,
      p;
    function a(a) {
      var b;
      l && w(!1);
      l = a.getNode(h);
      if (((b = l) == null ? void 0 : b.getAttribute('disabled')) !== null) {
        a.prevent();
        l = null;
        return;
      }
      a = (b = a.getRawEvent()) == null ? void 0 : b.targetTouches[0];
      a == null && d('FlowMigrationUtilsForLegacyFiles').invariantViolation('Touch must not be null here');
      m = a.target;
      u();
      k = [c('Stratcom').listen('touchmove', h, q), c('Stratcom').listen('touchend', h, r), c('Stratcom').listen('touchcancel', h, s)];
      n = { x: a.screenX, y: a.screenY };
      o = c('setTimeoutAcrossTransitions')(function () {
        l && w(!0);
      }, j);
    }
    function q(a) {
      l && x(a) && (w(!1), t());
    }
    function r(a) {
      if (l) {
        var b = !p;
        w(!0);
        c('MTouchableSyntheticClickGK').USE_SYNTHETIC_CLICK && !d('MLegacyDataStore').get(l).nativeClick && m instanceof Element && m.getAttribute('target') != '_blank' && d('MTouchClick').click(m, a);
        v(b);
      } else d('MTouchClick').killGhostClicksNearTouch(), v();
    }
    function s() {
      l && w(!1), v();
    }
    function t(a) {
      clearTimeout(o), l && c('setTimeoutAcrossTransitions')(w.bind(null, !1, l), a ? j : 0), (p = !1), (m = l = n = null);
    }
    function u() {
      k &&
        (k.forEach(function (a) {
          a.remove();
        }),
        (k = []));
    }
    function v(a) {
      t(a), u();
    }
    function w(a, b) {
      b || (p = a);
      b = b || l;
      b && c('CSS').conditionClass(b, 'touched', a);
    }
    function x(a) {
      var b;
      b = (b = a.getRawEvent()) == null ? void 0 : b.targetTouches[0];
      var c = document;
      c = c.documentElement;
      (c == null || n == null || b == null) && d('FlowMigrationUtilsForLegacyFiles').invariantViolation('Document, origin, and touch must not be null here');
      a = a.getNode('moving-box') || c.scrollWidth > window.innerWidth;
      return Math.abs(n.y - b.screenY) >= i || (a && Math.abs(n.x - b.screenX) >= i);
    }
    d('MTouchClick').hasTouchEvents() && c('Stratcom').listen('touchstart', h, a);
  },
  34
);
__d(
  'ModalDialogURIWhitelistForNavigationLogging',
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({ ADD_FEATURE_PHOTOS: '/profile/intro/edit/photos/', DESCRIBE_WHO_YOU_ARE: '/profile/intro/edit/bio/' });
    f['default'] = a;
  },
  66
);
__d(
  'MModalDialog',
  [
    'fbt',
    '$',
    'CSS',
    'DOM',
    'FWLoader',
    'MHistory',
    'MHybridWebLiteController',
    'MLinkHack',
    'MPageCache',
    'MPageController',
    'MRequest',
    'MRequestGateway',
    'MRequestTypes',
    'MScrollPositionSaver',
    'MURI',
    'MViewport',
    'ModalDialogURIWhitelistForNavigationLogging',
    'ScriptPath',
    'Stratcom',
    'URI',
    'ge',
    'gkx',
    'setTimeout',
    'setTimeoutAcrossTransitions',
  ],
  function (a, b, c, d, e, f, g) {
    var h,
      i = b('FWLoader').FW,
      j = 'dialog-ignore-subtree-links',
      k = 'mds',
      l = 'mdf',
      m = 'mdp',
      n = 'fw:modal-dialog:close',
      o = 'm:modal-dialog:step-change',
      p = 'm:modal-dialog:initial-load',
      q = 'm:modal-dialog:close',
      r = 'm:modal-dialog:will-close',
      s,
      t = !1,
      u = !1,
      v = !1,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D = [],
      E = null,
      F = null,
      G;
    function a() {
      return u;
    }
    function c(a, b, c) {
      (F = b), H(a, c);
    }
    function H(a, c, d, e) {
      e === void 0 && (e = {});
      a instanceof (h || (h = b('URI'))) && (a = a.toString());
      if (b('MHybridWebLiteController').shouldOpenModalInNewTab(new (h || (h = b('URI')))(a))) {
        (h || (h = b('URI'))).goURIOnNewWindow(a);
        return;
      }
      $(a) && b('ScriptPath').openOverlayView(a);
      if (window.FW_ENABLED) {
        c &&
          b('Stratcom').listen(n, null, function (a) {
            b('Stratcom').removeCurrentListener(), c && c(a.getData());
          });
        var f = encodeURIComponent(a);
        i.openInNewWebView('fb://facewebmodal/f?href=' + f);
        return;
      }
      if (u) throw new Error('A modal dialog is already open.');
      b('DOM').hide(Y());
      b('DOM').setContent(X(), null);
      u = !0;
      S(!0);
      w = c;
      d ? M(d) : M(g._(/*FBT_CALL*/ 'Loading...' /*FBT_CALL*/));
      P(!0);
      C = b('MScrollPositionSaver').getScrollPosition();
      J(a, babelHelpers['extends']({}, e, { firstStep: !0 }));
      b('DOM').hide(b('$')('viewport'));
      b('DOM').show(s);
      b('MViewport').scrollToHeader();
      B = b('MViewport').getUseableHeight() - b('$')('mDialogHeader').offsetHeight;
    }
    function I(a) {
      a === void 0 && (a = {});
      if (window.FW_ENABLED) {
        i.broadcastEvent(n, null, a, 1);
        i.dismissModalDialog(!0);
        return;
      }
      $(y) && b('ScriptPath').closeOverlayView(y);
      !!a && a.goBack === !0 ? ((E = R.bind(null, a)), window.history.go(-1)) : R(a);
    }
    function J(a, c) {
      c === void 0 && (c = {});
      a instanceof (h || (h = b('URI'))) && (a = a.toString());
      c.dontPushState || K(F, a, c);
      if (c.hideNavBar) {
        c = b('ge')('mDialogHeader');
        c != null && b('DOM').hide(c);
      }
      U(a);
    }
    function K(a, c, d) {
      d === void 0 && (d = {});
      x = c || x;
      D.push(b('MViewport').getScrollPos());
      if (!window.FW_ENABLED) {
        a = a || b('MHistory').getPath();
        c = new (b('MURI'))(a).addQueryData(b('MHistory').SOFT_STATE_KEY).addQueryData(k, x.toString());
        a === F && b('gkx')('726410') && (c = c.addQueryData(m, 1));
        d.firstStep ? c.addQueryData(l, 1) : c.addQueryData(l, void 0);
        b('MHistory').pushState(c.toString());
      }
    }
    function L() {
      b('Stratcom').invoke(o);
      window.FW_ENABLED ? ca(!0) : ((v = !0), window.history.go(-1));
      if (D.length) {
        var a = D.pop();
        b('setTimeout')(function () {
          b('MViewport').scrollTo(a.x, a.y);
        });
      }
    }
    function M(a) {
      b('DOM').setContent(z, a);
    }
    function N() {
      return z.innerText || null;
    }
    function O(a) {
      b('CSS').conditionClass(b('$')('modalDialog'), 'spin', a);
    }
    function P(a) {
      b('DOM')
        .scry(b('$')('mDialogHeader'), 'button')
        .forEach(function (b) {
          b.disabled = !a;
        });
    }
    function d(a) {
      Q(), (u = !0), a instanceof (h || (h = b('URI'))) && (a = a.toString()), (y = a), b('Stratcom').invoke(o);
    }
    function Q() {
      var a = b('$')('modalDialog');
      if (s === a) return;
      s = a;
      b('Stratcom').addSigil(s, 'context-layer-root');
      z = b('DOM').find(a, 'div', 'dialog-title');
      G = b('DOM').listen(a, 'click', 'dialog-cancel-button', function (a) {
        a.kill(), I({ canceled: !0, goBack: !0 });
      });
      b('DOM').listen(a, 'click', 'dialog-back-button', function (a) {
        a.kill(), L();
      });
      b('DOM').listen(a, 'click', null, function (a) {
        var c = a.getNode('tag:a');
        if (!c) return;
        if (a.getPrevented()) return;
        var d = a.getNode(j);
        if (c.getAttribute('rel') == 'ignore' || d) return;
        a.kill();
        if (b('Stratcom').hasSigil(c, 'cancel-link')) {
          L();
          return;
        }
        b('MLinkHack').remove(c);
        d = c.getAttribute('href');
        b('setTimeoutAcrossTransitions')(J.bind(null, d), 200);
      });
      window.FW_ENABLED ? (A = []) : b('Stratcom').listen('m:history:change', null, aa);
      b('Stratcom').listen('m:page:unload', null, function () {
        !window.FW_ENABLED && u && I({ canceled: !0 });
      });
    }
    function R(a) {
      b('Stratcom').invoke(r);
      b('DOM').hide(s);
      var c = b('ge')('mDialogHeader');
      c != null && b('DOM').show(c);
      b('DOM').show(b('$')('viewport'));
      C && b('MScrollPositionSaver').setScrollPosition(C);
      w && w(a);
      b('Stratcom').invoke(o);
      b('DOM').setContent(b('$')('modalDialogView'), null);
      b('Stratcom').invoke(q);
      u = !1;
    }
    function aa(a) {
      var c = new (h || (h = b('URI')))(a.getData().path).getQueryData(),
        d = c[k];
      if (E !== null) {
        if (d) a.kill(), window.history.go(-1);
        else {
          var e = E;
          E = null;
          e && e();
        }
        return;
      }
      if (!u) {
        d && !c[m] && (a.kill(), window.history.go(-1));
        return;
      }
      a.prevent();
      if (!d) {
        I({ canceled: !0 });
        return;
      }
      S(!!c[l]);
      if (d === x.toString()) return;
      b('MRequestGateway').stopAllRequests();
      x = d;
      if (!v && b('MPageCache').isPageCached(d, b('MPageController').HISTORY_EXPIRE_MS)) {
        e = b('MPageCache').getCachedPage(d);
        e && (e.listen('complete', V.bind(this, d)), e.process());
      } else (v = !1), U(d);
    }
    function e(a) {
      this._customData = a;
    }
    function ba() {
      return this._customData;
    }
    function ca(a) {
      if (A.length === 0) return;
      var c = A.pop();
      A.length === 0 && S(!0);
      a ? J(c.uri) : (b('DOM').setContent(b('$')('modalDialogView'), c.content), W(c.rightButtons), M(c.title), V(c.uri));
    }
    function S(a) {
      b('CSS').conditionClass(b('$')('mDialogHeader'), 'firstStep', a), (t = a);
    }
    function T() {
      return t;
    }
    function da() {
      b('DOM').hide(Z()), b('DOM').show(Y());
    }
    function ea() {
      b('DOM').show(Z()), b('DOM').hide(Y());
    }
    function fa() {
      b('DOM').hide(Z()), b('DOM').hide(Y());
    }
    function U(a) {
      function c(a) {
        var b = document.createDocumentFragment();
        while (a.firstChild) b.appendChild(a.removeChild(a.firstChild));
        return b;
      }
      O(!0);
      T() || b('Stratcom').invoke(o);
      window.FW_ENABLED && (A.push({ content: c(b('$')('modalDialogView')), uri: y, title: N(), rightButtons: c(b('$')('modalDialogHeaderButtons')) }), S(!1));
      c = new (b('MRequest'))(new (b('MURI'))(a).toString()).setType(b('MRequestTypes').TRANSITION);
      c.setMethod('GET');
      c.listen('postprocess', function (c) {
        window.FW_ENABLED || b('MPageCache').setCachedPage(a, c.response), V(a);
      });
      c.send();
    }
    function V(a) {
      window.FW_ENABLED || (b('$')('modalDialogView').style.minHeight = B + 'px'), O(!1), (y = a), T() && b('Stratcom').invoke(p, null, { uri: a }), b('Stratcom').invoke('m:ajax:complete');
    }
    function W(a) {
      b('DOM').setContent(X(), a);
    }
    function X() {
      return b('$')('modalDialogHeaderButtons');
    }
    function Y() {
      return b('DOM').find(s, '*', 'dialog-cancel-button');
    }
    function Z() {
      return b('DOM').find(s, '*', 'dialog-back-button');
    }
    function ga(a) {
      a ? b('DOM').replace(Y(), a) : b('DOM').hide(Y());
    }
    function ha(a) {
      u ? J(a) : H(a);
    }
    function ia() {
      var a = b('ge')('modalDialogView'),
        c = b('ge')('mDialogHeader');
      c != null && (b('DOM').hide(c), (B = b('MViewport').getHeight()), (a.style.minHeight = B + 'px'));
    }
    function $(a) {
      return Object.values(b('ModalDialogURIWhitelistForNavigationLogging')).indexOf(a) > -1;
    }
    function ja() {
      G.remove();
    }
    f.init = Q;
    f._replaceButtons = W;
    f._replaceCancelButton = ga;
    f.STEP_CHANGE_EVENT = o;
    f.STEP_KEY = k;
    f.INITIAL_LOAD_EVENT = p;
    f.CLOSE_EVENT = q;
    f.WILL_CLOSE_EVENT = r;
    f.close = I;
    f.hideHeader = ia;
    f.getIsFirstStep = T;
    f.goBack = L;
    f.initForFaceweb = d;
    f.isOpen = a;
    f.load = J;
    f.loadOrOpen = ha;
    f.open = H;
    f.pushState = K;
    f.setSpinnerVisibility = O;
    f.setTitle = M;
    f.setHeaderButtonsEnabledState = P;
    f.openWithPermalinkURI = c;
    f.showCancelButton = da;
    f.removeCancelButtonClickListener = ja;
    f.showBackButton = ea;
    f.hideBackAndCancelButtons = fa;
    f.setCustomData = e;
    f.getCustomData = ba;
  },
  null
);
__d(
  'MLayerHideOnBlur',
  [],
  function (a, b, c, d, e, f) {
    a = (function () {
      function a(a) {
        var b = this;
        this.$5 = function () {
          b.$2 && b.$2.remove(), (b.$2 = null);
        };
        this.$4 = function () {
          b.$2 = b.$1.addListener('blur', function () {
            b.$1.hide();
          });
        };
        this.$3 = null;
        this.$2 = null;
        this.$1 = a;
      }
      var b = a.prototype;
      b.enable = function () {
        (this.$3 = [this.$1.addListener('show', this.$4.bind(this)), this.$1.addListener('hide', this.$5.bind(this))]), this.$1.isShown() && this.$4();
      };
      b.disable = function () {
        this.$5();
        while (this.$3.length) this.$3.pop().remove();
        this.$3 = null;
      };
      return a;
    })();
    f['default'] = a;
  },
  66
);
__d(
  'MLayerHideOnScroll',
  ['Stratcom'],
  function (a, b, c, d, e, f) {
    var g = 5;
    a = (function () {
      'use strict';
      function a(a) {
        (this.$1 = null), (this.$2 = null), (this.$3 = a), (this.$4 = null);
      }
      var c = a.prototype;
      c.enable = function () {
        (this.$1 = [this.$3.addListener('show', this.$5.bind(this)), this.$3.addListener('hide', this.$6.bind(this))]), this.$3.isShown() && this.$5();
      };
      c.disable = function () {
        this.$6();
        while (this.$1.length) this.$1.pop().remove();
        this.$1 = null;
      };
      c.$6 = function () {
        this.$2 && this.$2.remove();
      };
      c.$5 = function () {
        var a = this,
          c = window;
        this.$4 = c.scrollY;
        this.$2 = b('Stratcom').listen('scroll', null, function () {
          var b = c.scrollY;
          Math.abs(a.$4 - b) >= g && a.$3.hide();
        });
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  'MDeepCopy',
  [],
  function (a, b, c, d, e, f) {
    function g(a) {
      if (Array.isArray(a)) return i(a);
      else if (typeof a === 'object' && a !== null) return h(a);
      else return a;
    }
    function h(a) {
      var b = {};
      for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = g(a[c]));
      return b;
    }
    function i(a) {
      a = a.slice();
      for (var b = 0; b < a.length; ++b) a[b] = g(a[b]);
      return a;
    }
    f['default'] = g;
  },
  66
);
__d(
  'MLiveData',
  ['MDeepCopy', 'Stratcom', 'eventsMixinDeprecated'],
  function (a, b, c, d, e, f) {
    var g = {},
      h = {},
      i,
      j = {},
      k,
      l,
      m = (function () {
        'use strict';
        function a(a) {
          this.$1 = a;
        }
        var c = a.prototype;
        c.getData = function () {
          return b('MDeepCopy')(g[this.$1] || {});
        };
        return a;
      })();
    b('eventsMixinDeprecated')(m, ['change']);
    var n = {
      _set: function (a, b, c) {
        var d = g[a],
          e = d && d.timestamp && b.timestamp && d.timestamp > b.timestamp;
        if (l || e) return;
        !d || c ? (g[a] = b) : Object.assign(g[a] || {}, b);
        h[a] || (h[a] = new m(a));
        h[a].invoke('change');
      },
      update: function (a, b) {
        n._set(a, b, !1);
      },
      set: function (a, b) {
        n._set(a, b, !0);
      },
      get: function (a) {
        i ||
          (i = b('Stratcom').listen('m:page:render:cache:start', null, function () {
            (l = !0),
              b('Stratcom').listen('m:page:iui:response:complete', null, function () {
                (l = !1),
                  b('Stratcom').removeCurrentListener(),
                  Object.keys(j).forEach(function (a) {
                    var b = g[a];
                    b && Object.keys(b).length && h[a].invoke('change');
                  });
              });
          }));
        j[a] || (j[a] = !0);
        k ||
          (k = b('Stratcom').listen('m:page:unload', null, function () {
            j = {};
          }));
        h[a] || (h[a] = new m(a));
        return h[a];
      },
    };
    e.exports = n;
  },
  null
);
__d(
  'MScrollAreaHelper',
  ['MLegacyDataStore'],
  function (a, b, c, d, e, f) {
    function a(a, c) {
      c = c || 10;
      var d;
      while (c > 0 && a && a.nodeType === 1) {
        d = b('MLegacyDataStore').get(a);
        if (d && d.scrollArea) return d.scrollArea;
        a = a.parentNode;
        c--;
      }
      return null;
    }
    f.findScrollArea = a;
  },
  null
);
__d(
  'TouchEventType',
  [],
  function (a, b, c, d, e, f) {
    a = 'touchend';
    b = 'touchstart';
    c = { END: a, START: b };
    f['default'] = c;
  },
  66
);
__d(
  'MActionBubbleLayout',
  ['cx', 'CSS'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      'use strict';
      function a(a) {
        (this.$1 = null), (this.$2 = a);
      }
      var c = a.prototype;
      c.enable = function () {
        (this.$1 = this.$2.addListener('adjustDimensions', this.$3.bind(this))), this.$2.isShown() && this.$2.updatePosition();
      };
      c.disable = function () {
        this.$1.remove(), (this.$1 = null), this.$2.isShown() && this.$2.updatePosition();
      };
      c.$3 = function () {
        var a = this.$2;
        this.$4(!0);
        var b = this.$2.getContentRoot();
        b.clientWidth >= a.getMaxWidth() && this.$4(!1);
      };
      c.$4 = function (a) {
        var c = this.$2;
        c.setWidth(a ? 'auto' : 'wide');
        c.applyWidth();
        b('CSS').conditionClass(c.getRoot(), '_55i0', a);
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  'MArrays',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a, b) {
      for (var c = 0; c < a.length; c++) if (b.startsWith(a[c])) return !0;
      return !1;
    }
    f.findPrefix = a;
  },
  66
);
__d(
  'MParent',
  ['Stratcom'],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      a = a;
      while (a && a !== document && !(a instanceof DocumentFragment) && !c('Stratcom').hasSigil(a, b)) a = a.parentNode;
      return a instanceof HTMLElement ? a : null;
    }
    g.bySigil = a;
  },
  98
);
__d(
  'destroyOnUnload',
  ['Stratcom'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      c('Stratcom').listen('m:page:unload', null, function () {
        c('Stratcom').removeCurrentListener(), a && a();
      });
    }
    g['default'] = a;
  },
  98
);
__d(
  'BanzaiScubaMigrationFalcoEvent',
  ['FalcoLoggerInternal', 'getFalcoLogPolicy_DO_NOT_USE'],
  function (a, b, c, d, e, f) {
    'use strict';
    a = b('getFalcoLogPolicy_DO_NOT_USE')('1949898');
    c = b('FalcoLoggerInternal').create('banzai_scuba_migration', a);
    e.exports = c;
  },
  null
);
__d(
  'BanzaiScuba_DEPRECATED',
  ['BanzaiScubaMigrationFalcoEvent', 'FBLogger'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a(a, b, d) {
        (this.posted = !1), a || c('FBLogger')('BanzaiScuba').warn("Can't post a sample without a dataset"), (this.dataset = a), (this.$1 = b), (this.options = d);
      }
      var b = a.prototype;
      b.$2 = function (a, b, d) {
        if (this.posted) {
          c('FBLogger')('BanzaiScuba').warn('Trying to add to an already posted sample');
          return a;
        }
        a = a || {};
        a[b] = d;
        return a;
      };
      b.addNormal = function (a, b) {
        this.normal = this.$2(this.normal, a, b);
        return this;
      };
      b.addInteger = function (a, b) {
        this['int'] = this.$2(this['int'], a, b);
        return this;
      };
      b.addDenorm = function (a, b) {
        this.denorm = this.$2(this.denorm, a, b);
        return this;
      };
      b.addTagSet = function (a, b) {
        this.tags = this.$2(this.tags, a, b);
        return this;
      };
      b.addNormVector = function (a, b) {
        this.normvector = this.$2(this.normvector, a, b);
        return this;
      };
      b.post = function () {
        var a = this;
        if (this.posted) {
          c('FBLogger')('BanzaiScuba').warn('Trying to re-post');
          return;
        }
        if (!this.dataset) return;
        var b = {};
        b._ds = this.dataset;
        b._options = this.options;
        this.normal && (b.normal = this.normal);
        this['int'] && (b['int'] = this['int']);
        this.denorm && (b.denorm = this.denorm);
        this.tags && (b.tags = this.tags);
        this.normvector && (b.normvector = this.normvector);
        this.$1 !== null && this.$1 !== '' && this.$1 !== void 0 && (b._lid = this.$1);
        c('BanzaiScubaMigrationFalcoEvent').log(function () {
          return { dataset: a.dataset, payload: b };
        });
        this.posted = !0;
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'BehaviorsMixin',
  [],
  function (a, b, c, d, e, f) {
    var g = (function () {
        function a(a) {
          (this.$1 = a), (this.$2 = !1);
        }
        var b = a.prototype;
        b.enable = function () {
          this.$2 || ((this.$2 = !0), this.$1.enable());
        };
        b.disable = function () {
          this.$2 && ((this.$2 = !1), this.$1.disable());
        };
        return a;
      })(),
      h = 1;
    function i(a) {
      a.__BEHAVIOR_ID || (a.__BEHAVIOR_ID = h++);
      return a.__BEHAVIOR_ID;
    }
    a = {
      enableBehavior: function (a) {
        this._behaviors || (this._behaviors = {});
        var b = i(a);
        this._behaviors[b] || (this._behaviors[b] = new g(new a(this)));
        this._behaviors[b].enable();
        return this;
      },
      disableBehavior: function (a) {
        if (this._behaviors) {
          a = i(a);
          this._behaviors[a] && this._behaviors[a].disable();
        }
        return this;
      },
      enableBehaviors: function (a) {
        a.forEach(this.enableBehavior, this);
        return this;
      },
      destroyBehaviors: function () {
        if (this._behaviors) {
          for (var a in this._behaviors) this._behaviors[a].disable();
          this._behaviors = {};
        }
      },
      hasBehavior: function (a) {
        return this._behaviors && i(a) in this._behaviors;
      },
    };
    b = a;
    f['default'] = b;
  },
  66
);
__d(
  'Keys',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    a = Object.freeze({
      BACKSPACE: 8,
      TAB: 9,
      RETURN: 13,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAUSE_BREAK: 19,
      CAPS_LOCK: 20,
      ESC: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      INSERT: 45,
      DELETE: 46,
      ZERO: 48,
      ONE: 49,
      TWO: 50,
      THREE: 51,
      FOUR: 52,
      FIVE: 53,
      SIX: 54,
      SEVEN: 55,
      EIGHT: 56,
      NINE: 57,
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,
      LEFT_WINDOW_KEY: 91,
      RIGHT_WINDOW_KEY: 92,
      SELECT_KEY: 93,
      NUMPAD_0: 96,
      NUMPAD_1: 97,
      NUMPAD_2: 98,
      NUMPAD_3: 99,
      NUMPAD_4: 100,
      NUMPAD_5: 101,
      NUMPAD_6: 102,
      NUMPAD_7: 103,
      NUMPAD_8: 104,
      NUMPAD_9: 105,
      MULTIPLY: 106,
      ADD: 107,
      SUBTRACT: 109,
      DECIMAL_POINT: 110,
      DIVIDE: 111,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121,
      F11: 122,
      F12: 123,
      NUM_LOCK: 144,
      SCROLL_LOCK: 145,
      SEMI_COLON: 186,
      EQUAL_SIGN: 187,
      COMMA: 188,
      DASH: 189,
      PERIOD: 190,
      FORWARD_SLASH: 191,
      GRAVE_ACCENT: 192,
      OPEN_BRACKET: 219,
      BACK_SLASH: 220,
      CLOSE_BRAKET: 221,
      SINGLE_QUOTE: 222,
    });
    f['default'] = a;
  },
  66
);
__d(
  'VisualCompletionGating',
  ['cr:729414'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = b('cr:729414');
  },
  98
);
__d(
  'debounceCore',
  ['TimeSlice'],
  function (a, b, c, d, e, f, g) {
    function a(a, b, d, e, f, g) {
      d === void 0 && (d = null);
      e === void 0 && (e = setTimeout);
      f === void 0 && (f = clearTimeout);
      g === void 0 && (g = !1);
      var h,
        i = !0;
      function j() {
        for (var k = arguments.length, l = new Array(k), m = 0; m < k; m++) l[m] = arguments[m];
        var n;
        if (g) {
          n = c('TimeSlice').guard(function () {
            (i = !0), (h = null);
          }, 'debounceCore');
          if (!i) {
            f(h);
            h = e(n, b);
            return;
          }
          i = !1;
          a.apply(d, l);
        } else
          j.reset(),
            (n = c('TimeSlice').guard(function () {
              (h = null), a.apply(d, l);
            }, 'debounceCore'));
        n.__SMmeta = a.__SMmeta;
        h = e(n, b);
      }
      j.reset = function () {
        f(h), (h = null), (i = !0);
      };
      j.isPending = function () {
        return h != null;
      };
      return j;
    }
    g['default'] = a;
  },
  98
);
__d(
  'uniqueID',
  [],
  function (a, b, c, d, e, f) {
    var g = 'js_',
      h = 36,
      i = 0;
    function a(a) {
      a === void 0 && (a = g);
      return a + (i++).toString(h);
    }
    f['default'] = a;
  },
  66
);
__d(
  'mixin',
  [],
  function (a, b, c, d, e, f) {
    function a() {
      var a = function () {},
        b = 0,
        c;
      while (b < 0 || arguments.length <= b ? void 0 : arguments[b]) {
        c = b < 0 || arguments.length <= b ? void 0 : arguments[b];
        for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a.prototype[d] = c[d]);
        b += 1;
      }
      return a;
    }
    f['default'] = a;
  },
  66
);
__d(
  'DateConsts',
  [],
  function (a, b, c, d, e, f) {
    var g = 1e3;
    c = 60;
    d = 60;
    e = 24;
    var h = 7,
      i = 12,
      j = 1e3,
      k = 30.43,
      l = 4.333,
      m = 365.242,
      n = c * d,
      o = n * e,
      p = o * h,
      q = o * m,
      r = g * c,
      s = r * d,
      t = g * o,
      u = t * h,
      v = t * m,
      w = { SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3, THURSDAY: 4, FRIDAY: 5, SATURDAY: 6 };
    Object.freeze(w);
    function a(a, b) {
      return new Date(a, b, 0).getDate();
    }
    function b() {
      return Date.now() / g;
    }
    var x = { instantRange: { since: -864e10, until: 864e10 + 1 } };
    f.MS_PER_SEC = g;
    f.SEC_PER_MIN = c;
    f.MIN_PER_HOUR = d;
    f.HOUR_PER_DAY = e;
    f.DAYS_PER_WEEK = h;
    f.MONTHS_PER_YEAR = i;
    f.US_PER_MS = j;
    f.AVG_DAYS_PER_MONTH = k;
    f.AVG_WEEKS_PER_MONTH = l;
    f.AVG_DAYS_PER_YEAR = m;
    f.SEC_PER_HOUR = n;
    f.SEC_PER_DAY = o;
    f.SEC_PER_WEEK = p;
    f.SEC_PER_YEAR = q;
    f.MS_PER_MIN = r;
    f.MS_PER_HOUR = s;
    f.MS_PER_DAY = t;
    f.MS_PER_WEEK = u;
    f.MS_PER_YEAR = v;
    f.DAYS = w;
    f.getDaysInMonth = a;
    f.getCurrentTimeInSeconds = b;
    f['private'] = x;
  },
  66
);
__d(
  'csx',
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      throw new Error('csx: Unexpected class selector transformation.');
    }
    f['default'] = a;
  },
  66
);
__d(
  'GHLTestElement',
  ['csx', 'invariant', 'ODS', 'Parent', 'URI', 'containsNode', 'getElementPosition', 'gkx'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i;
    a = function (a, c) {
      var d = Array.from(a.querySelectorAll('img'));
      if (b('gkx')('1059877')) {
        var e = (i || (i = b('URI'))).getRequestURI();
        e = e != null ? e.getPath() : '';
        var f = 'images' + c,
          g = 'length_' + String(d.length);
        m(f + '.' + g);
        m(f + '.path_' + e + '.' + g);
      }
      d.length > 0 || h(0, 13937);
      f = d.filter(j);
      if (f.length === 0) {
        b('gkx')('1059877') && j(a) && m('images_removed_but_element_exists');
        m('skipping_check_for_incompatible_element' + c);
        return !1;
      }
      e = f.filter(function (a) {
        a = b('getElementPosition')(a);
        return a.width > 0 || a.height > 0;
      });
      g = e.length === 0;
      return g && !k(a);
    };
    var j = function (a) {
        var c;
        return b('containsNode')(a == null ? void 0 : (c = a.ownerDocument) == null ? void 0 : c.documentElement, a);
      },
      k = function (a) {
        return !!b('Parent').bySelector(a, l);
      },
      l = ['.hidden_elem', '._5ds2', '._i6m'].join(','),
      m = function (a) {
        return b('ODS').bumpEntityKey(2966, 'feed_ads', 'GHLTestElement.testElementI.' + a);
      };
    e.exports = { testElementI: a };
  },
  null
);
__d(
  'ghlTestUBT',
  ['cr:1543261', 'cr:334'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    b('cr:1543261') && b('cr:1543261')(), (g['default'] = b('cr:334'));
  },
  98
);
__d(
  'ghlInternalBumpODSKey',
  ['ODS'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a, b) {
      return d('ODS').bumpEntityKey(2966, 'feed_ads', a + '.' + b);
    }
    g['default'] = a;
  },
  98
);
__d(
  'idx',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a, d) {
      try {
        return d(a);
      } catch (a) {
        if (a instanceof TypeError)
          if (b(a)) return null;
          else if (c(a)) return void 0;
        throw a;
      }
    }
    var g;
    function b(a) {
      a = a.message;
      g || (g = i('null'));
      return g.test(a);
    }
    var h;
    function c(a) {
      a = a.message;
      h || (h = i('undefined'));
      return h.test(a);
    }
    function i(a) {
      return new RegExp('^' + a + ' | ' + a + '$|^[^\\(]* ' + a + ' ');
    }
    f['default'] = a;
  },
  66
);
__d(
  'FbtLogging',
  ['cr:1094907'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    a = b('cr:1094907') == null ? void 0 : b('cr:1094907').logImpression;
    g.logImpression = a;
  },
  98
);
__d(
  'IntlQtEventFalcoEvent',
  ['FalcoLoggerInternal', 'getFalcoLogPolicy_DO_NOT_USE'],
  function (a, b, c, d, e, f) {
    'use strict';
    a = b('getFalcoLogPolicy_DO_NOT_USE')('1848815');
    c = b('FalcoLoggerInternal').create('intl_qt_event', a);
    e.exports = c;
  },
  null
);
__d(
  'LogWebMemoryUsageFalcoEvent',
  ['FalcoLoggerInternal', 'getFalcoLogPolicy_DO_NOT_USE'],
  function (a, b, c, d, e, f) {
    'use strict';
    a = b('getFalcoLogPolicy_DO_NOT_USE')('1765264');
    c = b('FalcoLoggerInternal').create('log_web_memory_usage', a);
    e.exports = c;
  },
  null
);
__d(
  'MSiteMessengerDiodeTypedLogger',
  ['Banzai', 'GeneratedLoggerUtils'],
  function (a, b, c, d, e, f) {
    'use strict';
    a = (function () {
      function a() {
        this.$1 = {};
      }
      var c = a.prototype;
      c.log = function (a) {
        b('GeneratedLoggerUtils').log('logger:MSiteMessengerDiodeLoggerConfig', this.$1, b('Banzai').BASIC, a);
      };
      c.logVital = function (a) {
        b('GeneratedLoggerUtils').log('logger:MSiteMessengerDiodeLoggerConfig', this.$1, b('Banzai').VITAL, a);
      };
      c.logImmediately = function (a) {
        b('GeneratedLoggerUtils').log('logger:MSiteMessengerDiodeLoggerConfig', this.$1, { signal: !0 }, a);
      };
      c.clear = function () {
        this.$1 = {};
        return this;
      };
      c.getData = function () {
        return babelHelpers['extends']({}, this.$1);
      };
      c.updateData = function (a) {
        this.$1 = babelHelpers['extends']({}, this.$1, a);
        return this;
      };
      c.setBadgeCount = function (a) {
        this.$1.badge_count = a;
        return this;
      };
      c.setEvent = function (a) {
        this.$1.event = a;
        return this;
      };
      c.setExceptionObject = function (a) {
        this.$1.exception_object = a;
        return this;
      };
      c.setExtra = function (a) {
        this.$1.extra = a;
        return this;
      };
      c.setMessagingEntryPoint = function (a) {
        this.$1.messaging_entry_point = a;
        return this;
      };
      c.setMsiteDiodeStateFromClient = function (a) {
        this.$1.msite_diode_state_from_client = a;
        return this;
      };
      c.setUnreadCount = function (a) {
        this.$1.unread_count = a;
        return this;
      };
      return a;
    })();
    c = { badge_count: !0, event: !0, exception_object: !0, extra: !0, messaging_entry_point: !0, msite_diode_state_from_client: !0, unread_count: !0 };
    f['default'] = a;
  },
  66
);
__d(
  'MarauderLogger',
  ['Banzai', 'CacheStorage', 'MarauderConfig'],
  function (a, b, c, d, e, f) {
    var g = 'client_event',
      h = 'navigation',
      i = 18e4,
      j = 'marauder',
      k = 'marauder_last_event_time',
      l = 'marauder_last_session_id',
      m = {},
      n = [],
      o = !1,
      p = null,
      q = null,
      r = null,
      s = 0,
      t,
      u,
      v = !1,
      w = null;
    function a() {
      F().set(k, x());
    }
    b('Banzai').subscribe(b('Banzai').SHUTDOWN, a);
    function x() {
      t = t || F().get(k) || 0;
      return t;
    }
    function y() {
      v || ((u = F().get(l)), (v = !0));
      var a = Date.now();
      (!u || a - i > x()) && ((u = a.toString(16) + '-' + (~~(Math.random() * 16777215)).toString(16)), F().set(l, u));
      return u;
    }
    function z() {
      return {
        user_agent: window.navigator.userAgent,
        screen_height: window.screen.availHeight,
        screen_width: window.screen.availWidth,
        density: window.screen.devicePixelRatio || null,
        platform: window.navigator.platform || null,
        locale: window.navigator.language || null,
      };
    }
    function A() {
      return { locale: navigator.language };
    }
    function B(a, b, c, d, e, f, g) {
      var h = g != null && g != 0 ? g : Date.now();
      t = g != null && g != 0 ? Date.now() : h;
      g = b != null && b != '' ? b : p;
      return { name: a, time: h / 1e3, module: g, obj_type: d, obj_id: e, uuid: f, extra: c };
    }
    function C(a, b, c) {
      return B('content', null, { flags: b }, null, null, a, c);
    }
    function D(a) {
      var b = window.__mrdr;
      if (b)
        for (var c in b) {
          var d = b[c];
          if (d[3] !== 0) {
            delete b[c];
            if (c === '1')
              if (r !== null) c = r;
              else continue;
            a.push(C(c, 1, d[1]));
            a.push(C(c, 2, d[2]));
            a.push(C(c, 3, d[3]));
          }
        }
    }
    function E(a, c) {
      D(a);
      if (a.length === 0) return;
      o && a.push(B('counters', null, m));
      var d = b('Banzai').BASIC;
      c === 'vital' && (d = b('Banzai').VITAL);
      var e = b('MarauderConfig').gk_enabled;
      s === 0 && e && (a.push(B('device_status', null, A())), (d = { delay: 5e3 }));
      c === 'signal' && (d = { signal: !0 });
      e && Math.random() < 0.01 && a.push(B('device_info', null, z()));
      if (r !== null)
        for (var c = 0; c < a.length; c++) {
          e = a[c];
          (e.uuid === null || e.uuid === void 0) && (e.uuid = r);
        }
      e = { app_ver: b('MarauderConfig').app_version, data: a, device_id: void 0, log_type: g, seq: s++, session_id: y() };
      c = F().get('device_id');
      c && (e.device_id = c);
      m = {};
      o = !1;
      b('Banzai').post(j, e, d);
    }
    function F() {
      w || (w = new (b('CacheStorage'))('localstorage', ''));
      return w;
    }
    function c(a) {
      m[a] || (m[a] = 0), m[a]++, (o = !0);
    }
    function G(b, a, c, d, f, g, h, i) {
      E([B(b, a, c, d, f, g, h)], i);
    }
    function H(a, b) {
      p !== b && (n.push(B(h, p, { dest_module: b, source_url: q, destination_url: a })), (p = b), (q = a));
    }
    function d(a, b) {
      p !== b && ((r = null), H(a, b));
    }
    function f(a, b, c) {
      G(b ? 'show_module' : 'hide_module', a, c);
    }
    function I(a) {
      p = a;
    }
    function J() {
      return p;
    }
    function K(a) {
      r === null && ((r = a), a !== null && (E(n), (n = [])));
    }
    e.exports = { count: c, log: G, navigateTo: d, navigateWithinSession: H, toggleModule: f, setUUID: K, setNavigationModule: I, getNavigationModule: J };
  },
  null
);
__d(
  'TabbableElements',
  ['Style'],
  function (a, b, c, d, e, f, g) {
    function h(a) {
      if (a.tabIndex < 0) return !1;
      if (a.tabIndex > 0 || (a.tabIndex === 0 && a.getAttribute('tabIndex') !== null)) return !0;
      var b = a;
      switch (a.tagName) {
        case 'A':
          a = b;
          return !!a.href && a.rel != 'ignore';
        case 'INPUT':
          a = b;
          return a.type != 'hidden' && a.type != 'file' && !a.disabled;
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA':
          a = b;
          return !a.disabled;
      }
      return !1;
    }
    function i(a) {
      a = a;
      while (a && a !== document && c('Style').get(a, 'visibility') != 'hidden' && c('Style').get(a, 'display') != 'none') a = a.parentNode;
      return a === document;
    }
    function a(a) {
      return Array.from(a.getElementsByTagName('*')).filter(j);
    }
    function b(a) {
      return Array.from(a.getElementsByTagName('*')).find(j);
    }
    function d(a) {
      a = Array.from(a.getElementsByTagName('*'));
      for (var b = a.length - 1; b >= 0; b--) if (j(a[b])) return a[b];
      return null;
    }
    function j(a) {
      return h(a) && i(a);
    }
    function e(a) {
      return i(a);
    }
    g.find = a;
    g.findFirst = b;
    g.findLast = d;
    g.isTabbable = j;
    g.isVisible = e;
  },
  98
);
__d(
  'setImmediate',
  ['TimeSlice', 'TimerStorage', 'setImmediateAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b,
        d = function () {
          c('TimerStorage').unset(c('TimerStorage').IMMEDIATE, b);
          for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
          Function.prototype.apply.call(a, this, e);
        };
      c('TimeSlice').copyGuardForWrapper(a, d);
      for (var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1; g < e; g++) f[g - 1] = arguments[g];
      b = c('setImmediateAcrossTransitions').apply(void 0, [d].concat(f));
      c('TimerStorage').set(c('TimerStorage').IMMEDIATE, b);
      return b;
    }
    g['default'] = a;
  },
  98
);
__d(
  'performanceNavigationStart',
  ['performance'],
  function (a, b, c, d, e, f) {
    var g;
    if ((g || (g = b('performance'))).now)
      if ((g || (g = b('performance'))).timing && (g || (g = b('performance'))).timing.navigationStart)
        a = function () {
          return (g || (g = b('performance'))).timing.navigationStart;
        };
      else {
        if (typeof window._cstart === 'number')
          a = function () {
            return window._cstart;
          };
        else {
          var h = Date.now();
          a = function () {
            return h;
          };
        }
        a.isPolyfilled = !0;
      }
    else
      (a = function () {
        return 0;
      }),
        (a.isPolyfilled = !0);
    e.exports = a;
  },
  null
);
__d(
  'UFIReactionsUtils',
  [],
  function (a, b, c, d, e, f) {
    function a(a, b, c, d) {
      b = parseInt(b, 10);
      var e = !!b,
        f = a.reactorids ? a.reactorids.slice(0) : [],
        g = f.indexOf(c),
        h = 0;
      e ? g < 0 && (c && f.unshift(c), (h = 1)) : g > -1 && (f.splice(g, 1), (h = -1));
      g = Math.max(a.reactioncount + h, 0);
      h = a.reactioncountreduced;
      h && !isNaN(h) && (d ? (h = d(g)) : (h = g.toString()));
      d = a.reactioncountmap || {};
      var i,
        j = a.viewerreaction;
      j && d[j] && ((d[j]['default'] = Math.max((d[j]['default'] || 0) - 1, 0)), (i = d[j].reduced), i && !isNaN(i) && (d[j].reduced = d[j]['default'].toString()));
      e && d[b] && ((d[b]['default'] = (d[b]['default'] || 0) + 1), (i = d[b].reduced), i && !isNaN(i) && (d[b].reduced = d[b]['default'].toString()));
      i = a.userreactions;
      (!i || Array.isArray(i)) && (i = {});
      c && (e ? (i[c] = b) : delete i[c]);
      e = null;
      if (a.reactionsentences) {
        c = !(j && b);
        e = { current: a.reactionsentences[c ? 'alternate' : 'current'], alternate: a.reactionsentences[c ? 'current' : 'alternate'] };
      }
      return { reactioncount: g, reactioncountmap: d, reactioncountreduced: h, reactionsentences: e, reactorids: f, userreactions: i, viewerreaction: b };
    }
    function b(a) {
      var b = {};
      if (!a) return b;
      for (var c = 0; c < a.length; c++) {
        var d = a[c],
          e = d.feedback_reaction.key;
        b[e] = { default: d.reactors && d.reactors.count, reduced: d.reactors && d.reactors.display_count };
      }
      return b;
    }
    f.getReactionData = a;
    f.getReactionCountMapFromSummary = b;
  },
  66
);
__d(
  'createIxElement',
  ['invariant', 'DOM', 'coerceImageishSprited', 'coerceImageishURL', 'joinClasses'],
  function (a, b, c, d, e, f, g, h) {
    function a(a, b) {
      var d = 'img',
        e = c('coerceImageishSprited')(a);
      a = c('coerceImageishURL')(a);
      if (e) {
        e = c('DOM').create('i', { className: c('joinClasses')(d, e.type === 'css' ? e.className : void 0), style: e.type === 'cssless' ? e.style : void 0 });
        b != null && c('DOM').setContent(e, c('DOM').create('u', null, b));
        return e;
      }
      a || h(0, 2521);
      e = c('DOM').create('img', { className: d, src: a.uri });
      b != null && e.setAttribute('alt', b);
      e.setAttribute('width', String(a.width));
      e.setAttribute('height', String(a.height));
      return e;
    }
    g['default'] = a;
  },
  98
);
__d(
  'throttle',
  ['TimeSlice', 'TimeSliceInteractionSV', 'setTimeout', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    function a(a, b, d) {
      return h(a, b, d, c('setTimeout'), !1);
    }
    Object.assign(a, {
      acrossTransitions: function (a, b, d) {
        return h(a, b, d, c('setTimeoutAcrossTransitions'), !1);
      },
      withBlocking: function (a, b, d) {
        return h(a, b, d, c('setTimeout'), !0);
      },
      acrossTransitionsWithBlocking: function (a, b, d) {
        return h(a, b, d, c('setTimeoutAcrossTransitions'), !0);
      },
    });
    function h(a, b, d, e, f) {
      var g = b == null ? 100 : b,
        h,
        i = null,
        j = 0,
        k = null,
        l = [],
        m = c('TimeSlice').guard(
          function () {
            j = Date.now();
            if (i) {
              var b = function (b) {
                  a.apply(h, b);
                }.bind(null, i),
                c = l.length;
              while (--c >= 0) b = l[c].bind(null, b);
              l = [];
              b();
              i = null;
              k = e(m, g);
            } else k = null;
          },
          'throttle_' + g + '_ms',
          { propagationType: c('TimeSlice').PropagationType.EXECUTION, registerCallStack: !0 }
        );
      m.__SMmeta = a.__SMmeta;
      return function () {
        c('TimeSliceInteractionSV').ref_counting_fix && l.push(c('TimeSlice').getGuardedContinuation('throttleWithContinuation'));
        for (var a = arguments.length, b = new Array(a), n = 0; n < a; n++) b[n] = arguments[n];
        i = b;
        h = this;
        d !== void 0 && (h = d);
        (k === null || Date.now() - j > g) && (f === !0 ? m() : (k = e(m, 0)));
      };
    }
    b = a;
    g['default'] = b;
  },
  98
);
if (self.CavalryLogger) {
  CavalryLogger.start_js_script(document.currentScript);
}

('use strict');
(function () {
  var a = (typeof globalThis !== 'undefined' && globalThis) || (typeof self !== 'undefined' && self) || (typeof global !== 'undefined' && global);
  if (typeof a.AbortController !== 'undefined') return;
  var b = (function () {
      function a() {
        this.__listeners = new Map();
      }
      a.prototype = Object.create(Object.prototype);
      a.prototype.addEventListener = function (a, b, c) {
        if (arguments.length < 2) throw new TypeError("TypeError: Failed to execute 'addEventListener' on 'CustomEventTarget': 2 arguments required, but only " + arguments.length + ' present.');
        var d = this.__listeners,
          e = a.toString();
        d.has(e) || d.set(e, new Map());
        var f = d.get(e);
        f.has(b) || f.set(b, c);
      };
      a.prototype.removeEventListener = function (a, b, c) {
        if (arguments.length < 2) throw new TypeError("TypeError: Failed to execute 'addEventListener' on 'CustomEventTarget': 2 arguments required, but only " + arguments.length + ' present.');
        var d = this.__listeners,
          e = a.toString();
        if (d.has(e)) {
          var f = d.get(e);
          f.has(b) && f['delete'](b);
        }
      };
      a.prototype.dispatchEvent = function (a) {
        if (!(a instanceof Event)) throw new TypeError("Failed to execute 'dispatchEvent' on 'CustomEventTarget': parameter 1 is not of type 'Event'.");
        var b = a.type,
          c = this.__listeners;
        c = c.get(b);
        if (c)
          for (var b = c.entries(), d = Array.isArray(b), e = 0, b = d ? b : b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
            var f;
            if (d) {
              if (e >= b.length) break;
              f = b[e++];
            } else {
              e = b.next();
              if (e.done) break;
              f = e.value;
            }
            f = f;
            var g = f[0];
            f = f[1];
            try {
              typeof g === 'function' ? g.call(this, a) : g && typeof g.handleEvent === 'function' && g.handleEvent(a);
            } catch (a) {
              setTimeout(function () {
                throw a;
              });
            }
            f && f.once && c['delete'](g);
          }
        return !0;
      };
      return a;
    })(),
    c = {};
  a.AbortSignal = (function () {
    function a(a) {
      if (a !== c) throw new TypeError('Illegal constructor.');
      b.call(this);
      this._aborted = !1;
    }
    a.prototype = Object.create(b.prototype);
    a.prototype.constructor = a;
    Object.defineProperty(a.prototype, 'onabort', {
      get: function () {
        return this._onabort;
      },
      set: function (a) {
        var b = this._onabort;
        b && this.removeEventListener('abort', b);
        this._onabort = a;
        this.addEventListener('abort', a);
      },
    });
    Object.defineProperty(a.prototype, 'aborted', {
      get: function () {
        return this._aborted;
      },
    });
    return a;
  })();
  a.AbortController = (function () {
    function a() {
      this._signal = new AbortSignal(c);
    }
    a.prototype = Object.create(Object.prototype);
    Object.defineProperty(a.prototype, 'signal', {
      get: function () {
        return this._signal;
      },
    });
    a.prototype.abort = function () {
      var a = this.signal;
      a.aborted || ((a._aborted = !0), a.dispatchEvent(new Event('abort')));
    };
    return a;
  })();
})();

('use strict');
(function () {
  if (!Array.prototype.flat) {
    var a = function b(a) {
      return a < 1
        ? Array.prototype.slice.call(this)
        : Array.prototype.reduce.call(
            this,
            function (c, d) {
              Array.isArray(d) ? c.push.apply(c, b.call(d, a - 1)) : c.push(d);
              return c;
            },
            []
          );
    };
    Array.prototype.flat = function () {
      return a.call(this, isNaN(arguments[0]) ? 1 : Number(arguments[0]));
    };
  }
  if (!Array.prototype.flatMap) {
    var b = function (a, b) {
      var c = [];
      if (typeof b !== 'function') throw new TypeError('Callback function must be callable.');
      for (var d = 0; d < a.length; d++) {
        var e = b.call(a, a[d], d, a);
        Array.isArray(e) ? c.push.apply(c, e) : c.push(e);
      }
      return c;
    };
    Array.prototype.flatMap = function (a) {
      var c = arguments[1] || this;
      return b(c, a);
    };
  }
})();

(function () {
  'use strict';
  var a = Array.prototype.indexOf;
  Array.prototype.includes ||
    (Array.prototype.includes = function (d) {
      'use strict';
      if (d !== void 0 && Array.isArray(this) && !Number.isNaN(d)) return a.apply(this, arguments) !== -1;
      var e = Object(this),
        f = e.length ? b(e.length) : 0;
      if (f === 0) return !1;
      var g = arguments.length > 1 ? c(arguments[1]) : 0,
        h = g < 0 ? Math.max(f + g, 0) : g,
        i = Number.isNaN(d);
      while (h < f) {
        var j = e[h];
        if (j === d || (i && Number.isNaN(j))) return !0;
        h++;
      }
      return !1;
    });
  function b(a) {
    return Math.min(Math.max(c(a), 0), Number.MAX_SAFE_INTEGER);
  }
  function c(a) {
    a = Number(a);
    return Number.isFinite(a) && a !== 0 ? d(a) * Math.floor(Math.abs(a)) : a;
  }
  function d(a) {
    return a >= 0 ? 1 : -1;
  }
  if (!Array.prototype.values) {
    var e = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator',
      f = (function () {
        function a(a) {
          this.$1 = void 0;
          this.$2 = 0;
          if (a == null) throw new TypeError('Cannot convert undefined or null to object');
          this.$1 = Object(a);
        }
        var b = a.prototype;
        b.next = function () {
          if (this.$1 == null || this.$2 >= this.$1.length) {
            this.$1 = void 0;
            return { value: void 0, done: !0 };
          }
          var a = this.$1[this.$2];
          this.$2++;
          return { value: a, done: !1 };
        };
        b[e] = function () {
          return this;
        };
        return a;
      })();
    Array.prototype.values = function () {
      return new f(this);
    };
  }
  Array.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] || (Array.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = Array.prototype.values);
})();
(function () {
  var a = {},
    b = function (a, b) {
      if (!a && !b) return null;
      var c = {};
      typeof a !== 'undefined' && (c.type = a);
      typeof b !== 'undefined' && (c.signature = b);
      return c;
    },
    c = function (a, c) {
      return b(
        a && /^[A-Z]/.test(a) ? a : void 0,
        c && ((c.params && c.params.length) || c.returns)
          ? 'function(' +
              (c.params
                ? c.params
                    .map(function (a) {
                      return /\?/.test(a) ? '?' + a.replace('?', '') : a;
                    })
                    .join(',')
                : '') +
              ')' +
              (c.returns ? ':' + c.returns : '')
          : void 0
      );
    },
    d = function (a, b, c) {
      return a;
    },
    e = function (a, b, d) {
      'sourcemeta' in __transform_includes && (a.__SMmeta = b);
      if ('typechecks' in __transform_includes) {
        b = c(b ? b.name : void 0, d);
        b && __w(a, b);
      }
      return a;
    },
    f = function (a, b, c) {
      return c.apply(a, b);
    },
    g = function (a, b, c, d) {
      d && d.params && __t.apply(a, d.params);
      c = c.apply(a, b);
      d && d.returns && __t([c, d.returns]);
      return c;
    };
  g = function (b, c, d, e, f) {
    if (f) {
      f.callId || (f.callId = f.module + ':' + (f.line || 0) + ':' + (f.column || 0));
      e = f.callId;
      a[e] = (a[e] || 0) + 1;
    }
    return d.apply(b, c);
  };
  typeof __transform_includes === 'undefined'
    ? ((__annotator = d), (__bodyWrapper = f))
    : ((__annotator = e),
      'codeusage' in __transform_includes
        ? ((__annotator = d),
          (__bodyWrapper = g),
          (__bodyWrapper.getCodeUsage = function () {
            return a;
          }),
          (__bodyWrapper.clearCodeUsage = function () {
            a = {};
          }))
        : 'typechecks' in __transform_includes
        ? (__bodyWrapper = f)
        : (__bodyWrapper = f));
})();
(__t = function (a) {
  return a[0];
}),
  (__w = function (a) {
    return a;
  });
(self.__DEV__ = self.__DEV__ || 0), (self.emptyFunction = function () {});

(function (a, b) {
  var c = 'keys',
    d = 'values',
    e = 'entries',
    f = (function () {
      var a = h(Array),
        b;
      a ||
        (b = (function () {
          'use strict';
          function a(a, b) {
            (this.$1 = a), (this.$2 = b), (this.$3 = 0);
          }
          var b = a.prototype;
          b.next = function () {
            if (this.$1 == null) return { value: void 0, done: !0 };
            var a = this.$1,
              b = this.$1.length,
              f = this.$3,
              g = this.$2;
            if (f >= b) {
              this.$1 = void 0;
              return { value: void 0, done: !0 };
            }
            this.$3 = f + 1;
            if (g === c) return { value: f, done: !1 };
            else if (g === d) return { value: a[f], done: !1 };
            else if (g === e) return { value: [f, a[f]], done: !1 };
          };
          b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
            return this;
          };
          return a;
        })());
      return {
        keys: a
          ? function (a) {
              return a.keys();
            }
          : function (a) {
              return new b(a, c);
            },
        values: a
          ? function (a) {
              return a.values();
            }
          : function (a) {
              return new b(a, d);
            },
        entries: a
          ? function (a) {
              return a.entries();
            }
          : function (a) {
              return new b(a, e);
            },
      };
    })(),
    g = (function () {
      var a = h(String),
        b;
      a ||
        (b = (function () {
          'use strict';
          function a(a) {
            (this.$1 = a), (this.$2 = 0);
          }
          var b = a.prototype;
          b.next = function () {
            if (this.$1 == null) return { value: void 0, done: !0 };
            var a = this.$2,
              b = this.$1,
              c = b.length;
            if (a >= c) {
              this.$1 = void 0;
              return { value: void 0, done: !0 };
            }
            var d = b.charCodeAt(a);
            if (d < 55296 || d > 56319 || a + 1 === c) d = b[a];
            else {
              c = b.charCodeAt(a + 1);
              c < 56320 || c > 57343 ? (d = b[a]) : (d = b[a] + b[a + 1]);
            }
            this.$2 = a + d.length;
            return { value: d, done: !1 };
          };
          b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
            return this;
          };
          return a;
        })());
      return {
        keys: function () {
          throw TypeError("Strings default iterator doesn't implement keys.");
        },
        values: a
          ? function (a) {
              return a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
            }
          : function (a) {
              return new b(a);
            },
        entries: function () {
          throw TypeError("Strings default iterator doesn't implement entries.");
        },
      };
    })();
  function h(a) {
    return typeof a.prototype[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] === 'function' && typeof a.prototype.values === 'function' && typeof a.prototype.keys === 'function' && typeof a.prototype.entries === 'function';
  }
  var i = (function () {
      'use strict';
      function a(a, b) {
        (this.$1 = a), (this.$2 = b), (this.$3 = Object.keys(a)), (this.$4 = 0);
      }
      var b = a.prototype;
      b.next = function () {
        var a = this.$3.length,
          b = this.$4,
          f = this.$2,
          g = this.$3[b];
        if (b >= a) {
          this.$1 = void 0;
          return { value: void 0, done: !0 };
        }
        this.$4 = b + 1;
        if (f === c) return { value: g, done: !1 };
        else if (f === d) return { value: this.$1[g], done: !1 };
        else if (f === e) return { value: [g, this.$1[g]], done: !1 };
      };
      b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
        return this;
      };
      return a;
    })(),
    j = {
      keys: function (a) {
        return new i(a, c);
      },
      values: function (a) {
        return new i(a, d);
      },
      entries: function (a) {
        return new i(a, e);
      },
    };
  function k(a, b) {
    if (typeof a === 'string') return g[b || d](a);
    else if (Array.isArray(a)) return f[b || d](a);
    else if (a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']) return a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
    else return j[b || e](a);
  }
  Object.assign(k, {
    KIND_KEYS: c,
    KIND_VALUES: d,
    KIND_ENTRIES: e,
    keys: function (a) {
      return k(a, c);
    },
    values: function (a) {
      return k(a, d);
    },
    entries: function (a) {
      return k(a, e);
    },
    generic: j.entries,
  });
  a.FB_enumerate = k;
})(typeof global === 'undefined' ? this : global);

('use strict');
(function () {
  if (typeof Element === 'undefined' || Element.prototype.scroll) return;
  function a(a, b) {
    b === void 0 && (b = !1);
    if (a.length === 0) return;
    var c = a[0],
      d = a[1];
    c = Number(c) || 0;
    d = Number(d) || 0;
    if (a.length === 1) {
      a = a[0];
      if (a == null) return;
      c = a.left;
      d = a.top;
      c !== void 0 && (c = Number(c) || 0);
      d !== void 0 && (d = Number(d) || 0);
    }
    c !== void 0 && (this.scrollLeft = (b ? this.scrollLeft : 0) + c);
    d !== void 0 && (this.scrollTop = (b ? this.scrollTop : 0) + d);
  }
  Element.prototype.scroll = Element.prototype.scrollTo = function () {
    a.call(this, arguments);
  };
  Element.prototype.scrollBy = function () {
    a.call(this, arguments, !0);
  };
})();

typeof window !== 'undefined' &&
  window.JSON &&
  JSON.stringify(['\u2028\u2029']) === '["\u2028\u2029"]' &&
  (JSON.stringify = (function (a) {
    var b = /\u2028/g,
      c = /\u2029/g;
    return function (d, e, f) {
      d = a.call(this, d, e, f);
      d && (-1 < d.indexOf('\u2028') && (d = d.replace(b, '\\u2028')), -1 < d.indexOf('\u2029') && (d = d.replace(c, '\\u2029')));
      return d;
    };
  })(JSON.stringify));

(function () {
  var a = Object.prototype.hasOwnProperty;
  Object.entries = function (b) {
    if (b == null) throw new TypeError('Object.entries called on non-object');
    var c = [];
    for (var d in b) a.call(b, d) && c.push([d, b[d]]);
    return c;
  };
  typeof Object.fromEntries !== 'function' &&
    (Object.fromEntries = function (a) {
      var b = {};
      for (var a = a, c = Array.isArray(a), d = 0, a = c ? a : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
        var e;
        if (c) {
          if (d >= a.length) break;
          e = a[d++];
        } else {
          d = a.next();
          if (d.done) break;
          e = d.value;
        }
        e = e;
        var f = e[0];
        e = e[1];
        b[f] = e;
      }
      return b;
    });
  Object.values = function (b) {
    if (b == null) throw new TypeError('Object.values called on non-object');
    var c = [];
    for (var d in b) a.call(b, d) && c.push(b[d]);
    return c;
  };
})();

(function (a) {
  a.__m = function (a, b) {
    a.__SMmeta = b;
    return a;
  };
})(this);

String.prototype.contains || (String.prototype.contains = String.prototype.includes);
String.prototype.padStart ||
  (String.prototype.padStart = function (a, b) {
    a = a >> 0;
    b = String(b || ' ');
    if (this.length > a) return String(this);
    else {
      a = a - this.length;
      a > b.length && (b += b.repeat(a / b.length));
      return b.slice(0, a) + String(this);
    }
  }),
  String.prototype.padEnd ||
    (String.prototype.padEnd = function (a, b) {
      a = a >> 0;
      b = String(b || ' ');
      if (this.length > a) return String(this);
      else {
        a = a - this.length;
        a > b.length && (b += b.repeat(a / b.length));
        return String(this) + b.slice(0, a);
      }
    });
String.prototype.trimLeft ||
  (String.prototype.trimLeft = function () {
    return this.replace(/^\s+/, '');
  }),
  String.prototype.trimRight ||
    (String.prototype.trimRight = function () {
      return this.replace(/\s+$/, '');
    });

('use strict');
(function (a) {
  function b() {
    if (typeof URL !== 'function') return !1;
    if (typeof URL.createObjectURL !== 'function' || typeof URL.revokeObjectURL !== 'function') return !1;
    return typeof File !== 'function' || typeof Blob !== 'function' ? !1 : !0;
  }
  a = (a && a.Env) || {};
  if (!a.gk_instrument_object_url) return;
  if (!b()) return;
  var c = {},
    d = URL.createObjectURL,
    e = URL.revokeObjectURL;
  URL.createObjectURL = function (a) {
    var b = null,
      e = 0;
    a instanceof File ? ((b = 'File'), (e = a.size)) : a instanceof Blob ? ((b = 'Blob'), (e = a.size)) : typeof MediaSource === 'function' && a instanceof MediaSource && ((b = 'MediaSource'), (e = 0));
    a = d.call(URL, a);
    b !== null && (c[a] = { type: b, size: e });
    return a;
  };
  URL.revokeObjectURL = function (a) {
    e.call(URL, a), delete c[a];
  };
  URL._fbRegisteredObjectURL = function () {
    return Object.values(c);
  };
})(this);
(function (a) {
  var b = (a.babelHelpers = {}),
    c = Object.prototype.hasOwnProperty;
  typeof Symbol !== 'undefined' && !(typeof Symbol === 'function' ? Symbol.asyncIterator : '@@asyncIterator') && (Symbol.asyncIterator = Symbol('Symbol.asyncIterator'));
  function d(a) {
    this.wrapped = a;
  }
  function e(a) {
    var b, c;
    function e(a, d) {
      return new Promise(function (e, g) {
        e = { key: a, arg: d, resolve: e, reject: g, next: null };
        c ? (c = c.next = e) : ((b = c = e), f(a, d));
      });
    }
    function f(b, c) {
      try {
        var e = a[b](c);
        c = e.value;
        var h = c instanceof d;
        Promise.resolve(h ? c.wrapped : c).then(
          function (a) {
            if (h) {
              f(b === 'return' ? 'return' : 'next', a);
              return;
            }
            g(e.done ? 'return' : 'normal', a);
          },
          function (a) {
            f('throw', a);
          }
        );
      } catch (a) {
        g('throw', a);
      }
    }
    function g(a, d) {
      switch (a) {
        case 'return':
          b.resolve({ value: d, done: !0 });
          break;
        case 'throw':
          b.reject(d);
          break;
        default:
          b.resolve({ value: d, done: !1 });
          break;
      }
      b = b.next;
      b ? f(b.key, b.arg) : (c = null);
    }
    this._invoke = e;
    typeof a['return'] !== 'function' && (this['return'] = void 0);
  }
  typeof Symbol === 'function' &&
    (typeof Symbol === 'function' ? Symbol.asyncIterator : '@@asyncIterator') &&
    (e.prototype[typeof Symbol === 'function' ? Symbol.asyncIterator : '@@asyncIterator'] = function () {
      return this;
    });
  e.prototype.next = function (a) {
    return this._invoke('next', a);
  };
  e.prototype['throw'] = function (a) {
    return this._invoke('throw', a);
  };
  e.prototype['return'] = function (a) {
    return this._invoke('return', a);
  };
  b.inheritsLoose = function (a, b) {
    Object.assign(a, b);
    a.prototype = Object.create(b && b.prototype);
    a.prototype.constructor = a;
    a.__superConstructor__ = b;
    return b;
  };
  b.wrapNativeSuper = function (a) {
    var c = typeof Map === 'function' ? new Map() : void 0;
    b.wrapNativeSuper = function (a) {
      if (a === null) return null;
      if (typeof a !== 'function') throw new TypeError('Super expression must either be null or a function');
      if (c !== void 0) {
        if (c.has(a)) return c.get(a);
        c.set(a, d);
      }
      b.inheritsLoose(d, a);
      function d() {
        a.apply(this, arguments);
      }
      return d;
    };
    return b.wrapNativeSuper(a);
  };
  b.assertThisInitialized = function (a) {
    if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return a;
  };
  b._extends = Object.assign;
  b['extends'] = b._extends;
  b.construct = function (a, b) {
    return new (Function.prototype.bind.apply(a, [null].concat(b)))();
  };
  b.objectWithoutPropertiesLoose = function (a, b) {
    var d = {};
    for (var e in a) {
      if (!c.call(a, e) || b.indexOf(e) >= 0) continue;
      d[e] = a[e];
    }
    return d;
  };
  b.taggedTemplateLiteralLoose = function (a, b) {
    b || (b = a.slice(0));
    a.raw = b;
    return a;
  };
  b.bind = Function.prototype.bind;
  b.wrapAsyncGenerator = function (a) {
    return function () {
      return new e(a.apply(this, arguments));
    };
  };
  b.awaitAsyncGenerator = function (a) {
    return new d(a);
  };
  b.asyncIterator = function (a) {
    var b;
    if (typeof Symbol !== 'undefined') {
      if (typeof Symbol === 'function' ? Symbol.asyncIterator : '@@asyncIterator') {
        b = a[Symbol.asyncIterator];
        if (b != null) return b.call(a);
      }
      if (typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') {
        b = a[Symbol.iterator];
        if (b != null) return b.call(a);
      }
    }
    throw new TypeError('Object is not async iterable');
  };
  b.asyncGeneratorDelegate = function (a, b) {
    var c = {},
      d = !1;
    function e(c, e) {
      d = !0;
      e = new Promise(function (b) {
        b(a[c](e));
      });
      return { done: !1, value: b(e) };
    }
    typeof Symbol === 'function' &&
      (typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') &&
      (c[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] = function () {
        return this;
      });
    c.next = function (a) {
      if (d) {
        d = !1;
        return a;
      }
      return e('next', a);
    };
    typeof a['throw'] === 'function' &&
      (c['throw'] = function (a) {
        if (d) {
          d = !1;
          throw a;
        }
        return e('throw', a);
      });
    typeof a['return'] === 'function' &&
      (c['return'] = function (a) {
        if (d) {
          d = !1;
          return a;
        }
        return e('return', a);
      });
    return c;
  };
})(typeof global === 'undefined' ? self : global);

(function (a) {
  if (a.require != null) return;
  var b = null,
    c = null,
    d = [],
    e = {},
    f = {},
    g = 0,
    h = 0,
    i = 0,
    j = 0,
    k = 0,
    l = 1,
    m = 2,
    n = 4,
    o = 8,
    p = 16,
    aa = 32,
    ba = 64,
    ca = {},
    q = {},
    r = Object.prototype.hasOwnProperty,
    s = Object.prototype.toString;
  function t(a) {
    a = Array.prototype.slice.call(a);
    var b = {},
      c,
      d,
      f,
      g;
    while (a.length) {
      d = a.shift();
      if (b[d]) continue;
      b[d] = !0;
      f = e[d];
      if (!f || T(f)) continue;
      if (f.dependencies) for (c = 0; c < f.dependencies.length; c++) (g = f.dependencies[c]), T(g) || a.push(g.id);
    }
    for (d in b) r.call(b, d) && a.push(d);
    b = [];
    for (c = 0; c < a.length; c++) {
      d = a[c];
      var h = d;
      f = e[d];
      d = f ? f.dependencies : null;
      if (!f || !d) h += ' is not defined';
      else if (T(f)) h += ' is ready';
      else {
        f = [];
        for (var i = 0; i < d.length; i++) (g = d[i]), T(g) || f.push(g.id);
        h += ' is waiting for ' + f.join(', ');
      }
      b.push(h);
    }
    return b.join('\n');
  }
  function u(b) {
    var a = new Error(b);
    a.name = 'ModuleError';
    a.messageFormat = b;
    for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
    a.messageParams = d.map(function (a) {
      return String(a);
    });
    a.taalOpcodes = [2, 2];
    return a;
  }
  $ = a.Env || {};
  var v = !!$.gk_nonjs_deps_in_require,
    w = !!$.gk_requirelazy_mem,
    x = !!$.gk_require_when_ready_in_order,
    y = !!$.profile_require_factories,
    z = a.performance || {},
    A;
  if (z.now && z.timing && z.timing.navigationStart) {
    var B = z.timing.navigationStart;
    A = function () {
      return z.now() + B;
    };
  } else
    A = function () {
      return Date.now();
    };
  var C = 0;
  function D(a) {
    C++;
    var b = e[a];
    (!b || b.exports == null) && (I(a), (b = e[a]));
    b && b.refcount-- === 1 && (e[a] = null);
    return b;
  }
  function E(a) {
    return a.defaultExport !== q ? a.defaultExport : a.exports;
  }
  function F(a) {
    a = D(a);
    if (a) return E(a);
  }
  function G(a) {
    a = D(a);
    if (a) return a.defaultExport !== q ? a.defaultExport : null;
  }
  function H(a) {
    a = D(a);
    if (a) return a.exports;
  }
  function da(a) {
    a.factoryLength === -1 && (a.factoryLength = a.factory.length);
    return a.factoryLength;
  }
  function I(d) {
    var g = a.ErrorGuard;
    if (g && !g.inGuard()) return g.applyWithGuard(I, null, [d]);
    g = e[d];
    if (!g) {
      var h = 'Requiring unknown module "%s"';
      throw u(h, d);
    }
    var i, j;
    if (g.hasError)
      if (g.error == null) throw u('Requiring module "%s" which threw an exception', d);
      else {
        h = J(g.error);
        K(h, { messageFormat: 'Requiring module "%s" which threw an exception', messageParams: [d] });
        throw h;
      }
    if (!T(g)) throw u('Requiring module "%s" with unresolved dependencies: %s', d, t([d]));
    M(g);
    h = g.exports = {};
    var k = g.factory,
      l = g.dependencies;
    if (s.call(k) === '[object Function]' && l != null) {
      var n = l.length,
        p;
      try {
        try {
          na(g);
        } catch (a) {
          L(a, d);
        }
        var q = [],
          v = n;
        if (g.special & o) {
          var w = g.special & aa ? c : b;
          q = w.slice(0);
          q[w.length - 2] = g;
          q[w.length - 1] = h;
          v += q.length;
        }
        if (g.special & m) {
          w = da(g);
          v = Math.min(n + q.length, w);
        }
        for (var h = 0; h < n; h++) {
          w = l[h];
          q.length < v && q.push(F.call(null, w.id));
        }
        var x;
        y && (x = A());
        f[g.id].factoryRun = !0;
        try {
          w = g.context != null ? g.context : a;
          v = k.apply(w, q);
        } catch (a) {
          L(a, d);
        } finally {
          if (y) {
            l = A();
            n = f[g.id];
            n.factoryTime = l - (x || 0);
            n.factoryEnd = l;
            n.factoryStart = x;
            if (k.__SMmeta) for (var z in k.__SMmeta) Object.prototype.hasOwnProperty.call(k.__SMmeta, z) && (n[z] = k.__SMmeta[z]);
          }
        }
      } catch (a) {
        g.hasError = !0;
        g.error = a;
        g.exports = null;
        throw a;
      } finally {
      }
      v && (g.exports = v);
      var B;
      g.special & ba ? g.exports != null && r.call(g.exports, 'default') && (g.defaultExport = B = g.exports['default']) : (g.defaultExport = B = g.exports);
      if (typeof B === 'function') {
        h = B.__superConstructor__;
        (!B.displayName || (h && h.displayName === B.displayName)) && (B.displayName = (B.name || '(anonymous)') + ' [from ' + d + ']');
      }
      g.factoryFinished = !0;
    } else g.exports = k;
    w = '__isRequired__' + d;
    q = e[w];
    q && !T(q) && N(w, ca);
  }
  function J(b) {
    if (a.getErrorSafe != null) return a.getErrorSafe(b);
    return b != null && typeof b === 'object' && typeof b.message === 'string' ? b : u('Non-error thrown: %s', String(b));
  }
  function K(b, c) {
    var d = a.ErrorSerializer;
    d && d.aggregateError(b, c);
  }
  function L(a, b) {
    a = J(a);
    K(a, { messageFormat: 'Module "%s"', messageParams: [b], forcedKey: b.startsWith('__') ? null : b });
    throw a;
  }
  function ea() {
    return C;
  }
  function fa() {
    var a = {};
    for (var b in f) Object.prototype.hasOwnProperty.call(f, b) && (a[b] = f[b]);
    return a;
  }
  function M(a) {
    if (a.nonJSDeps) return;
    a.nonJSDeps = !0;
    a.dependencies && a.dependencies.forEach(M);
  }
  function N(b, c, e, g, h, i, l) {
    c === void 0 ? ((c = []), (e = b), (b = S())) : e === void 0 && ((e = c), s.call(b) === '[object Array]' ? ((c = b), (b = S(c.join(',')))) : (c = []));
    var m = { cancel: Q.bind(this, b) },
      n = O(b);
    if (!c && !e && i) {
      n.refcount += i;
      return m;
    }
    f[b] = { id: b, dependencies: c, meta: l, category: g, defined: y ? A() : null, factoryTime: null, factoryStart: null, factoryEnd: null, factoryRun: !1 };
    if (n.dependencies && n.reload !== !0) {
      b.indexOf(':') != -1 ? k++ : j++;
      return m;
    }
    i && (n.refcount += i);
    l = c.map(O);
    n.factory = e;
    n.dependencies = l;
    n.context = h;
    n.special = g;
    (n.nonJSDeps || ma(n)) && ((n.nonJSDeps = !1), M(n));
    U(n);
    if (d.length > 0) {
      var o = d;
      d = [];
      b = a.ScheduleJSWork ? a.ScheduleJSWork : pa;
      b(function () {
        if (x) {
          for (var a = 0; a < o.length; a++) F.call(null, o[a].id);
          o.length = 0;
        } else while (o.length > 0) F.call(null, o.pop().id);
      })();
    }
    return m;
  }
  function O(a) {
    var b = e[a];
    if (b) return b;
    b = new P(a, 0);
    e[a] = b;
    return b;
  }
  function P(a, b, c) {
    (this.id = a),
      (this.refcount = b),
      (this.exports = c || null),
      (this.defaultExport = c || q),
      (this.factory = void 0),
      (this.factoryLength = -1),
      (this.factoryFinished = !1),
      (this.dependencies = void 0),
      (this.depPosition = 0),
      (this.context = void 0),
      (this.special = 0),
      (this.hasError = !1),
      (this.error = null),
      (this.ranRecursiveSideEffects = !1),
      (this.sideEffectDependencyException = null),
      (this.nextDepWaitingHead = null),
      (this.nextDepWaitingNext = null),
      (this.tarjanGeneration = -1),
      (this.tarjanLow = 0),
      (this.tarjanIndex = 0),
      (this.tarjanOnStack = !1),
      (this.nonJSDeps = !1);
  }
  function Q(a) {
    if (!e[a]) return;
    var b = e[a];
    e[a] = null;
    if (b.dependencies)
      for (var a = 0; a < b.dependencies.length; a++) {
        var c = b.dependencies[a];
        c.refcount-- === 1 && Q(c.id);
      }
  }
  function R(a, b, c) {
    var d = w ? '__requireLazy__x__' + g++ : '__requireLazy__' + (a.length > 0 ? a.join(',') + '__' : '') + g++;
    return N('__requireLazy__' + d, a, Z()(b, 'requireLazy', { propagationType: 0 }), l | p, c, 1);
  }
  function S(a) {
    return '__mod__' + (a != null ? a + '__' : '') + g++;
  }
  function ga(a, b, c) {
    c.tarjanGeneration != h && ((c.tarjanGeneration = h), (c.tarjanLow = c.tarjanIndex = i++), (c.tarjanOnStack = !0), b.push(c));
    if (c.dependencies != null)
      for (var d = c.depPosition; d < c.dependencies.length; d++) {
        var e = c.dependencies[d];
        e.tarjanGeneration != h ? (ga(a, b, e), (c.tarjanLow = Math.min(c.tarjanLow, e.tarjanLow))) : e.tarjanOnStack && (c.tarjanLow = Math.min(c.tarjanLow, e.tarjanIndex));
      }
    if (c.tarjanLow == c.tarjanIndex) {
      e = [];
      do {
        d = b.pop();
        d.tarjanOnStack = !1;
        e.push(d);
        if (c == b[0] && d != c && d.dependencies != null)
          for (var f = d.depPosition; f < d.dependencies.length; f++) {
            var g = d.dependencies[f];
            !T(g) && a.indexOf(g) == -1 && b.indexOf(g) == -1 && e.indexOf(g) == -1 && a.push(g);
          }
      } while (d != c);
    }
  }
  function ha(a) {
    var b = a.dependencies;
    if (!b) throw u('Called _replaceCycleLinkWithSCCDeps on an undefined module');
    h++;
    ga(b, [], a);
    a.depPosition++;
    U(a);
  }
  function ia(a, b) {
    var c = b;
    while (!0) {
      if (c.dependencies && c.depPosition != c.dependencies.length) c = c.dependencies[c.depPosition];
      else break;
      if (c == a) {
        ha(a);
        return;
      }
    }
    a.nextDepWaitingNext = b.nextDepWaitingHead;
    b.nextDepWaitingHead = a;
  }
  function T(a) {
    return a.dependencies != null && a.depPosition >= a.dependencies.length;
  }
  function ja(a) {
    a.depPosition++, U(a);
  }
  function ka(a) {
    var b = a.nextDepWaitingHead;
    a.nextDepWaitingHead = null;
    while (b != null) {
      var c = b;
      c.nonJSDeps && M(a);
      b = c.nextDepWaitingNext;
      c.nextDepWaitingNext = null;
      var d = !e[c.id];
      d || ja(c);
    }
  }
  function la(a) {
    return a.special & l;
  }
  function ma(a) {
    return a.special & p;
  }
  function U(a) {
    while (a.dependencies != null && a.depPosition < a.dependencies.length) {
      var b = a.dependencies[a.depPosition],
        c = T(b);
      if (!c && a != b) {
        ia(a, b);
        return;
      }
      a.depPosition++;
    }
    la(a) && d.push(a);
    a.nextDepWaitingHead !== null && ka(a);
  }
  function na(a) {
    if (a.sideEffectDependencyException != null) throw a.sideEffectDependencyException;
    if (a.ranRecursiveSideEffects) return;
    a.ranRecursiveSideEffects = !0;
    var b = a.dependencies;
    if (b)
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        try {
          na(d);
        } catch (b) {
          a.sideEffectDependencyException = b;
          throw b;
        }
        if (d.special & n)
          try {
            F.call(null, d.id);
          } catch (b) {
            a.sideEffectDependencyException = b;
            throw b;
          }
      }
  }
  function V(a, b) {
    (e[a] = new P(a, 0, b)), (f[a] = { id: a, dependencies: [], category: 0, factoryLengthAccessTime: null, factoryTime: null, factoryStart: null, factoryEnd: null, factoryRun: !1 });
  }
  V('module', 0);
  V('exports', 0);
  V('define', N);
  V('global', a);
  V('require', F);
  V('importDefault', G);
  V('importNamespace', H);
  V('requireDynamic', oa);
  V('requireLazy', R);
  V('requireWeak', W);
  V('ifRequired', X);
  V('ifRequireable', Y);
  b = [F.call(null, 'global'), F.call(null, 'require'), F.call(null, 'requireDynamic'), F.call(null, 'requireLazy'), null, null];
  c = [F.call(null, 'global'), F.call(null, 'require'), F.call(null, 'importDefault'), F.call(null, 'importNamespace'), F.call(null, 'requireLazy'), null, null];
  N.amd = {};
  a.define = N;
  a.require = F;
  a.importDefault = G;
  a.importNamespace = H;
  a.requireDynamic = oa;
  a.requireLazy = R;
  function oa(a, b) {
    throw new ReferenceError('requireDynamic is not defined');
  }
  function W(a, b) {
    X.call(
      null,
      a,
      function (a) {
        b(a);
      },
      function () {
        N(
          '__requireWeak__' + a + '__' + g++,
          ['__isRequired__' + a],
          Z()(function () {
            return b(E(e[a]));
          }, 'requireWeak'),
          l,
          null,
          1
        );
      }
    );
  }
  function X(a, b, c) {
    a = e[a];
    if (a && a.factoryFinished) {
      if (typeof b === 'function') return b(E(a));
    } else if (typeof c === 'function') return c();
  }
  function Y(a, b, c) {
    if (v !== !0) return X.call(null, a, b, c);
    var d = e[a];
    if (d && d.nonJSDeps && T(d)) {
      if (typeof b === 'function') return b(F.call(null, a));
    } else if (typeof c === 'function') return c();
  }
  $ = {
    getDupCount: function () {
      return [j, k];
    },
    getModules: function () {
      var a = {};
      for (var b in e) e[b] && Object.prototype.hasOwnProperty.call(e, b) && (a[b] = e[b]);
      return a;
    },
    modulesMap: e,
    debugUnresolvedDependencies: t,
  };
  function pa(a) {
    return a;
  }
  function Z() {
    var b = a.TimeSlice && a.TimeSlice.guard ? a.TimeSlice.guard : pa;
    return function () {
      return b.apply(void 0, arguments);
    };
  }
  V('__getTotalRequireCalls', ea);
  V('__getModuleTimeDetails', fa);
  V('__debug', $);
  a.__d = function (a, b, c, d) {
    Z()(
      function () {
        N(a, b, c, (d || m) | o, null, null, null);
      },
      'define ' + a,
      { root: !0 }
    )();
  };
  function $(a, b) {
    return !0;
  }
  if (a.__d_stub) {
    for (var W = 0; W < a.__d_stub.length; W++) a.__d.apply(null, a.__d_stub[W]);
    delete a.__d_stub;
  }
  if (a.__rl_stub) {
    for (var Y = 0; Y < a.__rl_stub.length; Y++) R.apply(null, a.__rl_stub[Y]);
    delete a.__rl_stub;
  }
  G = function () {};
  a.$RefreshReg$ = G;
  a.$RefreshSig$ = function () {
    return function (a) {
      return a;
    };
  };
})(this);
(function (a) {
  var b = a.performance;
  b &&
    b.setResourceTimingBufferSize &&
    (b.setResourceTimingBufferSize(1e5),
    (b.onresourcetimingbufferfull = function () {
      a.__isresourcetimingbufferfull = !0;
    }),
    (b.setResourceTimingBufferSize = function () {}));
})(this);

__d(
  'fb-error-lite',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    var g = { PREVIOUS_FILE: 1, PREVIOUS_FRAME: 2, PREVIOUS_DIR: 3, FORCED_KEY: 4 };
    function a(a) {
      var b = new Error(a);
      if (b.stack === void 0)
        try {
          throw b;
        } catch (a) {}
      b.messageFormat = a;
      for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
      b.messageParams = d.map(function (a) {
        return String(a);
      });
      b.taalOpcodes = [g.PREVIOUS_FRAME];
      return b;
    }
    b = { err: a, TAALOpcode: g };
    f['default'] = b;
  },
  66
);
__d(
  '$-core',
  ['fb-error-lite'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      return h(a, typeof a === 'string' ? document.getElementById(a) : a);
    }
    function b(a) {
      return h(a, typeof a === 'string' ? document.getElementById(a) : a);
    }
    function h(a, b) {
      if (!b) {
        a = c('fb-error-lite').err('Tried to get element with id of "%s" but it is not present on the page', String(a));
        a.taalOpcodes = a.taalOpcodes || [];
        a.taalOpcodes = [c('fb-error-lite').TAALOpcode.PREVIOUS_FILE];
        throw a;
      }
      return b;
    }
    a.fromIDOrElement = b;
    g['default'] = a;
  },
  98
);
__d(
  '$',
  ['$-core', 'ErrorDebugHooks'],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      try {
        return c('$-core')(a);
      } catch (a) {
        c('ErrorDebugHooks').SnapShotHook && c('ErrorDebugHooks').SnapShotHook(a, b);
        throw a;
      }
    }
    a.fromIDOrElement = c('$-core').fromIDOrElement;
    g['default'] = a;
  },
  98
);
__d(
  'Env',
  [],
  function (a, b, c, d, e, f) {
    b = { ajaxpipe_token: null, compat_iframe_token: null, iframeKey: '', iframeTarget: '', iframeToken: '', isCQuick: !1, start: Date.now(), nocatch: !1, enableDefaultTrustedTypePolicy: !1, ig_server_override: '' };
    a.Env && Object.assign(b, a.Env);
    a.Env = b;
    c = b;
    f['default'] = c;
  },
  66
);
__d(
  'sprintf',
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
      var e = 0;
      return a.replace(/%s/g, function () {
        return String(c[e++]);
      });
    }
    f['default'] = a;
  },
  66
);
__d(
  'invariant',
  ['Env', 'fb-error-lite', 'sprintf'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a, b) {
      if (!a) {
        var d = b;
        for (var e = arguments.length, f = new Array(e > 2 ? e - 2 : 0), g = 2; g < e; g++) f[g - 2] = arguments[g];
        if (typeof d === 'number') {
          var i = h(d, f),
            j = i.message,
            k = i.decoderLink;
          d = j;
          f.unshift(k);
        } else if (d === void 0) {
          d = 'Invariant: ';
          for (var l = 0; l < f.length; l++) d += '%s,';
        }
        var m = d,
          n = new Error(m);
        n.name = 'Invariant Violation';
        n.messageFormat = d;
        n.messageParams = f.map(function (a) {
          return String(a);
        });
        n.taalOpcodes = [c('fb-error-lite').TAALOpcode.PREVIOUS_FRAME];
        n.stack;
        throw n;
      }
    }
    function h(a, b) {
      var d = 'Minified invariant #' + a + '; %s';
      b.length > 0 &&
        (d +=
          ' Params: ' +
          b
            .map(function (a) {
              return '%s';
            })
            .join(', '));
      a = c('Env').show_invariant_decoder === !0 ? 'visit ' + i(a, b) + ' to see the full message.' : '';
      return { message: d, decoderLink: a };
    }
    function i(a, b) {
      a = 'https://www.internalfb.com/intern/invariant/' + a + '/';
      b.length > 0 &&
        (a +=
          '?' +
          b
            .map(function (a, b) {
              return 'args[' + b + ']=' + encodeURIComponent(String(a));
            })
            .join('&'));
      return a;
    }
    g['default'] = a;
  },
  98
);
__d(
  'ArbiterToken',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    a = (function () {
      function a(a, b) {
        (this.unsubscribe = function () {
          for (var a = 0; a < this.$2.length; a++) this.$2[a].remove();
          this.$2.length = 0;
        }),
          (this.$1 = a),
          (this.$2 = b);
      }
      var b = a.prototype;
      b.isForArbiterInstance = function (a) {
        this.$1 || h(0, 2506);
        return this.$1 === a;
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'performance',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    b = a.performance || a.msPerformance || a.webkitPerformance || {};
    c = b;
    f['default'] = c;
  },
  66
);
__d(
  'performanceNow',
  ['performance'],
  function (a, b, c, d, e, f, g) {
    if (c('performance').now)
      b = function () {
        return c('performance').now();
      };
    else {
      d = a._cstart;
      e = Date.now();
      var h = typeof d === 'number' && d < e ? d : e,
        i = 0;
      b = function () {
        var a = Date.now(),
          b = a - h;
        b < i && ((h -= i - b), (b = a - h));
        i = b;
        return b;
      };
    }
    f = b;
    g['default'] = f;
  },
  98
);
__d(
  'removeFromArray',
  [],
  function (a, b, c, d, e, f) {
    function a(a, b) {
      b = a.indexOf(b);
      b !== -1 && a.splice(b, 1);
    }
    f['default'] = a;
  },
  66
);
__d(
  'fb-error',
  ['performanceNow', 'removeFromArray'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g,
      h = { PREVIOUS_FILE: 1, PREVIOUS_FRAME: 2, PREVIOUS_DIR: 3, FORCED_KEY: 4 };
    function i(b) {
      var a = new Error(b);
      if (a.stack === void 0)
        try {
          throw a;
        } catch (a) {}
      a.messageFormat = b;
      for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
      a.messageParams = d.map(function (a) {
        return String(a);
      });
      a.taalOpcodes = [h.PREVIOUS_FRAME];
      return a;
    }
    var j = !1,
      k = {
        errorListener: function (b) {
          var c = a.console,
            d = c[b.type] ? b.type : 'error';
          if (b.type === 'fatal' || (d === 'error' && !j)) {
            d = b.message;
            c.error('ErrorUtils caught an error:\n\n' + d + "\n\nSubsequent non-fatal errors won't be logged; see https://fburl.com/debugjs.");
            j = !0;
          }
        },
      },
      l = { access_token: null },
      m = 6,
      n = 6e4,
      o = 10 * n,
      p = new Map(),
      q = 0;
    function r() {
      var a = (g || (g = b('performanceNow')))();
      if (a > q + n) {
        var c = a - o;
        for (var d = p, e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var h;
          if (e) {
            if (f >= d.length) break;
            h = d[f++];
          } else {
            f = d.next();
            if (f.done) break;
            h = f.value;
          }
          h = h;
          var i = h[0];
          h = h[1];
          h.lastAccessed < c && p['delete'](i);
        }
        q = a;
      }
    }
    function s(a) {
      r();
      var c = (g || (g = b('performanceNow')))(),
        d = p.get(a);
      if (d == null) {
        p.set(a, { dropped: 0, logged: [c], lastAccessed: c });
        return 1;
      }
      a = d.dropped;
      var e = d.logged;
      d.lastAccessed = c;
      while (e[0] < c - n) e.shift();
      if (e.length < m) {
        d.dropped = 0;
        e.push(c);
        return a + 1;
      } else {
        d.dropped++;
        return null;
      }
    }
    var t = {
      shouldLog: function (a) {
        return s(a.hash);
      },
    };
    function u(a) {
      var b = null;
      a == null || typeof a !== 'object'
        ? (b = i('Non-object thrown: %s', String(a)))
        : typeof a.message !== 'string'
        ? (b = i('Non-error thrown: %s, keys: %s', String(a), JSON.stringify(Object.keys(a).sort())))
        : Object.isExtensible && !Object.isExtensible(a) && (b = i('Non-extensible thrown: %s', String(a.message)));
      if (b != null) {
        b.taalOpcodes = b.taalOpcodes || [];
        b.taalOpcodes.push(h.PREVIOUS_FRAME);
        return b;
      }
      return a;
    }
    var v = typeof window === 'undefined' ? '<self.onerror>' : '<window.onerror>',
      w;
    function aa(a) {
      var b = a.error != null ? u(a.error) : i(a.message || '');
      b.fileName == null && a.filename != null && (b.fileName = a.filename);
      b.line == null && a.lineno != null && (b.line = a.lineno);
      b.column == null && a.colno != null && (b.column = a.colno);
      b.guardList = [v];
      b.loggingSource = 'ONERROR';
      (a = w) === null || a === void 0 ? void 0 : a.reportError(b);
    }
    var x = {
        setup: function (b) {
          if (typeof a.addEventListener !== 'function') return;
          if (w != null) return;
          w = b;
          a.addEventListener('error', aa);
        },
      },
      y = [],
      z = {
        pushGuard: function (a) {
          y.unshift(a);
        },
        popGuard: function () {
          y.shift();
        },
        inGuard: function () {
          return y.length !== 0;
        },
        cloneGuardList: function () {
          return y.map(function (a) {
            return a.name;
          });
        },
        findDeferredSource: function () {
          for (var a = 0; a < y.length; a++) {
            var b = y[a];
            if (b.deferredSource != null) return b.deferredSource;
          }
        },
      };
    function ba(a) {
      if (a.type != null) return a.type;
      if (a.loggingSource == 'GUARDED' || a.loggingSource == 'ERROR_BOUNDARY') return 'fatal';
      if (a.name == 'SyntaxError') return 'fatal';
      if (a.loggingSource == 'ONERROR' && a.message.indexOf('ResizeObserver loop') >= 0) return 'warn';
      return a.stack != null && a.stack.indexOf('chrome-extension://') >= 0 ? 'warn' : 'error';
    }
    var A = [],
      B = (function () {
        function a() {
          this.metadata = [].concat(A);
        }
        var b = a.prototype;
        b.addEntries = function () {
          var a;
          (a = this.metadata).push.apply(a, arguments);
          return this;
        };
        b.addEntry = function (a, b, c) {
          this.metadata.push([a, b, c]);
          return this;
        };
        b.isEmpty = function () {
          return this.metadata.length === 0;
        };
        b.clearEntries = function () {
          this.metadata = [];
        };
        b.format = function () {
          var a = [];
          this.metadata.forEach(function (b) {
            if (b && b.length) {
              b = b
                .map(function (a) {
                  return a != null ? String(a).replace(/:/g, '_') : '';
                })
                .join(':');
              a.push(b);
            }
          });
          return a;
        };
        b.getAll = function () {
          return this.metadata;
        };
        a.addGlobalMetadata = function (a, b, c) {
          A.push([a, b, c]);
        };
        a.getGlobalMetadata = function () {
          return A;
        };
        a.unsetGlobalMetadata = function (a, b) {
          A = A.filter(function (c) {
            return !(Array.isArray(c) && c[0] === a && c[1] === b);
          });
        };
        return a;
      })(),
      C = { debug: 1, info: 2, warn: 3, error: 4, fatal: 5 };
    function c(a, b) {
      if (Object.isFrozen(a)) return;
      b.type && (!a.type || C[a.type] > C[b.type]) && (a.type = b.type);
      var c = b.metadata;
      if (c != null) {
        var d;
        d = (d = a.metadata) !== null && d !== void 0 ? d : new B();
        c != null && d.addEntries.apply(d, c.getAll());
        a.metadata = d;
      }
      b.project != null && (a.project = b.project);
      b.errorName != null && (a.errorName = b.errorName);
      b.componentStack != null && (a.componentStack = b.componentStack);
      b.deferredSource != null && (a.deferredSource = b.deferredSource);
      b.blameModule != null && (a.blameModule = b.blameModule);
      b.loggingSource != null && (a.loggingSource = b.loggingSource);
      d = (c = a.messageFormat) !== null && c !== void 0 ? c : a.message;
      c = (c = a.messageParams) !== null && c !== void 0 ? c : [];
      if (d !== b.messageFormat && b.messageFormat != null) {
        var e;
        d += ' [Caught in: ' + b.messageFormat + ']';
        c.push.apply(c, (e = b.messageParams) !== null && e !== void 0 ? e : []);
      }
      a.messageFormat = d;
      a.messageParams = c;
      e = b.forcedKey;
      d = a.forcedKey;
      c = e != null && d != null ? e + '_' + d : e !== null && e !== void 0 ? e : d;
      a.forcedKey = c;
    }
    function d(a) {
      var b;
      return ca((b = a.messageFormat) !== null && b !== void 0 ? b : a.message, a.messageParams || []);
    }
    function ca(a, b) {
      var c = 0;
      a = a.replace(/%s/g, function () {
        return c < b.length ? b[c++] : 'NOPARAM';
      });
      c < b.length && (a += ' PARAMS' + JSON.stringify(b.slice(c)));
      return a;
    }
    function f(a) {
      return (a !== null && a !== void 0 ? a : []).map(function (a) {
        return String(a);
      });
    }
    var D = { aggregateError: c, toReadableMessage: d, toStringParams: f },
      da = 5,
      E = [];
    function F(a) {
      E.push(a), E.length > da && E.shift();
    }
    function G(a) {
      var b = a.getAllResponseHeaders();
      if (b != null && b.indexOf('X-FB-Debug') >= 0) {
        b = a.getResponseHeader('X-FB-Debug');
        b && F(b);
      }
    }
    function ea() {
      return E;
    }
    var H = { add: F, addFromXHR: G, getAll: ea },
      fa = 'abcdefghijklmnopqrstuvwxyz012345';
    function I() {
      var a = 0;
      for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];
      for (var e = 0; e < c.length; e++) {
        var f = c[e];
        if (f != null) {
          var g = f.length;
          for (var h = 0; h < g; h++) a = (a << 5) - a + f.charCodeAt(h);
        }
      }
      var i = '';
      for (var j = 0; j < 6; j++) (i = fa.charAt(a & 31) + i), (a >>= 5);
      return i;
    }
    var J = [/\(([^\s\)\()]+):(\d+):(\d+)\)$/, /@([^\s\)\()]+):(\d+):(\d+)$/, /^([^\s\)\()]+):(\d+):(\d+)$/, /^at ([^\s\)\()]+):(\d+):(\d+)$/],
      ga = /^\w+:\s.*?\n/g;
    Error.stackTraceLimit != null && Error.stackTraceLimit < 80 && (Error.stackTraceLimit = 80);
    function ha(a) {
      var b = a.name,
        c = a.message;
      a = a.stack;
      if (a == null) return null;
      if (b != null && c != null && c !== '') {
        var d = b + ': ' + c + '\n';
        if (a.startsWith(d)) return a.substr(d.length);
        if (a === b + ': ' + c) return null;
      }
      if (b != null) {
        d = b + '\n';
        if (a.startsWith(d)) return a.substr(d.length);
      }
      if (c != null && c !== '') {
        b = ': ' + c + '\n';
        d = a.indexOf(b);
        c = a.substring(0, d);
        if (/^\w+$/.test(c)) return a.substring(d + b.length);
      }
      return a.replace(ga, '');
    }
    function K(a) {
      a = a.trim();
      var b;
      a;
      var c, d, e;
      if (a.includes('charset=utf-8;base64,')) b = '<inlined-file>';
      else {
        var f;
        for (var g = 0; g < J.length; g++) {
          var h = J[g];
          f = a.match(h);
          if (f != null) break;
        }
        f != null && f.length === 4 ? ((c = f[1]), (d = parseInt(f[2], 10)), (e = parseInt(f[3], 10)), (b = a.substring(0, a.length - f[0].length))) : (b = a);
        b = b.replace(/^at /, '').trim();
      }
      h = { identifier: b, script: c, line: d, column: e };
      h.text = L(h);
      return h;
    }
    function ia(a) {
      return a == null || a === '' ? [] : a.split(/\n\n/)[0].split('\n').map(K);
    }
    function ja(a) {
      a = ha(a);
      return ia(a);
    }
    function ka(a) {
      if (a == null || a === '') return null;
      a = a.split('\n');
      a.splice(0, 1);
      return a.map(function (a) {
        return a.trim();
      });
    }
    function L(a) {
      var b = a.identifier,
        c = a.script,
        d = a.line;
      a = a.column;
      b = '    at ' + (b !== null && b !== void 0 ? b : '<unknown>');
      c != null && d != null && a != null && (b += ' (' + c + ':' + d + ':' + a + ')');
      return b;
    }
    function M(c) {
      var d,
        e,
        f,
        i,
        j,
        k,
        l = ja(c);
      d = (d = c.taalOpcodes) !== null && d !== void 0 ? d : [];
      var m = c.framesToPop;
      if (m != null) {
        m = Math.min(m, l.length);
        while (m-- > 0) d.unshift(h.PREVIOUS_FRAME);
      }
      m = (m = c.messageFormat) !== null && m !== void 0 ? m : c.message;
      e = ((e = c.messageParams) !== null && e !== void 0 ? e : []).map(function (a) {
        return String(a);
      });
      var n = ka(c.componentStack),
        o = n == null ? null : n.map(K),
        p = c.metadata ? c.metadata.format() : new B().format();
      p.length === 0 && (p = void 0);
      var q = l
        .map(function (a) {
          return a.text;
        })
        .join('\n');
      f = (f = c.errorName) !== null && f !== void 0 ? f : c.name;
      var r = ba(c),
        s = c.loggingSource,
        t = c.project;
      i = (i = c.lineNumber) !== null && i !== void 0 ? i : c.line;
      j = (j = c.columnNumber) !== null && j !== void 0 ? j : c.column;
      k = (k = c.fileName) !== null && k !== void 0 ? k : c.sourceURL;
      var u = l.length > 0;
      u && i == null && (i = l[0].line);
      u && j == null && (j = l[0].column);
      u && k == null && (k = l[0].script);
      o = {
        blameModule: c.blameModule,
        column: j == null ? null : String(j),
        clientTime: Math.floor(Date.now() / 1e3),
        componentStackFrames: o,
        deferredSource: c.deferredSource != null ? M(c.deferredSource) : null,
        extra: (u = c.extra) !== null && u !== void 0 ? u : {},
        fbtrace_id: c.fbtrace_id,
        guardList: (j = c.guardList) !== null && j !== void 0 ? j : [],
        hash: I(f, q, r, t, s),
        isNormalizedError: !0,
        line: i == null ? null : String(i),
        loggingSource: s,
        message: D.toReadableMessage(c),
        messageFormat: m,
        messageParams: e,
        metadata: p,
        name: f,
        page_time: Math.floor((g || (g = b('performanceNow')))()),
        project: t,
        reactComponentStack: n,
        script: k,
        serverHash: c.serverHash,
        stack: q,
        stackFrames: l,
        type: r,
        xFBDebug: H.getAll(),
      };
      c.forcedKey != null && (o.forcedKey = c.forcedKey);
      d.length > 0 && (o.taalOpcodes = d);
      u = a.location;
      u && (o.windowLocationURL = u.href);
      for (var v in o) o[v] == null && delete o[v];
      return o;
    }
    function la(a) {
      return a != null && typeof a === 'object' && a.isNormalizedError === !0 ? a : null;
    }
    var N = { formatStackFrame: L, normalizeError: M, ifNormalizedError: la },
      ma = '<global.react>',
      O = [],
      P = [],
      Q = 50,
      R = !1,
      S = {
        history: P,
        addListener: function (a, b) {
          b === void 0 && (b = !1),
            O.push(a),
            b ||
              P.forEach(function (b) {
                return a(b, (b = b.loggingSource) !== null && b !== void 0 ? b : 'DEPRECATED');
              });
        },
        unshiftListener: function (a) {
          O.unshift(a);
        },
        removeListener: function (a) {
          b('removeFromArray')(O, a);
        },
        reportError: function (a) {
          a = N.normalizeError(a);
          S.reportNormalizedError(a);
        },
        reportNormalizedError: function (b) {
          if (R) return !1;
          var a = z.cloneGuardList();
          b.componentStackFrames && a.unshift(ma);
          a.length > 0 && (b.guardList = a);
          if (b.deferredSource == null) {
            a = z.findDeferredSource();
            a != null && (b.deferredSource = N.normalizeError(a));
          }
          P.length > Q && P.splice(Q / 2, 1);
          P.push(b);
          R = !0;
          for (var a = 0; a < O.length; a++)
            try {
              var c;
              O[a](b, (c = b.loggingSource) !== null && c !== void 0 ? c : 'DEPRECATED');
            } catch (a) {}
          R = !1;
          return !0;
        },
      };
    S.addListener(k.errorListener);
    var na = '<anonymous guard>',
      T = !1,
      U = {
        applyWithGuard: function (a, b, c, d) {
          z.pushGuard({ name: (d === null || d === void 0 ? void 0 : d.name) || (a.name ? 'func_name:' + a.name : null) || na, deferredSource: d === null || d === void 0 ? void 0 : d.deferredSource });
          if (T)
            try {
              return a.apply(b, c);
            } finally {
              z.popGuard();
            }
          try {
            return Function.prototype.apply.call(a, b, c);
          } catch (h) {
            try {
              b = d !== null && d !== void 0 ? d : {};
              var e = b.deferredSource,
                f = b.onError;
              b = b.onNormalizedError;
              var g = u(h);
              e = { deferredSource: e, loggingSource: 'GUARDED', project: (e = d === null || d === void 0 ? void 0 : d.project) !== null && e !== void 0 ? e : 'ErrorGuard', type: d === null || d === void 0 ? void 0 : d.errorType };
              D.aggregateError(g, e);
              d = N.normalizeError(g);
              g == null && a && ((d.extra[a.toString().substring(0, 100)] = 'function'), c != null && c.length && (d.extra[Array.from(c).toString().substring(0, 100)] = 'args'));
              d.guardList = z.cloneGuardList();
              f && f(g);
              b && b(d);
              S.reportNormalizedError(d);
            } catch (a) {}
          } finally {
            z.popGuard();
          }
        },
        guard: function (a, b) {
          function c() {
            for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++) d[e] = arguments[e];
            return U.applyWithGuard(a, this, d, b);
          }
          a.__SMmeta && (c.__SMmeta = a.__SMmeta);
          return c;
        },
        inGuard: function () {
          return z.inGuard();
        },
        skipGuardGlobal: function (a) {
          T = a;
        },
      },
      V = 1024,
      W = [],
      oa = 0;
    function X(a) {
      return String(a);
    }
    function Y(a) {
      return a == null ? null : String(a);
    }
    function pa(a, b) {
      var c = {};
      b &&
        b.forEach(function (a) {
          c[a] = !0;
        });
      Object.keys(a).forEach(function (b) {
        a[b] ? (c[b] = !0) : c[b] && delete c[b];
      });
      return Object.keys(c);
    }
    function Z(a) {
      return (a !== null && a !== void 0 ? a : []).map(function (a) {
        return { column: Y(a.column), identifier: a.identifier, line: Y(a.line), script: a.script };
      });
    }
    function qa(a) {
      a = String(a);
      return a.length > V ? a.substring(0, V - 3) + '...' : a;
    }
    function ra(a, b) {
      var c;
      c = {
        appId: Y(b.appId),
        cavalry_lid: b.cavalry_lid,
        access_token: l.access_token,
        ancestor_hash: a.hash,
        bundle_variant: (c = b.bundle_variant) !== null && c !== void 0 ? c : null,
        clientTime: X(a.clientTime),
        column: a.column,
        componentStackFrames: Z(a.componentStackFrames),
        events: a.events,
        extra: pa(a.extra, b.extra),
        forcedKey: a.forcedKey,
        frontend_env: (c = b.frontend_env) !== null && c !== void 0 ? c : null,
        guardList: a.guardList,
        line: a.line,
        loggingFramework: b.loggingFramework,
        messageFormat: qa(a.messageFormat),
        messageParams: a.messageParams.map(qa),
        name: a.name,
        sample_weight: Y(b.sample_weight),
        script: a.script,
        site_category: b.site_category,
        stackFrames: Z(a.stackFrames),
        type: a.type,
        page_time: Y(a.page_time),
        project: a.project,
        push_phase: b.push_phase,
        report_source: b.report_source,
        report_source_ref: b.report_source_ref,
        rollout_hash: (c = b.rollout_hash) !== null && c !== void 0 ? c : null,
        script_path: b.script_path,
        server_revision: Y(b.server_revision),
        spin: Y(b.spin),
        svn_rev: String(b.client_revision),
        additional_client_revisions: Array.from((c = b.additional_client_revisions) !== null && c !== void 0 ? c : []).map(X),
        taalOpcodes:
          a.taalOpcodes == null
            ? null
            : a.taalOpcodes.map(function (a) {
                return a;
              }),
        web_session_id: b.web_session_id,
        version: '3',
        xFBDebug: a.xFBDebug,
      };
      b = a.blameModule;
      var d = a.deferredSource;
      b != null && (c.blameModule = String(b));
      d && d.stackFrames && (c.deferredSource = { stackFrames: Z(d.stackFrames) });
      a.metadata && (c.metadata = a.metadata);
      a.loadingUrls && (c.loadingUrls = a.loadingUrls);
      a.serverHash != null && (c.serverHash = a.serverHash);
      a.windowLocationURL != null && (c.windowLocationURL = a.windowLocationURL);
      a.loggingSource != null && (c.loggingSource = a.loggingSource);
      return c;
    }
    function sa(a, b, c) {
      var d;
      oa++;
      if (b.sample_weight === 0) return !1;
      var e = t.shouldLog(a);
      if (e == null) return !1;
      if ((d = b.projectBlocklist) !== null && d !== void 0 && d.includes(a.project)) return !1;
      d = ra(a, b);
      Object.assign(d, { ancestors: W.slice(), clientWeight: X(e), page_position: X(oa) });
      W.length < 15 && W.push(a.hash);
      c(d);
      return !0;
    }
    var ta = { createErrorPayload: ra, postError: sa },
      $ = null,
      ua = !1;
    function va(a) {
      if (!$) return;
      var b = a.reason,
        c;
      if (b != null && typeof b === 'object' && (b.name == null || b.name === '' || b.message == null || b.message === ''))
        try {
          (c = i('UnhandledRejection: %s', JSON.stringify(b))), (c.loggingSource = 'ONUNHANDLEDREJECTION');
        } catch (a) {
          (c = i('UnhandledRejection: (circular) %s', Object.keys(b).join(','))), (c.loggingSource = 'ONUNHANDLEDREJECTION');
        }
      else (c = u(b)), c.loggingSource || (c.loggingSource = 'ONUNHANDLEDREJECTION');
      $.reportError(c);
      a.preventDefault();
    }
    function wa(b) {
      ($ = b), typeof a.addEventListener === 'function' && !ua && ((ua = !0), a.addEventListener('unhandledrejection', va));
    }
    var xa = { onunhandledrejection: va, setup: wa };
    c = {
      preSetup: function (a) {
        (a == null || a.ignoreOnError !== !0) && x.setup(S), (a == null || a.ignoreOnUnahndledRejection !== !0) && xa.setup(S);
      },
      setup: function (a, b) {
        S.addListener(function (c) {
          ta.postError(c, a, b);
        });
      },
    };
    var ya = (function () {
      function a(a) {
        (this.project = a), (this.events = []), (this.metadata = new B()), (this.taalOpcodes = []);
      }
      var b = a.prototype;
      b.$1 = function (b, c) {
        var d = String(c),
          e = this.events,
          f = this.project,
          g = this.metadata,
          i = this.blameModule,
          j = this.forcedKey,
          k = this.error,
          l;
        for (var m = arguments.length, n = new Array(m > 2 ? m - 2 : 0), o = 2; o < m; o++) n[o - 2] = arguments[o];
        if (this.normalizedError) {
          var p = { message: this.normalizedError.messageFormat + ' [Caught in: ' + d + ']', params: [].concat(this.normalizedError.messageParams, n), forcedKey: j };
          l = babelHelpers['extends']({}, this.normalizedError, { message: p.message, messageFormat: p.message, messageParams: D.toStringParams(p.params), project: f, type: b, loggingSource: 'FBLOGGER' });
        } else if (k)
          this.taalOpcodes.length > 0 && new a('fblogger').blameToPreviousFrame().blameToPreviousFrame().warn('Blame helpers do not work with catching'),
            D.aggregateError(k, { messageFormat: d, messageParams: D.toStringParams(n), errorName: k.name, forcedKey: j, project: f, type: b, loggingSource: 'FBLOGGER' }),
            (l = N.normalizeError(k));
        else {
          k = new Error(d);
          if (k.stack === void 0)
            try {
              throw k;
            } catch (a) {}
          k.messageFormat = d;
          k.messageParams = D.toStringParams(n);
          k.blameModule = i;
          k.forcedKey = j;
          k.project = f;
          k.type = b;
          k.loggingSource = 'FBLOGGER';
          k.taalOpcodes = [h.PREVIOUS_FRAME, h.PREVIOUS_FRAME].concat(this.taalOpcodes);
          l = N.normalizeError(k);
          l.name = 'FBLogger';
        }
        g.isEmpty() || (l.metadata = g.format());
        if (e.length > 0)
          if (l.events != null) {
            var q;
            (q = l.events).push.apply(q, e);
          } else l.events = e;
        S.reportNormalizedError(l);
        return k;
      };
      b.fatal = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        this.$1.apply(this, ['fatal', a].concat(c));
      };
      b.mustfix = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        this.$1.apply(this, ['error', a].concat(c));
      };
      b.warn = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        this.$1.apply(this, ['warn', a].concat(c));
      };
      b.info = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        this.$1.apply(this, ['info', a].concat(c));
      };
      b.debug = function (a) {};
      b.mustfixThrow = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        var e = this.$1.apply(this, ['error', a].concat(c));
        e || ((e = i('mustfixThrow does not support catchingNormalizedError')), (e.taalOpcodes = e.taalOpcodes || []), e.taalOpcodes.push(h.PREVIOUS_FRAME));
        throw e;
      };
      b.catching = function (b) {
        !(b instanceof Error) ? new a('fblogger').blameToPreviousFrame().warn('Catching non-Error object is not supported') : (this.error = b);
        return this;
      };
      b.catchingNormalizedError = function (a) {
        this.normalizedError = a;
        return this;
      };
      b.event = function (a) {
        this.events.push(a);
        return this;
      };
      b.blameToModule = function (a) {
        this.blameModule = a;
        return this;
      };
      b.blameToPreviousFile = function () {
        this.taalOpcodes.push(h.PREVIOUS_FILE);
        return this;
      };
      b.blameToPreviousFrame = function () {
        this.taalOpcodes.push(h.PREVIOUS_FRAME);
        return this;
      };
      b.blameToPreviousDirectory = function () {
        this.taalOpcodes.push(h.PREVIOUS_DIR);
        return this;
      };
      b.addToCategoryKey = function (a) {
        this.forcedKey = a;
        return this;
      };
      b.addMetadata = function (a, b, c) {
        this.metadata.addEntry(a, b, c);
        return this;
      };
      return a;
    })();
    d = function (a, b) {
      var c = new ya(a);
      return b != null ? c.event(a + '.' + b) : c;
    };
    d.addGlobalMetadata = function (a, b, c) {
      B.addGlobalMetadata(a, b, c);
    };
    f = {
      blameToPreviousFile: function (a) {
        var b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(h.PREVIOUS_FILE);
        return a;
      },
      blameToPreviousFrame: function (a) {
        var b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(h.PREVIOUS_FRAME);
        return a;
      },
      blameToPreviousDirectory: function (a) {
        var b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(h.PREVIOUS_DIR);
        return a;
      },
    };
    G = {
      err: i,
      ErrorBrowserConsole: k,
      ErrorDynamicData: l,
      ErrorFilter: t,
      ErrorGlobalEventHandler: x,
      ErrorGuard: U,
      ErrorGuardState: z,
      ErrorMetadata: B,
      ErrorNormalizeUtils: N,
      ErrorPoster: ta,
      ErrorPubSub: S,
      ErrorSerializer: D,
      ErrorSetup: c,
      ErrorXFBDebug: H,
      FBLogger: d,
      getErrorSafe: u,
      getSimpleHash: I,
      TAAL: f,
      TAALOpcode: h,
    };
    e.exports = G;
  },
  null
);
__d(
  'ErrorGuard',
  ['fb-error'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('fb-error').ErrorGuard;
  },
  98
);
__d(
  'CallbackDependencyManager',
  ['ErrorGuard'],
  function (a, b, c, d, e, f) {
    var g;
    a = (function () {
      'use strict';
      function a() {
        (this.$1 = new Map()), (this.$2 = new Map()), (this.$3 = 1), (this.$4 = new Map());
      }
      var c = a.prototype;
      c.$5 = function (a, b) {
        var c = 0,
          d = new Set();
        for (var e = 0, f = b.length; e < f; e++) d.add(b[e]);
        for (var b = d.keys(), e = Array.isArray(b), f = 0, b = e ? b : b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          if (e) {
            if (f >= b.length) break;
            d = b[f++];
          } else {
            f = b.next();
            if (f.done) break;
            d = f.value;
          }
          d = d;
          if (this.$4.get(d)) continue;
          c++;
          var g = this.$1.get(d);
          g === void 0 && ((g = new Map()), this.$1.set(d, g));
          g.set(a, (g.get(a) || 0) + 1);
        }
        return c;
      };
      c.$6 = function (a) {
        a = this.$1.get(a);
        if (!a) return;
        for (var c = a.entries(), d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var f;
          if (d) {
            if (e >= c.length) break;
            f = c[e++];
          } else {
            e = c.next();
            if (e.done) break;
            f = e.value;
          }
          f = f;
          var h = f[0];
          f = f[1] - 1;
          a.set(h, f);
          f <= 0 && a['delete'](h);
          f = this.$2.get(h);
          if (f !== void 0) {
            f.$7--;
            if (f.$7 <= 0) {
              f = f.$8;
              this.$2['delete'](h);
              (g || (g = b('ErrorGuard'))).applyWithGuard(f, null, []);
            }
          }
        }
      };
      c.addDependenciesToExistingCallback = function (a, b) {
        var c = this.$2.get(a);
        if (!c) return null;
        b = this.$5(a, b);
        c.$7 += b;
        return a;
      };
      c.isPersistentDependencySatisfied = function (a) {
        return !!this.$4.get(a);
      };
      c.satisfyPersistentDependency = function (a) {
        this.$4.set(a, 1), this.$6(a);
      };
      c.satisfyNonPersistentDependency = function (a) {
        var b = this.$4.get(a) === 1;
        b || this.$4.set(a, 1);
        this.$6(a);
        b || this.$4['delete'](a);
      };
      c.registerCallback = function (a, c) {
        var d = this.$3;
        this.$3++;
        c = this.$5(d, c);
        if (c === 0) {
          (g || (g = b('ErrorGuard'))).applyWithGuard(a, null, []);
          return null;
        }
        this.$2.set(d, { $8: a, $7: c });
        return d;
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  'EventSubscription',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    a = function (a) {
      var b = this;
      this.remove = function () {
        b.subscriber && (b.subscriber.removeSubscription(b), (b.subscriber = null));
      };
      this.subscriber = a;
    };
    f['default'] = a;
  },
  66
);
__d(
  'EmitterSubscription',
  ['EventSubscription'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b(b, c, d) {
        b = a.call(this, b) || this;
        b.listener = c;
        b.context = d;
        return b;
      }
      return b;
    })(c('EventSubscription'));
    g['default'] = a;
  },
  98
);
__d(
  'EventSubscriptionVendor',
  ['invariant'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    a = (function () {
      function a() {
        this.$1 = {};
      }
      var b = a.prototype;
      b.addSubscription = function (a, b) {
        b.subscriber === this || g(0, 2828);
        this.$1[a] || (this.$1[a] = []);
        var c = this.$1[a].length;
        this.$1[a].push(b);
        b.eventType = a;
        b.key = c;
        return b;
      };
      b.removeAllSubscriptions = function (a) {
        a === void 0 ? (this.$1 = {}) : delete this.$1[a];
      };
      b.removeSubscription = function (a) {
        var b = a.eventType;
        a = a.key;
        b = this.$1[b];
        b && delete b[a];
      };
      b.getSubscriptionsForType = function (a) {
        return this.$1[a];
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  'emptyFunction',
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      return function () {
        return a;
      };
    }
    b = function () {};
    b.thatReturns = a;
    b.thatReturnsFalse = a(!1);
    b.thatReturnsTrue = a(!0);
    b.thatReturnsNull = a(null);
    b.thatReturnsThis = function () {
      return this;
    };
    b.thatReturnsArgument = function (a) {
      return a;
    };
    c = b;
    f['default'] = c;
  },
  66
);
__d(
  'FBLogger',
  ['fb-error'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('fb-error').FBLogger;
  },
  98
);
__d(
  'unrecoverableViolation',
  ['FBLogger'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a, b, d) {
      d = d === void 0 ? {} : d;
      d = d.error;
      b = c('FBLogger')(b);
      d ? (b = b.catching(d)) : (b = b.blameToPreviousFrame());
      return b.mustfixThrow(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'BaseEventEmitter',
  ['EmitterSubscription', 'ErrorGuard', 'EventSubscriptionVendor', 'emptyFunction', 'unrecoverableViolation'],
  function (a, b, c, d, e, f) {
    var g;
    a = (function () {
      'use strict';
      function a() {
        (this.$2 = new (b('EventSubscriptionVendor'))()), (this.$1 = null);
      }
      var c = a.prototype;
      c.addListener = function (a, c, d) {
        return this.$2.addSubscription(a, new (b('EmitterSubscription'))(this.$2, c, d));
      };
      c.removeListener = function (a) {
        this.$2.removeSubscription(a);
      };
      c.once = function (a, b, c) {
        var d = this;
        return this.addListener(a, function () {
          d.removeCurrentListener(), b.apply(c, arguments);
        });
      };
      c.removeAllListeners = function (a) {
        this.$2.removeAllSubscriptions(a);
      };
      c.removeCurrentListener = function () {
        if (!this.$1) throw b('unrecoverableViolation')('Not in an emitting cycle; there is no current subscription', 'emitter');
        this.$2.removeSubscription(this.$1);
      };
      c.listeners = function (a) {
        a = this.$2.getSubscriptionsForType(a);
        return a
          ? a.filter(b('emptyFunction').thatReturnsTrue).map(function (a) {
              return a.listener;
            })
          : [];
      };
      c.emit = function (a) {
        var b = this.$2.getSubscriptionsForType(a);
        if (b) {
          var c = Object.keys(b),
            d;
          for (var e = 0; e < c.length; e++) {
            var f = c[e],
              g = b[f];
            if (g) {
              this.$1 = g;
              if (d == null) {
                d = [g, a];
                for (var h = 0, i = arguments.length <= 1 ? 0 : arguments.length - 1; h < i; h++) d[h + 2] = h + 1 < 1 || arguments.length <= h + 1 ? void 0 : arguments[h + 1];
              } else d[0] = g;
              this.__emitToSubscription.apply(this, d);
            }
          }
          this.$1 = null;
        }
      };
      c.__emitToSubscription = function (a, c) {
        for (var d = arguments.length, e = new Array(d > 2 ? d - 2 : 0), f = 2; f < d; f++) e[f - 2] = arguments[f];
        (g || (g = b('ErrorGuard'))).applyWithGuard(a.listener, a.context, e, { name: 'EventEmitter ' + c + ' event' });
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  'EventEmitter',
  ['BaseEventEmitter'],
  function (a, b, c, d, e, f, g) {
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        return a.apply(this, arguments) || this;
      }
      return b;
    })(c('BaseEventEmitter'));
    g['default'] = a;
  },
  98
);
__d(
  'EventEmitterWithHolding',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    a = (function () {
      function a(a, b) {
        (this.$2 = a), (this.$3 = b), (this.$1 = null), (this.$5 = []), (this.$4 = 0);
      }
      var b = a.prototype;
      b.addListener = function (a, b, c) {
        return this.$2.addListener(a, b, c);
      };
      b.once = function (a, b, c) {
        return this.$2.once(a, b, c);
      };
      b.addRetroactiveListener = function (a, b, c) {
        var d = this.$2.addListener(a, b, c),
          e = this.$5;
        e.push(!1);
        this.$4++;
        this.$3.emitToListener(a, b, c);
        this.$4--;
        e[e.length - 1] && d.remove();
        e.pop();
        return d;
      };
      b.removeAllListeners = function (a) {
        this.$2.removeAllListeners(a);
      };
      b.removeCurrentListener = function () {
        if (this.$4) {
          var a = this.$5;
          a[a.length - 1] = !0;
        } else this.$2.removeCurrentListener();
      };
      b.listeners = function (a) {
        return this.$2.listeners(a);
      };
      b.emit = function (a) {
        var b;
        for (var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
        (b = this.$2).emit.apply(b, [a].concat(d));
      };
      b.emitAndHold = function (a) {
        var b, c;
        for (var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1; f < d; f++) e[f - 1] = arguments[f];
        this.$1 = (b = this.$3).holdEvent.apply(b, [a].concat(e));
        (c = this.$2).emit.apply(c, [a].concat(e));
        this.$1 = null;
      };
      b.releaseCurrentEvent = function () {
        this.$1 != null ? this.$3.releaseEvent(this.$1) : this.$4 > 0 && this.$3.releaseCurrentEvent();
      };
      b.releaseHeldEventType = function (a) {
        this.$3.releaseEventType(a);
      };
      return a;
    })();
    f['default'] = a;
  },
  66
);
__d(
  'EventHolder',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    a = (function () {
      function a() {
        (this.$1 = {}), (this.$2 = []);
      }
      var b = a.prototype;
      b.holdEvent = function (a) {
        this.$1[a] = this.$1[a] || [];
        var b = this.$1[a],
          c = { eventType: a, index: b.length };
        for (var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1; f < d; f++) e[f - 1] = arguments[f];
        b.push(e);
        return c;
      };
      b.emitToListener = function (a, b, c) {
        var d = this,
          e = this.$1[a];
        if (!e) return;
        e.forEach(function (e, f) {
          if (!e) return;
          d.$2.push({ eventType: a, index: f });
          b.apply(c, e);
          d.$2.pop();
        });
      };
      b.releaseCurrentEvent = function () {
        this.$2.length || h(0, 1764), this.releaseEvent(this.$2[this.$2.length - 1]);
      };
      b.releaseEvent = function (a) {
        delete this.$1[a.eventType][a.index];
      };
      b.releaseEventType = function (a) {
        this.$1[a] = [];
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'Arbiter',
  ['invariant', 'ArbiterToken', 'CallbackDependencyManager', 'ErrorGuard', 'EventEmitter', 'EventEmitterWithHolding', 'EventHolder'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h;
    function i(a) {
      return Array.isArray(a) ? a : [a];
    }
    function j(a) {
      return a instanceof k || a === k ? a : k;
    }
    var k = (function () {
        function a() {
          var a = new (b('EventEmitter'))();
          this.$3 = new l();
          this.$2 = new (b('EventEmitterWithHolding'))(a, this.$3);
          this.$1 = new (b('CallbackDependencyManager'))();
          this.$4 = [];
        }
        var c = a.prototype;
        c.subscribe = function (a, c, d) {
          a = i(a);
          a.forEach(function (a) {
            (a && typeof a === 'string') || g(0, 1966, a);
          });
          typeof c === 'function' || g(0, 1967, c);
          d = d || 'all';
          d === 'new' || d === 'all' || g(0, 1968, d);
          a = a.map(function (a) {
            var b = this.$5.bind(this, c, a);
            b.__SMmeta = c.__SMmeta;
            if (d === 'new') return this.$2.addListener(a, b);
            this.$4.push({});
            a = this.$2.addRetroactiveListener(a, b);
            this.$4.pop();
            return a;
          }, this);
          return new (b('ArbiterToken'))(this, a);
        };
        c.$5 = function (a, c, d) {
          var e = this.$4[this.$4.length - 1];
          if (e[c] === !1) return;
          a = (h || (h = b('ErrorGuard'))).applyWithGuard(a, null, [c, d]);
          a === !1 && this.$2.releaseCurrentEvent();
          e[c] = a;
        };
        c.unsubscribeCurrentSubscription = function () {
          this.$2.removeCurrentListener();
        };
        c.releaseCurrentPersistentEvent = function () {
          this.$2.releaseCurrentEvent();
        };
        c.subscribeOnce = function (a, b, c) {
          var d = this;
          a = this.subscribe(
            a,
            function (a, c) {
              d.unsubscribeCurrentSubscription();
              return b(a, c);
            },
            c
          );
          return a;
        };
        c.unsubscribe = function (a) {
          a.isForArbiterInstance(this) || g(0, 1969), a.unsubscribe();
        };
        c.inform = function (a, b, c) {
          var d = Array.isArray(a);
          a = i(a);
          c = c || 'event';
          var e = c === 'state' || c === 'persistent';
          this.$4.push({});
          for (var f = 0; f < a.length; f++) {
            var h = a[f];
            h || g(0, 1970, h);
            this.$3.setHoldingBehavior(h, c);
            this.$2.emitAndHold(h, b);
            this.$6(h, b, e);
          }
          h = this.$4.pop();
          return d ? h : h[a[0]];
        };
        c.query = function (a) {
          var b = this.$3.getHoldingBehavior(a);
          !b || b === 'state' || g(0, 1971, a);
          b = null;
          this.$3.emitToListener(a, function (a) {
            b = a;
          });
          return b;
        };
        c.registerCallback = function (a, b) {
          if (typeof a === 'function') return this.$1.registerCallback(a, b);
          else return this.$1.addDependenciesToExistingCallback(a, b);
        };
        c.$6 = function (a, b, c) {
          if (b === null) return;
          c ? this.$1.satisfyPersistentDependency(a) : this.$1.satisfyNonPersistentDependency(a);
        };
        a.subscribe = function (b, c, d) {
          return a.prototype.subscribe.apply(j(this), arguments);
        };
        a.unsubscribeCurrentSubscription = function () {
          return a.prototype.unsubscribeCurrentSubscription.apply(j(this));
        };
        a.releaseCurrentPersistentEvent = function () {
          return a.prototype.releaseCurrentPersistentEvent.apply(j(this));
        };
        a.subscribeOnce = function (b, c, d) {
          return a.prototype.subscribeOnce.apply(j(this), arguments);
        };
        a.unsubscribe = function (b) {
          return a.prototype.unsubscribe.apply(j(this), arguments);
        };
        a.inform = function (b, c, d) {
          return a.prototype.inform.apply(j(this), arguments);
        };
        a.informSingle = function (b, c, d) {
          return a.prototype.inform.apply(j(this), arguments);
        };
        a.query = function (b) {
          return a.prototype.query.apply(j(this), arguments);
        };
        a.registerCallback = function (b, c) {
          return a.prototype.registerCallback.apply(j(this), arguments);
        };
        a.$6 = function (b, c, d) {
          return a.prototype.$6.apply(j(this), arguments);
        };
        a.$5 = function (b, c, d) {
          return a.prototype.$5.apply(j(this), arguments);
        };
        return a;
      })(),
      l = (function (b) {
        babelHelpers.inheritsLoose(a, b);
        function a() {
          var a;
          a = b.call(this) || this;
          a.$ArbiterEventHolder1 = {};
          return a;
        }
        var c = a.prototype;
        c.setHoldingBehavior = function (a, b) {
          this.$ArbiterEventHolder1[a] = b;
        };
        c.getHoldingBehavior = function (a) {
          return this.$ArbiterEventHolder1[a];
        };
        c.holdEvent = function (a) {
          var c = this.$ArbiterEventHolder1[a];
          c !== 'persistent' && this.$ArbiterEventHolder2(a);
          if (c !== 'event') {
            var d;
            for (var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1; g < e; g++) f[g - 1] = arguments[g];
            return (d = b.prototype.holdEvent).call.apply(d, [this, a].concat(f));
          }
          return void 0;
        };
        c.$ArbiterEventHolder2 = function (a) {
          this.emitToListener(a, this.releaseCurrentEvent, this);
        };
        c.releaseEvent = function (a) {
          a && b.prototype.releaseEvent.call(this, a);
        };
        return a;
      })(b('EventHolder'));
    k.call(k);
    e.exports = k;
  },
  null
);
__d(
  'BigPipeInstance',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    var g = null;
    a = {
      Events: { init: 'BigPipe/init', tti: 'tti_bigpipe', displayed: 'all_pagelets_displayed', loaded: 'all_pagelets_loaded' },
      setCurrentInstance_DO_NOT_USE: function (a) {
        g = a;
      },
      getCurrentInstance: function () {
        return g;
      },
    };
    e.exports = a;
  },
  null
);
__d(
  'err',
  ['fb-error'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('fb-error').err;
  },
  98
);
__d(
  'FBJSON',
  ['err'],
  function (a, b, c, d, e, f, g) {
    function a(a, b, d) {
      typeof b !== 'function' && ((d = b || d), (b = void 0));
      d = d || 'unknown';
      try {
        return JSON.parse(a, b);
      } catch (e) {
        b = c('err')('JSON.parse from %s failed: %s "%s" with exception: %s', d, Object.prototype.toString.call(a), a, e);
        b.framesToPop = 1;
        throw b;
      }
    }
    b = JSON.stringify;
    g.parse = a;
    g.stringify = b;
  },
  98
);
__d(
  'MLegacyDataStore',
  ['invariant', 'FBJSON'],
  function (a, b, c, d, e, f, g, h) {
    var i = [];
    function j(a) {
      if (a.hasAttribute('data-store-id')) {
        var b = parseInt(a.getAttribute('data-store-id'), 10);
        (!isNaN(b) && b < i.length) || h(0, 4438);
        return i[b];
      }
      a.hasAttribute('data-store') ? (b = d('FBJSON').parse(a.getAttribute('data-store'), f.id)) : (b = {});
      var c = i.length;
      i.push(b);
      a.setAttribute('data-store-id', c.toString());
      return b;
    }
    function a(a) {
      a = j(a);
      return a;
    }
    function b(a, b) {
      a = j(a);
      Object.assign(a, b);
    }
    g.get = a;
    g.set = b;
  },
  98
);
__d(
  'DataStore',
  ['MLegacyDataStore', 'err'],
  function (a, b, c, d, e, f, g) {
    function a(a, b, e) {
      if (!a) throw c('err')('DataStore.set: element is required, got %s', typeof a);
      var f = d('MLegacyDataStore').get(a);
      f[b] = e;
      return a;
    }
    function b(a, b, c) {
      a = d('MLegacyDataStore').get(a);
      var e = a[b];
      c !== void 0 && e === void 0 && (e = a[b] = c);
      return e;
    }
    function e(a, b) {
      if (!a) throw c('err')('DataStore.remove: element is required, got %s', typeof a);
      a = d('MLegacyDataStore').get(a);
      var e = a[b];
      delete a[b];
      return e;
    }
    g.set = a;
    g.get = b;
    g.remove = e;
  },
  98
);
__d(
  'BigPipePlugins',
  ['DataStore'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a() {}
      a.runPluginOnPagelet = function (b) {
        a.getPluginList().forEach(function (a) {
          a(b);
        });
      };
      a.getPluginList = function () {
        return [a.$1];
      };
      a.$1 = function (b) {
        if (!b) return;
        b = b.querySelectorAll('div[data-fte]');
        for (var c = 0, d = b.length; c < d; c++) a.$2(b[c], 'data-ft', 'data-ft');
      };
      a.$2 = function (a, b, c) {
        var e = a.getAttribute(b);
        e && (d('DataStore').set(a, c, e), a.removeAttribute(b));
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'objectValues',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a) {
      return Object.values(a);
    }
    f['default'] = a;
  },
  66
);
__d(
  'BootloaderEvents',
  ['Arbiter', 'objectValues'],
  function (a, b, c, d, e, f, g) {
    var h = 'bootloader/bootload',
      i = 'hasteResponse/handle',
      j = 'bootloader/defer_timeout',
      k = 'bootloader/resource_in_longtail_bt_manifest',
      l = new (c('Arbiter'))(),
      m = new Set(),
      n = new Set();
    function o(a, b) {
      return 'haste_response_ef:' + a + ':' + ((a = b) != null ? a : '<unknown>');
    }
    function a(a) {
      var b = new Map();
      for (var a = c('objectValues')(a), d = Array.isArray(a), e = 0, a = d ? a : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
        var f;
        if (d) {
          if (e >= a.length) break;
          f = a[e++];
        } else {
          e = a.next();
          if (e.done) break;
          f = e.value;
        }
        f = f;
        for (var f = f, g = Array.isArray(f), h = 0, f = g ? f : f[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var i;
          if (g) {
            if (h >= f.length) break;
            i = f[h++];
          } else {
            h = f.next();
            if (h.done) break;
            i = h.value;
          }
          i = i;
          var j = i[0];
          i = i[1];
          b.set(j, i);
        }
      }
      return b;
    }
    function b() {
      return { blocking: new Map(), nonblocking: new Map(), default: new Map() };
    }
    function d(a) {
      m.add(a);
    }
    function e(a) {
      m['delete'](a), l.inform(h, a, 'persistent');
    }
    function f(a, b) {
      n.add(o(a, b));
    }
    function p(a, b, c) {
      l.inform(o(a, b), c, 'persistent');
    }
    function q(a) {
      l.inform(j, a, 'persistent');
    }
    function r(a) {
      return l.subscribe(h, function (b, c) {
        return a(c);
      });
    }
    function s(a) {
      return l.subscribe(j, function (b, c) {
        return a(c);
      });
    }
    function t() {
      return new Set(m);
    }
    function u(a) {
      l.inform(i, a, 'persistent');
    }
    function v(a) {
      return l.subscribe(i, function (b, c) {
        b = o(c.source, c.sourceDetail);
        if (n.has(b)) {
          l.subscribe(b, function (b, d) {
            return a(babelHelpers['extends']({}, c, { efData: d }));
          });
          return;
        }
        a(c);
      });
    }
    function w(a) {
      return l.subscribe(k, a);
    }
    var x = !1;
    function y() {
      if (x) return;
      x = !0;
      l.inform(k, null, 'persistent');
    }
    g.flattenResourceMapSet = a;
    g.newResourceMapSet = b;
    g.notifyBootloadStart = d;
    g.notifyBootload = e;
    g.notifyHasteResponseEFStart = f;
    g.notifyHasteResponseEF = p;
    g.notifyDeferTimeout = q;
    g.onBootload = r;
    g.onDeferTimeout = s;
    g.getActiveBootloads = t;
    g.notifyHasteResponse = u;
    g.onHasteResponse = v;
    g.onResourceInLongTailBTManifest = w;
    g.notifyResourceInLongTailBTManifest = y;
  },
  98
);
__d(
  'performanceAbsoluteNow',
  ['performance'],
  function (a, b, c, d, e, f, g) {
    var h = function () {
      return Date.now();
    };
    function a(a) {
      h = a;
    }
    if (c('performance').now && c('performance').timing && c('performance').timing.navigationStart) {
      var i = c('performance').timing.navigationStart;
      b = function () {
        return c('performance').now() + i;
      };
    } else
      b = function () {
        return h();
      };
    b.setFallback = a;
    d = b;
    g['default'] = d;
  },
  98
);
__d(
  'BootloaderEventsManager',
  ['CallbackDependencyManager', 'performanceAbsoluteNow'],
  function (a, b, c, d, e, f) {
    var g;
    a = (function () {
      'use strict';
      function a() {
        (this.$1 = new (b('CallbackDependencyManager'))()), (this.$2 = new Map());
      }
      var c = a.prototype;
      c.rsrcDone = function (a) {
        return a;
      };
      c.bootload = function (a) {
        return 'bl:' + a.join(',');
      };
      c.tierOne = function (a) {
        return 't1:' + a;
      };
      c.tierTwoStart = function (a) {
        return 't2s:' + a;
      };
      c.tierTwo = function (a) {
        return 't2:' + a;
      };
      c.tierThreeStart = function (a) {
        return 't3s:' + a;
      };
      c.tierThree = function (a) {
        return 't3:' + a;
      };
      c.tierOneLog = function (a) {
        return 't1l:' + a;
      };
      c.tierTwoLog = function (a) {
        return 't2l:' + a;
      };
      c.tierThreeLog = function (a) {
        return 't3l:' + a;
      };
      c.beDone = function (a) {
        return 'beDone:' + a;
      };
      c.notify = function (a) {
        this.$2.set(a, (g || (g = b('performanceAbsoluteNow')))()), this.$1.satisfyPersistentDependency(a);
      };
      c.getEventTime = function (a) {
        return this.$2.get(a);
      };
      c.registerCallback = function (a, b) {
        this.$1.registerCallback(a, b);
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  'BitMap',
  [],
  function (a, b, c, d, e, f) {
    var g = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    a = (function () {
      function a() {
        (this.$1 = []), (this.$2 = null);
      }
      var b = a.prototype;
      b.set = function (a) {
        this.$2 != null && !this.$1[a] && (this.$2 = null);
        this.$1[a] = 1;
        return this;
      };
      b.toString = function () {
        var a = [];
        for (var b = 0; b < this.$1.length; b++) a.push(this.$1[b] ? 1 : 0);
        return a.length ? i(a.join('')) : '';
      };
      b.toCompressedString = function () {
        if (this.$1.length === 0) return '';
        if (this.$2 != null) return this.$2;
        var a = [],
          b = 1,
          c = this.$1[0] || 0,
          d = c.toString(2);
        for (var e = 1; e < this.$1.length; e++) {
          var f = this.$1[e] || 0;
          f === c ? b++ : (a.push(h(b)), (c = f), (b = 1));
        }
        b && a.push(h(b));
        return (this.$2 = i(d + a.join('')));
      };
      return a;
    })();
    function h(a) {
      a = a.toString(2);
      var b = '0'.repeat(a.length - 1);
      return b + a;
    }
    function i(a) {
      a = (a + '00000').match(/[01]{6}/g);
      var b = '';
      for (var c = 0; a != null && c < a.length; c++) b += g[parseInt(a[c], 2)];
      return b;
    }
    f['default'] = a;
  },
  66
);
__d(
  'CSRBitMap',
  ['BitMap'],
  function (a, b, c, d, e, f, g) {
    var h = new (c('BitMap'))();
    function a(a) {
      h.set(a);
    }
    function b() {
      return h.toCompressedString();
    }
    g.add = a;
    g.toCompressedString = b;
  },
  98
);
__d(
  'CSRIndexUtil',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    b = 0;
    function a(a) {
      a.substr(0, 1) === ':' || h(0, 21456, a);
      return a
        .substr(1)
        .split(',')
        .map(function (a) {
          return parseInt(a, 10);
        });
    }
    g.UNKNOWN_RESOURCE_INDEX = b;
    g.parseCSRIndexes = a;
  },
  98
);
__d(
  'BaseDeserializePHPQueryData',
  [],
  function (a, b, c, d, e, f) {
    var g = /^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;
    function h(a) {
      return a === 'hasOwnProperty' || a === '__proto__' ? '\ud83d\udf56' : a;
    }
    function a(a, b) {
      if (a == null || a === '') return {};
      var c = {};
      a = a.replace(/%5B/gi, '[').replace(/%5D/gi, ']');
      a = a.split('&');
      var d = Object.prototype.hasOwnProperty;
      for (var e = 0, f = a.length; e < f; e++) {
        var i = a[e].match(g);
        if (!i) {
          var j = a[e].indexOf('=');
          if (j === -1) c[b(a[e])] = null;
          else {
            var k = a[e].substring(0, j);
            j = a[e].substring(j + 1);
            c[b(k)] = b(j);
          }
        } else {
          k = i[2].split(/\]\[|\[|\]/).slice(0, -1);
          j = i[1];
          i = b(i[3] || '');
          k[0] = j;
          j = c;
          for (var l = 0; l < k.length - 1; l++) {
            var m = h(k[l]);
            if (m) {
              if (!d.call(j, m)) {
                var n = k[l + 1] && !k[l + 1].match(/^\d{1,3}$/) ? {} : [];
                j[m] = n;
                if (j[m] !== n) return c;
              }
              j = j[m];
            } else k[l + 1] && !k[l + 1].match(/^\d{1,3}$/) ? j.push({}) : j.push([]), (j = j[j.length - 1]);
          }
          j instanceof Array && k[k.length - 1] === '' ? j.push(i) : (j[h(k[k.length - 1])] = i);
        }
      }
      return c;
    }
    f.deserialize = a;
  },
  66
);
__d(
  'flattenPHPQueryData',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    function a(a) {
      return i(a, '', {});
    }
    function i(a, b, c) {
      if (a === null || a === void 0) c[b] = void 0;
      else if (typeof a === 'object') {
        typeof a.appendChild !== 'function' || h(0, 2616);
        for (var d in a) d !== '$$typeof' && Object.prototype.hasOwnProperty.call(a, d) && a[d] !== void 0 && i(a[d], b ? b + '[' + d + ']' : d, c);
      } else c[b] = a;
      return c;
    }
    g['default'] = a;
  },
  98
);
__d(
  'PHPQuerySerializer',
  ['BaseDeserializePHPQueryData', 'flattenPHPQueryData'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b = [];
      a = c('flattenPHPQueryData')(a);
      for (var d in a)
        if (Object.prototype.hasOwnProperty.call(a, d)) {
          var e = h(d);
          a[d] === void 0 ? b.push(e) : b.push(e + '=' + h(String(a[d])));
        }
      return b.join('&');
    }
    function h(a) {
      return encodeURIComponent(a).replace(/%5D/g, ']').replace(/%5B/g, '[');
    }
    function b(a) {
      return d('BaseDeserializePHPQueryData').deserialize(a, i);
    }
    function i(a) {
      try {
        return decodeURIComponent(a.replace(/\+/g, ' '));
      } catch (b) {
        return a;
      }
    }
    e = { serialize: a, encodeComponent: h, deserialize: b, decodeComponent: i };
    f.exports = e;
  },
  34
);
__d(
  'SimpleHook',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    a = (function () {
      function a() {
        (this.__callbacks = []), (this.call = this.$2);
      }
      var b = a.prototype;
      b.hasCallback = function (a) {
        var b = this.__callbacks;
        return (
          b.length > 0 &&
          (a == null ||
            b.some(function (b) {
              return b === a || b.$1 === a;
            }))
        );
      };
      b.add = function (a, b) {
        var c = this,
          d;
        if ((b == null ? void 0 : b.once) === !0) {
          b = function () {
            c.remove(d), a.apply(null, arguments);
          };
          b.$1 = a;
          d = b;
        } else d = a;
        this.__callbacks.push(d);
        return d;
      };
      b.removeLast = function () {
        return this.__callbacks.pop();
      };
      b.remove = function (a) {
        return this.removeIf(function (b) {
          return b === a;
        });
      };
      b.removeIf = function (a) {
        var b = this.__callbacks;
        this.__callbacks = b.filter(function (b) {
          return !a(b);
        });
        return b.length > this.__callbacks.length;
      };
      b.clear = function () {
        this.__callbacks = [];
      };
      b.$2 = function () {
        var a = this.__callbacks;
        for (var b = 0, c = a.length; b < c; ++b) {
          var d = a[b];
          d.apply(null, arguments);
        }
      };
      return a;
    })();
    f.SimpleHook = a;
  },
  66
);
__d(
  'BanzaiLazyQueue',
  ['SimpleHook'],
  function (a, b, c, d, e, f, g) {
    var h = [],
      i = new (d('SimpleHook').SimpleHook)();
    a = {
      onQueue: i,
      queuePost: function (a, b, c) {
        h.push([a, b, c]), i.call(a, b, c);
      },
      flushQueue: function () {
        var a = h;
        h = [];
        return a;
      },
    };
    f.exports = a;
  },
  34
);
__d(
  'ExecutionEnvironment',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    b = !!(a !== void 0 && a.document && a.document.createElement);
    c = typeof WorkerGlobalScope === 'function';
    d = { canUseDOM: b, canUseWorkers: typeof Worker !== 'undefined', canUseEventListeners: b && !!(a.addEventListener || a.attachEvent), canUseViewport: b && !!window.screen, isInWorker: c, isInBrowser: b || c };
    e.exports = d;
  },
  null
);
__d(
  'gkx',
  ['invariant', 'BanzaiLazyQueue', 'ExecutionEnvironment', 'emptyFunction'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = {},
      j = {};
    function k(a) {
      var b = i[a];
      b != null || h(0, 11797, a);
      j[a] || ((j[a] = !0), (d('ExecutionEnvironment').canUseDOM || d('ExecutionEnvironment').isInWorker) && d('BanzaiLazyQueue').queuePost('gk2_exposure', { identifier: a, hash: b.hash }));
      return b.result;
    }
    k.add = function (a, b) {
      for (var c in a) b && b.entry++, !(c in i) ? (i[c] = a[c]) : b && b.dup_entry++;
    };
    k.addLoggedInternal = function (a) {
      k.add(a);
      for (var b in a) j[b] = !0;
    };
    a = c('emptyFunction');
    k.getGKs = function () {
      return null;
    };
    k.getLogged = function () {
      return Object.keys(j).map(function (a) {
        return { identifier: a, hash: i[a].hash };
      });
    };
    k.setPass = a;
    k.setFail = a;
    k.clear = a;
    b = k;
    g['default'] = b;
  },
  98
);
__d(
  'PHPQuerySerializerNoEncoding',
  ['BaseDeserializePHPQueryData', 'PHPQuerySerializer', 'flattenPHPQueryData', 'gkx'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b = [];
      a = c('flattenPHPQueryData')(a);
      for (var d in a)
        if (Object.prototype.hasOwnProperty.call(a, d)) {
          var e = h(d);
          a[d] === void 0 ? b.push(e) : b.push(e + '=' + h(String(a[d])));
        }
      return b.join('&');
    }
    function h(a) {
      return a;
    }
    function b(a) {
      return d('BaseDeserializePHPQueryData').deserialize(a, i);
    }
    function i(a) {
      return c('gkx')('5241') ? a : d('PHPQuerySerializer').decodeComponent(a);
    }
    g.serialize = a;
    g.encodeComponent = h;
    g.deserialize = b;
    g.decodeComponent = i;
  },
  98
);
__d(
  'BlueCompatRouter',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    a = function (a) {
      return !1;
    };
    f.sendMessage = a;
  },
  66
);
__d(
  'ReloadPage',
  ['BlueCompatRouter', 'Env'],
  function (a, b, c, d, e, f) {
    var g;
    function c(c) {
      !(g || (g = b('Env'))).isCQuick ? a.window.location.reload(c) : b('BlueCompatRouter').sendMessage({ compatAction: 'reload' });
    }
    function d(b) {
      a.setTimeout(this.now.bind(this), b);
    }
    f.now = c;
    f.delay = d;
  },
  66
);
__d(
  'ErrorGuardState',
  ['fb-error'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('fb-error').ErrorGuardState;
  },
  98
);
__d(
  'ErrorNormalizeUtils',
  ['fb-error'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('fb-error').ErrorNormalizeUtils;
  },
  98
);
__d(
  'ErrorPubSub',
  ['fb-error'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('fb-error').ErrorPubSub;
  },
  98
);
__d(
  'ErrorSerializer',
  ['fb-error'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('fb-error').ErrorSerializer;
  },
  98
);
__d(
  'getErrorSafe',
  ['fb-error'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('fb-error').getErrorSafe;
  },
  98
);
__d(
  'ErrorUtils',
  ['ErrorGuard', 'ErrorGuardState', 'ErrorNormalizeUtils', 'ErrorPubSub', 'ErrorSerializer', 'getErrorSafe'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h, i, j;
    h || b('ErrorGuardState');
    b('ErrorNormalizeUtils');
    i || (i = b('ErrorPubSub'));
    b('getErrorSafe');
    j || (j = b('ErrorGuard'));
    b('ErrorSerializer');
    a.getErrorSafe = c('getErrorSafe');
    a.ErrorGuard = c('ErrorGuard');
    a.ErrorSerializer = c('ErrorSerializer');
    d = {
      history: c('ErrorPubSub').history,
      applyWithGuard: function (a, b, d, e, f, g) {
        return c('ErrorGuard').applyWithGuard(a, b, (a = d) != null ? a : [], { name: f, onNormalizedError: e, deferredSource: g == null ? void 0 : g.deferredSource });
      },
      guard: function (a, b, d) {
        a = c('ErrorGuard').guard(a, b != null ? { name: b } : null);
        d != null && (a = a.bind(d));
        return a;
      },
      normalizeError: function (a) {
        var b;
        return (b = c('ErrorNormalizeUtils').ifNormalizedError(a)) != null ? b : c('ErrorNormalizeUtils').normalizeError(c('getErrorSafe')(a));
      },
    };
    a.ErrorUtils = d;
    e = d;
    typeof __t === 'function' && __t.setHandler && __t.setHandler(c('ErrorPubSub').reportError);
    g['default'] = e;
  },
  99
);
__d(
  'JavelinEvent',
  [],
  function (a, b, c, d, e, f) {
    var g = { 8: 'delete', 9: 'tab', 13: 'return', 27: 'esc', 32: 'space', 37: 'left', 38: 'up', 39: 'right', 40: 'down', 63232: 'up', 63233: 'down', 62234: 'left', 62235: 'right' };
    a = (function () {
      function a() {
        var a = this;
        this.$1 = null;
        this.$2 = null;
        this.$3 = null;
        this.$4 = null;
        this.$5 = [];
        this.$6 = !1;
        this.$7 = !1;
        this.$8 = {};
        this.$9 = {};
        this.$10 = !0;
        this.stop = function () {
          var b = a.getRawEvent();
          b && ((b.cancelBubble = !0), b.stopPropagation && b.stopPropagation());
          a.setStopped(!0);
          return a;
        };
        this.getRawEvent = function () {
          return a.$1;
        };
      }
      var b = a.prototype;
      b.prevent = function () {
        var a = this.getRawEvent();
        a && ((a.returnValue = !1), this.$10 && a.preventDefault && a.preventDefault());
        this.setPrevented(!0);
        return this;
      };
      b.kill = function () {
        this.prevent();
        this.stop();
        return this;
      };
      b.getSpecialKey = function () {
        var a = this.getRawEvent();
        if (!a || a.shiftKey) return null;
        if (a instanceof KeyboardEvent) {
          a = a.keyCode;
          return g[a.toString()] || null;
        }
        return null;
      };
      b.isRightButton = function () {
        var a = this.getRawEvent();
        return a instanceof MouseEvent ? a.which == 3 || a.button == 2 : !1;
      };
      b.getNode = function (a) {
        return this.getNodes()[a] || null;
      };
      b.getTouch = function () {
        var a = this.getRawEvent();
        if (window.TouchEvent && a instanceof TouchEvent) {
          a = a.changedTouches;
          return (a && a[0]) || {};
        }
        return {};
      };
      b.setRawEvent = function (a) {
        this.$1 = a;
        return this;
      };
      b.getType = function () {
        return this.$2;
      };
      b.setType = function (a) {
        this.$2 = a;
        return this;
      };
      b.getTarget = function () {
        return this.$3;
      };
      b.setTarget = function (a) {
        this.$3 = a;
        return this;
      };
      b.getData = function () {
        return this.$4 || {};
      };
      b.setData = function (a) {
        this.$4 = a;
        return this;
      };
      b.getPath = function () {
        return this.$5;
      };
      b.setPath = function (a) {
        this.$5 = a;
        return this;
      };
      b.getStopped = function () {
        return this.$6;
      };
      b.setStopped = function (a) {
        this.$6 = a;
        return this;
      };
      b.getPrevented = function () {
        return this.$7;
      };
      b.setPrevented = function (a) {
        this.$7 = a;
        return this;
      };
      b.getNodes = function () {
        return this.$8;
      };
      b.setNodes = function (a) {
        this.$8 = a;
        return this;
      };
      b.getNodeDistances = function () {
        return this.$9;
      };
      b.setNodeDistances = function (a) {
        this.$9 = a;
        return this;
      };
      b.setCanPreventDefaultInRawEvent = function (a) {
        this.$10 = a;
        return this;
      };
      b.toString = function () {
        return Object.prototype.toString.call(this);
      };
      return a;
    })();
    f['default'] = a;
  },
  66
);
__d(
  'LogHistory',
  [],
  function (a, b, c, d, e, f) {
    var g = 500,
      h = {},
      i = [];
    function j(a, b, c, d) {
      var e = d[0];
      if (typeof e !== 'string' || d.length !== 1) return;
      i.push({ date: Date.now(), level: a, category: b, event: c, args: e });
      i.length > g && i.shift();
    }
    var k = (function () {
      function a(a) {
        this.category = a;
      }
      var b = a.prototype;
      b.debug = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        j('debug', this.category, a, c);
        return this;
      };
      b.log = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        j('log', this.category, a, c);
        return this;
      };
      b.warn = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        j('warn', this.category, a, c);
        return this;
      };
      b.error = function (a) {
        for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
        j('error', this.category, a, c);
        return this;
      };
      return a;
    })();
    function a(a) {
      h[a] || (h[a] = new k(a));
      return h[a];
    }
    function b() {
      return i;
    }
    function c() {
      i.length = 0;
    }
    function d(a) {
      return a
        .map(function (a) {
          var b = /\d\d:\d\d:\d\d/.exec(new Date(a.date).toString());
          return [b && b[0], a.level, a.category, a.event, a.args].join(' | ');
        })
        .join('\n');
    }
    f.getInstance = a;
    f.getEntries = b;
    f.clearEntries = c;
    f.formatEntries = d;
  },
  66
);
/**
 * License: https://www.facebook.com/legal/license/09P_rcHKL4D/
 */
__d(
  'Alea',
  [],
  function (a, b, c, d, e, f) {
    function g() {
      var a = 4022871197,
        b = function (b) {
          b = b.toString();
          for (var c = 0; c < b.length; c++) {
            a += b.charCodeAt(c);
            var d = 0.02519603282416938 * a;
            a = d >>> 0;
            d -= a;
            d *= a;
            a = d >>> 0;
            d -= a;
            a += d * 4294967296;
          }
          return (a >>> 0) * 23283064365386963e-26;
        };
      b.version = 'Mash 0.9';
      return b;
    }
    function a() {
      var a = 0,
        b = 0,
        c = 0,
        d = 1;
      for (var e = arguments.length, f = new Array(e), h = 0; h < e; h++) f[h] = arguments[h];
      var i = f.length > 0 ? f : [new Date()],
        j = new g();
      a = j(' ');
      b = j(' ');
      c = j(' ');
      for (var k = 0; k < i.length; k++) (a -= j(i[k])), a < 0 && (a += 1), (b -= j(i[k])), b < 0 && (b += 1), (c -= j(i[k])), c < 0 && (c += 1);
      j = null;
      var l = function () {
        var e = 2091639 * a + d * 23283064365386963e-26;
        a = b;
        b = c;
        c = e - (d = e | 0);
        return c;
      };
      l.version = 'Alea 0.9';
      l.args = i;
      return l;
    }
    f['default'] = a;
  },
  66
);
__d(
  'Random',
  ['Alea', 'ServerNonce'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g = 4294967296,
      h = b('ServerNonce').ServerNonce,
      i;
    function j() {
      i == null && (i = b('Alea')(h));
      return i;
    }
    var k = {
      random: (function () {
        var b = typeof Uint32Array === 'function' ? new Uint32Array(1) : null,
          c = a.crypto || a.msCrypto;
        if (b != null)
          try {
            var d = c == null ? void 0 : c.getRandomValues;
            if (typeof d === 'function') {
              var e = d.bind(c);
              return function () {
                try {
                  e(b);
                } catch (a) {
                  return j()();
                }
                return b[0] / g;
              };
            }
          } catch (a) {}
        return j();
      })(),
      uint32: function () {
        return Math.floor(k.random() * g);
      },
      coinflip: function (a) {
        if (a === 0) return !1;
        return a <= 1 ? !0 : k.random() * a <= 1;
      },
    };
    e.exports = k;
  },
  null
);
__d(
  'requireCond',
  [],
  function (a, b, c, d, e, f) {
    function a(a, b, c) {
      throw new Error('Cannot use raw untransformed requireCond.');
    }
    b = a;
    f['default'] = b;
  },
  66
);
__d(
  'TimeSlice',
  ['cr:717822'],
  function (a, b, c, d, e, f, g) {
    g['default'] = b('cr:717822');
  },
  98
);
__d(
  'StratcomManager',
  ['TimeSlice'],
  function (a, b, c, d, e, f) {
    var g;
    function a(a) {
      g = a;
    }
    var h = [],
      i = function (b) {
        h.push(b);
        if (g) {
          var c = h;
          h = [];
          for (var a = 0; a < c.length; ++a) {
            var d = c[a];
            g.dispatch(d);
          }
        } else {
          d = b.srcElement || b.target;
          if (d && b.type in { click: 1, submit: 1 } && d.getAttribute && d.getAttribute('data-mustcapture') === '1') {
            b.returnValue = !1;
            b.preventDefault && b.preventDefault();
            a = document;
            c = a.body;
            c && (c.id = 'event_capture');
            return !1;
          }
        }
      };
    d = {};
    function c(a, c) {
      var d = c === 'touchstart' || c === 'touchmove';
      a.addEventListener(c, b('TimeSlice').guard(i, 'Stratcom:' + c), { capture: !0, passive: d });
    }
    f = [
      'click',
      'change',
      'submit',
      'keypress',
      'mousedown',
      'mouseover',
      'mouseout',
      'mouseup',
      'load',
      'keyup',
      'keydown',
      'input',
      'drop',
      'dragenter',
      'dragleave',
      'dragover',
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'loadedmetadata',
      'playing',
      'pause',
      'ended',
      'waiting',
      'timeupdate',
      'volumechange',
    ];
    d = document;
    d = d.documentElement;
    if (d) for (var j = 0; j < f.length; ++j) c(d, f[j]);
    d = ['onpagehide' in window ? 'pagehide' : 'unload', 'resize', 'focus', 'blur', 'popstate', 'hashchange'];
    for (var f = 0; f < d.length; ++f) c(window, d[f]);
    j = { allowedEvents: {}, injectStratcom: a, enableDispatch: c };
    e.exports = j;
  },
  null
);
__d(
  'createArrayFromMixed',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    function i(a) {
      var b = a.length;
      (!Array.isArray(a) && (typeof a === 'object' || typeof a === 'function')) || h(0, 3914);
      typeof b === 'number' || h(0, 3915);
      b === 0 || b - 1 in a || h(0, 3916);
      typeof a.callee !== 'function' || h(0, 3917);
      if (a.hasOwnProperty)
        try {
          return Array.prototype.slice.call(a);
        } catch (a) {}
      var c = Array(b);
      for (var d = 0; d < b; d++) c[d] = a[d];
      return c;
    }
    function j(a) {
      return !!a && (typeof a === 'object' || typeof a === 'function') && 'length' in a && !('setInterval' in a) && typeof a.nodeType !== 'number' && (Array.isArray(a) || 'callee' in a || 'item' in a);
    }
    function a(a) {
      if (!j(a)) return [a];
      else if (Array.isArray(a)) return a.slice();
      else return i(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'nullthrows',
  [],
  function (a, b, c, d, e, f) {
    function a(a, b) {
      b === void 0 && (b = 'Got unexpected null or undefined');
      if (a != null) return a;
      a = new Error(b);
      a.framesToPop = 1;
      throw a;
    }
    f['default'] = a;
  },
  66
);
__d(
  'Stratcom',
  ['ErrorUtils', 'JavelinEvent', 'LogHistory', 'Random', 'StratcomManager', 'createArrayFromMixed', 'nullthrows'],
  function (a, b, c, d, e, f, g) {
    var h = d('LogHistory').getInstance('stratcom'),
      i = {
        ready: !1,
        _targets: {},
        _handlers: [],
        _need: {},
        _useCapture: {},
        _auto: '*',
        _execContext: [],
        _initialized: !1,
        init: function () {
          if (i._initialized) return;
          i.mergeData();
          i._initialized = !0;
        },
        invoke: function (a, b, d) {
          b = c('createArrayFromMixed')(b);
          return i._dispatchProxy(
            new (c('JavelinEvent'))()
              .setType(a)
              .setData(d || {})
              .setPath(b || [])
          );
        },
        listen: function (a, b, c) {
          return i._listen(a, b, c, !1);
        },
        listenCapture: function (a, b, c) {
          return i._listen(a, b, c, !0);
        },
        _listen: function (a, b, d, e) {
          i.init();
          var f = [];
          a = c('createArrayFromMixed')(a);
          b = i._normalizePaths(b);
          var g = {
            _callback: d,
            remove: function () {
              if (g) {
                if (g._callback) {
                  delete g._callback;
                  for (var a = 0; a < c('nullthrows')(f).length; a++) delete i._handlers[c('nullthrows')(f)[a]];
                }
                f = null;
              }
            },
          };
          for (var d = 0; d < a.length; ++d) {
            var h = a[d];
            'onpagehide' in window && h == 'unload' && (h = 'pagehide');
            h in i._targets || (i._targets[h] = {});
            h = i._targets[h];
            for (var j = 0; j < b.length; ++j) {
              var k = b[j],
                l = i._handlers.length;
              i._handlers.push(g);
              i._useCapture[l] = e || !1;
              i._need[l] = k.length;
              f.push(l);
              for (var m = 0; m < k.length; ++m) (h[k[m]] || (h[k[m]] = [])).push(l);
            }
          }
          return g;
        },
        removeCurrentListener: function () {
          var a = i._execContext[i._execContext.length - 1],
            b = a.listeners;
          a = a.cursor - 1;
          b[a] && b[a].handler.remove();
        },
        getJavelinEventFromNative: function (a) {
          var b = [],
            d = {},
            e = {},
            f = function (c, f, a) {
              d[c] || ((d[c] = f), (e[c] = a), b.push(c));
            },
            g = a.srcElement || a.target;
          g && g.nodeType === 3 && (g = g.parentNode);
          (!g || !g.getAttribute) && (g = null);
          var h = 1,
            i = g;
          while (i instanceof Element) {
            f('tag:' + i.nodeName.toLowerCase(), i, h);
            var j = i.id;
            j && f('id:' + j, i, h);
            j = i.getAttribute('data-sigil');
            if (j) {
              j = j.split(' ');
              for (var k = 0; k < j.length; k++) f(j[k], i, h);
            }
            k = i.getAttribute('data-autoid');
            k && f('autoid:' + k, i, h);
            ++h;
            i = i.parentNode;
          }
          j = a.type;
          j == 'focusin' ? (j = 'focus') : j == 'focusout' && (j = 'blur');
          k = new (c('JavelinEvent'))().setRawEvent(a).setType(j).setTarget(g).setNodes(d).setNodeDistances(e).setPath(b.reverse());
          return k;
        },
        dispatch: function (a) {
          return i._dispatchProxy(i.getJavelinEventFromNative(a));
        },
        _dispatchProxy: function (a) {
          i.init();
          var b = a.getType();
          if (!b) return a;
          b = i._targets[b];
          if (!b) return a;
          var c = a.getPath(),
            d = a.getNodeDistances(),
            e = c.length,
            f = {},
            g = {},
            h,
            j = 1e6;
          for (var k = -1; k < e; ++k) {
            h = b[k == -1 ? i._auto : c[k]];
            if (h) {
              var l = d[c[k]] || j;
              for (var m = 0; m < h.length; ++m) {
                var n = h[m];
                f[n] = (f[n] || 0) + 1;
                g[n] = Math.min(g[n] || l, l);
              }
            }
          }
          n = [];
          for (var o in f)
            if (f[o] == i._need[o]) {
              l = i._handlers[parseInt(o, 10)];
              l && n.push({ distance: g[o], useCapture: i._useCapture[o], handler: l });
            }
          n.sort(function (a, b) {
            return a.useCapture !== b.useCapture ? (a.useCapture ? -1 : 1) : a.distance - b.distance;
          });
          i._execContext.push({ listeners: n, event: a, cursor: 0 });
          i.pass();
          i._execContext.pop();
          return a;
        },
        pass: function () {
          var a = i._execContext[i._execContext.length - 1],
            b = a.event,
            d = a.listeners;
          while (a.cursor < d.length) {
            var e = a.cursor++;
            if (d[e]) {
              var f = d[e].handler;
              f._callback &&
                (function () {
                  var a = b.getType(),
                    d = b.getPath(),
                    e = b.getTarget();
                  c('ErrorUtils').applyWithGuard(
                    f._callback,
                    f,
                    [b],
                    function (b) {
                      h.error('pass', a, d, e, b.message);
                    },
                    'Stratcom:pass type: ' + (a || '') + ' path: [' + (d ? d.toString() : '') + '] target: ' + (e ? e.toString() : '')
                  );
                })();
            }
            if (b.getStopped()) break;
          }
          return b.getStopped() || b.getPrevented();
        },
        context: function () {
          var a = i._execContext.length;
          return a ? i._execContext[a - 1].event : null;
        },
        mergeData: function () {
          d('StratcomManager').injectStratcom(i);
        },
        hasSigil: function (a, b) {
          a = a.getAttribute('data-sigil') || !1;
          return a && (' ' + a + ' ').indexOf(' ' + b + ' ') > -1;
        },
        addSigil: function (a, b) {
          var c = a.getAttribute('data-sigil') || '';
          i.hasSigil(a, b) || (c += ' ' + b);
          a.setAttribute('data-sigil', c);
        },
        removeSigil: function (a, b) {
          var c = a.getAttribute('data-sigil') || '';
          i.hasSigil(a, b) && ((c = ' ' + c + ' '), (c = c.replace(' ' + b + ' ', ' ')), (c = c.substring(1, c.length - 1)), a.setAttribute('data-sigil', c));
        },
        _normalizePaths: function (a) {
          a || (a = i._auto);
          !Array.isArray(a) ? (a = [[a]]) : Array.isArray(a[0]) || (a = [a]);
          return a;
        },
      };
    a = i;
    g['default'] = a;
  },
  98
);
__d(
  'PHPStrictQuerySerializer',
  ['PHPQuerySerializer', 'flattenPHPQueryData'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b = [];
      a = c('flattenPHPQueryData')(a);
      for (var d in a)
        if (Object.prototype.hasOwnProperty.call(a, d)) {
          var e = h(d);
          a[d] === void 0 ? b.push(e) : b.push(e + '=' + h(String(a[d])));
        }
      return b.join('&');
    }
    function h(a) {
      return encodeURIComponent(a);
    }
    g.serialize = a;
    g.encodeComponent = h;
    g.deserialize = d('PHPQuerySerializer').deserialize;
    g.decodeComponent = d('PHPQuerySerializer').decodeComponent;
  },
  98
);
__d(
  'URIRFC3986',
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp('^([^:/?#]+:)?(//([^\\\\/?#@]*@)?(\\[[A-Fa-f0-9:.]+\\]|[^\\/?#:]*)(:[0-9]*)?)?([^?#]*)(\\?[^#]*)?(#.*)?');
    function a(a) {
      if (a.trim() === '') return null;
      a = a.match(g);
      if (a == null) return null;
      var b = a[2] ? a[2].substr(2) : null,
        c = a[1] ? a[1].substr(0, a[1].length - 1) : null;
      a = {
        uri: a[0] ? a[0] : null,
        scheme: c,
        authority: b,
        userinfo: a[3] ? a[3].substr(0, a[3].length - 1) : null,
        host: a[2] ? a[4] : null,
        port: a[5] ? (a[5].substr(1) ? parseInt(a[5].substr(1), 10) : null) : null,
        path: a[6] ? a[6] : null,
        query: a[7] ? a[7].substr(1) : null,
        fragment: a[8] ? a[8].substr(1) : null,
        isGenericURI: b === null && !!c,
      };
      return a;
    }
    f.parse = a;
  },
  66
);
__d(
  'createObjectFrom',
  [],
  function (a, b, c, d, e, f) {
    function g(a, b) {
      if (b === void 0) return g(a, !0);
      var c = {};
      if (Array.isArray(b)) for (var d = a.length - 1; d >= 0; d--) c[a[d]] = b[d];
      else for (var d = a.length - 1; d >= 0; d--) c[a[d]] = b;
      return c;
    }
    f['default'] = g;
  },
  66
);
__d(
  'URISchemes',
  ['createObjectFrom'],
  function (a, b, c, d, e, f, g) {
    var h = c('createObjectFrom')([
      'aidemos',
      'aistudio',
      'blob',
      'cmms',
      'fb',
      'fba',
      'fbatwork',
      'fb-ama',
      'fb-internal',
      'fb-workchat',
      'fb-workchat-secure',
      'fb-messenger',
      'fb-messenger-public',
      'fb-messenger-group-thread',
      'fb-page-messages',
      'fb-pma',
      'fbcf',
      'fbconnect',
      'fbinternal',
      'fbmobilehome',
      'fbrpc',
      'file',
      'flipper',
      'ftp',
      'gtalk',
      'http',
      'https',
      'mailto',
      'wss',
      'ms-app',
      'intent',
      'itms',
      'itms-apps',
      'lasso',
      'market',
      'svn+ssh',
      'fbstaging',
      'tel',
      'sms',
      'pebblejs',
      'sftp',
      'whatsapp',
      'moments',
      'flash',
      'fblite',
      'chrome-extension',
      'webcal',
      'instagram',
      'fb124024574287414',
      'fb124024574287414rc',
      'fb124024574287414master',
      'fb1576585912599779',
      'fb929757330408142',
      'designpack',
      'fbpixelcloud',
      'fbapi20130214',
      'fb1196383223757595',
      'oculus',
      'oculus.store',
      'oculus.feed',
      'oculusstore',
      'odh',
      'skype',
      'callto',
      'messenger',
      'workchat',
      'fb236786383180508',
      'fb1775440806014337',
      'data',
      'fb-mk',
      'munki',
      'kirigami',
      'origami-file',
      'fb-nimble-vrsrecorder',
      'fb-nimble-monohandtrackingvis',
      'together',
      'togetherbl',
      'horizonlauncher',
      'venues',
      'whatsapp-consumer',
      'whatsapp-smb',
      'fb-ide-opener',
      'fb-vscode',
      'fb-vscode-insiders',
      'spark-studio',
    ]);
    function a(a) {
      return a == null || a === '' ? !0 : Object.prototype.hasOwnProperty.call(h, a.toLowerCase());
    }
    g.isAllowed = a;
  },
  98
);
__d(
  'setHostSubdomain',
  [],
  function (a, b, c, d, e, f) {
    function a(a, b) {
      a = a.split('.');
      a.length < 3 ? a.unshift(b) : (a[0] = b);
      return a.join('.');
    }
    f['default'] = a;
  },
  66
);
__d(
  'URIAbstractBase',
  ['invariant', 'FBLogger', 'PHPStrictQuerySerializer', 'URIRFC3986', 'URISchemes', 'setHostSubdomain'],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j = new RegExp('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'),
      k = new RegExp('^(?:[^/]*:|[\\x00-\\x1f]*/[\\x00-\\x1f]*/)'),
      l = [];
    a = (function () {
      'use strict';
      a.parse = function (c, d, e, f) {
        if (!d) return !0;
        if (d instanceof a) {
          c.setProtocol(d.getProtocol());
          c.setDomain(d.getDomain());
          c.setPort(d.getPort());
          c.setPath(d.getPath());
          c.setQueryData(f.deserialize(f.serialize(d.getQueryData())));
          c.setFragment(d.getFragment());
          c.setIsGeneric(d.getIsGeneric());
          c.setForceFragmentSeparator(d.getForceFragmentSeparator());
          c.setOriginalRawQuery(d.getOriginalRawQuery());
          c.setQueryParamModified(!1);
          return !0;
        }
        d = d.toString().trim();
        var g = (h || (h = b('URIRFC3986'))).parse(d) || { fragment: null, scheme: null, query: null };
        if (!e && !(i || (i = b('URISchemes'))).isAllowed(g.scheme)) return !1;
        c.setProtocol(g.scheme || '');
        if (!e && j.test(g.host || '')) return !1;
        c.setDomain(g.host || '');
        c.setPort(g.port || '');
        c.setPath(g.path || '');
        if (e) c.setQueryData(f.deserialize(g.query || '') || {});
        else
          try {
            c.setQueryData(f.deserialize(g.query || '') || {});
          } catch (a) {
            return !1;
          }
        c.setFragment(g.fragment || '');
        g.fragment === '' && c.setForceFragmentSeparator(!0);
        c.setIsGeneric(g.isGenericURI || !1);
        c.setOriginalRawQuery(g.query);
        c.setQueryParamModified(!1);
        if (g.userinfo !== null) {
          if (e) throw new Error('URI.parse: invalid URI (userinfo is not allowed in a URI): ' + d);
          return !1;
        }
        if (!c.getDomain() && c.getPath().indexOf('\\') !== -1) {
          if (e) throw new Error('URI.parse: invalid URI (no domain but multiple back-slashes): ' + d);
          return !1;
        }
        if (!c.getProtocol() && k.test(d)) {
          if (e) throw new Error('URI.parse: invalid URI (unsafe protocol-relative URLs): ' + d + "'");
          return !1;
        }
        if (c.getDomain() && c.getPath() && !c.getPath().startsWith('/')) {
          if (e) throw new Error('URI.parse: invalid URI (domain and path where path lacks leading slash): ' + d);
          return !1;
        }
        f = c.getProtocol() === 'mailto' || c.getProtocol() === 'tel' || c.getProtocol() === 'sms';
        c.getProtocol() && !f && !c.getDomain() && c.getPath() !== '' && b('FBLogger')('uri').warn('URI.parse: invalid URI (protocol "' + c.getProtocol() + '" with no domain)');
        return !0;
      };
      a.tryParse = function (b, c) {
        var d = new a(null, c);
        return a.parse(d, b, !1, c) ? d : null;
      };
      a.isValid = function (b, c) {
        return !!a.tryParse(b, c);
      };
      function a(b, c) {
        c || g(0, 2966), (this.$9 = c), (this.$7 = ''), (this.$1 = ''), (this.$6 = ''), (this.$5 = ''), (this.$3 = ''), (this.$4 = !1), (this.$8 = {}), (this.$2 = !1), a.parse(this, b, !0, c), (this.$11 = !1);
      }
      var c = a.prototype;
      c.setProtocol = function (a) {
        (i || (i = b('URISchemes'))).isAllowed(a) || g(0, 11793, a);
        this.$7 = a;
        return this;
      };
      c.getProtocol = function () {
        return (this.$7 || '').toLowerCase();
      };
      c.setSecure = function (a) {
        return this.setProtocol(a ? 'https' : 'http');
      };
      c.isSecure = function () {
        return this.getProtocol() === 'https';
      };
      c.setDomain = function (a) {
        if (j.test(a)) throw new Error('URI.setDomain: unsafe domain specified: ' + a + ' for url ' + this.toString());
        this.$1 = a;
        return this;
      };
      c.getDomain = function () {
        return this.$1;
      };
      c.setPort = function (a) {
        this.$6 = a;
        return this;
      };
      c.getPort = function () {
        return this.$6;
      };
      c.setPath = function (a) {
        this.$5 = a;
        return this;
      };
      c.getPath = function () {
        return this.$5;
      };
      c.addQueryData = function (a, b) {
        Object.prototype.toString.call(a) === '[object Object]' ? Object.assign(this.$8, a) : (this.$8[a] = b);
        this.$11 = !0;
        return this;
      };
      c.setQueryData = function (a) {
        this.$8 = a;
        this.$11 = !0;
        return this;
      };
      c.getQueryData = function () {
        return this.$8;
      };
      c.setQueryString = function (a) {
        return this.setQueryData(this.$9.deserialize(a));
      };
      c.getQueryString = function (a, b, c) {
        a === void 0 && (a = !1);
        b === void 0 &&
          (b = function () {
            return !1;
          });
        c === void 0 && (c = null);
        return this.$12(!1, a, b, c);
      };
      c.$12 = function (a, b, c, d) {
        a === void 0 && (a = !1);
        b === void 0 && (b = !1);
        c === void 0 &&
          (c = function () {
            return !1;
          });
        d === void 0 && (d = null);
        if (!this.$11 && (b || c(this.getDomain()))) {
          return (b = this.$10) != null ? b : '';
        }
        return (a && d ? d : this.$9).serialize(this.getQueryData());
      };
      c.removeQueryData = function (a) {
        Array.isArray(a) || (a = [a]);
        for (var b = 0, c = a.length; b < c; ++b) delete this.$8[a[b]];
        this.$11 = !0;
        return this;
      };
      c.setFragment = function (a) {
        this.$3 = a;
        this.setForceFragmentSeparator(!1);
        return this;
      };
      c.getFragment = function () {
        return this.$3;
      };
      c.setForceFragmentSeparator = function (a) {
        this.$2 = a;
        return this;
      };
      c.getForceFragmentSeparator = function () {
        return this.$2;
      };
      c.setIsGeneric = function (a) {
        this.$4 = a;
        return this;
      };
      c.getIsGeneric = function () {
        return this.$4;
      };
      c.getOriginalRawQuery = function () {
        return this.$10;
      };
      c.setOriginalRawQuery = function (a) {
        this.$10 = a;
        return this;
      };
      c.setQueryParamModified = function (a) {
        this.$11 = a;
        return this;
      };
      c.isEmpty = function () {
        return !(this.getPath() || this.getProtocol() || this.getDomain() || this.getPort() || Object.keys(this.getQueryData()).length > 0 || this.getFragment());
      };
      c.toString = function (a, b) {
        a === void 0 &&
          (a = function () {
            return !1;
          });
        b === void 0 && (b = null);
        return this.$13(!1, !1, a, b);
      };
      c.toStringRawQuery = function (a, b) {
        a === void 0 &&
          (a = function () {
            return !1;
          });
        b === void 0 && (b = null);
        return this.$13(!0, !1, a, b);
      };
      c.toStringPreserveQuery = function (a, b) {
        a === void 0 &&
          (a = function () {
            return !1;
          });
        b === void 0 && (b = null);
        return this.$13(!1, !0, a, b);
      };
      c.toStringStrictQueryEncoding = function (a) {
        a === void 0 &&
          (a = function () {
            return !1;
          });
        return this.$13(!0, !1, a, b('PHPStrictQuerySerializer'));
      };
      c.$13 = function (a, b, c, d) {
        a === void 0 && (a = !1);
        b === void 0 && (b = !1);
        c === void 0 &&
          (c = function () {
            return !1;
          });
        d === void 0 && (d = null);
        var e = this;
        for (var f = 0; f < l.length; f++) e = l[f](e);
        return e.$14(a, b, c, d);
      };
      c.$14 = function (a, b, c, d) {
        a === void 0 && (a = !1);
        b === void 0 && (b = !1);
        c === void 0 &&
          (c = function () {
            return !1;
          });
        d === void 0 && (d = null);
        var e = '',
          f = this.getProtocol();
        f && (e += f + ':' + (this.getIsGeneric() ? '' : '//'));
        f = this.getDomain();
        f && (e += f);
        f = this.getPort();
        f && (e += ':' + f);
        f = this.getPath();
        f ? (e += f) : e && (e += '/');
        f = this.$12(a, b, c, d);
        f && (e += '?' + f);
        a = this.getFragment();
        a ? (e += '#' + a) : this.getForceFragmentSeparator() && (e += '#');
        return e;
      };
      a.registerFilter = function (a) {
        l.push(a);
      };
      c.getOrigin = function () {
        var a = this.getPort();
        return this.getProtocol() + '://' + this.getDomain() + (a ? ':' + a : '');
      };
      c.isSameOrigin = function (a) {
        return !this.getProtocol() || !this.getDomain() || !a.getProtocol() || !a.getDomain() ? !1 : this.getOrigin() === a.getOrigin();
      };
      c.getQualifiedURIBase = function () {
        return new a(this, this.$9).qualify();
      };
      c.qualify = function () {
        if (!this.getDomain()) {
          var b = new a(window.location.href, this.$9);
          this.setProtocol(b.getProtocol()).setDomain(b.getDomain()).setPort(b.getPort());
        }
        return this;
      };
      c.setSubdomain = function (a) {
        var c = this.qualify();
        c = c.getDomain();
        return this.setDomain(b('setHostSubdomain')(c, a));
      };
      c.getSubdomain = function () {
        if (!this.getDomain()) return '';
        var a = this.getDomain().split('.');
        if (a.length <= 2) return '';
        else return a[0];
      };
      c.isSubdomainOfDomain = function (b) {
        var c = this.getDomain();
        return a.isDomainSubdomainOfDomain(c, b, this.$9);
      };
      a.isDomainSubdomainOfDomain = function (b, c, d) {
        if (c === '' || b === '') return !1;
        if (b.endsWith(c)) {
          var e = b.length,
            f = c.length,
            g = e - f - 1;
          if (e === f || b[g] === '.') {
            e = new a(null, d);
            e.setDomain(c);
            return a.isValid(e, d);
          }
        }
        return !1;
      };
      return a;
    })();
    e.exports = a;
  },
  null
);
__d(
  'URIBase',
  ['PHPQuerySerializerNoEncoding', 'URIAbstractBase', 'UriNeedRawQuerySVChecker', 'err'],
  function (a, b, c, d, e, f) {
    function g(a, c, d, e) {
      try {
        a = b('URIAbstractBase').parse(a, c, d, e);
        return a;
      } catch (a) {
        throw new Error(b('err')(a.message));
      }
    }
    a = (function (a) {
      'use strict';
      babelHelpers.inheritsLoose(c, a);
      c.tryParse = function (a, b) {
        var d = new c(null, b);
        return g(d, a, !1, b) ? d : null;
      };
      c.isValid = function (a, b) {
        return !!c.tryParse(a, b);
      };
      function c(b, c) {
        var d;
        d = a.call(this, b, c) || this;
        d.$URIBase1 = c;
        g(babelHelpers.assertThisInitialized(d), b, !0, c);
        return d;
      }
      var d = c.prototype;
      d.setDomain = function (c) {
        try {
          a.prototype.setDomain.call(this, c);
        } catch (a) {
          throw new Error(b('err')(a.message));
        }
        return this;
      };
      d.getQualifiedURIBase = function () {
        return new c(this, this.$URIBase1).qualify();
      };
      d.qualify = function () {
        if (!this.getDomain()) {
          var a = new c(window.location.href, this.$URIBase1);
          this.setProtocol(a.getProtocol()).setDomain(a.getDomain()).setPort(a.getPort());
        }
        return this;
      };
      d.isSubdomainOfDomain = function (a) {
        var b = this.getDomain();
        return c.isDomainSubdomainOfDomain(b, a, this.$URIBase1);
      };
      c.isDomainSubdomainOfDomain = function (a, b, d) {
        if (b === '' || a === '') return !1;
        if (a.endsWith(b)) {
          var e = a.length,
            f = b.length,
            g = e - f - 1;
          if (e === f || a[g] === '.') {
            e = new c(null, d);
            e.setDomain(b);
            return c.isValid(e, d);
          }
        }
        return !1;
      };
      d.toString = function () {
        return a.prototype.toString.call(this, b('UriNeedRawQuerySVChecker').isDomainNeedRawQuery, b('PHPQuerySerializerNoEncoding'));
      };
      d.toStringRawQuery = function () {
        return a.prototype.toStringRawQuery.call(this, b('UriNeedRawQuerySVChecker').isDomainNeedRawQuery, b('PHPQuerySerializerNoEncoding'));
      };
      d.toStringPreserveQuery = function () {
        return a.prototype.toStringPreserveQuery.call(this, b('UriNeedRawQuerySVChecker').isDomainNeedRawQuery, b('PHPQuerySerializerNoEncoding'));
      };
      d.toStringStrictQueryEncoding = function () {
        return a.prototype.toStringStrictQueryEncoding.call(this, b('UriNeedRawQuerySVChecker').isDomainNeedRawQuery);
      };
      d.getQueryString = function (c) {
        c === void 0 && (c = !1);
        return a.prototype.getQueryString.call(this, c, b('UriNeedRawQuerySVChecker').isDomainNeedRawQuery, b('PHPQuerySerializerNoEncoding'));
      };
      return c;
    })(b('URIAbstractBase'));
    e.exports = a;
  },
  null
);
__d(
  'UriNeedRawQuerySVChecker',
  ['PHPQuerySerializer', 'URIBase', 'UriNeedRawQuerySVConfig'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g,
      h,
      i = ['http', 'https'];
    function a(a) {
      if (a == null) return !1;
      a = a instanceof (g || (g = b('URIBase'))) ? a : (g || (g = b('URIBase'))).tryParse(a, h || (h = b('PHPQuerySerializer')));
      if (a == null) return !1;
      var c = a.getProtocol();
      return !i.includes(c) ? !1 : j(a.getDomain());
    }
    function j(a) {
      return (
        a != null &&
        b('UriNeedRawQuerySVConfig').uris.some(function (c) {
          return (g || (g = b('URIBase'))).isDomainSubdomainOfDomain(a, c, h || (h = b('PHPQuerySerializer')));
        })
      );
    }
    e.exports = { isUriNeedRawQuery: a, isDomainNeedRawQuery: j };
  },
  null
);
__d(
  'memoizeStringOnly',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a) {
      var b = {};
      return function (c) {
        Object.prototype.hasOwnProperty.call(b, c) || (b[c] = a.call(this, c));
        return b[c];
      };
    }
    f['default'] = a;
  },
  66
);
__d(
  'unqualifyURI',
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      return a.setProtocol('').setDomain('').setPort('');
    }
    f['default'] = a;
  },
  66
);
__d(
  'URI',
  ['PHPQuerySerializer', 'PHPQuerySerializerNoEncoding', 'ReloadPage', 'Stratcom', 'URIBase', 'UriNeedRawQuerySVChecker', 'err', 'memoizeStringOnly', 'unqualifyURI'],
  function (a, b, c, d, e, f) {
    var g,
      h,
      i = (function (d) {
        'use strict';
        babelHelpers.inheritsLoose(c, d);
        function c(a) {
          var c;
          b('UriNeedRawQuerySVChecker').isUriNeedRawQuery(a) ? (c = d.call(this, a, b('PHPQuerySerializerNoEncoding')) || this) : (c = d.call(this, a || '', g || (g = b('PHPQuerySerializer'))) || this);
          return babelHelpers.assertThisInitialized(c);
        }
        var e = c.prototype;
        e.setPath = function (a) {
          return d.prototype.setPath.call(this, a);
        };
        e.setProtocol = function (a) {
          return d.prototype.setProtocol.call(this, a);
        };
        e.setDomain = function (a) {
          return d.prototype.setDomain.call(this, a);
        };
        e.setPort = function (a) {
          return d.prototype.setPort.call(this, a);
        };
        e.setFragment = function (a) {
          return d.prototype.setFragment.call(this, a);
        };
        e.go = function (a, c) {
          a = this.toString();
          if (b('Stratcom').invoke('go', null, { uri: a }).getPrevented()) return;
          a ? (c === !0 ? window.location.replace(a) : (window.location = a)) : b('ReloadPage').now(!0);
        };
        e.getSubdomain = function () {
          if (!this.getDomain()) return '';
          var a = this.getDomain().split('.');
          if (a.length <= 2) return '';
          else return a[0];
        };
        e.getUnqualifiedURI = function () {
          return b('unqualifyURI')(new c(this));
        };
        e.getQualifiedURI = function () {
          return new c(this).$URI1();
        };
        e.$URI1 = function () {
          if (!this.getDomain()) {
            var a = new c(window.location.href);
            this.setProtocol(a.getProtocol()).setDomain(a.getDomain()).setPort(a.getPort());
          }
          return this;
        };
        c.tryParseURI = function (a) {
          a = (h || (h = b('URIBase'))).tryParse(a, g || (g = b('PHPQuerySerializer')));
          return a ? new c(a) : null;
        };
        c.isValidURI = function (a) {
          return (h || (h = b('URIBase'))).isValid(a, g || (g = b('PHPQuerySerializer')));
        };
        c.getRequestURI = function () {
          return new c(window.location.href);
        };
        c.goURIOnNewWindow = function (a) {
          c.goURIOnWindow(a, window.open('', '_blank'), !0);
        };
        c.goURIOnWindow = function (d, e, f, g) {
          d = new c(d);
          d = d.toString();
          e = e ? e : window;
          !f && a.PageTransitions ? a.PageTransitions.go(d, g) : window.location.href === d ? b('ReloadPage').now() : g ? e.location.replace(d) : (e.location.href = d);
        };
        return c;
      })(h || (h = b('URIBase')));
    i.normalize = b('memoizeStringOnly')(function (a) {
      return new i(a).toString();
    });
    e.exports = i;
  },
  null
);
__d(
  'isInternalFBURI',
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp('(^|\\.)internalfb\\.com$', 'i');
    function a(a) {
      return g.test(a.getDomain());
    }
    f['default'] = a;
  },
  66
);
__d(
  'XControllerURIBuilder',
  ['invariant', 'URI', 'gkx', 'isInternalFBURI'],
  function (a, b, c, d, e, f, g, h) {
    a = (function () {
      function a(a, b) {
        (this.$1 = {}), (this.$2 = a), (this.$3 = b);
      }
      var b = a.prototype;
      b.setInt = function (a, b) {
        return this.__setParam(a, 'Int', b);
      };
      b.setFBID = function (a, b) {
        return this.__setParam(a, 'FBID', b);
      };
      b.setFloat = function (a, b) {
        return this.__setParam(a, 'Float', b);
      };
      b.setString = function (a, b) {
        return this.__setParam(a, 'String', b);
      };
      b.setExists = function (a, b) {
        b === !1 && (b = void 0);
        return this.__setParam(a, 'Exists', b);
      };
      b.setBool = function (a, b) {
        return this.__setParam(a, 'Bool', b);
      };
      b.setBoolVector = function (a, b) {
        return this.__setParam(a, 'BoolVector', b);
      };
      b.setEnum = function (a, b) {
        return this.__setParam(a, 'Enum', b);
      };
      b.setPath = function (a, b) {
        return this.__setParam(a, 'Path', b);
      };
      b.setIntVector = function (a, b) {
        return this.__setParam(a, 'IntVector', b);
      };
      b.setIntKeyset = function (a, b) {
        return this.__setParam(a, 'IntKeyset', b);
      };
      b.setIntSet = function (a, b) {
        return this.__setParam(a, 'IntSet', b.join(','));
      };
      b.setFloatVector = function (a, b) {
        return this.__setParam(a, 'FloatVector', b);
      };
      b.setFloatSet = function (a, b) {
        return this.__setParam(a, 'FloatSet', b.join(','));
      };
      b.setStringVector = function (a, b) {
        return this.__setParam(a, 'StringVector', b);
      };
      b.setStringKeyset = function (a, b) {
        return this.__setParam(a, 'StringKeyset', b);
      };
      b.setStringSet = function (a, b) {
        return this.__setParam(a, 'StringSet', b);
      };
      b.setFBIDVector = function (a, b) {
        return this.__setParam(a, 'FBIDVector', b);
      };
      b.setFBIDSet = function (a, b) {
        return this.__setParam(a, 'FBIDSet', b);
      };
      b.setFBIDKeyset = function (a, b) {
        return this.__setParam(a, 'FBIDKeyset', b);
      };
      b.setEnumVector = function (a, b) {
        return this.__setParam(a, 'EnumVector', b);
      };
      b.setEnumSet = function (a, b) {
        return this.__setParam(a, 'EnumSet', b);
      };
      b.setEnumKeyset = function (a, b) {
        return this.__setParam(a, 'EnumKeyset', b);
      };
      b.setIntToIntMap = function (a, b) {
        return this.__setParam(a, 'IntToIntMap', b);
      };
      b.setIntToFloatMap = function (a, b) {
        return this.__setParam(a, 'IntToFloatMap', b);
      };
      b.setIntToStringMap = function (a, b) {
        return this.__setParam(a, 'IntToStringMap', b);
      };
      b.setIntToBoolMap = function (a, b) {
        return this.__setParam(a, 'IntToBoolMap', b);
      };
      b.setStringToIntMap = function (a, b) {
        return this.__setParam(a, 'StringToIntMap', b);
      };
      b.setStringToFloatMap = function (a, b) {
        return this.__setParam(a, 'StringToFloatMap', b);
      };
      b.setStringToStringMap = function (a, b) {
        return this.__setParam(a, 'StringToStringMap', b);
      };
      b.setStringToNullableStringMap = function (a, b) {
        return this.__setParam(a, 'StringToNullableStringMap', b);
      };
      b.setStringToBoolMap = function (a, b) {
        return this.__setParam(a, 'StringToBoolMap', b);
      };
      b.setStringToEnumMap = function (a, b) {
        return this.__setParam(a, 'StringToEnumMap', b);
      };
      b.setEnumToStringVectorMap = function (a, b) {
        return this.__setParam(a, 'EnumToStringVectorMap', b);
      };
      b.setEnumToStringMap = function (a, b) {
        return this.__setParam(a, 'EnumToStringMap', b);
      };
      b.setEnumToBoolMap = function (a, b) {
        return this.__setParam(a, 'EnumToBoolMap', b);
      };
      b.setEnumToEnumMap = function (a, b) {
        return this.__setParam(a, 'EnumToEnumMap', b);
      };
      b.setEnumToIntMap = function (a, b) {
        return this.__setParam(a, 'EnumToIntMap', b);
      };
      b.setEnumToFBIDVectorMap = function (a, b) {
        return this.__setParam(a, 'EnumToFBIDVectorMap', b);
      };
      b.setStringToIntDict = function (a, b) {
        return this.__setParam(a, 'StringToIntDict', b);
      };
      b.setStringToNullableIntDict = function (a, b) {
        return this.__setParam(a, 'StringToNullableIntDict', b);
      };
      b.setStringToFloatDict = function (a, b) {
        return this.__setParam(a, 'StringToFloatDict', b);
      };
      b.setStringToStringKeysetDict = function (a, b) {
        return this.__setParam(a, 'StringToStringKeysetDict', b);
      };
      b.setStringToNullableFloatDict = function (a, b) {
        return this.__setParam(a, 'StringToNullableFloatDict', b);
      };
      b.setStringToStringDict = function (a, b) {
        return this.__setParam(a, 'StringToStringDict', b);
      };
      b.setStringToNullableStringDict = function (a, b) {
        return this.__setParam(a, 'StringToNullableStringDict', b);
      };
      b.setStringToBoolDict = function (a, b) {
        return this.__setParam(a, 'StringToBoolDict', b);
      };
      b.setStringToEnumDict = function (a, b) {
        return this.__setParam(a, 'StringToEnumDict', b);
      };
      b.setEnumToIntDict = function (a, b) {
        return this.__setParam(a, 'EnumToIntDict', b);
      };
      b.setEnumToStringDict = function (a, b) {
        return this.__setParam(a, 'EnumToStringDict', b);
      };
      b.setHackType = function (a, b) {
        return this.__setParam(a, 'HackType', b);
      };
      b.setTypeAssert = function (a, b) {
        return this.__setParam(a, 'TypeAssert', b);
      };
      b.__validateRequiredParamsExistence = function () {
        for (var a in this.$3) !this.$3[a].required || Object.prototype.hasOwnProperty.call(this.$1, a) || h(0, 903, a);
      };
      b.setParams = function (a) {
        for (var b in a) {
          this.__assertParamExists(b);
          var c = this.$3[b].type;
          this.__setParam(b, c, a[b]);
        }
        return this;
      };
      b.__assertParamExists = function (a) {
        a in this.$3 || h(0, 37339, a);
      };
      b.__setParam = function (a, b, c) {
        this.__assertParamExists(a);
        var d = this.$3[a].type,
          e = { StringOrPFBID: 'String', IntOrPFBID: 'Int', FBIDOrPFBID: 'FBID' };
        e = e[d];
        d === b || e === b || h(0, 37340, a, b, d);
        this.__setParamInt(a, c);
        return this;
      };
      b.__setParamInt = function (a, b) {
        this.$1[a] = b;
      };
      b.getRequest_LEGACY_UNTYPED = function (a) {
        return a.setReplaceTransportMarkers().setURI(this.getURI());
      };
      b.setPreviousActorIsPageVoice = function (a) {
        this.__setParamInt('paipv', a ? 1 : 0);
        return this;
      };
      b.getURI = function () {
        this.__validateRequiredParamsExistence();
        var a = {},
          b = '',
          d = /^(.*)?\{(\?)?(\*)?(.+?)\}(.*)?$/,
          e = this.$2.split('/'),
          f = !1;
        for (var g = 0; g < e.length; g++) {
          var i = e[g];
          if (i === '') continue;
          var j = d.exec(i);
          if (!j) b += '/' + i;
          else {
            i = j[2] === '?';
            var k = j[4],
              l = this.$3[k];
            l || h(0, 11837, k, this.$2);
            if (i && f) continue;
            if (this.$1[k] == null && i) {
              f = !0;
              continue;
            }
            i = this.$1[k] != null ? this.$1[k] : l.defaultValue;
            i != null || h(0, 907, k);
            l = j[1] ? j[1] : '';
            j = j[5] ? j[5] : '';
            b += '/' + l + i + j;
            a[k] = !0;
          }
        }
        this.$2.slice(-1) === '/' && (b += '/');
        b === '' && (b = '/');
        l = new (c('URI'))(b);
        for (var m in this.$1) {
          i = this.$1[m];
          if (!a[m] && i != null) {
            j = this.$3[m];
            l.addQueryData(m, j && j.type === 'Exists' ? null : i);
          }
        }
        return l;
      };
      b.getLookasideURI = function () {
        var a = 'lookaside.facebook.com';
        c('isInternalFBURI')(c('URI').getRequestURI()) ? (a = 'lookaside.internalfb.com') : c('gkx')('996940') && (a = 'lookaside.internmc.facebook.com');
        return this.getURI().setDomain(a).setProtocol('https');
      };
      a.create = function (b, c) {
        return function () {
          return new a(b, c);
        };
      };
      return a;
    })();
    a.prototype.getRequest = function (a) {
      return this.getRequest_LEGACY_UNTYPED(a);
    };
    g['default'] = a;
  },
  98
);
__d(
  'XRequest',
  ['invariant'],
  function (a, b, c, d, e, f, g) {
    var h = function a(b, c, d) {
      var e;
      switch (b) {
        case 'Bool':
          e = (c && c !== 'false' && c !== '0') || !1;
          break;
        case 'Int':
          e = c.toString();
          /-?\d+/.test(e) || g(0, 11839, c);
          break;
        case 'Float':
          e = parseFloat(c, 10);
          isNaN(e) && g(0, 11840, c);
          break;
        case 'FBID':
          e = c.toString();
          for (var f = 0; f < e.length; ++f) {
            var h = e.charCodeAt(f);
            (48 <= h && h <= 57) || g(0, 11841, c);
          }
          break;
        case 'String':
          e = c.toString();
          break;
        case 'Enum':
          d === 0 ? (e = a('Int', c, null)) : d === 1 ? (e = a('String', c, null)) : d === 2 ? (e = c) : g(0, 5044, d);
          break;
        default:
          if ((h = /^Nullable(\w+)$/.exec(b))) c === null ? (e = null) : (e = a(h[1], c, d));
          else if ((f = /^(\w+)Vector$/.exec(b))) {
            !Array.isArray(c) ? ((e = c.toString()), (e = e === '' ? [] : e.split(','))) : (e = c);
            var i = f[1];
            typeof i === 'string' || g(0, 5045);
            e = e.map(function (b) {
              return a(i, b, d && d.member);
            });
          } else if ((h = /^(\w+)(Set|Keyset)$/.exec(b)))
            !Array.isArray(c) ? ((e = c.toString()), (e = e === '' ? [] : e.split(','))) : (e = c),
              (e = e.reduce(function (a, b) {
                a[b] = b;
                return a;
              }, {})),
              (i = h[1]),
              typeof i === 'string' || g(0, 5045),
              (e = Object.keys(e).map(function (b) {
                return a(i, e[b], d && d.member);
              }));
          else if ((f = /^(\w+)To(\w+)Map$/.exec(b))) {
            e = {};
            var j = f[1],
              k = f[2];
            (typeof j === 'string' && typeof k === 'string') || g(0, 5045);
            Object.keys(c).forEach(function (b) {
              e[a(j, b, d && d.key)] = a(k, c[b], d && d.value);
            });
          } else g(0, 11842, b);
      }
      return e;
    };
    a = (function () {
      function a(a, b, c) {
        this.$1 = b;
        this.$2 = babelHelpers['extends']({}, c.getQueryData());
        b = a.split('/').filter(function (a) {
          return a;
        });
        a = c
          .getPath()
          .split('/')
          .filter(function (a) {
            return a;
          });
        for (var d = 0; d < b.length; ++d) {
          var e = /^\{(\?)?(\*)?(\w+)\}$/.exec(b[d]);
          if (!e) {
            b[d] === a[d] || g(0, 5047, c.getPath());
            continue;
          }
          var f = !!e[1],
            h = !!e[2];
          !h || d === b.length - 1 || g(0, 11843, i);
          var i = e[3];
          Object.prototype.hasOwnProperty.call(this.$1, i) || g(0, 11844, i);
          this.$1[i].required ? f && g(0, 5050, i) : f || g(0, 5057, i);
          a[d] && (this.$2[i] = h ? a.slice(d).join('/') : a[d]);
        }
        Object.keys(this.$1).forEach(function (a) {
          !this.$1[a].required || Object.prototype.hasOwnProperty.call(this.$2, a) || g(0, 5051);
        }, this);
      }
      var b = a.prototype;
      b.getExists = function (a) {
        return this.$2[a] !== void 0;
      };
      b.getBool = function (a) {
        return this.$3(a, 'Bool');
      };
      b.getInt = function (a) {
        return this.$3(a, 'Int');
      };
      b.getFloat = function (a) {
        return this.$3(a, 'Float');
      };
      b.getFBID = function (a) {
        return this.$3(a, 'FBID');
      };
      b.getString = function (a) {
        return this.$3(a, 'String');
      };
      b.getEnum = function (a) {
        return this.$3(a, 'Enum');
      };
      b.getOptionalInt = function (a) {
        return this.$4(a, 'Int');
      };
      b.getOptionalFloat = function (a) {
        return this.$4(a, 'Float');
      };
      b.getOptionalFBID = function (a) {
        return this.$4(a, 'FBID');
      };
      b.getOptionalString = function (a) {
        return this.$4(a, 'String');
      };
      b.getOptionalEnum = function (a) {
        return this.$4(a, 'Enum');
      };
      b.getIntVector = function (a) {
        return this.$3(a, 'IntVector');
      };
      b.getFloatVector = function (a) {
        return this.$3(a, 'FloatVector');
      };
      b.getFBIDVector = function (a) {
        return this.$3(a, 'FBIDVector');
      };
      b.getStringVector = function (a) {
        return this.$3(a, 'StringVector');
      };
      b.getEnumVector = function (a) {
        return this.$3(a, 'EnumVector');
      };
      b.getOptionalIntVector = function (a) {
        return this.$4(a, 'IntVector');
      };
      b.getOptionalFloatVector = function (a) {
        return this.$4(a, 'FloatVector');
      };
      b.getOptionalFBIDVector = function (a) {
        return this.$4(a, 'FBIDVector');
      };
      b.getOptionalStringVector = function (a) {
        return this.$4(a, 'StringVector');
      };
      b.getOptionalEnumVector = function (a) {
        return this.$4(a, 'EnumVector');
      };
      b.getIntSet = function (a) {
        return this.$3(a, 'IntSet');
      };
      b.getFBIDSet = function (a) {
        return this.$3(a, 'FBIDSet');
      };
      b.getFBIDKeyset = function (a) {
        return this.$3(a, 'FBIDKeyset');
      };
      b.getStringSet = function (a) {
        return this.$3(a, 'StringSet');
      };
      b.getEnumKeyset = function (a) {
        return this.$3(a, 'EnumKeyset');
      };
      b.getOptionalIntSet = function (a) {
        return this.$4(a, 'IntSet');
      };
      b.getOptionalFBIDSet = function (a) {
        return this.$4(a, 'FBIDSet');
      };
      b.getOptionalFBIDKeyset = function (a) {
        return this.$4(a, 'FBIDKeyset');
      };
      b.getOptionalStringSet = function (a) {
        return this.$4(a, 'StringSet');
      };
      b.getEnumToBoolMap = function (a) {
        return this.$3(a, 'EnumToBoolMap');
      };
      b.getEnumToEnumMap = function (a) {
        return this.$3(a, 'EnumToEnumMap');
      };
      b.getEnumToFloatMap = function (a) {
        return this.$3(a, 'EnumToFloatMap');
      };
      b.getEnumToIntMap = function (a) {
        return this.$3(a, 'EnumToIntMap');
      };
      b.getEnumToStringMap = function (a) {
        return this.$3(a, 'EnumToStringMap');
      };
      b.getIntToBoolMap = function (a) {
        return this.$3(a, 'IntToBoolMap');
      };
      b.getIntToEnumMap = function (a) {
        return this.$3(a, 'IntToEnumMap');
      };
      b.getIntToFloatMap = function (a) {
        return this.$3(a, 'IntToFloatMap');
      };
      b.getIntToIntMap = function (a) {
        return this.$3(a, 'IntToIntMap');
      };
      b.getIntToStringMap = function (a) {
        return this.$3(a, 'IntToStringMap');
      };
      b.getStringToBoolMap = function (a) {
        return this.$3(a, 'StringToBoolMap');
      };
      b.getStringToEnumMap = function (a) {
        return this.$3(a, 'StringToEnumMap');
      };
      b.getStringToFloatMap = function (a) {
        return this.$3(a, 'StringToFloatMap');
      };
      b.getStringToIntMap = function (a) {
        return this.$3(a, 'StringToIntMap');
      };
      b.getStringToStringMap = function (a) {
        return this.$3(a, 'StringToStringMap');
      };
      b.getOptionalEnumToBoolMap = function (a) {
        return this.$4(a, 'EnumToBoolMap');
      };
      b.getOptionalEnumToEnumMap = function (a) {
        return this.$4(a, 'EnumToEnumMap');
      };
      b.getOptionalEnumToFloatMap = function (a) {
        return this.$4(a, 'EnumToFloatMap');
      };
      b.getOptionalEnumToIntMap = function (a) {
        return this.$4(a, 'EnumToIntMap');
      };
      b.getOptionalEnumToStringMap = function (a) {
        return this.$4(a, 'EnumToStringMap');
      };
      b.getOptionalIntToBoolMap = function (a) {
        return this.$4(a, 'IntToBoolMap');
      };
      b.getOptionalIntToEnumMap = function (a) {
        return this.$4(a, 'IntToEnumMap');
      };
      b.getOptionalIntToFloatMap = function (a) {
        return this.$4(a, 'IntToFloatMap');
      };
      b.getOptionalIntToIntMap = function (a) {
        return this.$4(a, 'IntToIntMap');
      };
      b.getOptionalIntToStringMap = function (a) {
        return this.$4(a, 'IntToStringMap');
      };
      b.getOptionalStringToBoolMap = function (a) {
        return this.$4(a, 'StringToBoolMap');
      };
      b.getOptionalStringToEnumMap = function (a) {
        return this.$4(a, 'StringToEnumMap');
      };
      b.getOptionalStringToFloatMap = function (a) {
        return this.$4(a, 'StringToFloatMap');
      };
      b.getOptionalStringToIntMap = function (a) {
        return this.$4(a, 'StringToIntMap');
      };
      b.getOptionalStringToStringMap = function (a) {
        return this.$4(a, 'StringToStringMap');
      };
      b.getEnumToNullableEnumMap = function (a) {
        return this.$3(a, 'EnumToNullableEnumMap');
      };
      b.getEnumToNullableFloatMap = function (a) {
        return this.$3(a, 'EnumToNullableFloatMap');
      };
      b.getEnumToNullableIntMap = function (a) {
        return this.$3(a, 'EnumToNullableIntMap');
      };
      b.getEnumToNullableStringMap = function (a) {
        return this.$3(a, 'EnumToNullableStringMap');
      };
      b.getIntToNullableEnumMap = function (a) {
        return this.$3(a, 'IntToNullableEnumMap');
      };
      b.getIntToNullableFloatMap = function (a) {
        return this.$3(a, 'IntToNullableFloatMap');
      };
      b.getIntToNullableIntMap = function (a) {
        return this.$3(a, 'IntToNullableIntMap');
      };
      b.getIntToNullableStringMap = function (a) {
        return this.$3(a, 'IntToNullableStringMap');
      };
      b.getStringToNullableEnumMap = function (a) {
        return this.$3(a, 'StringToNullableEnumMap');
      };
      b.getStringToNullableFloatMap = function (a) {
        return this.$3(a, 'StringToNullableFloatMap');
      };
      b.getStringToNullableIntMap = function (a) {
        return this.$3(a, 'StringToNullableIntMap');
      };
      b.getStringToNullableStringMap = function (a) {
        return this.$3(a, 'StringToNullableStringMap');
      };
      b.getOptionalEnumToNullableEnumMap = function (a) {
        return this.$4(a, 'EnumToNullableEnumMap');
      };
      b.getOptionalEnumToNullableFloatMap = function (a) {
        return this.$4(a, 'EnumToNullableFloatMap');
      };
      b.getOptionalEnumToNullableIntMap = function (a) {
        return this.$4(a, 'EnumToNullableIntMap');
      };
      b.getOptionalEnumToNullableStringMap = function (a) {
        return this.$4(a, 'EnumToNullableStringMap');
      };
      b.getOptionalIntToNullableEnumMap = function (a) {
        return this.$4(a, 'IntToNullableEnumMap');
      };
      b.getOptionalIntToNullableFloatMap = function (a) {
        return this.$4(a, 'IntToNullableFloatMap');
      };
      b.getOptionalIntToNullableIntMap = function (a) {
        return this.$4(a, 'IntToNullableIntMap');
      };
      b.getOptionalIntToNullableStringMap = function (a) {
        return this.$4(a, 'IntToNullableStringMap');
      };
      b.getOptionalStringToNullableEnumMap = function (a) {
        return this.$4(a, 'StringToNullableEnumMap');
      };
      b.getOptionalStringToNullableFloatMap = function (a) {
        return this.$4(a, 'StringToNullableFloatMap');
      };
      b.getOptionalStringToNullableIntMap = function (a) {
        return this.$4(a, 'StringToNullableIntMap');
      };
      b.getOptionalStringToNullableStringMap = function (a) {
        return this.$4(a, 'StringToNullableStringMap');
      };
      b.$3 = function (a, b) {
        this.$5(a, b);
        var c = this.$1[a];
        if (!Object.prototype.hasOwnProperty.call(this.$2, a) && c.defaultValue != null) {
          c.required && g(0, 5052);
          return h(b, c.defaultValue, c.enumType);
        }
        c.required || b === 'Bool' || c.defaultValue != null || g(0, 11845, b, a, b, a);
        return h(b, this.$2[a], c.enumType);
      };
      b.$4 = function (a, b) {
        this.$5(a, b);
        var c = this.$1[a];
        c.required && g(0, 11846, b, a, b, a);
        c.defaultValue && g(0, 5052);
        return Object.prototype.hasOwnProperty.call(this.$2, a) ? h(b, this.$2[a], c.enumType) : null;
      };
      b.$5 = function (a, b) {
        Object.prototype.hasOwnProperty.call(this.$1, a) || g(0, 37317, a), this.$1[a].type === b || g(0, 11848, a, b, this.$1[a].type);
      };
      return a;
    })();
    f['default'] = a;
  },
  66
);
__d(
  'XController',
  ['XControllerURIBuilder', 'XRequest'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a(a, b) {
        (this.$1 = a), (this.$2 = b);
      }
      var b = a.prototype;
      b.getURIBuilder = function (a) {
        var b = new (c('XControllerURIBuilder'))(this.$1, this.$2);
        if (a) {
          var d = this.getRequest(a);
          Object.keys(this.$2).forEach(function (a) {
            var c = this.$2[a],
              e = '';
            !c.required && !Object.prototype.hasOwnProperty.call(c, 'defaultValue') && (e = 'Optional');
            e = 'get' + e + c.type;
            e = d[e](a);
            if (e == null || (Object.prototype.hasOwnProperty.call(c, 'defaultValue') && e === c.defaultValue)) return;
            c = 'set' + c.type;
            b[c](a, e);
          }, this);
        }
        return b;
      };
      b.getRequest = function (a) {
        return new (c('XRequest'))(this.$1, this.$2, a);
      };
      a.create = function (b, c) {
        return new a(b, c);
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'XHeartbeatController',
  ['XController'],
  function (a, b, c, d, e, f) {
    e.exports = b('XController').create('/nw/', {});
  },
  null
);
__d(
  'clearTimeoutBlue',
  [],
  function (a, b, c, d, e, f) {
    var g = a.__fbNativeClearTimeout || a.clearTimeout;
    function b(a) {
      g(a);
    }
    f['default'] = b;
  },
  66
);
__d(
  'clearTimeout',
  ['clearTimeoutBlue'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('clearTimeoutBlue');
  },
  98
);
__d(
  'getSameOriginTransport',
  ['ExecutionEnvironment', 'err'],
  function (a, b, c, d, e, f) {
    function c() {
      if (!b('ExecutionEnvironment').canUseDOM) throw b('err')('getSameOriginTransport: %s', 'Same origin transport unavailable in the server environment.');
      try {
        return new a.XMLHttpRequest();
      } catch (a) {
        throw b('err')('getSameOriginTransport: %s', a.message);
      }
    }
    e.exports = c;
  },
  null
);
__d(
  'killswitch',
  ['KSConfig'],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a) {
      return b('KSConfig').killed.has(a);
    }
    e.exports = a;
  },
  null
);
__d(
  'TimerStorage',
  [],
  function (a, b, c, d, e, f) {
    a = { ANIMATION_FRAME: 'ANIMATION_FRAME', IDLE_CALLBACK: 'IDLE_CALLBACK', IMMEDIATE: 'IMMEDIATE', INTERVAL: 'INTERVAL', TIMEOUT: 'TIMEOUT' };
    var g = {};
    Object.keys(a).forEach(function (a) {
      return (g[a] = {});
    });
    b = babelHelpers['extends']({}, a, {
      set: function (a, b) {
        g[a][b] = !0;
      },
      unset: function (a, b) {
        delete g[a][b];
      },
      clearAll: function (a, b) {
        Object.keys(g[a]).forEach(b), (g[a] = {});
      },
      getStorages: function () {
        return {};
      },
    });
    c = b;
    f['default'] = c;
  },
  66
);
__d(
  'setTimeoutAcrossTransitionsBlue',
  ['TimeSlice'],
  function (a, b, c, d, e, f, g) {
    var h = a.__fbNativeSetTimeout || a.setTimeout;
    function b(b, d) {
      var e = c('TimeSlice').guard(b, 'setTimeout', { propagationType: c('TimeSlice').PropagationType.CONTINUATION, registerCallStack: !0 });
      for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), i = 2; i < f; i++) g[i - 2] = arguments[i];
      return Function.prototype.apply.call(h, a, [e, d].concat(g));
    }
    g['default'] = b;
  },
  98
);
__d(
  'setTimeoutAcrossTransitions',
  ['setTimeoutAcrossTransitionsBlue'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('setTimeoutAcrossTransitionsBlue');
  },
  98
);
__d(
  'setTimeoutBlue',
  ['TimeSlice', 'TimerStorage', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      var d,
        e = function () {
          c('TimerStorage').unset(c('TimerStorage').TIMEOUT, d);
          for (var b = arguments.length, e = new Array(b), f = 0; f < b; f++) e[f] = arguments[f];
          Function.prototype.apply.call(a, this, e);
        };
      c('TimeSlice').copyGuardForWrapper(a, e);
      for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), h = 2; h < f; h++) g[h - 2] = arguments[h];
      d = c('setTimeoutAcrossTransitions').apply(void 0, [e, b].concat(g));
      c('TimerStorage').set(c('TimerStorage').TIMEOUT, d);
      return d;
    }
    g['default'] = a;
  },
  98
);
__d(
  'setTimeout',
  ['setTimeoutBlue'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('setTimeoutBlue');
  },
  98
);
__d(
  'NetworkHeartbeat',
  ['XHeartbeatController', 'clearTimeout', 'getSameOriginTransport', 'killswitch', 'setTimeout'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = c('XHeartbeatController').getURIBuilder().getURI().toString(),
      i = 6400,
      j = 100,
      k = null,
      l = 0,
      m = null,
      n = c('killswitch')('DISABLE_HEARTBEAT_POLLING');
    function o(a, b) {
      (m = c('getSameOriginTransport')()),
        m.open('GET', h, !0),
        (m.onload = function () {
          m && m.status === 204 && (n = !0), q(a);
        }),
        (m.onerror = function () {
          r(a, b);
        }),
        (m.ontimeout = function () {
          r(a, b);
        }),
        m.send();
    }
    function p() {
      (m = null), (j = 100), (l = 0), c('clearTimeout')(k);
    }
    function q(a) {
      p(), a();
    }
    function r(a, b) {
      (k = c('setTimeout')(function () {
        s(a, b, void 0, !0);
      }, j)),
        l++,
        j < i && (j = Math.min(j * Math.pow(2, l), i)),
        b();
    }
    function s(a, b, c, d) {
      c === void 0 &&
        (c = function () {
          return !0;
        }),
        d === void 0 && (d = !1),
        n || ((d || (m == null && c())) && o(a, b));
    }
    function a() {
      return m != null;
    }
    g.maybeStartHeartbeat = s;
    g.isHeartbeatPending = a;
  },
  98
);
__d(
  'NetworkStatusImpl',
  ['FBLogger', 'NetworkHeartbeat', 'performanceNow'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = [],
      i = window.navigator.onLine,
      j = 2,
      k = 5e3,
      l = [],
      m = [],
      n = 0,
      o = !0,
      p = !1,
      q = function () {
        u(o, !0);
      },
      r = function () {
        u(p, !0);
      };
    function s() {
      var a = h.slice();
      a.forEach(function (a) {
        a({ online: i });
      });
    }
    function t(a) {
      a = h.indexOf(a);
      a > -1 && h.splice(a, 1);
    }
    function u(a, b) {
      b === void 0 && (b = !1);
      var e = i === a;
      b = !b && a === o && d('NetworkHeartbeat').isHeartbeatPending();
      if (e || b) return;
      i = a;
      c('FBLogger')('NetworkStatus').warn('Network switched to ' + (a ? 'online' : 'offline'));
      i || d('NetworkHeartbeat').maybeStartHeartbeat(q, r);
      s();
    }
    function v() {
      var a = c('performanceNow')();
      l = l.filter(function (b) {
        return w(b.startTime, a);
      });
      m = m.filter(function (b) {
        return w(b.startTime, a);
      });
      return m.length / l.length < j;
    }
    var w = function (a, b) {
      return a > b - k;
    };
    function a() {
      return i;
    }
    function b(a) {
      h.push(a);
      var b = !1;
      return {
        remove: function () {
          b || ((b = !0), t(a));
        },
      };
    }
    function e() {
      var a = c('performanceNow')();
      l.push({ startTime: a });
      d('NetworkHeartbeat').maybeStartHeartbeat(q, r, v);
    }
    function f() {
      var a = c('performanceNow')();
      m.push({ startTime: a });
      w(n, a) ||
        ((m = m.filter(function (b) {
          return w(b.startTime, a);
        })),
        (n = a));
    }
    window.addEventListener('online', function () {
      u(o);
    });
    window.addEventListener('offline', function () {
      u(p);
    });
    g.isOnline = a;
    g.onChange = b;
    g.reportError = e;
    g.reportSuccess = f;
  },
  98
);
__d(
  'NetworkStatusSham',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a() {
      return !0;
    }
    function b(a) {
      return { remove: function () {} };
    }
    function c() {
      return;
    }
    function d() {
      return;
    }
    f.isOnline = a;
    f.onChange = b;
    f.reportError = c;
    f.reportSuccess = d;
  },
  66
);
__d(
  'NetworkStatus',
  ['NetworkStatusImpl', 'NetworkStatusSham', 'gkx'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    a = c('gkx')('708253') && c('gkx')('1263340') ? d('NetworkStatusImpl') : d('NetworkStatusSham');
    b = a;
    g['default'] = b;
  },
  98
);
__d(
  'CircularBuffer',
  ['unrecoverableViolation'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a(a) {
        if (a <= 0) throw c('unrecoverableViolation')('Buffer size should be a positive integer', 'comet_infra');
        this.$1 = a;
        this.$2 = 0;
        this.$3 = [];
        this.$4 = [];
      }
      var b = a.prototype;
      b.write = function (a) {
        var b = this;
        this.$3.length < this.$1
          ? this.$3.push(a)
          : (this.$4.forEach(function (a) {
              return a(b.$3[b.$2]);
            }),
            (this.$3[this.$2] = a),
            this.$2++,
            (this.$2 %= this.$1));
        return this;
      };
      b.onEvict = function (a) {
        this.$4.push(a);
        return this;
      };
      b.read = function () {
        return this.$3.slice(this.$2).concat(this.$3.slice(0, this.$2));
      };
      b.expand = function (a) {
        if (a > this.$1) {
          var b = this.read();
          this.$2 = 0;
          this.$3 = b;
          this.$1 = a;
        }
        return this;
      };
      b.dropFirst = function (a) {
        if (a <= this.$1) {
          var b = this.read();
          this.$2 = 0;
          b.splice(0, a);
          this.$3 = b;
        }
        return this;
      };
      b.clear = function () {
        this.$2 = 0;
        this.$3 = [];
        return this;
      };
      b.currentSize = function () {
        return this.$3.length;
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'ResourceTypes',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    a = { JS: 'js', CSS: 'css', XHR: 'xhr' };
    b = a;
    f['default'] = b;
  },
  66
);
__d(
  'TimingAnnotations',
  [],
  function (a, b, c, d, e, f) {
    a = (function () {
      function a() {}
      var b = a.prototype;
      b.addStringAnnotation = function (a, b) {
        return this;
      };
      b.addSetAnnotation = function (a, b) {
        return this;
      };
      b.addSetElement = function (a, b) {
        return this;
      };
      b.registerOnBeforeSend = function (a) {
        return this;
      };
      b.addVectorAnnotation = function (a, b) {
        return this;
      };
      b.addVectorElement = function (a, b) {
        return this;
      };
      return a;
    })();
    b = (function () {
      function a() {
        (this.$1 = null), (this.$2 = null), (this.$3 = null), (this.$4 = []);
      }
      var b = a.prototype;
      b.addStringAnnotation = function (a, b) {
        this.$2 = this.$2 || new Map();
        this.$2.set(a, b);
        return this;
      };
      b.addSetAnnotation = function (a, b) {
        var c = this.$1 || new Map(),
          d = c.get(a) || new Set();
        b.forEach(function (a) {
          return d.add(a);
        });
        c.set(a, d);
        this.$1 = c;
        return this;
      };
      b.addSetElement = function (a, b) {
        var c = this.$1 || new Map(),
          d = c.get(a) || new Set();
        d.add(b);
        c.set(a, d);
        this.$1 = c;
        return this;
      };
      b.addVectorAnnotation = function (a, b) {
        this.$3 = this.$3 || new Map();
        this.$3.set(a, b);
        return this;
      };
      b.addVectorElement = function (a, b) {
        var c = (this.$3 = this.$3 || new Map()),
          d = this.$3.get(a) || [];
        d.push(b);
        c.set(a, d);
        return this;
      };
      b.registerOnBeforeSend = function (a) {
        this.$4.push(a);
        return this;
      };
      b.prepareToSend = function () {
        var a = this;
        this.$4.forEach(function (b) {
          return b(a);
        });
        this.$4 = [];
        var b = {};
        if (this.$1 != null)
          for (var c = this.$1, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
            var f;
            if (d) {
              if (e >= c.length) break;
              f = c[e++];
            } else {
              e = c.next();
              if (e.done) break;
              f = e.value;
            }
            f = f;
            var g = f[0];
            f = f[1];
            b[g] = Array.from(f.values());
          }
        g = {};
        if (this.$2 != null)
          for (var f = this.$2, e = Array.isArray(f), d = 0, f = e ? f : f[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
            if (e) {
              if (d >= f.length) break;
              c = f[d++];
            } else {
              d = f.next();
              if (d.done) break;
              c = d.value;
            }
            c = c;
            var h = c[0];
            c = c[1];
            g[h] = c;
          }
        h = {};
        if (this.$3 != null)
          for (var c = this.$3, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
            if (d) {
              if (e >= c.length) break;
              f = c[e++];
            } else {
              e = c.next();
              if (e.done) break;
              f = e.value;
            }
            f = f;
            var i = f[0];
            f = f[1];
            h[i] = f;
          }
        return { setProps: b, stringProps: g, vectorProps: h };
      };
      a.combine = function (a, b) {
        var c;
        a != null && b != null ? ((a.stringProps = babelHelpers['extends']({}, b.stringProps, a.stringProps)), (a.setProps = babelHelpers['extends']({}, b.setProps, a.setProps)), (c = a)) : a != null ? (c = a) : b != null && (c = b);
        return c;
      };
      return a;
    })();
    b.EmptyTimingAnnotations = a;
    b.EmptyTraceTimingAnnotations = a;
    b.TraceTimingAnnotations = b;
    f['default'] = b;
  },
  66
);
__d(
  'ResourceTimingsStore',
  ['CircularBuffer', 'ResourceTypes', 'TimingAnnotations', 'URI', 'performanceAbsoluteNow'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g,
      h,
      i = 1e3,
      j = new (b('TimingAnnotations').EmptyTimingAnnotations)(),
      k = {},
      l = {};
    Object.keys(b('ResourceTypes')).forEach(function (a) {
      a = b('ResourceTypes')[a];
      var c = new (b('CircularBuffer'))(i),
        d = new Map();
      c.onEvict(function (a) {
        d['delete'](a);
      });
      k[a] = { idx: 1, entries: c };
      l[a] = d;
    });
    function m(a, c, d) {
      var e;
      switch (a) {
        case 'css':
        case 'js':
          var f = n.parseMakeHasteURL(c);
          f = f == null ? 'unknown_resource' : f[0];
          e = d + '_' + f;
          break;
        case 'xhr':
          f = new (g || (g = b('URI')))(c).getQualifiedURI();
          c = f.getDomain() + f.getPath();
          e = d + '_' + c;
          break;
        default:
          a, (e = 'never here');
      }
      return e;
    }
    var n = {
      getUID: function (a, b) {
        var c = k[a],
          d = m(a, b, c.idx);
        c.entries.write(d);
        l[a].set(d, { uri: b, uid: d });
        c.idx++;
        return d;
      },
      updateURI: function (a, b, c) {
        a = l[a].get(b);
        a != null && (a.uri = c);
      },
      getMapFor: function (a) {
        return l[a];
      },
      parseMakeHasteURL: function (a) {
        a = a.match(/\/rsrc\.php\/.*\/([^\?]+)/);
        if (!a) return null;
        a = a[1];
        var b = '',
          c = a.match(/\.(\w+)$/);
        c && (b = c[1]);
        return [a, b];
      },
      measureRequestSent: function (a, c) {
        a = l[a];
        a = a.get(c);
        if (a == null || a.requestSent != null) return;
        else a.requestSent = (h || (h = b('performanceAbsoluteNow')))();
      },
      measureResponseReceived: function (a, c) {
        a = l[a];
        a = a.get(c);
        if (a == null || a.requestSent == null || a.responseReceived != null) return;
        else a.responseReceived = (h || (h = b('performanceAbsoluteNow')))();
      },
      annotate: function (a, c) {
        a = l[a];
        a = a.get(c);
        if (!a) return j;
        else {
          c = a.annotations;
          if (c != null) return c;
          else {
            c = new (b('TimingAnnotations'))();
            a.annotations = c;
            return c;
          }
        }
      },
      getAnnotationsFor: function (a, b) {
        a = l[a];
        a = a.get(b);
        if (!a) return null;
        else {
          b = a.annotations;
          return b != null ? b.prepareToSend() : null;
        }
      },
    };
    e.exports = n;
  },
  null
);
__d(
  'clearIntervalBlue',
  [],
  function (a, b, c, d, e, f) {
    var g = a.__fbNativeClearTimeout || a.clearTimeout;
    function b(a) {
      g(a);
    }
    f['default'] = b;
  },
  66
);
__d(
  'clearInterval',
  ['clearIntervalBlue'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('clearIntervalBlue');
  },
  98
);
__d(
  'ifRequired',
  [],
  function (a, b, c, d, e, f) {
    function a(a, b, c) {
      var e;
      d &&
        d.call(null, [a], function (a) {
          e = a;
        });
      if (e && b) return b(e);
      else if (!e && c) return c();
    }
    f['default'] = a;
  },
  66
);
__d(
  'isEmpty',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    function a(a) {
      if (Array.isArray(a)) return a.length === 0;
      else if (typeof a === 'object') {
        if (a) {
          !i(a) || a.size === void 0 || h(0, 1445);
          for (var b in a) return !1;
        }
        return !0;
      } else return !a;
    }
    function i(a) {
      return typeof Symbol === 'undefined' ? !1 : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'] != null;
    }
    g['default'] = a;
  },
  98
);
__d(
  'setIntervalAcrossTransitionsBlue',
  ['TimeSlice'],
  function (a, b, c, d, e, f, g) {
    var h = a.__fbNativeSetInterval || a.setInterval;
    function b(b, d) {
      var e = c('TimeSlice').guard(b, 'setInterval');
      for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), i = 2; i < f; i++) g[i - 2] = arguments[i];
      return Function.prototype.apply.call(h, a, [e, d].concat(g));
    }
    g['default'] = b;
  },
  98
);
__d(
  'setIntervalAcrossTransitions',
  ['setIntervalAcrossTransitionsBlue'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    g['default'] = c('setIntervalAcrossTransitionsBlue');
  },
  98
);
__d(
  'CSSLoader',
  ['CSSLoaderConfig', 'NetworkStatus', 'ResourceTimingsStore', 'TimeSlice', 'clearInterval', 'ifRequired', 'isEmpty', 'nullthrows', 'setIntervalAcrossTransitions'],
  function (a, b, c, d, e, f) {
    var g,
      h = 20,
      i = b('CSSLoaderConfig').timeout,
      j = b('CSSLoaderConfig').loadEventSupported,
      k,
      l = [],
      m,
      n = new Map();
    function o(a) {
      if (k) return;
      k = !0;
      var b = document.createElement('link');
      b.onload = function () {
        (j = !0), b.parentNode && b.parentNode.removeChild(b);
      };
      b.rel = 'stylesheet';
      b.href = 'data:text/css;base64,';
      a.appendChild(b);
    }
    function p() {
      var a = [],
        c = [];
      if (Date.now() >= m) {
        for (var d = n.values(), e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var h;
          if (e) {
            if (f >= d.length) break;
            h = d[f++];
          } else {
            f = d.next();
            if (f.done) break;
            h = f.value;
          }
          h = h;
          c.push(h.signal);
          a.push(h.error);
        }
        n.clear();
      } else
        for (var h = n, f = Array.isArray(h), e = 0, h = f ? h : h[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          if (f) {
            if (e >= h.length) break;
            d = h[e++];
          } else {
            e = h.next();
            if (e.done) break;
            d = e.value;
          }
          d = d;
          var j = d[0];
          d = d[1];
          var k = d.signal,
            l = window.getComputedStyle ? getComputedStyle(k) : k.currentStyle;
          l && parseInt(l.height, 10) > 1 && (a.push(d.load), c.push(k), n['delete'](j));
        }
      for (var l = 0; l < c.length; l++) {
        d = b('nullthrows')(c[l].parentNode);
        d.removeChild(c[l]);
      }
      if (!(g || (g = b('isEmpty')))(a)) {
        for (l = 0; l < a.length; l++) a[l]();
        m = Date.now() + i;
      }
      return n.size === 0;
    }
    function q(a, c, d, e) {
      var f = document.createElement('meta');
      f.id = 'bootloader_' + a.replace(/[^a-z0-9]/gi, '_');
      c.appendChild(f);
      c = n.size !== 0;
      m = Date.now() + i;
      n.set(a, { signal: f, load: d, error: e });
      if (!c)
        var g = b('setIntervalAcrossTransitions')(function () {
          p() && b('clearInterval')(g);
        }, h);
    }
    function r(a, c, d, e, f, g) {
      var h = b('ResourceTimingsStore').getUID('css', c);
      b('ResourceTimingsStore').annotate('css', h).addStringAnnotation('name', a).addStringAnnotation('source', c).addStringAnnotation('caller', 'CSSLoader.loadStyleSheet');
      b('ifRequired')('TimeSliceInteraction', function (b) {
        b.informGlobally('CSSLoader.loadStyleSheet').addStringAnnotation('source', c).addStringAnnotation('name', a);
      });
      b('ResourceTimingsStore').measureRequestSent('css', h);
      var i = function () {
          b('ResourceTimingsStore').measureResponseReceived('css', h), e();
        },
        k = b('TimeSlice').getGuardedContinuation('CSSLoader link.onresponse');
      !g
        ? q(a, d, i, f)
        : j !== !0
        ? (q(a, d, i, f), j === void 0 && o(d))
        : ((g.onload = k.bind(void 0, function () {
            (g.onload = g.onerror = null), i();
          })),
          (g.onerror = k.bind(void 0, function () {
            (g.onload = g.onerror = null), f();
          })));
    }
    a = {
      loadStyleSheet: function (a, c, d, e, f, g) {
        var h = document;
        if ('createStyleSheet' in h) {
          var i;
          for (var j = 0; j < l.length; j++)
            if (l[j].imports.length < 31) {
              i = j;
              break;
            }
          if (i === void 0) {
            try {
              l.push(h.createStyleSheet());
            } catch (a) {
              b('NetworkStatus').reportError();
              g();
              return;
            }
            i = l.length - 1;
          }
          b('NetworkStatus').reportSuccess();
          l[i].addImport(c);
          r(a, c, d, f, g, null);
          return;
        }
        j = h.createElement('link');
        j.rel = 'stylesheet';
        j.type = 'text/css';
        j.href = c;
        e && (j.crossOrigin = 'anonymous');
        r(a, c, d, f, g, j);
        d.appendChild(j);
      },
      setupEventListeners: function (a, b, c, d, e, f) {
        r(a, b, c, d, e, f);
      },
    };
    e.exports = a;
  },
  null
);
__d(
  'ClientConsistencyEventEmitter',
  ['BaseEventEmitter'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    a = new (c('BaseEventEmitter'))();
    b = a;
    g['default'] = b;
  },
  98
);
__d(
  'requireWeak',
  [],
  function (a, b, c, d, e, f) {
    function a(a, b) {
      d && d.call(null, [a], b);
    }
    f['default'] = a;
  },
  66
);
__d(
  'ClientConsistency',
  ['ClientConsistencyEventEmitter', 'SiteData', 'requireWeak'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g = b('SiteData').client_revision,
      h = !1,
      i = null,
      j = {},
      k = new Set(),
      l = new Set(),
      m = function (a) {
        j = {};
        var c = Object.keys(a).sort().reverse(),
          d = function () {
            if (f) {
              if (g >= e.length) return 'break';
              h = e[g++];
            } else {
              g = e.next();
              if (g.done) return 'break';
              h = g.value;
            }
            var c = h,
              d = Number(c);
            c = (c = a[d]) != null ? c : [];
            if (c.length === 0) {
              n(d);
              return 'break';
            }
            c.forEach(function (a) {
              var c;
              j[a] = Math.max((c = j[a]) != null ? c : 0, d);
              if (l.has(a)) return;
              l.add(a);
              b('requireWeak').call(null, a, function () {
                if (!j[a]) return;
                n(j[a]);
              });
            });
          };
        for (var e = c, f = Array.isArray(e), g = 0, e = f ? e : e[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var h;
          c = d();
          if (c === 'break') break;
        }
      },
      n = function (a) {
        a === 2 && b('ClientConsistencyEventEmitter').emit('softRefresh'), a === 3 && b('ClientConsistencyEventEmitter').emit('hardRefresh');
      },
      o = function (a) {
        var b = a.actions;
        a = a.rev;
        if (a === g) return;
        i = b;
        b != null && m(b);
      };
    a = {
      init: function () {
        if (h) return;
        b('ClientConsistencyEventEmitter').addListener('newEntry', function (a) {
          o(a);
        });
        h = !0;
      },
      addAdditionalRevision: function (a) {
        a !== g && (k.add(a), b('ClientConsistencyEventEmitter').emit('newRevision', a));
      },
      getAdditionalRevisions: function () {
        return k;
      },
      hasPendingClientActions: function () {
        return i != null && Object.keys(i).length > 0;
      },
    };
    e.exports = a;
  },
  null
);
__d(
  'JSResourceEvents',
  ['performanceAbsoluteNow'],
  function (a, b, c, d, e, f, g) {
    var h = 50,
      i = new Map();
    function a(a, b, d) {
      a = a;
      b = (b = b) != null ? b : '';
      var e = i.get(a);
      e || i.set(a, (e = new Map()));
      a = e.get(b);
      a || e.set(b, (a = new Map()));
      e = a.get(d);
      e || a.set(d, (e = [0, []]));
      e[1][e[0]++ % h] = c('performanceAbsoluteNow')();
    }
    function j(a, b, c) {
      var d = i.get(a);
      if (!d) return [];
      var e = [];
      for (var d = d, g = Array.isArray(d), h = 0, d = g ? d : d[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
        var j;
        if (g) {
          if (h >= d.length) break;
          j = d[h++];
        } else {
          h = d.next();
          if (h.done) break;
          j = h.value;
        }
        j = j;
        var k = j[0];
        j = j[1];
        for (var j = j, l = Array.isArray(j), m = 0, j = l ? j : j[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var n;
          if (l) {
            if (m >= j.length) break;
            n = j[m++];
          } else {
            m = j.next();
            if (m.done) break;
            n = m.value;
          }
          n = n;
          var o = n[0];
          n = n[1];
          for (var n = n[1], p = Array.isArray(n), q = 0, n = p ? n : n[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
            var r;
            if (p) {
              if (q >= n.length) break;
              r = n[q++];
            } else {
              q = n.next();
              if (q.done) break;
              r = q.value;
            }
            r = r;
            r >= b && r <= c && e.push({ module: a, ref: k || null, type: o, time: r });
          }
        }
      }
      return e.sort(function (a, b) {
        return a.time - b.time;
      });
    }
    function b(a, b) {
      var c = new Map();
      for (var d = i.keys(), e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
        var g;
        if (e) {
          if (f >= d.length) break;
          g = d[f++];
        } else {
          f = d.next();
          if (f.done) break;
          g = f.value;
        }
        g = g;
        var h = j(g, a, b);
        h.length && c.set(g, h);
      }
      return c;
    }
    g.notify = a;
    g.getEvents = j;
    g.getAllModuleEvents = b;
  },
  98
);
/**
 * License: https://www.facebook.com/legal/license/I4Z1iQLOL-w/
 */
__d(
  'ImmediateImplementation',
  ['ImmediateImplementationExperiments'],
  function (a, b, c, d, e, f) {
    (function (c, d) {
      'use strict';
      var e = 1,
        g = {},
        h = {},
        i = h,
        j = !1,
        k = c.document,
        l,
        m,
        n,
        o = 'setImmediate$' + Math.random() + '$';
      function p() {
        var a = c.event;
        return !a
          ? !1
          : (a.isTrusted && ['change', 'click', 'contextmenu', 'dblclick', 'mouseup', 'pointerup', 'reset', 'submit', 'touchend'].includes(a.type)) ||
              (a.type === 'message' && a.source === c && typeof a.data === 'string' && a.data.indexOf(o) === 0);
      }
      function q(a) {
        var b = a[0];
        a = Array.prototype.slice.call(a, 1);
        g[e] = function () {
          b.apply(void 0, a);
        };
        i = i.next = { handle: e++ };
        return i.handle;
      }
      function r() {
        var a, b;
        while (!j && (a = h.next)) {
          h = a;
          if ((b = g[a.handle])) {
            j = !0;
            try {
              b(), (j = !1);
            } finally {
              s(a.handle), j && ((j = !1), h.next && l(r));
            }
          }
        }
      }
      function s(a) {
        delete g[a];
      }
      function d() {
        if (c.postMessage && !c.importScripts) {
          var a = !0,
            b = function b() {
              (a = !1), c.removeEventListener ? c.removeEventListener('message', b, !1) : c.detachEvent('onmessage', b);
            };
          if (c.addEventListener) c.addEventListener('message', b, !1);
          else if (c.attachEvent) c.attachEvent('onmessage', b);
          else return !1;
          c.postMessage('', '*');
          return a;
        }
      }
      function t() {
        var a = function (a) {
          a.source === c && typeof a.data === 'string' && a.data.indexOf(o) === 0 && r();
        };
        c.addEventListener ? c.addEventListener('message', a, !1) : c.attachEvent('onmessage', a);
        l = function () {
          var a = q(arguments);
          c.originalPostMessage ? c.originalPostMessage(o + a, '*') : c.postMessage(o + a, '*');
          return a;
        };
        m = l;
      }
      function u() {
        var a = new MessageChannel(),
          b = !1;
        a.port1.onmessage = function (a) {
          (b = !1), r();
        };
        l = function () {
          var c = q(arguments);
          b || (a.port2.postMessage(c), (b = !0));
          return c;
        };
        n = l;
      }
      function v() {
        var a = k.documentElement;
        l = function () {
          var b = q(arguments),
            c = k.createElement('script');
          c.onreadystatechange = function () {
            (c.onreadystatechange = null), a.removeChild(c), (c = null), r();
          };
          a.appendChild(c);
          return b;
        };
      }
      function w() {
        l = function () {
          setTimeout(r, 0);
          return q(arguments);
        };
      }
      d()
        ? c.MessageChannel && b('ImmediateImplementationExperiments').prefer_message_channel
          ? (t(),
            u(),
            (l = function () {
              if (p()) return m.apply(null, arguments);
              else return n.apply(null, arguments);
            }))
          : t()
        : c.MessageChannel
        ? u()
        : k && k.createElement && 'onreadystatechange' in k.createElement('script')
        ? v()
        : w();
      f.setImmediate = l;
      f.clearImmediate = s;
    })(typeof self === 'undefined' ? (typeof a === 'undefined' ? this : a) : self);
  },
  null
);
__d(
  'setImmediatePolyfill',
  ['invariant', 'ImmediateImplementation', 'PromiseUsePolyfillSetImmediateGK'],
  function (a, b, c, d, e, f, g) {
    var h = a.setImmediate;
    if (b('PromiseUsePolyfillSetImmediateGK').www_always_use_polyfill_setimmediate || !h) {
      d = b('ImmediateImplementation');
      h = d.setImmediate;
    }
    function c(a) {
      typeof a === 'function' || g(0, 5912);
      for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
      return h.apply(void 0, [a].concat(c));
    }
    e.exports = c;
  },
  null
);
__d(
  'setImmediateAcrossTransitions',
  ['TimeSlice', 'setImmediatePolyfill'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      var b = c('TimeSlice').guard(a, 'setImmediate', { propagationType: c('TimeSlice').PropagationType.CONTINUATION, registerCallStack: !0 });
      for (var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1; f < d; f++) e[f - 1] = arguments[f];
      return c('setImmediatePolyfill').apply(void 0, [b].concat(e));
    }
    g['default'] = a;
  },
  98
);
__d(
  'Promise',
  ['TimeSlice', 'setImmediateAcrossTransitions', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f) {
    'use strict';
    function g() {}
    var h = null,
      i = {};
    function j(a) {
      try {
        return a.then;
      } catch (a) {
        h = a;
        return i;
      }
    }
    function k(a, b) {
      try {
        return a(b);
      } catch (a) {
        h = a;
        return i;
      }
    }
    function l(a, b, c) {
      try {
        a(b, c);
      } catch (a) {
        h = a;
        return i;
      }
    }
    function m(a) {
      if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
      if (typeof a !== 'function') throw new TypeError('not a function');
      this._state = 0;
      this._value = null;
      this._deferreds = [];
      if (a === g) return;
      t(a, this);
    }
    m._noop = g;
    m.prototype.then = function (a, b) {
      if (this.constructor !== m) return n(this, a, b);
      var c = new m(g);
      o(this, new s(a, b, c));
      return c;
    };
    function n(a, b, c) {
      return new a.constructor(function (d, e) {
        var f = new m(g);
        f.then(d, e);
        o(a, new s(b, c, f));
      });
    }
    function o(a, c) {
      while (a._state === 3) a = a._value;
      if (a._state === 0) {
        a._deferreds.push(c);
        return;
      }
      b('setImmediateAcrossTransitions')(function () {
        var b = a._state === 1 ? c.onFulfilled : c.onRejected;
        if (b === null) {
          c.continuation(function () {});
          a._state === 1 ? p(c.promise, a._value) : q(c.promise, a._value);
          return;
        }
        b = k(c.continuation.bind(null, b), a._value);
        b === i ? q(c.promise, h) : p(c.promise, b);
      });
    }
    function p(a, b) {
      if (b === a) return q(a, new TypeError('A promise cannot be resolved with itself.'));
      if (b && (typeof b === 'object' || typeof b === 'function')) {
        var c = j(b);
        if (c === i) return q(a, h);
        if (c === a.then && b instanceof m) {
          a._state = 3;
          a._value = b;
          r(a);
          return;
        } else if (typeof c === 'function') {
          t(c.bind(b), a);
          return;
        }
      }
      a._state = 1;
      a._value = b;
      r(a);
    }
    function q(a, b) {
      (a._state = 2), (a._value = b), r(a);
    }
    function r(a) {
      for (var b = 0; b < a._deferreds.length; b++) o(a, a._deferreds[b]);
      a._deferreds = null;
    }
    function s(a, c, d) {
      (this.onFulfilled = typeof a === 'function' ? a : null), (this.onRejected = typeof c === 'function' ? c : null), (this.continuation = b('TimeSlice').getGuardedContinuation('Promise Handler')), (this.promise = d);
    }
    function t(a, b) {
      var c = !1;
      a = l(
        a,
        function (a) {
          if (c) return;
          c = !0;
          p(b, a);
        },
        function (a) {
          if (c) return;
          c = !0;
          q(b, a);
        }
      );
      !c && a === i && ((c = !0), q(b, h));
    }
    m.prototype.done = function (a, c) {
      var d = new Error('Promise.done'),
        e = arguments.length ? this.then.apply(this, arguments) : this;
      e.then(null, function (a) {
        b('setTimeoutAcrossTransitions')(function () {
          if (a instanceof Error) throw a;
          else {
            d.message = '' + a;
            throw d;
          }
        }, 0);
      });
    };
    var u = A(!0),
      v = A(!1),
      w = A(null),
      x = A(void 0),
      y = A(0),
      z = A('');
    function A(a) {
      var b = new m(m._noop);
      b._state = 1;
      b._value = a;
      return b;
    }
    m.resolve = function (a) {
      if (a instanceof m) return a;
      if (a === null) return w;
      if (a === void 0) return x;
      if (a === !0) return u;
      if (a === !1) return v;
      if (a === 0) return y;
      if (a === '') return z;
      if (typeof a === 'object' || typeof a === 'function')
        try {
          var b = a.then;
          if (typeof b === 'function') return new m(b.bind(a));
        } catch (a) {
          return new m(function (b, c) {
            c(a);
          });
        }
      return A(a);
    };
    m.all = function (a) {
      Array.isArray(a) || (a = [m.reject(new TypeError('Promise.all must be passed an array.'))]);
      var b = Array.prototype.slice.call(a);
      return new m(function (a, c) {
        if (b.length === 0) return a([]);
        var d = b.length;
        function e(f, g) {
          if (g && (typeof g === 'object' || typeof g === 'function'))
            if (g instanceof m && g.then === m.prototype.then) {
              while (g._state === 3) g = g._value;
              if (g._state === 1) return e(f, g._value);
              g._state === 2 && c(g._value);
              g.then(function (a) {
                e(f, a);
              }, c);
              return;
            } else {
              var h = g.then;
              if (typeof h === 'function') {
                h = new m(h.bind(g));
                h.then(function (a) {
                  e(f, a);
                }, c);
                return;
              }
            }
          b[f] = g;
          --d === 0 && a(b);
        }
        for (var f = 0; f < b.length; f++) e(f, b[f]);
      });
    };
    m.allSettled = function (a) {
      if (!Array.isArray(a)) return m.reject(new TypeError('Promise.allSettled must be passed an array.'));
      var b = Array(a.length),
        c = function (c, d) {
          var e = a[c];
          d = typeof e === 'object' && e !== null && typeof e.then === 'function';
          b[c] = d
            ? new m(function (a, b) {
                e.then(
                  function (b) {
                    a({ status: 'fulfilled', value: b });
                  },
                  function (b) {
                    a({ status: 'rejected', reason: b });
                  }
                );
              })
            : m.resolve({ status: 'fulfilled', value: e });
        };
      for (var d = 0, e = a.length; d < e; ++d) c(d, e);
      return m.all(b);
    };
    m.reject = function (a) {
      return new m(function (b, c) {
        c(a);
      });
    };
    m.race = function (a) {
      return new m(function (b, c) {
        a.forEach(function (a) {
          m.resolve(a).then(b, c);
        });
      });
    };
    m.prototype['catch'] = function (a) {
      return this.then(null, a);
    };
    m.prototype['finally'] = function (a) {
      return this.then(
        function (b) {
          return m.resolve(a()).then(function () {
            return b;
          });
        },
        function (b) {
          return m.resolve(a()).then(function () {
            throw b;
          });
        }
      );
    };
    e.exports = m;
  },
  null
);
__d(
  'PromiseAnnotate',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a, b) {
      a.displayName = b;
      return a;
    }
    function b(a) {
      a = a.displayName;
      if (typeof a === 'string') return a;
      else return null;
    }
    f.setDisplayName = a;
    f.getDisplayName = b;
  },
  66
);
__d(
  'ifRequireable',
  ['ifRequired'],
  function (a, b, c, d, e, f, g) {
    function a(a, b, d) {
      return c('ifRequired').call(null, a, b, d);
    }
    g['default'] = a;
  },
  98
);
__d(
  'JSResourceReference',
  ['JSResourceEvents', 'Promise', 'PromiseAnnotate', 'ifRequireable', 'ifRequired'],
  function (a, b, c, d, e, f, g) {
    var h = function (a) {
        return a;
      },
      i = [],
      j = null;
    function k(a) {
      j ? a(j) : i.push(a);
    }
    var l = 'JSResource: unknown caller';
    a = (function () {
      a.setBootloader = function (a) {
        j = a;
        for (var a = 0; a < i.length; a++) {
          var b = i[a];
          b(j);
        }
        i = [];
      };
      function a(a) {
        this.$1 = a;
      }
      var e = a.prototype;
      e.getModuleId = function () {
        var a = this.$1;
        return a;
      };
      e.getModuleIdAsRef = function () {
        return this.$1;
      };
      e.load = function () {
        var a = this;
        d('JSResourceEvents').notify(this.$1, this.$2, 'LOADED');
        var c = new (b('Promise'))(function (b) {
          k(function (c) {
            return c.loadModules([a.getModuleIdAsRef()], b, (c = a.$2) != null ? c : l);
          });
        });
        d('PromiseAnnotate').setDisplayName(c, 'Bootload(' + this.getModuleId() + ')');
        return c;
      };
      e.preload = function () {
        var a,
          b = this,
          c = (a = this.$2) != null ? a : l;
        k(function (a) {
          return a.loadModules([b.getModuleIdAsRef()], function () {}, 'preload: ' + c);
        });
      };
      e.equals = function (a) {
        return this === a || this.$1 == a.$1;
      };
      e.getModuleIfRequireable = function () {
        d('JSResourceEvents').notify(this.$1, this.$2, 'ACCESSED');
        return c('ifRequireable').call(null, this.$1, h);
      };
      e.getModuleIfRequired = function () {
        d('JSResourceEvents').notify(this.$1, this.$2, 'ACCESSED');
        return c('ifRequired').call(null, this.$1, h);
      };
      e.__setRef = function (a) {
        this.$2 = a;
        d('JSResourceEvents').notify(this.$1, this.$2, 'CREATED');
        return this;
      };
      a.loadAll = function (a, b) {
        var c = {},
          e = !1;
        for (var f = a, g = Array.isArray(f), h = 0, f = g ? f : f[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var i;
          if (g) {
            if (h >= f.length) break;
            i = f[h++];
          } else {
            h = f.next();
            if (h.done) break;
            i = h.value;
          }
          i = i;
          var j = i.$2;
          j && ((e = !0), (c[j] = !0));
          d('JSResourceEvents').notify(i.$1, j, 'LOADED');
        }
        k(function (d) {
          return d.loadModules(
            a.map(function (a) {
              return a.getModuleId();
            }),
            b,
            e ? Object.keys(c).join(':') : 'JSResource: unknown caller'
          );
        });
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  '$InternalEnum',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    var g = Object.prototype.hasOwnProperty,
      h = typeof WeakMap === 'function' ? new WeakMap() : new Map();
    function i(a) {
      var b = h.get(a);
      if (b !== void 0) return b;
      var c = new Map();
      Object.getOwnPropertyNames(a).forEach(function (b) {
        c.set(a[b], b);
      });
      try {
        h.set(a, c);
      } catch (a) {}
      return c;
    }
    var j = Object.freeze(
      Object.defineProperties(Object.create(null), {
        isValid: {
          value: function (a) {
            return i(this).has(a);
          },
        },
        cast: {
          value: function (a) {
            return this.isValid(a) ? a : void 0;
          },
        },
        members: {
          value: function () {
            return i(this).keys();
          },
        },
        getName: {
          value: function (a) {
            return i(this).get(a);
          },
        },
      })
    );
    function a(a) {
      var b = Object.create(j);
      for (var c in a) g.call(a, c) && Object.defineProperty(b, c, { value: a[c] });
      return Object.freeze(b);
    }
    var k = Object.freeze(
      Object.defineProperties(Object.create(null), {
        isValid: {
          value: function (a) {
            return typeof a === 'string' ? g.call(this, a) : !1;
          },
        },
        cast: { value: j.cast },
        members: {
          value: function () {
            return Object.getOwnPropertyNames(this).values();
          },
        },
        getName: {
          value: function (a) {
            return a;
          },
        },
      })
    );
    a.Mirrored = function (a) {
      var b = Object.create(k);
      for (var c = 0, d = a.length; c < d; ++c) Object.defineProperty(b, a[c], { value: a[c] });
      return Object.freeze(b);
    };
    Object.freeze(a.Mirrored);
    e.exports = Object.freeze(a);
  },
  null
);
__d(
  'RequireDeferredFactoryEvent',
  ['$InternalEnum'],
  function (a, b, c, d, e, f) {
    a = b('$InternalEnum')({ SUPPORT_DATA: 'sd', CSS: 'css' });
    c = a;
    f['default'] = c;
  },
  66
);
__d(
  'promiseDone',
  ['Env', 'ErrorPubSub', 'getErrorSafe'],
  function (a, b, c, d, e, f) {
    var g, h;
    function a(a, c, d) {
      var e,
        f = (e = (g || (g = b('Env'))).deferred_stack_trace_rate) != null ? e : 0,
        i = null;
      f >= 1 && Math.random() < 1 / f && (i = new Error(''));
      var j = function () {
          i = null;
        },
        k = arguments.length > 1 ? a.then(c, d) : a;
      k.then(j, function (a) {
        a = b('getErrorSafe')(a);
        a.deferredSource = i;
        a.loggingSource = 'PROMISE_DONE';
        (h || (h = b('ErrorPubSub'))).reportError(a);
        j();
      });
    }
    e.exports = a;
  },
  null
);
__d(
  'RequireDeferredReference',
  ['invariant', 'CallbackDependencyManager', 'Promise', 'RequireDeferredFactoryEvent', 'ifRequireable', 'ifRequired', 'performanceNow', 'promiseDone', 'requireWeak'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    a = 1;
    d = 2;
    e = 16;
    var i = a | d | e,
      j = null;
    function k() {
      j == null && (j = new (c('CallbackDependencyManager'))());
      return j;
    }
    function l(a, b) {
      return a + ':' + b;
    }
    var m = new Set();
    f = (function () {
      function a(a) {
        this.$1 = a;
      }
      var d = a.prototype;
      d.getModuleId = function () {
        var a = this.$1;
        return a;
      };
      d.getModuleIdAsRef = function () {
        return this.$1;
      };
      d.preload = function () {};
      d.getModuleIfRequired = function () {
        return c('ifRequired').call(null, this.$1, function (a) {
          return a;
        });
      };
      d.getModuleIfRequireable = function () {
        return c('ifRequireable').call(null, this.$1, function (a) {
          return a;
        });
      };
      d.$2 = function (a) {
        var b = this,
          d = c('ifRequireable')('InteractionTracingMetrics', function (a) {
            return a.currentInteractionLogger().addRequireDeferred(b.getModuleId(), c('performanceNow')());
          }),
          e = !1,
          f = function (b, f) {
            d == null ? void 0 : d(c('performanceNow')(), f), e || a(b);
          };
        c('ifRequireable').call(
          null,
          this.$1,
          function (a) {
            return f(a, !0);
          },
          function () {
            c('requireWeak').call(null, b.$1, function (a) {
              return f(a, !1);
            });
          }
        );
        return {
          remove: function () {
            e = !0;
          },
        };
      };
      d.load = function () {
        var a = this;
        return new (b('Promise'))(function (b) {
          return a.$2(b);
        });
      };
      d.__setRef = function (a) {
        return this;
      };
      d.onReadyImmediately = function (a) {
        return this.$2(a);
      };
      d.onReady = function (a) {
        var d = function () {
            return h(!1, 'Unreachable because Promise constructor is synchronous');
          },
          e = new (b('Promise'))(function (a) {
            return (d = a);
          }),
          f = this.$2(d);
        c('promiseDone')(e, a);
        return f;
      };
      d.loadImmediately = function (a) {
        return this.$2(a);
      };
      a.getRDModuleName_DO_NOT_USE = function (a) {
        return 'rd:' + a;
      };
      a.unblock = function (d, e) {
        var f = k(),
          g = function () {
            var g = d[h];
            m.has(g) ||
              (m.add(g),
              f.registerCallback(
                function () {
                  define(
                    a.getRDModuleName_DO_NOT_USE(g),
                    [g],
                    function () {
                      b.call(null, g);
                    },
                    i
                  );
                },
                Array.from(c('RequireDeferredFactoryEvent').members(), function (a) {
                  return l(g, a);
                })
              ));
            f.satisfyPersistentDependency(l(g, e));
          };
        for (var h = 0; h < d.length; h++) g();
      };
      return a;
    })();
    g['default'] = f;
  },
  98
);
__d(
  'ResourceHasher',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = 0;
    function a(a) {
      return 'async:' + a;
    }
    function b() {
      return 'ejs:' + i++;
    }
    function c(a) {
      typeof a === 'string' || h(0, 19551, a);
      return a;
    }
    g.getAsyncHash = a;
    g.createExternalJSHash = b;
    g.getValidResourceHash = c;
  },
  98
);
__d(
  'TrustedTypeUtils',
  ['TrustedTypesConfig'],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      return function (d) {
        if (a(d)) return d;
        try {
          for (var e = arguments.length, f = new Array(e > 1 ? e - 1 : 0), g = 1; g < e; g++) f[g - 1] = arguments[g];
          return b.apply(void 0, ['' + d].concat(f));
        } catch (a) {
          if (c('TrustedTypesConfig').reportOnly) return '' + d;
          throw a;
        }
      };
    }
    g.createTrustedType = a;
  },
  98
);
__d(
  'TrustedTypesWithNoDefaultPolicies',
  ['invariant', 'TrustedTypeUtils', 'TrustedTypesConfig'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    if (typeof trustedTypes !== 'undefined' && c('TrustedTypesConfig').useTrustedTypes) {
      var i = trustedTypes;
      a = babelHelpers['extends']({}, i, {
        createPolicy: function (a, b) {
          ('createHTML' in b && 'createScriptURL' in b && 'createScript' in b) || h(0, 56394);
          a = i.createPolicy(a, b);
          return {
            createHTML: d('TrustedTypeUtils').createTrustedType(i.isHTML.bind(i), a.createHTML.bind(a)),
            createScript: d('TrustedTypeUtils').createTrustedType(i.isScript.bind(i), a.createScript.bind(a)),
            createScriptURL: d('TrustedTypeUtils').createTrustedType(i.isScriptURL.bind(i), a.createScriptURL.bind(a)),
          };
        },
      });
      b = a;
    } else {
      var j = function (a) {
        return a;
      };
      e = {
        isHTML: function () {
          return !1;
        },
        isScriptURL: function () {
          return !1;
        },
        isScript: function () {
          return !1;
        },
        createPolicy: function (a, b) {
          return { createHTML: j, createScriptURL: j, createScript: j };
        },
      };
      b = e;
    }
    f = b;
    g['default'] = f;
  },
  98
);
__d(
  'createTrustedScriptURLFromBootloaderDataURI',
  ['TrustedTypesWithNoDefaultPolicies'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    b = function (a) {
      return a;
    };
    var h = 'bootloader-data-uri',
      i,
      j = {
        createScriptURL: function (a) {
          return a;
        },
        createScript: b,
        createHTML: b,
      };
    function k() {
      if (i) return;
      i = c('TrustedTypesWithNoDefaultPolicies').createPolicy(h, j);
    }
    function l() {
      i || k();
      return i;
    }
    function a(a) {
      return l().createScriptURL(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'isCdnURI',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a) {
      if (a.getProtocol() !== 'http' && a.getProtocol() !== 'https') return !1;
      var b = Number(a.getPort());
      if (!!b && b !== 80 && b !== 443) return !1;
      return a.isSubdomainOfDomain('fbcdn.net') ? !0 : !1;
    }
    f['default'] = a;
  },
  66
);
__d(
  'isFacebookURI',
  [],
  function (a, b, c, d, e, f) {
    var g = null,
      h = ['http', 'https'];
    function a(a) {
      g || (g = new RegExp('(^|\\.)facebook\\.com$', 'i'));
      if (a.isEmpty() && a.toString() !== '#') return !1;
      return !a.getDomain() && !a.getProtocol() ? !0 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain());
    }
    a.setRegex = function (a) {
      g = a;
    };
    f['default'] = a;
  },
  66
);
__d(
  'createTrustedScriptURLFromFacebookURI',
  ['TrustedTypesWithNoDefaultPolicies', 'URI', 'err', 'isCdnURI', 'isFacebookURI'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    b = function (a) {
      return a;
    };
    var h = 'fburi-scripturls',
      i,
      j = {
        createScriptURL: function (a) {
          var b = c('URI').tryParseURI(a);
          if (b != null && (c('isFacebookURI')(b) || c('isCdnURI')(b))) return a;
          throw c('err')('Violating Trusted Type policies, non-fb URI.');
        },
        createScript: b,
        createHTML: b,
      };
    function k() {
      if (i) return;
      i = c('TrustedTypesWithNoDefaultPolicies').createPolicy(h, j);
    }
    function l() {
      i || k();
      return i;
    }
    function a(a) {
      return l().createScriptURL(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'Bootloader',
  [
    'invariant',
    'BootloaderConfig',
    'BootloaderEndpoint',
    'BootloaderEvents',
    'BootloaderEventsManager',
    'CSRBitMap',
    'CSRIndexUtil',
    'CSSLoader',
    'ClientConsistency',
    'ErrorPubSub',
    'FBLogger',
    'JSResourceReference',
    'NetworkStatus',
    'RequireDeferredReference',
    'ResourceHasher',
    'ResourceTimingsStore',
    'TimeSlice',
    'cr:696703',
    'createTrustedScriptURLFromBootloaderDataURI',
    'createTrustedScriptURLFromFacebookURI',
    'err',
    'fb-error',
    'ifRequireable',
    'nullthrows',
    'performanceAbsoluteNow',
    'performanceNow',
    'setTimeoutAcrossTransitions',
  ],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h,
      i,
      j,
      k = b('fb-error').TAAL,
      l = b('CSRIndexUtil').UNKNOWN_RESOURCE_INDEX,
      m = b('CSRIndexUtil').parseCSRIndexes,
      n = function () {},
      o = new Set(),
      p = !!b('BootloaderConfig').deferBootloads;
    p &&
      !a.__comet_ssr_is_server_env_DO_NOT_USE &&
      b('setTimeoutAcrossTransitions')(function () {
        $.undeferBootloads(!0);
      }, 15e3);
    var q = [],
      r = new Map(),
      s = new Map(),
      t = new Map(),
      u = new Map(),
      v = new Map(),
      w = null,
      x = new Map(),
      y = new Map(),
      z = new Map(),
      A = [],
      B = new Map(),
      C = new Set(),
      D = !1,
      E = new Set(),
      F = !1,
      G = new (b('BootloaderEventsManager'))(),
      H = b('BootloaderConfig').jsRetries || [],
      I = b('BootloaderConfig').jsRetryAbortNum,
      J = b('BootloaderConfig').jsRetryAbortTime,
      K = H.length > 0;
    (h || (h = b('ErrorPubSub'))).unshiftListener(function (a) {
      var b = [];
      for (var c = s, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
        var f;
        if (d) {
          if (e >= c.length) break;
          f = c[e++];
        } else {
          e = c.next();
          if (e.done) break;
          f = e.value;
        }
        f = f;
        var g = f[0];
        f[1];
        if (t.has(g)) continue;
        f = N(g);
        if (f.type === 'csr' || f.type === 'async') continue;
        b.push(f.src);
      }
      a.loadingUrls = b;
    });
    function aa(a) {
      if (p || !F) return !1;
      for (var b = 0; b < a.length; b++) {
        var c,
          d = a[b];
        d = v.get(d);
        if (!d) return !1;
        d = [d.r, ((c = d.rdfds) == null ? void 0 : c.r) || [], ((c = d.rds) == null ? void 0 : c.r) || []];
        for (var c = 0; c < d.length; c++) {
          var e = d[c];
          for (var e = e, f = Array.isArray(e), g = 0, e = f ? e : e[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
            var h;
            if (f) {
              if (g >= e.length) break;
              h = e[g++];
            } else {
              g = e.next();
              if (g.done) break;
              h = g.value;
            }
            h = h;
            if (!x.has(h)) return !1;
          }
        }
      }
      return !0;
    }
    function L(a) {
      var c = v.get(a);
      if (!c) throw k.blameToPreviousFile(b('err')('Bootloader: %s is not in the component map', a));
      return c;
    }
    function M(a) {
      var c = L(a);
      c.be && (delete c.be, $.done(b('ResourceHasher').getAsyncHash(a)));
    }
    function N(a) {
      var c = x.get(a);
      if (!c) throw k.blameToPreviousFile(b('err')('No resource entry for hash: %s', a));
      return c;
    }
    function ba(a, c) {
      var d = b('ResourceHasher').getAsyncHash(a);
      if (!x.has(d)) x.set(d, { type: 'async', module: a, blocking: !!c });
      else {
        a = N(d);
        a.type === 'async' || g(0, 21557);
        a.blocking && !c && (a.blocking = !1);
      }
      return d;
    }
    function O() {
      w || (w = document.head || document.getElementsByTagName('head')[0] || document.body);
      return w;
    }
    function P(a) {
      var b = document.createDocumentFragment();
      a(b);
      O().appendChild(b);
    }
    function Q() {
      if (!K) return !1;
      var a = A.length;
      if (a < I) return !0;
      a = A[a - 1] - A[a - I];
      a < J && (b('FBLogger')('bootloader').warn('JS retry abort'), (K = !1));
      return K;
    }
    function ca(a, b, c) {
      a = void 0;
      switch (b.type) {
        case 'async':
          return;
        case 'css':
          a = 'style';
          break;
        case 'js':
          a = 'script';
          break;
        default:
          (a = b.type), g(0, 3721);
      }
      if (b.d === 1) return;
      var d = document.createElement('link');
      d.href = b.src;
      d.rel = 'preload';
      d.as = a;
      b.nc || (d.crossOrigin = 'anonymous');
      c.appendChild(d);
    }
    function R(a, c, d, e) {
      var f = document.createElement('script');
      c.d ? (f.src = b('createTrustedScriptURLFromBootloaderDataURI')(c.src)) : (f.src = b('createTrustedScriptURLFromFacebookURI')(c.src));
      f.async = !0;
      c.nc || (f.crossOrigin = 'anonymous');
      c.m != null && (f.dataset.btmanifest = c.m);
      f.dataset.bootloaderHashClient = a;
      S(f, a, c, d);
      e.appendChild(f);
      return f;
    }
    function S(a, c, d, e) {
      var f = a.src,
        g = (i || (i = b('performanceAbsoluteNow')))(),
        h = b('TimeSlice').getGuardedContinuation('Bootloader script.onresponse'),
        j = b('ResourceTimingsStore').getUID('js', f);
      b('ResourceTimingsStore').annotate('js', j).addStringAnnotation('name', c).addStringAnnotation('source', f);
      b('ifRequireable')('TimeSliceInteraction', function (a) {
        a.informGlobally('bootloader._loadJS').addStringAnnotation('source', f).addStringAnnotation('name', c);
      });
      b('ResourceTimingsStore').measureRequestSent('js', j);
      a.onload = h.bind(void 0, function () {
        var a;
        a = (a = z.get(f)) != null ? a : 0;
        a && b('FBLogger')('bootloader').info('JS retry success [%s] at %s | time: %s | retries: %s', c, f, (i || (i = b('performanceAbsoluteNow')))() - g, a);
        b('ResourceTimingsStore').measureResponseReceived('js', j);
        e();
      });
      a.onreadystatechange = function () {
        ['loaded', 'complete'].includes(this.readyState) && (b('ResourceTimingsStore').measureResponseReceived('js', j), h.bind(void 0, e)());
      };
      a.onerror = h.bind(void 0, function () {
        var h;
        b('ResourceTimingsStore').measureResponseReceived('js', j);
        h = (h = z.get(f)) != null ? h : 0;
        var k = (i || (i = b('performanceAbsoluteNow')))();
        Q() && h < H.length
          ? (A.push(k),
            setTimeout(function () {
              if (!Q()) return;
              var b = a.parentNode;
              b && (b.removeChild(a), R(c, d, e, b));
            }, H[h]),
            z.set(f, h + 1))
          : (u.set(c, k), b('FBLogger')('bootloader').warn('JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s', c, f, k - g, h, s.size - t.size), b('NetworkStatus').reportError(), e());
      });
    }
    function T(a, c, d) {
      return function () {
        b('FBLogger')('bootloader').warn('CSS timeout [%s] at %s | concurrency: %s', a, c.src, s.size - t.size), u.set(a, (i || (i = b('performanceAbsoluteNow')))()), b('NetworkStatus').reportError(), d();
      };
    }
    function da(a, c, d, e) {
      if (s.has(a)) return;
      s.set(a, (i || (i = b('performanceAbsoluteNow')))());
      if (c.p && b('BootloaderConfig').hypStep4) {
        var f = m(c.p),
          h = new Set(),
          j = 0;
        f.forEach(function (b, c) {
          b !== l && y.get(b) !== a && h.add(c), b > j && (j = b);
        });
        j > b('BootloaderConfig').btCutoffIndex && b('BootloaderEvents').notifyResourceInLongTailBTManifest();
        if (h.size === f.length) return;
        else if (h.size > 0) {
          f = c.src.replace(/\/y[a-zA-Z0-9_-]\//, '/');
          f.includes('/intern/rsrc.php')
            ? (c.src = f.replace(/(!)(.+)(\.(?:css|js)(?:$|\?))/, function (a, b, c, d) {
                return (
                  b +
                  c
                    .split(',')
                    .filter(function (a, b) {
                      return !h.has(b);
                    })
                    .join(',') +
                  d
                );
              }))
            : f.includes('/rsrc.php') &&
              (c.src = f.replace(/(.*\/)([^.]+)(\.)/, function (a, b, c, d) {
                return (
                  b +
                  c
                    .match(/.{1,11}/g)
                    .filter(function (a, b) {
                      return !h.has(b);
                    })
                    .join('') +
                  d
                );
              }));
        }
      }
      ca(a, c, d);
      window.CavalryLogger && window.CavalryLogger.getInstance().measureResources({ name: a, type: c.type }, e);
      switch (c.type) {
        case 'js':
          R(
            a,
            c,
            function () {
              return $.done(a);
            },
            d
          );
          break;
        case 'css':
          f = function () {
            return $.done(a);
          };
          b('CSSLoader').loadStyleSheet(a, c.src, d, !c.nc, f, T(a, c, f));
          break;
        case 'async':
          b('BootloaderEndpoint').load(c.module, c.blocking, a);
          break;
        default:
          c.type, g(0, 3721);
      }
    }
    function U(a, c, d, e, f) {
      var h = new Map(),
        i = (f = f) != null ? f : b('BootloaderEvents').newResourceMapSet();
      f = [];
      var j = [],
        k = [];
      for (var a = W(a), l = Array.isArray(a), m = 0, a = l ? a : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
        var n;
        if (l) {
          if (m >= a.length) break;
          n = a[m++];
        } else {
          m = a.next();
          if (m.done) break;
          n = m.value;
        }
        n = n;
        var o = n[0];
        n = n[1];
        var p = void 0;
        switch (n.type) {
          case 'css':
            p = n.nonblocking ? 'nonblocking' : 'blocking';
            break;
          case 'js':
            p = 'default';
            break;
          case 'async':
            p = n.blocking ? 'blocking' : 'nonblocking';
            break;
          default:
            n.type, g(0, 3721);
        }
        i[p].set(o, n);
        var q = G.rsrcDone(o);
        k.push(q);
        p !== 'nonblocking' && (j.push(q), p === 'blocking' && f.push(q));
        s.has(o) || h.set(o, n);
      }
      var r, t;
      !b('cr:696703')
        ? (r = t =
            function (a) {
              return a();
            })
        : ((t = b('cr:696703').scheduleLoggingPriCallback), (r = b('cr:696703').getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE()));
      var u = c.onBlocking,
        v = c.onAll,
        w = c.onLog;
      u &&
        G.registerCallback(function () {
          r(u);
        }, f);
      v &&
        G.registerCallback(function () {
          r(v);
        }, j);
      w &&
        G.registerCallback(function () {
          t(function () {
            return w(i);
          });
        }, k);
      for (var p = h, q = Array.isArray(p), o = 0, p = q ? p : p[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
        if (q) {
          if (o >= p.length) break;
          n = p[o++];
        } else {
          o = p.next();
          if (o.done) break;
          n = o.value;
        }
        m = n;
        l = m[0];
        a = m[1];
        da(l, a, d, e);
      }
    }
    function V(a, c, d) {
      x.set(a, c);
      if (c.type === 'async' || c.type === 'csr') return;
      var e = c.p;
      if (e)
        for (var e = m(e), f = Array.isArray(e), g = 0, e = f ? e : e[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var h;
          if (f) {
            if (g >= e.length) break;
            h = e[g++];
          } else {
            g = e.next();
            if (g.done) break;
            h = g.value;
          }
          h = h;
          if (h === l) continue;
          (!y.has(h) || d) && y.set(h, a);
          (b('BootloaderConfig').phdOn ? c.c == 2 : c.c) && b('CSRBitMap').add(h);
        }
    }
    function ea(a, c) {
      var d = G.bootload(c);
      if (C.has(d)) return [d, null];
      C.add(d);
      var e = (i || (i = b('performanceAbsoluteNow')))();
      c = {
        ref: a,
        components: c,
        timesliceContext: b('TimeSlice').getContext(),
        startTime: (a = r.get(d)) != null ? a : e,
        fetchStartTime: e,
        callbackStart: 0,
        callbackEnd: 0,
        tierOne: b('BootloaderEvents').newResourceMapSet(),
        tierTwo: b('BootloaderEvents').newResourceMapSet(),
        tierThree: b('BootloaderEvents').newResourceMapSet(),
        beRequests: new Map(),
      };
      b('BootloaderEvents').notifyBootloadStart(c);
      return [d, c];
    }
    function fa(a) {
      return b('ifRequireable').call(
        null,
        a,
        function () {
          return !0;
        },
        function () {
          return !1;
        }
      );
    }
    function ga(a, c, e, f) {
      B.has(a) || B.set(a, { firstBootloadStart: (i || (i = b('performanceAbsoluteNow')))(), logData: new Set() });
      f && b('nullthrows')(B.get(a)).logData.add(f);
      var g = L(a),
        h = g.r,
        j = g.rdfds,
        k = g.rds;
      g = g.be;
      g = fa(a) ? null : ba(a, g);
      g == null && G.notify(G.beDone(a));
      U(
        g != null ? [g].concat(h) : h,
        {
          onAll: function () {
            return G.notify(G.tierOne(a));
          },
          onLog: function () {
            return G.notify(G.tierOneLog(a));
          },
        },
        e,
        f == null ? void 0 : f.ref,
        f == null ? void 0 : f.tierOne
      );
      var l = (j == null ? void 0 : j.m) || [];
      U(
        (j == null ? void 0 : j.r) || [],
        {
          onBlocking: function () {
            return b('RequireDeferredReference').unblock(l, 'css');
          },
          onAll: function () {
            return G.registerCallback(
              function () {
                G.notify(G.tierTwoStart(a)),
                  d.call(null, l.map(b('RequireDeferredReference').getRDModuleName_DO_NOT_USE), function () {
                    return G.notify(G.tierTwo(a));
                  });
              },
              [G.tierOne(a), c]
            );
          },
          onLog: function () {
            return G.notify(G.tierTwoLog(a));
          },
        },
        e,
        f == null ? void 0 : f.ref,
        f == null ? void 0 : f.tierTwo
      );
      var m = (k == null ? void 0 : k.m) || [];
      U(
        (k == null ? void 0 : k.r) || [],
        {
          onBlocking: function () {
            return b('RequireDeferredReference').unblock(m, 'css');
          },
          onAll: function () {
            return G.registerCallback(
              function () {
                G.notify(G.tierThreeStart(a)),
                  d.call(null, m.map(b('RequireDeferredReference').getRDModuleName_DO_NOT_USE), function () {
                    return G.notify(G.tierThree(a));
                  });
              },
              [G.tierTwo(a)]
            );
          },
          onLog: function () {
            return G.notify(G.tierThreeLog(a));
          },
        },
        e,
        f == null ? void 0 : f.ref,
        f == null ? void 0 : f.tierThree
      );
    }
    function W(a) {
      var c = new Map();
      for (var d = 0; d < a.length; d++) {
        var e = a[d],
          f = x.get(e);
        if (!f) {
          b('FBLogger')('bootloader').mustfix('Unable to resolve resource %s.', e);
          continue;
        }
        var h = void 0;
        if (f.type === 'csr') h = m(f.src);
        else if (f.p)
          (h = m(f.p)),
            h.includes(l) && c.set(e, f),
            (h = h.filter(function (a) {
              return a !== l;
            }));
        else {
          c.set(e, f);
          continue;
        }
        for (var e = h, f = Array.isArray(e), h = 0, e = f ? e : e[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var i;
          if (f) {
            if (h >= e.length) break;
            i = e[h++];
          } else {
            h = e.next();
            if (h.done) break;
            i = h.value;
          }
          i = i;
          i = b('nullthrows')(y.get(i), 'No hash for rsrcIndex:' + i);
          var j = N(i);
          j.type !== 'csr' || g(0, 20056, i);
          c.set(i, j);
        }
      }
      return c.entries();
    }
    function X(a) {
      var c,
        d = a.getAttribute('data-bootloader-hash');
      if (d == null) return;
      var e = b('ResourceHasher').getValidResourceHash(d);
      if (a.id) {
        if (E.has(a.id)) return;
        E.add(a.id);
      }
      d = a.tagName == 'SCRIPT' ? { src: a.src, type: 'js' } : { src: a.href, type: 'css' };
      a.crossOrigin == null && (d.nc = 1);
      d.type === 'css' && a.getAttribute('data-nonblocking') && (d.nonblocking = 1);
      var f = a.getAttribute('data-c');
      f == '1' ? (d.c = 1) : f == '2' && (d.c = 2);
      d.p = a.getAttribute('data-p');
      f = a.getAttribute('data-btmanifest');
      f != null && (d.m = f);
      x.has(e) && !b('BootloaderConfig').silentDups && b('FBLogger')('bootloader').warn('Duplicate resource [%s]: %s', e, d.src);
      V(e, d, !0);
      s.set(e, (i || (i = b('performanceAbsoluteNow')))());
      f = function () {
        return $.done(e);
      };
      c = d.type === 'js' ? !a.getAttribute('async') : ((c = a.parentNode) == null ? void 0 : c.tagName) === 'HEAD';
      c || (window._btldr && window._btldr[e]) ? f() : d.type === 'js' ? S(a, e, d, f) : b('CSSLoader').setupEventListeners(e, d.src, O(), f, T(e, d, f), a);
    }
    function Y() {
      if (D) return;
      D = !0;
      Array.from(document.getElementsByTagName('link')).forEach(function (a) {
        return X(a);
      });
      Array.from(document.getElementsByTagName('script')).forEach(function (a) {
        return X(a);
      });
    }
    function Z() {
      F = !0;
      var a = q;
      q = [];
      a.forEach(function (a) {
        var b = a[0],
          c = a[1],
          d = a[2];
        a = a[3];
        a(function () {
          $.loadModules.apply($, [b, c, d]);
        });
      });
    }
    var $ = {
      loadModules: function (a, c, e) {
        c === void 0 && (c = n);
        e === void 0 && (e = 'loadModules: unknown caller');
        var f = a,
          g = !1,
          h = function () {
            g || c.apply(void 0, arguments);
          };
        a = {
          remove: function () {
            g = !0;
          },
        };
        if (!aa(f)) {
          var j = 'Deferred: Bootloader.loadModules';
          j = b('TimeSlice').getGuardedContinuation(j);
          q.push([f, h, e, j]);
          j = G.bootload(f);
          r.set(j, (j = r.get(j)) != null ? j : (i || (i = b('performanceAbsoluteNow')))());
          return a;
        }
        j = ea(e, f);
        var k = j[0],
          l = j[1];
        G.registerCallback(
          d.bind(null, f, function () {
            l && (l.callbackStart = (i || (i = b('performanceAbsoluteNow')))()), h.apply(void 0, arguments), l && (l.callbackEnd = (i || (i = b('performanceAbsoluteNow')))()), G.notify(k);
          }),
          f.map(function (a) {
            return G.tierOne(a);
          })
        );
        P(function (b) {
          for (var c = 0; c < f.length; c++) {
            var a = f[c];
            ga(a, k, b, l);
          }
        });
        if (l) {
          j = new Set([k]);
          for (var m = 0; m < f.length; m++) {
            var o = f[m];
            j.add(G.beDone(o));
            j.add(G.tierThree(o));
            j.add(G.tierOneLog(o));
            j.add(G.tierTwoLog(o));
            j.add(G.tierThreeLog(o));
          }
          G.registerCallback(function () {
            return b('BootloaderEvents').notifyBootload(l);
          }, Array.from(j));
          b('ifRequireable')('TimeSliceInteraction', function (a) {
            a.informGlobally('Bootloader.loadResources')
              .addSetAnnotation('requested_hashes', Array.from(b('BootloaderEvents').flattenResourceMapSet(l.tierOne).keys()))
              .addSetAnnotation('rdfd_requested_hashes', Array.from(b('BootloaderEvents').flattenResourceMapSet(l.tierTwo).keys()))
              .addSetAnnotation('rd_requested_hashes', Array.from(b('BootloaderEvents').flattenResourceMapSet(l.tierThree).keys()))
              .addStringAnnotation('bootloader_reference', e)
              .addSetAnnotation('requested_components', f);
          });
        }
        return a;
      },
      loadResources: function (a, c, d) {
        d === void 0 && (d = 'loadResources: unknown caller'),
          Y(),
          P(function (e) {
            var f;
            return U(
              a.map(function (a) {
                return b('ResourceHasher').getValidResourceHash(a);
              }),
              (f = c) != null ? f : Object.freeze({}),
              e,
              d
            );
          });
      },
      requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN: function (a) {
        var c = b('ResourceHasher').createExternalJSHash();
        V(c, { type: 'js', src: a, nc: 1 }, !1);
        $.loadResources([c]);
      },
      done: function (a) {
        t.set(a, (i || (i = b('performanceAbsoluteNow')))()), window.CavalryLogger && window.CavalryLogger.done_js([a]), G.notify(G.rsrcDone(a));
      },
      beDone: function (a, b, c) {
        for (var d = (d = (d = B.get(a)) == null ? void 0 : d.logData) != null ? d : [], e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var d, g;
          if (e) {
            if (f >= d.length) break;
            g = d[f++];
          } else {
            f = d.next();
            if (f.done) break;
            g = f.value;
          }
          g = g;
          g.beRequests.set(b, c);
        }
        G.notify(G.beDone(a));
      },
      handlePayload: function (a, c) {
        for (var d = (d = a.rsrcTags) != null ? d : [], e = Array.isArray(d), f = 0, d = e ? d : d[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var d, g;
          if (e) {
            if (f >= d.length) break;
            g = d[f++];
          } else {
            f = d.next();
            if (f.done) break;
            g = f.value;
          }
          g = g;
          X(document.getElementById(g));
        }
        $.setResourceMap((g = a.rsrcMap) != null ? g : {}, a.sotUpgrades, a.consistency.rev, c);
        a.csrUpgrade &&
          m(a.csrUpgrade).forEach(function (a) {
            return b('CSRBitMap').add(a);
          });
        a.compMap && $.enableBootload(a.compMap, c);
      },
      enableBootload: function (a, b) {
        for (var c in a) b && b.comp++, !v.has(c) ? (v.set(c, a[c]), o.has(c) && (o['delete'](c), M(c))) : b && b.dup_comp++;
        Y();
        p || Z();
      },
      undeferBootloads: function (a) {
        a === void 0 && (a = !1);
        if (window.location.search.indexOf('&__deferBootloads=') !== -1) return;
        a &&
          p &&
          b('BootloaderEvents').notifyDeferTimeout({
            componentMapSize: v.size,
            pending: q.map(function (a) {
              var b = a[0];
              a[1];
              var c = a[2];
              a[3];
              return { components: b, ref: c };
            }),
            time: (j || (j = b('performanceNow')))(),
          });
        p = !1;
        v.size && Z();
      },
      markComponentsAsImmediate: function (a) {
        for (var b = 0; b < a.length; b++) {
          var c = a[b];
          v.has(c) ? M(c) : o.add(c);
        }
      },
      setResourceMap: function (a, c, d, e) {
        var f = !1;
        for (var g in a) {
          e && e.rsrc++;
          g = b('ResourceHasher').getValidResourceHash(g);
          var h = a[g],
            i = x.get(g);
          !i ? (h.type === 'js' && (f = !0), V(g, h, !1)) : (e && e.dup_rsrc++, ((i.type === 'js' && h.type === 'js') || (i.type === 'css' && h.type === 'css')) && h.d && !i.d && (h.type === 'js' && (f = !0), (i.src = h.src), (i.d = 1)));
        }
        f && d != null && b('ClientConsistency').addAdditionalRevision(d);
        if (c)
          for (var h = c, i = Array.isArray(h), a = 0, h = i ? h : h[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
            if (i) {
              if (a >= h.length) break;
              e = h[a++];
            } else {
              a = h.next();
              if (a.done) break;
              e = a.value;
            }
            f = e;
            d = x.get(f);
            d && V(f, d, !0);
          }
      },
      getURLToHashMap: function () {
        var a = new Map();
        for (var b = x, c = Array.isArray(b), d = 0, b = c ? b : b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var e;
          if (c) {
            if (d >= b.length) break;
            e = b[d++];
          } else {
            d = b.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          var f = e[0];
          e = e[1];
          if (e.type === 'async' || e.type === 'csr') continue;
          a.set(e.src, f);
        }
        return a;
      },
      loadPredictedResourceMap: function (a, b, c) {
        $.setResourceMap(a, null, c), $.loadResources(Object.keys(a), b);
      },
      getCSSResources: function (a) {
        var b = [];
        for (var a = W(a), c = Array.isArray(a), d = 0, a = c ? a : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var e;
          if (c) {
            if (d >= a.length) break;
            e = a[d++];
          } else {
            d = a.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          var f = e[0];
          e = e[1];
          e.type === 'css' && b.push(f);
        }
        return b;
      },
      getBootloadedComponents: function () {
        var a = new Map();
        for (var b = B, c = Array.isArray(b), d = 0, b = c ? b : b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var e;
          if (c) {
            if (d >= b.length) break;
            e = b[d++];
          } else {
            d = b.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          var f = e[0];
          e = e[1];
          a.set(f, e.firstBootloadStart);
        }
        return a;
      },
      getResourceState: function (a) {
        return { loadStart: s.get(a), loadEnd: t.get(a), loadError: u.get(a) };
      },
      getComponentTiming: function (a) {
        var b;
        return {
          tierTwoStart: (b = G.getEventTime(G.tierTwoStart(a))) != null ? b : 0,
          tierTwoEnd: (b = G.getEventTime(G.tierTwo(a))) != null ? b : 0,
          tierThreeStart: (b = G.getEventTime(G.tierThreeStart(a))) != null ? b : 0,
          tierThreeEnd: (b = G.getEventTime(G.tierThree(a))) != null ? b : 0,
        };
      },
      getLoadedResourceCount: function () {
        return t.size;
      },
      getErrorCount: function () {
        return u.size;
      },
      forceFlush: function () {
        b('BootloaderEndpoint').forceFlush();
      },
      __debug: {
        componentMap: v,
        requested: s,
        resources: x,
        riMap: y,
        retries: z,
        errors: u,
        loaded: t,
        bootloaded: B,
        queuedToMarkAsImmediate: o,
        _resolveCSRs: W,
        _getQueuedLoadModules: function () {
          return q;
        },
        _dequeueLoadModules: function (a) {
          a = q.splice(a, 1);
          if (!a.length) return;
          a = a[0];
          var b = a[0],
            c = a[1],
            d = a[2];
          a = a[3];
          var e = p,
            f = F;
          p = !1;
          F = !0;
          a(function () {
            $.loadModules.apply($, [b, c, d]);
          });
          p = e;
          F = f;
        },
      },
    };
    b('JSResourceReference').setBootloader($);
    e.exports = $;
  },
  null
);
__d(
  'CSRFGuard',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    c = 'for (;;);';
    var g = /^for ?\(;;\);/;
    d = c.length;
    function a(a) {
      return !!a.match(g);
    }
    function b(a) {
      var b = a.match(g);
      return b ? a.substr(b[0].length) : b;
    }
    f.regex = g;
    f.length = d;
    f.exists = a;
    f.clean = b;
  },
  66
);
__d(
  'clearImmediatePolyfill',
  ['ImmediateImplementation'],
  function (a, b, c, d, e, f) {
    c = a.clearImmediate || b('ImmediateImplementation').clearImmediate;
    f['default'] = c;
  },
  66
);
__d(
  'clearImmediate',
  ['clearImmediatePolyfill'],
  function (a, b, c, d, e, f, g) {
    function a(a) {
      c('clearImmediatePolyfill')(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'CurrentCommunity',
  ['CurrentCommunityInitialData'],
  function (a, b, c, d, e, f) {
    a = {
      getID: function () {
        return b('CurrentCommunityInitialData').COMMUNITY_ID || '0';
      },
      getName: function () {
        return b('CurrentCommunityInitialData').COMMUNITY_NAME || '';
      },
    };
    c = a;
    f['default'] = c;
  },
  66
);
__d(
  'XHRTransport',
  ['CSRFGuard', 'FBJSON', 'PHPQuerySerializer', 'Promise'],
  function (a, b, c, d, e, f, g) {
    function h(a, b) {
      return a && b ? a + '&' + b : a || b || '';
    }
    function a() {
      try {
        try {
          return new XMLHttpRequest();
        } catch (a) {
          return new ActiveXObject('Msxml2.XMLHTTP');
        }
      } catch (a) {
        return new ActiveXObject('Microsoft.XMLHTTP');
      }
    }
    function i(a, c, e, f, g) {
      var i = c;
      return new (b('Promise'))(function (b, c) {
        var j = k.createTransportObject(),
          l = g || '';
        e && (l = h(l, d('PHPQuerySerializer').serialize(e)));
        f && (l = h(l, d('PHPQuerySerializer').serialize(f)));
        a === 'GET' && (i += (i.indexOf('?') === -1 ? '?' : '&') + l);
        j.open(a, i, !0);
        j.onreadystatechange = function () {
          if (j.readyState === 4) {
            if (j.status < 200 || j.status >= 300) {
              c(j.responseText);
              return;
            }
            b(j.responseText);
          }
        };
        a === 'POST' ? (j.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'), j.send(l)) : j.send();
      });
    }
    function c(a, b, c, d) {
      var e = '__a=true';
      return i(a, b, c, d, e).then(j);
    }
    function j(a) {
      a = a;
      a = a.replace(d('CSRFGuard').regex, '');
      a = d('FBJSON').parse(a, f.id);
      if (a.error) return b('Promise').reject(a.error);
      else {
        a = a.payload;
        typeof a === 'string' && (a = d('FBJSON').parse(a, f.id));
        return a;
      }
    }
    var k = { sendAJAXRequest: c, sendRequest: i, createTransportObject: a };
    e = k;
    g['default'] = e;
  },
  98
);
__d(
  'TokenFetcher',
  ['Promise', 'XHRTransport', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a() {
      return h(!1);
    }
    function d() {
      return h(!0);
    }
    var h = function (a) {
      a === void 0 && (a = !1);
      var d = 0;
      function e() {
        return a ? c('XHRTransport').sendAJAXRequest('GET', '/ajax/dtsg/', { ag: a }).then(f)['catch'](g) : c('XHRTransport').sendAJAXRequest('GET', '/ajax/dtsg/').then(f)['catch'](g);
      }
      function f(a) {
        var b = a.token;
        a = a.valid_for;
        if (typeof b === 'string' && typeof a === 'number') return { token: b, valid_for: a };
        throw new Error('Token GET: Bad response received.');
      }
      function g() {
        return new (b('Promise'))(function (a) {
          (d += 1),
            c('setTimeoutAcrossTransitions')(function () {
              a(e());
            }, Math.pow(2, d) * 1e3);
        });
      }
      return e();
    };
    g.fetchTokenConfig = a;
    g.fetchTokenConfigForAsyncGET = d;
  },
  98
);
__d(
  'DTSG',
  ['MRequestConfig', 'Promise', 'TokenFetcher', 'clearTimeout', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h, i, j;
    function k() {
      (j = null), (i = null);
    }
    function l(a) {
      c('clearTimeout')(i), (i = c('setTimeoutAcrossTransitions')(k, (a.valid_for - 60) * 1e3)), (j = a.token);
    }
    l(c('MRequestConfig').dtsg);
    function a() {
      (j = null), (i = null);
    }
    function e() {
      return j;
    }
    function f() {
      return j != null ? b('Promise').resolve(j) : n();
    }
    function m(a) {
      j = a;
    }
    function n() {
      h ||
        (h = d('TokenFetcher')
          .fetchTokenConfig()
          .then(function (a) {
            l(a);
            return a.token;
          }));
      return h;
    }
    g.clear = a;
    g.getCachedToken = e;
    g.getToken = f;
    g.setToken = m;
    g.refresh = n;
  },
  98
);
__d(
  'isMessengerDotComURI',
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp('(^|\\.)messenger\\.com$', 'i'),
      h = ['https'];
    function a(a) {
      if (a.isEmpty() && a.toString() !== '#') return !1;
      return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain());
    }
    f['default'] = a;
  },
  66
);
__d(
  'isOculusDotComURI',
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp('(^|\\.)oculus\\.com$', 'i'),
      h = ['https'];
    function a(a) {
      if (a.isEmpty() && a.toString() !== '#') return !1;
      return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain());
    }
    f['default'] = a;
  },
  66
);
__d(
  'isWorkplaceDotComURI',
  [],
  function (a, b, c, d, e, f) {
    var g = new RegExp('(^|\\.)workplace\\.com$', 'i');
    function a(a) {
      return a.getProtocol() === 'https' && g.test(a.getDomain());
    }
    f['default'] = a;
  },
  66
);
__d(
  'DTSGUtils',
  ['SprinkleConfig', 'isCdnURI', 'isFacebookURI', 'isMessengerDotComURI', 'isOculusDotComURI', 'isWorkplaceDotComURI'],
  function (a, b, c, d, e, f) {
    'use strict';
    a = {
      getNumericValue: function (a) {
        var c = 0;
        for (var d = 0; d < a.length; d++) c += a.charCodeAt(d);
        c = c.toString();
        return b('SprinkleConfig').should_randomize ? c : b('SprinkleConfig').version + c;
      },
      shouldAppendToken: function (a) {
        return (
          !b('isCdnURI')(a) &&
          !a.isSubdomainOfDomain('fbsbx.com') &&
          (b('isFacebookURI')(a) || b('isMessengerDotComURI')(a) || b('isWorkplaceDotComURI')(a) || b('isOculusDotComURI')(a) || a.isSubdomainOfDomain('freebasics.com') || a.isSubdomainOfDomain('discoverapp.com'))
        );
      },
    };
    e.exports = a;
  },
  null
);
__d(
  'DTSG_ASYNC',
  ['MRequestConfig', 'Promise', 'TokenFetcher', 'clearTimeout', 'setTimeoutAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h, i, j;
    function k() {
      (j = null), (i = null);
    }
    function l(a) {
      c('clearTimeout')(i), (i = c('setTimeoutAcrossTransitions')(k, (a.valid_for - 60) * 1e3)), (j = a.token);
    }
    l(c('MRequestConfig').dtsg_ag);
    function a() {
      (j = null), (i = null);
    }
    function e() {
      return j;
    }
    function f() {
      return j != null ? b('Promise').resolve(j) : n();
    }
    function m(a) {
      j = a;
    }
    function n() {
      h ||
        (h = d('TokenFetcher')
          .fetchTokenConfigForAsyncGET()
          .then(function (a) {
            l(a);
            return a.token;
          }));
      return h;
    }
    g.clear = a;
    g.getCachedToken = e;
    g.getToken = f;
    g.setToken = m;
    g.refresh = n;
  },
  98
);
__d(
  'ge',
  [],
  function (a, b, c, d, e, f) {
    function a(a, b, c) {
      if (typeof a !== 'string') return a;
      else if (!b) return document.getElementById(a);
      else return g(a, b, c);
    }
    function g(a, b, c) {
      var d;
      if (h(b) == a) return b;
      else if (b.getElementsByTagName) {
        c = b.getElementsByTagName(c || '*');
        for (d = 0; d < c.length; d++) if (h(c[d]) == a) return c[d];
      } else {
        c = b.childNodes;
        for (d = 0; d < c.length; d++) {
          b = g(a, c[d]);
          if (b) return b;
        }
      }
      return null;
    }
    function h(a) {
      return a.getAttribute ? a.getAttribute('id') : null;
    }
    f['default'] = a;
  },
  66
);
__d(
  'memoize',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    function a(a) {
      var b = a,
        c;
      return function () {
        arguments.length && h(0, 4494);
        b && ((c = b()), (b = null));
        return c;
      };
    }
    g['default'] = a;
  },
  98
);
__d(
  'replaceTransportMarkers',
  ['BanzaiLazyQueue', 'ge', 'memoize'],
  function (a, b, c, d, e, f, g) {
    var h = new Set();
    function i(a, e, f) {
      var g = f !== void 0 ? e[f] : e,
        j;
      if (Array.isArray(g)) for (j = 0; j < g.length; j++) i(a, g, j);
      else if (g && typeof g === 'object')
        if (g.__m) g.__lazy ? (e[f] = c('memoize')(b.bind(null, g.__m))) : (e[f] = b.call(null, g.__m));
        else if (g.__jsr) e[f] = new (b.call(null, 'JSResourceReference'))(g.__jsr).__setRef('replaceTransportMarkers');
        else if (g.__dr) e[f] = new (b.call(null, 'RequireDeferredReference'))(g.__dr).__setRef('replaceTransportMarkers');
        else if (g.__rc)
          g.__rc[0] === null ? (e[f] = null) : (e[f] = b.call(null, g.__rc[0])), g.__rc[1] && (h.has(g.__rc[1]) || (h.add(g.__rc[1]), d('BanzaiLazyQueue').queuePost('require_cond_exposure_logging', { identifier: g.__rc[1] })));
        else if (g.__e) e[f] = c('ge')(g.__e);
        else if (g.__rel) e[f] = a.relativeTo;
        else if (g.__bigPipeContext) e[f] = a.bigPipeContext;
        else if (g.__bbox) e[f] = g.__bbox;
        else {
          for (var k in g) i(a, g, k);
          if (g.__map) e[f] = new Map(g.__map);
          else if (g.__set) e[f] = new Set(g.__set);
          else if (g.__imm) {
            j = g.__imm;
            a = j.method;
            g = j.value;
            e[f] = b.call(null, 'immutable')[a](g);
          }
        }
    }
    g['default'] = i;
  },
  98
);
__d(
  'ServerJSDefine',
  ['BitMap', 'replaceTransportMarkers'],
  function (a, b, c, d, e, f, g) {
    var h = 2,
      i = 8,
      j = new (c('BitMap'))(),
      k = {
        getLoadedModuleHash: function () {
          return j.toCompressedString();
        },
        getModuleNameAndHash: function (a) {
          a = a.split('@');
          return { hash: a[1], name: a[0] };
        },
        handleDefine: function (a, b, d, e, g) {
          e >= 0 && j.set(e),
            define(
              a,
              b,
              function (h, i, j, k, b) {
                h = { data: d };
                c('replaceTransportMarkers')({ relativeTo: g }, h);
                if (e === -42) {
                  i = d != null && typeof d === 'object' && d.__throw8367__;
                  throw new Error(a + ': ' + (typeof i === 'string' ? i : ''));
                }
                b.exports = h.data;
              },
              h | i
            );
        },
        handleDefines: function (a, b) {
          a.forEach(function (a) {
            var c;
            b != null ? (c = [].concat(a, [b])) : (c = [].concat(a, [null]));
            k.handleDefine.apply(null, c);
          });
        },
      };
    a = k;
    g['default'] = a;
  },
  98
);
__d(
  'StaticSiteData',
  [],
  function (a, b, c, d, e, f) {
    e.exports = Object.freeze({
      hs_key: '__hs',
      connection_class_server_guess_key: '__ccg',
      dpr_key: 'dpr',
      spin_rev_key: '__spin_r',
      spin_time_key: '__spin_t',
      spin_branch_key: '__spin_b',
      spin_mhenv_key: '__spin_dev_mhenv',
      lite_iframe_locale_override_key: '__ltif_locale',
      weblite_key: '__wblt',
      weblite_iframe_key: '__wbltif',
      kite_key: '__ktif',
      kite_legacy_key: '_ktif',
      haste_session_id_key: '__hsi',
      jsmod_key: '__dyn',
      csr_key: '__csr',
      comet_key: '__comet_req',
    });
  },
  null
);
__d(
  'WebSessionDefaultTimeoutMs',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    a = 35e3;
    f['default'] = a;
  },
  66
);
__d(
  'CookieConsent',
  ['CookieConsentIFrameConfig', 'InitialCookieConsent'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = new Set(c('InitialCookieConsent').initialConsent),
      i = c('InitialCookieConsent').shouldShowCookieBanner,
      j = {
        setConsented: function () {
          h.add(1), (i = !1);
        },
        hasConsent: function (a) {
          return h.has(a);
        },
        isCookiesBlocked: function () {
          return c('InitialCookieConsent').noCookies;
        },
        shouldShowCookieBanner: function () {
          return i;
        },
        isThirdPartyIframeAllowed: function (a) {
          if (j.isCookiesBlocked() || !j.hasConsent(1)) return !1;
          return c('CookieConsentIFrameConfig').allowlisted_iframes.includes(a.id) ? !0 : j.hasConsent(2);
        },
      };
    a = j;
    g['default'] = a;
  },
  98
);
__d(
  'isQuotaExceededError',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function g(b) {
      return Boolean(b instanceof a.DOMException && (b.code === 22 || b.code === 1014 || b.name === 'QuotaExceededError' || b.name === 'NS_ERROR_DOM_QUOTA_REACHED'));
    }
    function b(a, b) {
      return Boolean(g(b) && a && a.length !== 0);
    }
    f.isQuotaExceededError = g;
    f.isStorageQuotaExceededError = b;
  },
  66
);
__d(
  'WebStorage',
  ['CookieConsent', 'FBLogger', 'err', 'isQuotaExceededError'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = {},
      i = {},
      j = 'localStorage',
      k = 'sessionStorage',
      l = !1;
    function m(a, b, d) {
      if (c('CookieConsent').isCookiesBlocked() || !c('CookieConsent').hasConsent(1)) {
        l || (c('FBLogger')('web_storage').warn('Failed to get %s because of missing cookie consent', d.toString()), (l = !0));
        return null;
      }
      Object.prototype.hasOwnProperty.call(a, d) || (a[d] = b(d));
      return a[d];
    }
    function n(a) {
      try {
        return window[a];
      } catch (a) {
        c('FBLogger')('web_storage').warn('Failed to get storage for read %s', a.message);
      }
      return null;
    }
    function o(a) {
      var b = null;
      try {
        b = window[a];
        if (b != null && typeof b.setItem === 'function' && typeof b.removeItem === 'function') {
          var e = '__test__' + Date.now();
          b.setItem(e, '');
          b.removeItem(e);
        } else return null;
      } catch (e) {
        if (d('isQuotaExceededError').isStorageQuotaExceededError(b, e) === !1) {
          c('FBLogger')('web_storage').catching(e).warn('Failed to get WebStorage of type `%s`', a);
          return null;
        }
      }
      return b;
    }
    function p(a) {
      var b = null;
      try {
        b = window[a];
        if (b != null && typeof b.setItem === 'function' && typeof b.removeItem === 'function') {
          a = '__test__' + Date.now();
          b.setItem(a, '');
          b.removeItem(a);
        }
      } catch (a) {
        if (d('isQuotaExceededError').isStorageQuotaExceededError(b, a) === !0) return !0;
      }
      return !1;
    }
    function q(a) {
      var b = [];
      for (var c = 0; c < a.length; c++) b.push(a.key(c) || '');
      return b;
    }
    function r(a, b, d) {
      if (a == null) return new Error('storage cannot be null');
      var e = null;
      try {
        a.setItem(b, d);
      } catch (g) {
        var f = q(a).map(function (b) {
          var c = (a.getItem(b) || '').length;
          return b + '(' + c + ')';
        });
        e = c('err')('%sStorage quota exceeded while setting %s(%s). Items(length) follows: %s', g.name ? g.name + ': ' : '', b, d.length, f.join());
      }
      return e;
    }
    a = {
      getLocalStorage: function () {
        return m(h, o, j);
      },
      getAllowlistedKeyFromLocalStorage: function (a) {
        var b;
        return (b = m(i, n, j)) == null ? void 0 : b.getItem(a);
      },
      getSessionStorage: function () {
        return m(h, o, k);
      },
      getAllowlistedKeyFromSessionStorage: function (a) {
        var b;
        return (b = m(i, n, k)) == null ? void 0 : b.getItem(a);
      },
      getLocalStorageForRead: function () {
        return m(i, n, j);
      },
      getSessionStorageForRead: function () {
        return m(i, n, k);
      },
      isLocalStorageQuotaExceeded: function () {
        return p(j);
      },
      isSessionStorageQuotaExceeded: function () {
        return p(k);
      },
      setItemGuarded: r,
      setAllowlistedKeyToLocalStorage: function (a, b, c) {
        return r(a, b, c);
      },
      clearCaches: function () {
        (h = {}), (i = {});
      },
    };
    b = a;
    g['default'] = b;
  },
  98
);
__d(
  'WebSession',
  ['FBLogger', 'Random', 'WebSessionDefaultTimeoutMs', 'WebStorage'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = 36,
      i = 6,
      j = Math.pow(h, i);
    function k(a) {
      return a == null || Number.isFinite(a) === !1 || a <= 0 ? null : a;
    }
    function l(a) {
      if (a == null) return null;
      var b = parseInt(a, 10);
      if ('' + b !== a) {
        c('FBLogger')('web_session').warn('Expected the web session expiry time to parse as an integer. Found `%s`.', String(a));
        return null;
      }
      return k(b);
    }
    function m(a) {
      if (a == null) return null;
      if (a.length !== i) {
        c('FBLogger')('web_session').warn('Expected the web session id to be a %d character string. It was %d character(s). Received `%s`.', i, a.length, a);
        return null;
      }
      if (/^[a-z0-9]+$/.test(a) === !1) {
        c('FBLogger')('web_session').warn('Expected the web session ID to be a base-%d encoded string. Received `%s`.', h, a);
        return null;
      }
      return a;
    }
    function n(a) {
      if (a == null) return null;
      if (typeof a !== 'string' && a instanceof String === !1) {
        c('FBLogger')('web_session').warn("A non-string value was passed to `coerceSession`. This should be impossible according to this method's Flow type. The value was `%s`.", a);
        return null;
      }
      a = a.split(':');
      var b = a[0];
      a = a[1];
      a = l(a);
      b = m(b);
      return a == null || b == null ? null : { expiryTime: a, id: b };
    }
    function o() {
      var a = Math.floor(d('Random').random() * j);
      a = a.toString(h);
      return '0'.repeat(i - a.length) + a;
    }
    var p = null;
    function q() {
      p == null && (p = o());
      return p;
    }
    function r(a) {
      a === void 0 && (a = Date.now());
      var b = c('WebStorage').getLocalStorageForRead();
      if (b == null) return null;
      b = n(b.getItem('Session'));
      return b && a < b.expiryTime ? b : null;
    }
    function s() {
      var a = c('WebStorage').getSessionStorageForRead();
      if (a == null) return null;
      a = m(a.getItem('TabId'));
      if (a == null) {
        var b = c('WebStorage').getSessionStorage();
        if (b == null) return null;
        var d = o();
        c('WebStorage').setItemGuarded(b, 'TabId', d);
        return d;
      }
      return a;
    }
    function a(a) {
      if (a !== void 0 && k(a) == null) {
        c('FBLogger')('web_session').warn('`WebSession.extend()` was passed an invalid target expiry time `%s`.', a);
        return;
      }
      var b = Date.now();
      a = (a = a) != null ? a : b + c('WebSessionDefaultTimeoutMs');
      var d = r(b);
      if ((d && d.expiryTime >= a) || a <= b) return;
      b = c('WebStorage').getLocalStorage();
      if (b != null) {
        d = d == null ? o() : d.id;
        c('WebStorage').setItemGuarded(b, 'Session', d + ':' + a);
      }
    }
    function t() {
      var a;
      return (a = r()) == null ? void 0 : a.id;
    }
    function b() {
      var a,
        b,
        c = q();
      a = (a = t()) != null ? a : '';
      b = (b = s()) != null ? b : '';
      return a + ':' + b + ':' + c;
    }
    function e() {
      return q();
    }
    g.extend = a;
    g.getSessionId = t;
    g.getId = b;
    g.getPageId_DO_NOT_USE = e;
  },
  98
);
__d(
  'asyncParams',
  [],
  function (a, b, c, d, e, f) {
    var g = {};
    function a(a, b) {
      g[a] = b;
    }
    function b() {
      return g;
    }
    f.add = a;
    f.get = b;
  },
  66
);
__d(
  'CSSCore',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    function i(a, b) {
      var c = a;
      while (c.parentNode) c = c.parentNode;
      if (c instanceof Element) {
        c = c.querySelectorAll(b);
        return Array.prototype.indexOf.call(c, a) !== -1;
      }
      return !1;
    }
    function j(a, b) {
      /\s/.test(b) && h(0, 11794, b);
      b && (a.classList ? a.classList.add(b) : l(a, b) || (a.className = a.className + ' ' + b));
      return a;
    }
    function k(a, b) {
      /\s/.test(b) && h(0, 11795, b);
      b &&
        (a.classList
          ? a.classList.remove(b)
          : l(a, b) &&
            (a.className = a.className
              .replace(new RegExp('(^|\\s)' + b + '(?:\\s|$)', 'g'), '$1')
              .replace(/\s+/g, ' ')
              .replace(/^\s*|\s*$/g, '')));
      return a;
    }
    function a(a, b, c) {
      return (c ? j : k)(a, b);
    }
    function l(a, b) {
      /\s/.test(b) && h(0, 442);
      return a.classList ? !!b && a.classList.contains(b) : (' ' + a.className + ' ').indexOf(' ' + b + ' ') > -1;
    }
    function b(a, b) {
      var c =
        a.matches ||
        a.webkitMatchesSelector ||
        a.mozMatchesSelector ||
        a.msMatchesSelector ||
        function (b) {
          return i(a, b);
        };
      return c.call(a, b);
    }
    g.addClass = j;
    g.removeClass = k;
    g.conditionClass = a;
    g.hasClass = l;
    g.matchesSelector = b;
  },
  98
);
__d(
  'isSocialPlugin',
  ['CSSCore'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a() {
      return !!document.body && d('CSSCore').hasClass(document.body, 'plugin');
    }
    g['default'] = a;
  },
  98
);
__d(
  'uniqueRequestID',
  [],
  function (a, b, c, d, e, f) {
    var g = 36,
      h = 1;
    function a() {
      return (h++).toString(g);
    }
    f['default'] = a;
  },
  66
);
__d(
  'getAsyncParams',
  [
    'CSRBitMap',
    'CometPersistQueryParams',
    'CurrentCommunity',
    'CurrentUserInitialData',
    'DTSG',
    'DTSGUtils',
    'DTSG_ASYNC',
    'Env',
    'ISB',
    'JSErrorLoggingConfig',
    'LSD',
    'ServerJSDefine',
    'SiteData',
    'SprinkleConfig',
    'StaticSiteData',
    'WebConnectionClassServerGuess',
    'WebSession',
    'asyncParams',
    'isSocialPlugin',
    'uniqueRequestID',
  ],
  function (a, b, c, d, e, f) {
    var g,
      h,
      i = b('JSErrorLoggingConfig').sampleWeight,
      j = b('JSErrorLoggingConfig').sampleWeightKey,
      k = { locale: !0, cxobfus: !0, js_debug: !0, cquick: !0, cquick_token: !0, wdplevel: !0, prod_graphql: !0, sri: !0 },
      l = { ctarget: !0 };
    function a(a) {
      var c,
        d,
        e = babelHelpers['extends'](
          {},
          b('asyncParams').get(),
          ((d = { __user: (g || (g = b('CurrentUserInitialData'))).USER_ID, __a: 1 }),
          (d[b('StaticSiteData').jsmod_key] = b('ServerJSDefine').getLoadedModuleHash()),
          (d[b('StaticSiteData').csr_key] = b('CSRBitMap').toCompressedString()),
          (d.__req = b('uniqueRequestID')()),
          (d[b('StaticSiteData').hs_key] = b('SiteData').haste_session),
          (d[b('StaticSiteData').dpr_key] = b('SiteData').pr),
          (d[b('StaticSiteData').connection_class_server_guess_key] = b('WebConnectionClassServerGuess').connectionClass),
          (d.__rev = b('SiteData').client_revision),
          (d.__s = b('WebSession').getId()),
          (d[b('StaticSiteData').haste_session_id_key] = b('SiteData').hsi),
          (d[b('StaticSiteData').comet_key] = (c = b('SiteData').comet_env) != null ? c : b('SiteData').is_comet ? 1 : 0),
          d)
        );
      Object.entries(b('CometPersistQueryParams').relative).forEach(function (a) {
        var b = a[0];
        a = a[1];
        a != null && (e[b] = String(a));
      });
      window.location.search
        .slice(1)
        .split('&')
        .forEach(function (a) {
          a = a.split('=');
          var b = a[0];
          a = a[1];
          (b.substr(0, 4) === 'tfc_' || b.substr(0, 4) === 'tfi_' || b.substr(0, 3) === 'mh_' || k[b] > -1 || l[b] > -1) && (l[b] > -1 ? (e[b] = decodeURIComponent(a)) : (e[b] = a));
        });
      (h || (h = b('Env'))).isCQuick && !e.cquick && ((e.cquick = (h || (h = b('Env'))).iframeKey), (e.ctarget = h.iframeTarget), (e.cquick_token = h.iframeToken));
      if (a == 'POST') {
        c = b('DTSG').getCachedToken ? b('DTSG').getCachedToken() : b('DTSG').getToken();
        c && ((e.fb_dtsg = c), b('SprinkleConfig').param_name && (e[b('SprinkleConfig').param_name] = b('DTSGUtils').getNumericValue(c)));
        b('LSD').token && ((e.lsd = b('LSD').token), b('SprinkleConfig').param_name && !c && (e[b('SprinkleConfig').param_name] = b('DTSGUtils').getNumericValue(b('LSD').token)));
      }
      if (a == 'GET') {
        d = b('DTSG_ASYNC').getCachedToken ? b('DTSG_ASYNC').getCachedToken() : b('DTSG_ASYNC').getToken();
        d && ((e.fb_dtsg_ag = d), b('SprinkleConfig').param_name && (e[b('SprinkleConfig').param_name] = b('DTSGUtils').getNumericValue(d)));
      }
      b('ISB').token && (e.fb_isb = b('ISB').token);
      b('CurrentCommunity').getID() !== '0' && (e.__cid = b('CurrentCommunity').getID());
      b('isSocialPlugin')() && (e.__sp = 1);
      if (b('SiteData').spin) {
        e[(c = b('StaticSiteData')).spin_rev_key] = b('SiteData')[c.spin_rev_key];
        e[c.spin_branch_key] = b('SiteData')[c.spin_branch_key];
        e[c.spin_time_key] = b('SiteData')[c.spin_time_key];
        b('SiteData')[b('StaticSiteData').spin_mhenv_key] && (e[b('StaticSiteData').spin_mhenv_key] = b('SiteData')[b('StaticSiteData').spin_mhenv_key]);
      }
      i != null && j != null && (e[j] = i);
      return e;
    }
    e.exports = a;
  },
  null
);
__d(
  'BootloaderEndpoint',
  ['Bootloader', 'BootloaderEndpointConfig', 'CSRFGuard', 'FBLogger', 'HasteResponse', 'TimeSlice', 'clearImmediate', 'fb-error', 'getAsyncParams', 'getSameOriginTransport', 'performanceAbsoluteNow', 'setImmediateAcrossTransitions'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g,
      h = b('fb-error').ErrorXFBDebug,
      i = b('BootloaderEndpointConfig').endpointURI,
      j = 0,
      k = null,
      l = null,
      m = new Map(),
      n = new Map();
    function o(a) {
      return Array.from(a.keys()).join(',');
    }
    function p(a, c) {
      var d = {};
      a.size && (d.modules = o(a));
      c.size && (d.nb_modules = o(c));
      a = Object.entries(babelHelpers['extends']({}, d, b('getAsyncParams')('GET')))
        .map(function (a) {
          var b = a[0];
          a = a[1];
          return encodeURIComponent(b) + '=' + encodeURIComponent(String(a));
        })
        .join('&');
      return i + (i.includes('?') ? '&' : '?') + a;
    }
    function q(a, c) {
      if (a.size === 0 && c.size === 0) return;
      var d = p(a, c),
        e = b('getSameOriginTransport')(),
        f = j++,
        i = (g || (g = b('performanceAbsoluteNow')))();
      e.open('GET', d, !0);
      var k = b('TimeSlice').getGuardedContinuation('Bootloader _requestHastePayload');
      e.onreadystatechange = function () {
        if (e.readyState !== 4) return;
        k(function () {
          h.addFromXHR(e);
          var g = e.status === 200 ? JSON.parse(b('CSRFGuard').clean(e.responseText)) : null;
          if (g == null) {
            b('FBLogger')('bootloader').warn('Invalid bootloader response %d, blocking mods: %s; non-blocking mods: %s; "%s"', e.status, o(a), o(c), e.responseText.substr(0, 256));
            return;
          }
          if (g.error) b('FBLogger')('bootloader').warn('Non-fatal error from bootloader endpoint, blocking mods: %s; non-blocking mods: %s', o(a), o(c));
          else if (g.__error) {
            b('FBLogger')('bootloader').warn('Fatal error from bootloader endpoint, blocking mods: %s; non-blocking mods: %s', o(a), o(c));
            return;
          }
          b('TimeSlice').guard(
            function () {
              return r(d, g, a, c, f, i);
            },
            'Bootloader receiveEndpointData',
            { propagationType: b('TimeSlice').PropagationType.CONTINUATION }
          )();
        });
      };
      e.send();
    }
    function r(a, c, d, e, f, h) {
      var i = (g || (g = b('performanceAbsoluteNow')))(),
        j = c.serverGenTime,
        k = c.hrp;
      if (k == null) {
        c = c;
        b('FBLogger')('be_null_hrp').mustfix('Found null hrp, blocking mods: %s; non-blocking mods: %s; response error: %s', o(d), o(e), c.error + ', summary: ' + c.errorSummary + ', description: ' + c.errorDescription);
        k = c;
      }
      b('HasteResponse').handle(k, {
        source: 'bootloader_endpoint',
        sourceDetail: JSON.stringify({ b: Array.from(d.keys()), n: Array.from(e.keys()) }),
        onBlocking: function () {
          var a = [d, e];
          for (var c = 0; c < a.length; c++) {
            var f = a[c];
            for (var f = f.values(), g = Array.isArray(f), h = 0, f = g ? f : f[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
              var i;
              if (g) {
                if (h >= f.length) break;
                i = f[h++];
              } else {
                h = f.next();
                if (h.done) break;
                i = h.value;
              }
              i = i;
              b('Bootloader').done(i);
            }
          }
        },
        onLog: function (c) {
          var g = [d, e];
          for (var k = 0; k < g.length; k++) {
            var l = g[k];
            for (var l = l.keys(), m = Array.isArray(l), n = 0, l = m ? l : l[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
              var o;
              if (m) {
                if (n >= l.length) break;
                o = l[n++];
              } else {
                n = l.next();
                if (n.done) break;
                o = n.value;
              }
              o = o;
              b('Bootloader').beDone(o, f, babelHelpers['extends']({ requestStart: h, responseStart: i, serverGenTime: j, uri: a }, c));
            }
          }
        },
      });
    }
    function s() {
      var a = m,
        c = n;
      b('clearImmediate')(l);
      l = null;
      k = null;
      m = new Map();
      n = new Map();
      q(a, c);
    }
    a = {
      load: function (a, c, d) {
        (c ? m : n).set(a, d);
        if (b('BootloaderEndpointConfig').debugNoBatching) {
          s();
          return;
        }
        if (l != null) return;
        k = b('TimeSlice').getGuardedContinuation('Schedule async batch request: Bootloader._loadResources');
        l = b('setImmediateAcrossTransitions')(function () {
          k &&
            k(function () {
              return s();
            });
        });
      },
      forceFlush: function () {
        k &&
          k(function () {
            return s();
          });
      },
    };
    e.exports = a;
  },
  null
);
__d(
  'QPLHasteSupportDataStorage',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    var g = {};
    a = {
      add: function (a, b) {
        Object.keys(a).forEach(function (c) {
          b && b.entry++;
          if (g[c] == null) {
            var d = a[c];
            g[c] = d;
          } else b && b.dup_entry++;
        });
      },
      get: function (a) {
        return g[a];
      },
    };
    f['default'] = a;
  },
  66
);
__d(
  'bx',
  ['unrecoverableViolation'],
  function (a, b, c, d, e, f, g) {
    var h = {};
    function a(a) {
      var b = h[a];
      if (!b) throw c('unrecoverableViolation')('bx' + ('(...): Unknown file path "' + a + '"'), 'staticresources');
      return b;
    }
    a.add = function (a, b) {
      var c = !1;
      for (var d in a) b && b.entry++, !(d in h) ? ((a[d].loggingID = d), (h[d] = a[d])) : b && b.dup_entry++;
    };
    a.getURL = function (a) {
      return a.uri;
    };
    g['default'] = a;
  },
  98
);
__d(
  'recoverableViolation',
  ['FBLogger'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    function a(a, b, d) {
      d = d === void 0 ? {} : d;
      d = d.error;
      b = c('FBLogger')(b);
      d ? (b = b.catching(d)) : (b = b.blameToPreviousFrame());
      b.mustfix(a);
      return null;
    }
    g['default'] = a;
  },
  98
);
__d(
  'getFalcoLogPolicy_DO_NOT_USE',
  ['recoverableViolation'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = { r: 1 },
      i = {};
    function a(a) {
      var b = i[a];
      if (b == null) {
        c('recoverableViolation')("Failed to find a Haste-supplied log policy for the Falco event ' +\n        'identified by token `" + a + '`. Failing open (ie. with a sampling rate of 1.0).', 'staticresources');
        return h;
      }
      return b;
    }
    a.add = function (a, b) {
      Object.keys(a).forEach(function (c) {
        b && b.entry++, i[c] == null ? (i[c] = a[c]) : b && b.dup_entry++;
      });
    };
    g['default'] = a;
  },
  98
);
__d(
  'ix',
  ['invariant', 'nullthrows'],
  function (a, b, c, d, e, f, g, h) {
    var i = {},
      j = new Set();
    function b(b) {
      var d = i[b];
      !d && h(0, 11798, b);
      a.__flight_execution_mode_DO_NOT_USE === 'flight' && d.sprited === 1 && j.add(c('nullthrows')(d.origPath, 'origPath should be defined on the server in react flight'));
      return d;
    }
    b.add = function (a, b) {
      var c = !1;
      for (var d in a) b && b.entry++, !(d in i) ? ((a[d].loggingID = d), (i[d] = a[d])) : b && b.dup_entry++;
    };
    b.getUsedPaths_ONLY_FOR_REACT_FLIGHT = function () {
      a.__flight_execution_mode_DO_NOT_USE === 'flight' || h(0, 34547);
      return Array.from(j);
    };
    g['default'] = b;
  },
  98
);
__d(
  'justknobx',
  ['invariant'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = {};
    a = {
      getBool: function (a) {
        h(0, 47459);
      },
      getInt: function (a) {
        h(0, 47459);
      },
      _: function (a) {
        var b = i[a];
        b != null || h(0, 47458, a);
        return b.r;
      },
      add: function (a, b) {
        for (var c in a) b && b.entry++, !(c in i) ? (i[c] = a[c]) : b && b.dup_entry++;
      },
    };
    b = a;
    g['default'] = b;
  },
  98
);
__d(
  'qex',
  ['invariant', 'BanzaiLazyQueue'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    var i = {},
      j = {};
    a = {
      _: function (a) {
        var b = i[a];
        b != null || h(0, 11799, a);
        var c = b.r;
        b = b.l;
        b != null && !j[a] && ((j[a] = !0), d('BanzaiLazyQueue').queuePost('qex', { l: b }));
        return c;
      },
      add: function (a, b) {
        for (var c in a) b && b.entry++, !(c in i) ? (i[c] = a[c]) : b && b.dup_entry++;
      },
    };
    b = a;
    g['default'] = b;
  },
  98
);
__d(
  'HasteSupportData',
  ['ix', 'QPLHasteSupportDataStorage', 'bx', 'getFalcoLogPolicy_DO_NOT_USE', 'gkx', 'justknobx', 'qex'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    function a(a, b) {
      var d = a.bxData,
        e = a.clpData,
        f = a.gkxData,
        g = a.ixData,
        i = a.qexData,
        j = a.qplData;
      a = a.justknobxData;
      d != null && c('bx').add(d, b);
      e != null && c('getFalcoLogPolicy_DO_NOT_USE').add(e, b);
      f != null && c('gkx').add(f, b);
      g != null && h.add(g, b);
      i != null && c('qex').add(i, b);
      j != null && c('QPLHasteSupportDataStorage').add(j, b);
      a != null && c('justknobx').add(a, b);
    }
    g.handle = a;
  },
  98
);
__d(
  'CSS',
  ['invariant', 'CSSCore'],
  function (a, b, c, d, e, f, g) {
    var h = {
      hide: function (a) {
        a.style.display = 'none';
        return a;
      },
      show: function (a) {
        a.style.display = '';
        return a;
      },
      conditionShow: function (a, b) {
        return (b ? h.show : h.hide)(a);
      },
      addClass: function (a, c) {
        return b('CSSCore').addClass(a, c);
      },
      removeClass: function (a, c) {
        return b('CSSCore').removeClass(a, c);
      },
      hasClass: function (a, b) {
        /\s/.test(b) && g(0, 442);
        return a.classList ? !!b && a.classList.contains(b) : (' ' + a.className + ' ').indexOf(' ' + b + ' ') > -1;
      },
    };
    a = null;
    e.exports = Object.assign({}, h, b('CSSCore'), a);
  },
  null
);
__d(
  'Parent',
  ['CSS'],
  function (a, b, c, d, e, f, g) {
    function a(a, b) {
      b = b.toUpperCase();
      a = i(a, function (a) {
        return a.nodeName === b;
      });
      return a instanceof Element ? a : null;
    }
    function b(a, b) {
      a = i(a, function (a) {
        return a instanceof Element && d('CSS').hasClass(a, b);
      });
      return a instanceof Element ? a : null;
    }
    function c(a, b) {
      a = a;
      if (typeof a.matches === 'function') {
        while (a && a !== document && !a.matches(b)) a = a.parentNode;
        return a instanceof Element ? a : null;
      } else if (typeof a.msMatchesSelector === 'function') {
        while (a && a !== document && !a.msMatchesSelector(b)) a = a.parentNode;
        return a instanceof Element ? a : null;
      } else return h(a, b);
    }
    function h(a, b) {
      a = a;
      var c = a;
      while (c.parentNode) c = c.parentNode;
      if (!(c instanceof Element) && !(c instanceof Document)) return null;
      c = c.querySelectorAll(b);
      while (a) {
        if (Array.prototype.indexOf.call(c, a) !== -1) return a instanceof Element ? a : null;
        a = a.parentNode;
      }
      return a instanceof Element ? a : null;
    }
    function e(a, b) {
      a = i(a, function (a) {
        return a instanceof Element && !!a.getAttribute(b);
      });
      return a instanceof Element ? a : null;
    }
    function i(a, b) {
      a = a;
      while (a) {
        if (b(a)) return a;
        a = a.parentNode;
      }
      return null;
    }
    g.byTag = a;
    g.byClass = b;
    g.bySelector = c;
    g.bySelector_SLOW = h;
    g.byAttribute = e;
    g.find = i;
  },
  98
);
__d(
  'ContextualComponent',
  ['Parent'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      a.forNode = function (b) {
        return a.$1.get(b) || null;
      };
      a.closestToNode = function (b) {
        b = d('Parent').find(b, function (b) {
          return !!a.forNode(b);
        });
        return b ? a.forNode(b) : null;
      };
      a.register = function (b) {
        return new a(b);
      };
      function a(a) {
        var b = a.element,
          c = a.isRoot;
        a = a.parent;
        this.$2 = c;
        this.$3 = b;
        this.$4 = a;
        this.$5 = new Set();
        this.$6 = [];
        this.$7 = [];
        this.$8();
      }
      var b = a.prototype;
      b.onCleanup = function (a) {
        this.$6.push(a);
      };
      b.onUnmount = function (a) {
        this.$7.push(a);
      };
      b.cleanup = function () {
        this.$5.forEach(function (a) {
          return a.cleanup();
        }),
          this.$6.forEach(function (a) {
            return a();
          }),
          (this.$6 = []);
      };
      b.unmount = function () {
        this.cleanup();
        this.$5.forEach(function (a) {
          return a.unmount();
        });
        this.$7.forEach(function (a) {
          return a();
        });
        this.$7 = [];
        var b = this.$4;
        b && (a.$1['delete'](this.$3), b.$9(this));
      };
      b.reinitialize = function () {
        var b = this.$4;
        b && (b.$9(this), (this.$4 = void 0));
        a.$1['delete'](this.$3);
        this.$8();
      };
      b.$8 = function () {
        if (!this.$2 && !this.$4) {
          var b = a.closestToNode(this.$3);
          b && (this.$4 = b);
        }
        this.$4 && this.$4.$10(this);
        a.$1.set(this.$3, this);
      };
      b.$10 = function (a) {
        this.$5.add(a);
      };
      b.$9 = function (a) {
        this.$5['delete'](a);
      };
      return a;
    })();
    a.$1 = new Map();
    g['default'] = a;
  },
  98
);
__d(
  '__debug',
  [],
  function (a, b, c, d, e, f) {
    a = {};
    f['default'] = a;
  },
  66
);
__d(
  'ServerJS',
  ['ContextualComponent', 'ErrorGuard', 'ServerJSDefine', '__debug', 'err', 'ge', 'replaceTransportMarkers'],
  function (a, b, c, d, e, f) {
    var g,
      h = 1,
      i = 2,
      j = 16,
      k = 0;
    a = (function () {
      'use strict';
      function a() {
        (this.$2 = {}), (this.$1 = null), (this.$4 = {}), (this.$3 = void 0);
      }
      var c = a.prototype;
      c.handle = function (a, b) {
        return this.$5(a, b, m);
      };
      c.handleWithCustomApplyEach = function (a, b, c) {
        this.$5(b, c, a);
      };
      c.$5 = function (a, c, d) {
        this.$3 = c;
        if (a.__guard != null) throw b('err')('ServerJS.handle called on data that has already been handled');
        a.__guard = !0;
        d(a.define || [], this.$6, this);
        d(a.markup || [], this.$7, this);
        d(a.elements || [], this.$8, this);
        this.$9(a.contexts || []);
        d(a.instances || [], this.$10, this);
        var e = d(a.pre_display_requires || [], this.$11, this);
        e = e.concat(d(a.require || [], this.$11, this));
        return {
          cancel: function () {
            e.forEach(function (a) {
              a && a.cancel();
            });
          },
        };
      };
      c.handlePartial = function (a, b) {
        var c = this;
        (a.instances || []).forEach(function (a) {
          p(c.$2, a);
        });
        (a.markup || []).forEach(function (a) {
          o(c.$2, a);
        });
        (a.elements || []).forEach(function (a) {
          o(c.$2, a);
        });
        return this.handle(a, b);
      };
      c.setRelativeTo = function (a) {
        this.$1 = a;
        return this;
      };
      c.cleanup = function (a) {
        var c = Object.keys(this.$2);
        a
          ? d.call(
              null,
              c,
              a.guard(function () {}, 'SeverJS Cleanup requireLazy', { propagationType: a.PropagationType.ORPHAN })
            )
          : d.call(null, c, function () {});
        this.$2 = {};
        function f(c) {
          var d = this.$4[c],
            a = d[0],
            f = d[1];
          d = d[2];
          delete this.$4[c];
          f = f ? 'JS::call("' + a + '", "' + f + '", ...)' : 'JS::requireModule("' + a + '")';
          a = b('__debug').debugUnresolvedDependencies([a, c]);
          throw l(b('err')('%s did not fire because it has missing dependencies.\n%s', f, a), d);
        }
        for (var h in this.$4) (g || (g = b('ErrorGuard'))).applyWithGuard(f, this, [h], { name: 'ServerJS:cleanup id: ' + h, project: 'ServerJSCleanup' });
      };
      c.$6 = function (a, c, d, e) {
        return (g || (g = b('ErrorGuard'))).applyWithGuard(b('ServerJSDefine').handleDefine, b('ServerJSDefine'), [a, c, d, e, this.$1], { name: 'JS::define' });
      };
      c.$11 = function (a, c, d, e) {
        return (g || (g = b('ErrorGuard'))).applyWithGuard(this.$12, this, [a, c, d, e], { name: c != null ? 'JS::call' : 'JS::requireModule' });
      };
      c.$12 = function (a, c, d, e) {
        var f = this;
        a = b('ServerJSDefine').getModuleNameAndHash(a);
        var m = a.name,
          n = a.hash,
          o;
        typeof c === 'object' ? (a = c) : ((a = d), (o = c));
        d = [m].concat(a || []);
        var p;
        o != null ? (p = '__call__' + m + '.' + o) : (p = '__requireModule__' + m);
        p += '__' + k++;
        this.$4[p] = [m, o, n];
        var q = this.$3 && this.$3.bigPipeContext,
          r = (g || (g = b('ErrorGuard'))).guard(
            function (a) {
              a = b.call(null, m);
              delete f.$4[p];
              e && b('replaceTransportMarkers')({ relativeTo: f.$1, bigPipeContext: q }, e);
              if (o != null) {
                if (!a[o]) throw l(b('err')('Module %s has no method "%s"', m, o), n);
                a[o].apply(a, e || []);
                r.__SMmeta = a[o].__SMmeta || {};
                r.__SMmeta.module = r.__SMmeta.module || m;
                r.__SMmeta.name = r.__SMmeta.name || o;
              }
            },
            { name: o != null ? "JS::call('" + m + "', '" + o + "', ...)" : "JS::requireModule('" + m + "')" }
          );
        c = define(p, d, r, h | j | i, this, 1, this.$3);
        return c;
      };
      c.$10 = function (a, c, d, e) {
        (g || (g = b('ErrorGuard'))).applyWithGuard(this.$13, this, [a, c, d, e], { name: 'JS::instance' });
      };
      c.$13 = function (a, c, d, e) {
        var f = this,
          g = null;
        a = b('ServerJSDefine').getModuleNameAndHash(a);
        var h = a.name;
        a = a.hash;
        if (c) {
          var k = this.$3 && this.$3.bigPipeContext;
          g = function () {
            var a = b.call(null, c[0]);
            b('replaceTransportMarkers')({ relativeTo: f.$1, bigPipeContext: k }, d);
            var e = Object.create(a.prototype);
            a.apply(e, d);
            return e;
          };
        }
        define(h, c, g, i | j, null, e);
      };
      c.$7 = function (a, c, d) {
        (g || (g = b('ErrorGuard'))).applyWithGuard(this.$14, this, [a, c, d], { name: 'JS::markup' });
      };
      c.$14 = function (a, c, d) {
        a = b('ServerJSDefine').getModuleNameAndHash(a);
        var e = a.name;
        a = a.hash;
        define(
          e,
          ['HTML'],
          function (b) {
            try {
              return b.replaceJSONWrapper(c).getRootNode();
            } catch (b) {
              throw l(b, a);
            }
          },
          j,
          null,
          d
        );
      };
      c.$8 = function (a, c, d, e) {
        (g || (g = b('ErrorGuard'))).applyWithGuard(this.$15, this, [a, c, d, e], { name: 'JS::element' });
      };
      c.$15 = function (a, c, d, e) {
        a = b('ServerJSDefine').getModuleNameAndHash(a);
        var f = a.name,
          g = a.hash;
        if (c === null && d != null) {
          define(f, null, null, j, null, d);
          return;
        }
        a = [];
        var i = j;
        d = d || 0;
        e != null && (a.push(e), (i |= h), d++);
        define(
          f,
          a,
          function (a) {
            a = b('ge')(c, a);
            if (!a) {
              var d = '';
              throw l(b('err')('Could not find element "%s"%s', c, d), g);
            }
            return a;
          },
          i,
          null,
          d
        );
      };
      c.$9 = function (a) {
        (g || (g = b('ErrorGuard'))).applyWithGuard(this.$16, this, [a], { name: 'ContextualComponents' });
      };
      c.$16 = function (a) {
        var c = this,
          d = this.$3 && this.$3.bigPipeContext;
        a.map(function (a) {
          b('replaceTransportMarkers')({ relativeTo: c.$1, bigPipeContext: d }, a);
          var e = a[0];
          return [a, n(e)];
        })
          .sort(function (a, b) {
            return a[1] - b[1];
          })
          .forEach(function (a) {
            a = a[0];
            var c = a[0];
            a = a[1];
            b('ContextualComponent').register({ element: c, isRoot: a });
          });
      };
      return a;
    })();
    function l(a, b) {
      a.serverHash = b;
      return a;
    }
    function m(a, b, c) {
      return a.map(function (a) {
        return b.apply(c, a);
      });
    }
    function n(a) {
      var b = 0;
      a = a;
      while (a) (a = a.parentElement), b++;
      return b;
    }
    function o(c, a) {
      var d = b('ServerJSDefine').getModuleNameAndHash(a[0]);
      d = d.name;
      d in c || (a[2] = (a[2] || 0) + 1);
      c[d] = !0;
    }
    function p(c, a) {
      var d = b('ServerJSDefine').getModuleNameAndHash(a[0]);
      d = d.name;
      d in c || (a[3] = (a[3] || 0) + 1);
      c[d] = !0;
    }
    e.exports = a;
  },
  null
);
__d(
  'HasteResponse',
  ['Bootloader', 'BootloaderEvents', 'ClientConsistencyEventEmitter', 'HasteSupportData', 'ServerJS', 'TimeSlice', '__debug', 'fb-error', 'performanceAbsoluteNow'],
  function (a, b, c, d, e, f) {
    'use strict';
    var g,
      h = b('fb-error').getSimpleHash,
      i = new Set(),
      j = {
        handleSRPayload: function (a, c) {
          var d = a.hsdp;
          a = a.hblp;
          d && b('HasteSupportData').handle(d, c == null ? void 0 : c.hsdp);
          a && b('Bootloader').handlePayload(a, c == null ? void 0 : c.hblp);
          (a == null ? void 0 : a.consistency) != null && b('ClientConsistencyEventEmitter').emit('newEntry', a.consistency);
        },
        handle: function (a, c) {
          var d = a.jsmods,
            e = a.allResources;
          a = a.hsrp;
          var f = c.source,
            k = c.sourceDetail,
            l = c.onBlocking,
            m = c.onLog;
          c = c.onAll;
          var n = (g || (g = b('performanceAbsoluteNow')))(),
            o;
          if (k == null) o = !0;
          else {
            var p = h(f, k);
            i.has(p) ? (o = !1) : ((o = !0), i.add(p));
          }
          var q = { hsdp: { entry: 0, dup_entry: 0 }, hblp: { rsrc: 0, dup_rsrc: 0, comp: 0, dup_comp: 0 }, sjsp: { define: 0, dup_user_define: 0, dup_system_define: 0, require: 0 } };
          a && j.handleSRPayload(a, q);
          var r = 0,
            s = 0;
          b('Bootloader').loadResources(
            (p = e) != null ? p : [],
            {
              onBlocking: function () {
                q.sjsp.require += ((d == null ? void 0 : d.require) || []).length;
                q.sjsp.define += ((d == null ? void 0 : d.define) || []).length;
                var a = b('__debug').getDupCount(),
                  c = a[0];
                a = a[1];
                q.sjsp.dup_user_define -= c;
                q.sjsp.dup_system_define -= a;
                r = (g || (g = b('performanceAbsoluteNow')))();
                new (b('ServerJS'))().handle(d || {});
                s = g();
                var e = b('__debug').getDupCount();
                c = e[0];
                a = e[1];
                q.sjsp.dup_user_define += c;
                q.sjsp.dup_system_define += a;
                l == null ? void 0 : l();
              },
              onAll: c,
              onLog: function (a) {
                a = {
                  source: f,
                  sourceDetail: k,
                  isFirstIdentical: o,
                  timesliceContext: b('TimeSlice').getContext(),
                  startTime: n,
                  logTime: (g || (g = b('performanceAbsoluteNow')))(),
                  jsmodsStart: r,
                  jsmodsEnd: s,
                  rsrcs: a,
                  payloadStats: q,
                };
                m == null ? void 0 : m(a);
                b('BootloaderEvents').notifyHasteResponse(a);
              },
            },
            'HasteResponse:' + f + ':' + ((a = k) != null ? a : '<unknown>')
          );
        },
      };
    e.exports = j;
  },
  null
);
__d(
  'JSCC',
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      throw new Error('JSCC is unsupported in Mobile');
    }
    function b(a) {
      throw new Error('JSCC is unsupported in Mobile');
    }
    function c(a) {
      throw new Error('JSCC is unsupported in Mobile');
    }
    f.get = a;
    f.init = b;
    f.parse = c;
  },
  66
);
__d(
  'PageEvents',
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({
      NATIVE_ONLOAD: 'onload/onload',
      BIGPIPE_ONLOAD: 'onload/onload_callback',
      AJAXPIPE_ONLOAD: 'ajaxpipe/onload_callback',
      NATIVE_DOMREADY: 'onload/dom_content_ready',
      BIGPIPE_DOMREADY: 'onload/domcontent_callback',
      AJAXPIPE_DOMREADY: 'ajaxpipe/domcontent_callback',
      NATIVE_ONBEFOREUNLOAD: 'onload/beforeunload',
      NATIVE_ONUNLOAD: 'onload/unload',
      AJAXPIPE_ONUNLOAD: 'onload/exit',
      AJAXPIPE_SEND: 'ajaxpipe/send',
      AJAXPIPE_FIRST_RESPONSE: 'ajaxpipe/first_response',
      AJAXPIPE_ONBEFORECLEARCANVAS: 'ajaxpipe/onbeforeclearcanvas',
    });
    f['default'] = a;
  },
  66
);
__d(
  'PageletEventConstsJS',
  [],
  function (a, b, c, d, e, f) {
    a = Object.freeze({
      ARRIVE_END: 'arrive',
      ARRIVE_START: 'prearrive',
      CSS_END: 'css_load',
      CSS_START: 'css',
      DISPLAY_END: 'display',
      DISPLAY_START: 'display_start',
      IMAGES_DISPLAYED: 'images_displayed',
      JS_END: 'jsdone',
      JS_START: 'jsstart',
      ONLOAD_END: 'onload',
      ONLOAD_START: 'preonload',
      PAGELET_EVENT: 'pagelet_events',
      PHASE_BEGIN: 'phase_begin',
      SETUP: 'setup',
    });
    f['default'] = a;
  },
  66
);
__d(
  'PageletSet',
  ['Arbiter'],
  function (a, b, c, d, e, f, g) {
    var h = {};
    function i(a) {
      return Object.prototype.hasOwnProperty.call(h, a);
    }
    function j(a) {
      return h[a];
    }
    function a(a) {
      if (!i(a)) {
        var b = new n(a);
        h[a] = b;
      }
      return j(a);
    }
    function k() {
      return Object.keys(h);
    }
    function l(a) {
      if (i(a)) {
        var b = j(a);
        delete h[a];
        b.destroy();
      }
    }
    function m(a, b) {
      return a.contains ? a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
    }
    var n = (function () {
      function a(a) {
        var b = this;
        this.id = a;
        this.$1 = null;
        this.$2 = [];
        this.addDestructor(function () {
          c('Arbiter').inform('pagelet/destroy', { id: b.id, root: b.$1 });
        });
      }
      var b = a.prototype;
      b.getRoot = function () {
        return this.$1;
      };
      b.setRoot = function (a) {
        this.$1 = a;
      };
      b.$3 = function () {
        var a = [],
          b = this.$1;
        if (!b) return a;
        var c = k();
        for (var d = 0; d < c.length; d++) {
          var e = c[d];
          if (e === this.id) continue;
          e = h[e];
          var f = e.getRoot();
          f && m(b, f) && a.push(e);
        }
        return a;
      };
      b.addDestructor = function (a) {
        this.$2.push(a);
      };
      b.destroy = function () {
        var a = this.$3();
        for (var b = 0; b < a.length; b++) {
          var c = a[b];
          i(c.id) && l(c.id);
        }
        for (var c = 0; c < this.$2.length; c++) {
          a = this.$2[c]();
          a && a();
        }
      };
      return a;
    })();
    g.hasPagelet = i;
    g.getPagelet = j;
    g.getOrCreatePagelet = a;
    g.getPageletIDs = k;
    g.removePagelet = l;
  },
  98
);
__d(
  'Run',
  ['invariant', 'Arbiter', 'ExecutionEnvironment', 'PageEvents', 'RunGatingConfig', 'Stratcom', 'TimeSlice', 'ifRequired', 'performanceAbsoluteNow'],
  function (a, b, c, d, e, f, g, h) {
    'use strict';
    function i(b, c) {
      var d = a.CavalryLogger;
      d = d && d.getInstance();
      if (!d) return;
      c ? d.setAbsTimeStamp && d.setAbsTimeStamp(b, c) : d.setTimeStamp(b);
    }
    function j(a, b) {
      return c('Stratcom').listen(a, null, function () {
        c('Stratcom').removeCurrentListener(), b();
      });
    }
    function b() {
      document.addEventListener(
        'DOMContentLoaded',
        c('TimeSlice').guard(function () {
          c('Arbiter').inform(c('PageEvents').NATIVE_DOMREADY, !0, 'state');
        }, 'DOMContentLoaded'),
        !0
      );
      var a = window.onload;
      window.onload = c('TimeSlice').guard(function () {
        i('t_layout'), a && a(), c('Arbiter').inform(c('PageEvents').NATIVE_ONLOAD, !0, 'state');
      }, 'window.onload');
      window.onunload = c('TimeSlice').guard(function () {
        c('Arbiter').inform(c('PageEvents').NATIVE_ONUNLOAD, !0, 'state');
      }, 'window.onunload');
      window.onbeforeunload = c('TimeSlice').guard(function () {
        var a = {};
        c('Arbiter').inform(c('PageEvents').NATIVE_ONBEFOREUNLOAD, a, 'state');
        a.warn || c('Arbiter').inform(c('PageEvents').AJAXPIPE_ONUNLOAD, { transition_type: 'normal' });
        return a.warn;
      }, 'window.onbeforeunload');
    }
    function e() {
      c('Arbiter').registerCallback(
        function () {
          c('Arbiter').inform('uipage_onload', !0, 'state');
        },
        [c('PageEvents').BIGPIPE_DOMREADY]
      );
    }
    function k() {
      var a = c('performanceAbsoluteNow')();
      i('t_onload', a);
      c('Arbiter').inform(c('PageEvents').BIGPIPE_ONLOAD, { ts: a }, 'state');
    }
    var l = c('Arbiter').registerCallback(
        function () {
          c('ifRequired')('BigPipe', function (a) {
            a.getCurrentInstance() ? c('Arbiter').subscribeOnce(a.Events.displayed, k) : k();
          });
        },
        [c('PageEvents').NATIVE_ONLOAD]
      ),
      m = c('Arbiter').registerCallback(
        function () {
          i('t_domcontent');
          var a = { timeTriggered: Date.now() };
          c('Arbiter').inform(c('PageEvents').BIGPIPE_DOMREADY, a, 'state');
        },
        [c('PageEvents').NATIVE_DOMREADY]
      );
    d('ExecutionEnvironment').canUseDOM && (b(), e());
    function f(a) {
      return j('m:onload', a);
    }
    function n(a) {
      h(0, 4048);
    }
    function o(a, b) {
      h(0, 4049);
    }
    function p(a, b) {}
    function q(a) {
      return j('m:page:unload', a);
    }
    function r(a) {
      h(0, 4050);
    }
    function s(a) {
      if (c('RunGatingConfig').shouldUseBrowserUnload) {
        var b = c('Arbiter').subscribe(c('PageEvents').NATIVE_ONUNLOAD, a);
        return {
          remove: function () {
            return b.unsubscribe();
          },
        };
      } else return j('m:page:unload', a);
    }
    g.__onloadCallback = l;
    g.__domContentCallback = m;
    g.onAfterLoad = f;
    g.onAfterUnload = n;
    g.onBeforeUnload = o;
    g.maybeOnBeforeUnload = p;
    g.onLeave = q;
    g.onLoad = r;
    g.onUnload = s;
  },
  98
);
__d(
  'RunBlue',
  ['Run'],
  function (a, b, c, d, e, f) {
    Object.keys(importNamespace('Run')).forEach(function (a) {
      if (a === 'default' || a === '__esModule') return;
      f[a] = importNamespace('Run')[a];
    });
  },
  null
);
__d(
  'UserTimingUtils',
  ['performance'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = typeof c('performance').mark === 'function' && typeof c('performance').clearMarks === 'function' && typeof c('performance').measure === 'function' && typeof c('performance').clearMeasures === 'function',
      i = !1;
    if (h && c('performance').mark != null) {
      var j = '__v3',
        k = {};
      Object.defineProperty(k, 'startTime', {
        get: function () {
          i = !0;
        },
      });
      try {
        c('performance').mark(j, k);
      } catch (a) {
      } finally {
        c('performance').clearMarks(j);
      }
    }
    function a(a) {
      h && c('performance').mark(a);
    }
    function b(a, b, d) {
      d === void 0 && (d = !0);
      if (h) {
        try {
          c('performance').measure(a, b);
        } catch (a) {}
        d && c('performance').clearMarks(b);
        c('performance').clearMeasures(a);
      }
    }
    function d(a) {
      if (h) {
        try {
          a = c('performance').getEntriesByName(a, 'mark');
          if (a != null && a.length > 0) return !0;
        } catch (a) {}
        return !1;
      }
    }
    function e(a) {
      if (h)
        try {
          c('performance').clearMarks(a);
        } catch (a) {}
    }
    function f(a, b) {
      i && (c('performance').measure(a, b), c('performance').clearMeasures(a));
    }
    function l(a, b) {
      i && (c('performance').mark(a, b), c('performance').clearMarks(a));
    }
    g.measureStart = a;
    g.measureEnd = b;
    g.hasMark = d;
    g.clearMarks = e;
    g.measureModern = f;
    g.markModern = l;
  },
  98
);
__d(
  'captureUsageSnapshot',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a() {
      var a = window.__bodyWrapper;
      if (!a.getCodeUsage) return { js_calls: {}, document_html: '', stylesheets: {} };
      a = babelHelpers['extends']({}, a.getCodeUsage());
      var b = String(window.document.body.outerHTML),
        c = {};
      Array.from(document.styleSheets).forEach(function (a) {
        a.href && (c[a.href] = !0);
      });
      return { js_calls: a, document_html: b, stylesheets: c };
    }
    f['default'] = a;
  },
  66
);
/**
 * License: https://www.facebook.com/legal/license/YzYYrH_bE_k/
 */
__d(
  'DOMPurify',
  [],
  function (a, b, c, d, e, f) {
    (function (b, c) {
      typeof f === 'object' && typeof e !== 'undefined' ? (e.exports = c()) : typeof define === 'function' && define.amd ? define(c) : ((b = b || self), (b.DOMPurify = c()));
    })(this, function () {
      'use strict';
      function a(a) {
        if (Array.isArray(a)) {
          for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
          return c;
        } else return Array.from(a);
      }
      var b = Object.hasOwnProperty,
        c = Object.setPrototypeOf,
        d = Object.isFrozen,
        e = Object.getPrototypeOf,
        f = Object.getOwnPropertyDescriptor,
        g = Object.freeze,
        h = Object.seal,
        i = Object.create,
        j = typeof Reflect !== 'undefined' && Reflect,
        k = j.apply,
        l = j.construct;
      k ||
        (k = function (a, b, c) {
          return a.apply(b, c);
        });
      g ||
        (g = function (a) {
          return a;
        });
      h ||
        (h = function (a) {
          return a;
        });
      l ||
        (l = function (b, c) {
          return new (Function.prototype.bind.apply(b, [null].concat(a(c))))();
        });
      var aa = q(Array.prototype.forEach),
        ba = q(Array.prototype.pop),
        m = q(Array.prototype.push),
        n = q(String.prototype.toLowerCase),
        ca = q(String.prototype.match),
        o = q(String.prototype.replace),
        da = q(String.prototype.indexOf),
        ea = q(String.prototype.trim),
        p = q(RegExp.prototype.test),
        fa = r(TypeError);
      function q(a) {
        return function (b) {
          for (var c = arguments.length, d = Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
          return k(a, b, d);
        };
      }
      function r(a) {
        return function () {
          for (var b = arguments.length, c = Array(b), d = 0; d < b; d++) c[d] = arguments[d];
          return l(a, c);
        };
      }
      function s(a, b) {
        c && c(a, null);
        var e = b.length;
        while (e--) {
          var f = b[e];
          if (typeof f === 'string') {
            var g = n(f);
            g !== f && (d(b) || (b[e] = g), (f = g));
          }
          a[f] = !0;
        }
        return a;
      }
      function t(a) {
        var c = i(null),
          d = void 0;
        for (d in a) k(b, a, [d]) && (c[d] = a[d]);
        return c;
      }
      function u(a, b) {
        while (a !== null) {
          var c = f(a, b);
          if (c) {
            if (c.get) return q(c.get);
            if (typeof c.value === 'function') return q(c.value);
          }
          a = e(a);
        }
        function d(a) {
          return null;
        }
        return d;
      }
      var ga = g([
          'a',
          'abbr',
          'acronym',
          'address',
          'area',
          'article',
          'aside',
          'audio',
          'b',
          'bdi',
          'bdo',
          'big',
          'blink',
          'blockquote',
          'body',
          'br',
          'button',
          'canvas',
          'caption',
          'center',
          'cite',
          'code',
          'col',
          'colgroup',
          'content',
          'data',
          'datalist',
          'dd',
          'decorator',
          'del',
          'details',
          'dfn',
          'dialog',
          'dir',
          'div',
          'dl',
          'dt',
          'element',
          'em',
          'fieldset',
          'figcaption',
          'figure',
          'font',
          'footer',
          'form',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'head',
          'header',
          'hgroup',
          'hr',
          'html',
          'i',
          'img',
          'input',
          'ins',
          'kbd',
          'label',
          'legend',
          'li',
          'main',
          'map',
          'mark',
          'marquee',
          'menu',
          'menuitem',
          'meter',
          'nav',
          'nobr',
          'ol',
          'optgroup',
          'option',
          'output',
          'p',
          'picture',
          'pre',
          'progress',
          'q',
          'rp',
          'rt',
          'ruby',
          's',
          'samp',
          'section',
          'select',
          'shadow',
          'small',
          'source',
          'spacer',
          'span',
          'strike',
          'strong',
          'style',
          'sub',
          'summary',
          'sup',
          'table',
          'tbody',
          'td',
          'template',
          'textarea',
          'tfoot',
          'th',
          'thead',
          'time',
          'tr',
          'track',
          'tt',
          'u',
          'ul',
          'var',
          'video',
          'wbr',
        ]),
        v = g([
          'svg',
          'a',
          'altglyph',
          'altglyphdef',
          'altglyphitem',
          'animatecolor',
          'animatemotion',
          'animatetransform',
          'circle',
          'clippath',
          'defs',
          'desc',
          'ellipse',
          'filter',
          'font',
          'g',
          'glyph',
          'glyphref',
          'hkern',
          'image',
          'line',
          'lineargradient',
          'marker',
          'mask',
          'metadata',
          'mpath',
          'path',
          'pattern',
          'polygon',
          'polyline',
          'radialgradient',
          'rect',
          'stop',
          'style',
          'switch',
          'symbol',
          'text',
          'textpath',
          'title',
          'tref',
          'tspan',
          'view',
          'vkern',
        ]),
        w = g([
          'feBlend',
          'feColorMatrix',
          'feComponentTransfer',
          'feComposite',
          'feConvolveMatrix',
          'feDiffuseLighting',
          'feDisplacementMap',
          'feDistantLight',
          'feFlood',
          'feFuncA',
          'feFuncB',
          'feFuncG',
          'feFuncR',
          'feGaussianBlur',
          'feMerge',
          'feMergeNode',
          'feMorphology',
          'feOffset',
          'fePointLight',
          'feSpecularLighting',
          'feSpotLight',
          'feTile',
          'feTurbulence',
        ]),
        ha = g([
          'animate',
          'color-profile',
          'cursor',
          'discard',
          'fedropshadow',
          'feimage',
          'font-face',
          'font-face-format',
          'font-face-name',
          'font-face-src',
          'font-face-uri',
          'foreignobject',
          'hatch',
          'hatchpath',
          'mesh',
          'meshgradient',
          'meshpatch',
          'meshrow',
          'missing-glyph',
          'script',
          'set',
          'solidcolor',
          'unknown',
          'use',
        ]),
        x = g([
          'math',
          'menclose',
          'merror',
          'mfenced',
          'mfrac',
          'mglyph',
          'mi',
          'mlabeledtr',
          'mmultiscripts',
          'mn',
          'mo',
          'mover',
          'mpadded',
          'mphantom',
          'mroot',
          'mrow',
          'ms',
          'mspace',
          'msqrt',
          'mstyle',
          'msub',
          'msup',
          'msubsup',
          'mtable',
          'mtd',
          'mtext',
          'mtr',
          'munder',
          'munderover',
        ]),
        ia = g(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']),
        ja = g(['#text']),
        ka = g([
          'accept',
          'action',
          'align',
          'alt',
          'autocapitalize',
          'autocomplete',
          'autopictureinpicture',
          'autoplay',
          'background',
          'bgcolor',
          'border',
          'capture',
          'cellpadding',
          'cellspacing',
          'checked',
          'cite',
          'class',
          'clear',
          'color',
          'cols',
          'colspan',
          'controls',
          'controlslist',
          'coords',
          'crossorigin',
          'datetime',
          'decoding',
          'default',
          'dir',
          'disabled',
          'disablepictureinpicture',
          'disableremoteplayback',
          'download',
          'draggable',
          'enctype',
          'enterkeyhint',
          'face',
          'for',
          'headers',
          'height',
          'hidden',
          'high',
          'href',
          'hreflang',
          'id',
          'inputmode',
          'integrity',
          'ismap',
          'kind',
          'label',
          'lang',
          'list',
          'loading',
          'loop',
          'low',
          'max',
          'maxlength',
          'media',
          'method',
          'min',
          'minlength',
          'multiple',
          'muted',
          'name',
          'noshade',
          'novalidate',
          'nowrap',
          'open',
          'optimum',
          'pattern',
          'placeholder',
          'playsinline',
          'poster',
          'preload',
          'pubdate',
          'radiogroup',
          'readonly',
          'rel',
          'required',
          'rev',
          'reversed',
          'role',
          'rows',
          'rowspan',
          'spellcheck',
          'scope',
          'selected',
          'shape',
          'size',
          'sizes',
          'span',
          'srclang',
          'start',
          'src',
          'srcset',
          'step',
          'style',
          'summary',
          'tabindex',
          'title',
          'translate',
          'type',
          'usemap',
          'valign',
          'value',
          'width',
          'xmlns',
        ]),
        y = g([
          'accent-height',
          'accumulate',
          'additive',
          'alignment-baseline',
          'ascent',
          'attributename',
          'attributetype',
          'azimuth',
          'basefrequency',
          'baseline-shift',
          'begin',
          'bias',
          'by',
          'class',
          'clip',
          'clippathunits',
          'clip-path',
          'clip-rule',
          'color',
          'color-interpolation',
          'color-interpolation-filters',
          'color-profile',
          'color-rendering',
          'cx',
          'cy',
          'd',
          'dx',
          'dy',
          'diffuseconstant',
          'direction',
          'display',
          'divisor',
          'dur',
          'edgemode',
          'elevation',
          'end',
          'fill',
          'fill-opacity',
          'fill-rule',
          'filter',
          'filterunits',
          'flood-color',
          'flood-opacity',
          'font-family',
          'font-size',
          'font-size-adjust',
          'font-stretch',
          'font-style',
          'font-variant',
          'font-weight',
          'fx',
          'fy',
          'g1',
          'g2',
          'glyph-name',
          'glyphref',
          'gradientunits',
          'gradienttransform',
          'height',
          'href',
          'id',
          'image-rendering',
          'in',
          'in2',
          'k',
          'k1',
          'k2',
          'k3',
          'k4',
          'kerning',
          'keypoints',
          'keysplines',
          'keytimes',
          'lang',
          'lengthadjust',
          'letter-spacing',
          'kernelmatrix',
          'kernelunitlength',
          'lighting-color',
          'local',
          'marker-end',
          'marker-mid',
          'marker-start',
          'markerheight',
          'markerunits',
          'markerwidth',
          'maskcontentunits',
          'maskunits',
          'max',
          'mask',
          'media',
          'method',
          'mode',
          'min',
          'name',
          'numoctaves',
          'offset',
          'operator',
          'opacity',
          'order',
          'orient',
          'orientation',
          'origin',
          'overflow',
          'paint-order',
          'path',
          'pathlength',
          'patterncontentunits',
          'patterntransform',
          'patternunits',
          'points',
          'preservealpha',
          'preserveaspectratio',
          'primitiveunits',
          'r',
          'rx',
          'ry',
          'radius',
          'refx',
          'refy',
          'repeatcount',
          'repeatdur',
          'restart',
          'result',
          'rotate',
          'scale',
          'seed',
          'shape-rendering',
          'specularconstant',
          'specularexponent',
          'spreadmethod',
          'startoffset',
          'stddeviation',
          'stitchtiles',
          'stop-color',
          'stop-opacity',
          'stroke-dasharray',
          'stroke-dashoffset',
          'stroke-linecap',
          'stroke-linejoin',
          'stroke-miterlimit',
          'stroke-opacity',
          'stroke',
          'stroke-width',
          'style',
          'surfacescale',
          'systemlanguage',
          'tabindex',
          'targetx',
          'targety',
          'transform',
          'text-anchor',
          'text-decoration',
          'text-rendering',
          'textlength',
          'type',
          'u1',
          'u2',
          'unicode',
          'values',
          'viewbox',
          'visibility',
          'version',
          'vert-adv-y',
          'vert-origin-x',
          'vert-origin-y',
          'width',
          'word-spacing',
          'wrap',
          'writing-mode',
          'xchannelselector',
          'ychannelselector',
          'x',
          'x1',
          'x2',
          'xmlns',
          'y',
          'y1',
          'y2',
          'z',
          'zoomandpan',
        ]),
        la = g([
          'accent',
          'accentunder',
          'align',
          'bevelled',
          'close',
          'columnsalign',
          'columnlines',
          'columnspan',
          'denomalign',
          'depth',
          'dir',
          'display',
          'displaystyle',
          'encoding',
          'fence',
          'frame',
          'height',
          'href',
          'id',
          'largeop',
          'length',
          'linethickness',
          'lspace',
          'lquote',
          'mathbackground',
          'mathcolor',
          'mathsize',
          'mathvariant',
          'maxsize',
          'minsize',
          'movablelimits',
          'notation',
          'numalign',
          'open',
          'rowalign',
          'rowlines',
          'rowspacing',
          'rowspan',
          'rspace',
          'rquote',
          'scriptlevel',
          'scriptminsize',
          'scriptsizemultiplier',
          'selection',
          'separator',
          'separators',
          'stretchy',
          'subscriptshift',
          'supscriptshift',
          'symmetric',
          'voffset',
          'width',
          'xmlns',
        ]),
        z = g(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']),
        ma = h(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
        na = h(/<%[\s\S]*|[\s\S]*%>/gm),
        oa = h(/^data-[\-\w.\u00B7-\uFFFF]/),
        pa = h(/^aria-[\-\w]+$/),
        qa = h(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
        ra = h(/^(?:\w+script|data):/i),
        sa = h(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
        A =
          typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function (a) {
                return typeof a;
              }
            : function (a) {
                return a && typeof Symbol === 'function' && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a;
              };
      function B(a) {
        if (Array.isArray(a)) {
          for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
          return c;
        } else return Array.from(a);
      }
      var ta = function () {
          return typeof window === 'undefined' ? null : window;
        },
        ua = function (a, b) {
          if ((typeof a === 'undefined' ? 'undefined' : A(a)) !== 'object' || typeof a.createPolicy !== 'function') return null;
          var c = null,
            d = 'data-tt-policy-suffix';
          b.currentScript && b.currentScript.hasAttribute(d) && (c = b.currentScript.getAttribute(d));
          b = 'dompurify' + (c ? '#' + c : '');
          try {
            return a.createPolicy(b, {
              createHTML: function (a) {
                return a;
              },
            });
          } catch (a) {
            console.warn('TrustedTypes policy ' + b + ' could not be created.');
            return null;
          }
        };
      function va() {
        var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ta(),
          b = function (a) {
            return va(a);
          };
        b.version = '2.2.7';
        b.removed = [];
        if (!a || !a.document || a.document.nodeType !== 9) {
          b.isSupported = !1;
          return b;
        }
        var c = a.document,
          d = a.document,
          e = a.DocumentFragment,
          f = a.HTMLTemplateElement,
          h = a.Node,
          i = a.Element,
          j = a.NodeFilter,
          k = a.NamedNodeMap,
          l = k === void 0 ? a.NamedNodeMap || a.MozNamedAttrMap : k,
          q = a.Text,
          r = a.Comment,
          wa = a.DOMParser,
          xa = a.trustedTypes,
          C = i.prototype,
          ya = u(C, 'cloneNode'),
          za = u(C, 'nextSibling'),
          Aa = u(C, 'childNodes'),
          D = u(C, 'parentNode');
        if (typeof f === 'function') {
          var E = d.createElement('template');
          E.content && E.content.ownerDocument && (d = E.content.ownerDocument);
        }
        var F = ua(xa, c),
          Ba = F && S ? F.createHTML('') : '',
          G = d,
          H = G.implementation,
          Ca = G.createNodeIterator,
          Da = G.getElementsByTagName,
          Ea = G.createDocumentFragment,
          Fa = c.importNode,
          Ga = {};
        try {
          Ga = t(d).documentMode ? d.documentMode : {};
        } catch (a) {}
        var I = {};
        b.isSupported = typeof D === 'function' && H && typeof H.createHTMLDocument !== 'undefined' && Ga !== 9;
        var J = ma,
          K = na,
          Ha = oa,
          Ia = pa,
          Ja = ra,
          Ka = sa,
          L = qa,
          M = null,
          La = s({}, [].concat(B(ga), B(v), B(w), B(x), B(ja))),
          N = null,
          Ma = s({}, [].concat(B(ka), B(y), B(la), B(z))),
          Na = null,
          Oa = null,
          Pa = !0,
          Qa = !0,
          Ra = !1,
          O = !1,
          P = !1,
          Sa = !1,
          Ta = !1,
          Q = !1,
          R = !1,
          Ua = !0,
          S = !1,
          Va = !0,
          Wa = !0,
          T = !1,
          U = {},
          Xa = s({}, [
            'annotation-xml',
            'audio',
            'colgroup',
            'desc',
            'foreignobject',
            'head',
            'iframe',
            'math',
            'mi',
            'mn',
            'mo',
            'ms',
            'mtext',
            'noembed',
            'noframes',
            'noscript',
            'plaintext',
            'script',
            'style',
            'svg',
            'template',
            'thead',
            'title',
            'video',
            'xmp',
          ]),
          Ya = null,
          Za = s({}, ['audio', 'video', 'img', 'source', 'image', 'track']),
          $a = null,
          ab = s({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'summary', 'title', 'value', 'style', 'xmlns']),
          V = null,
          bb = d.createElement('form'),
          cb = function (a) {
            if (V && V === a) return;
            (!a || (typeof a === 'undefined' ? 'undefined' : A(a)) !== 'object') && (a = {});
            a = t(a);
            M = 'ALLOWED_TAGS' in a ? s({}, a.ALLOWED_TAGS) : La;
            N = 'ALLOWED_ATTR' in a ? s({}, a.ALLOWED_ATTR) : Ma;
            $a = 'ADD_URI_SAFE_ATTR' in a ? s(t(ab), a.ADD_URI_SAFE_ATTR) : ab;
            Ya = 'ADD_DATA_URI_TAGS' in a ? s(t(Za), a.ADD_DATA_URI_TAGS) : Za;
            Na = 'FORBID_TAGS' in a ? s({}, a.FORBID_TAGS) : {};
            Oa = 'FORBID_ATTR' in a ? s({}, a.FORBID_ATTR) : {};
            U = 'USE_PROFILES' in a ? a.USE_PROFILES : !1;
            Pa = a.ALLOW_ARIA_ATTR !== !1;
            Qa = a.ALLOW_DATA_ATTR !== !1;
            Ra = a.ALLOW_UNKNOWN_PROTOCOLS || !1;
            O = a.SAFE_FOR_TEMPLATES || !1;
            P = a.WHOLE_DOCUMENT || !1;
            Q = a.RETURN_DOM || !1;
            R = a.RETURN_DOM_FRAGMENT || !1;
            Ua = a.RETURN_DOM_IMPORT !== !1;
            S = a.RETURN_TRUSTED_TYPE || !1;
            Ta = a.FORCE_BODY || !1;
            Va = a.SANITIZE_DOM !== !1;
            Wa = a.KEEP_CONTENT !== !1;
            T = a.IN_PLACE || !1;
            L = a.ALLOWED_URI_REGEXP || L;
            O && (Qa = !1);
            R && (Q = !0);
            U &&
              ((M = s({}, [].concat(B(ja)))),
              (N = []),
              U.html === !0 && (s(M, ga), s(N, ka)),
              U.svg === !0 && (s(M, v), s(N, y), s(N, z)),
              U.svgFilters === !0 && (s(M, w), s(N, y), s(N, z)),
              U.mathMl === !0 && (s(M, x), s(N, la), s(N, z)));
            a.ADD_TAGS && (M === La && (M = t(M)), s(M, a.ADD_TAGS));
            a.ADD_ATTR && (N === Ma && (N = t(N)), s(N, a.ADD_ATTR));
            a.ADD_URI_SAFE_ATTR && s($a, a.ADD_URI_SAFE_ATTR);
            Wa && (M['#text'] = !0);
            P && s(M, ['html', 'head', 'body']);
            M.table && (s(M, ['tbody']), delete Na.tbody);
            g && g(a);
            V = a;
          },
          db = s({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
          eb = s({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
          W = s({}, v);
        s(W, w);
        s(W, ha);
        var fb = s({}, x);
        s(fb, ia);
        var gb = 'http://www.w3.org/1998/Math/MathML',
          hb = 'http://www.w3.org/2000/svg',
          X = 'http://www.w3.org/1999/xhtml',
          ib = function (a) {
            var b = D(a);
            (!b || !b.tagName) && (b = { namespaceURI: X, tagName: 'template' });
            var c = n(a.tagName),
              d = n(b.tagName);
            if (a.namespaceURI === hb) {
              if (b.namespaceURI === X) return c === 'svg';
              return b.namespaceURI === gb ? c === 'svg' && (d === 'annotation-xml' || db[d]) : Boolean(W[c]);
            }
            if (a.namespaceURI === gb) {
              if (b.namespaceURI === X) return c === 'math';
              return b.namespaceURI === hb ? c === 'math' && eb[d] : Boolean(fb[c]);
            }
            if (a.namespaceURI === X) {
              if (b.namespaceURI === hb && !eb[d]) return !1;
              if (b.namespaceURI === gb && !db[d]) return !1;
              a = s({}, ['title', 'style', 'font', 'a', 'script']);
              return !fb[c] && (a[c] || !W[c]);
            }
            return !1;
          },
          Y = function (a) {
            m(b.removed, { element: a });
            try {
              a.parentNode.removeChild(a);
            } catch (b) {
              try {
                a.outerHTML = Ba;
              } catch (b) {
                a.remove();
              }
            }
          },
          jb = function (a, c) {
            try {
              m(b.removed, { attribute: c.getAttributeNode(a), from: c });
            } catch (a) {
              m(b.removed, { attribute: null, from: c });
            }
            c.removeAttribute(a);
            if (a === 'is' && !N[a])
              if (Q || R)
                try {
                  Y(c);
                } catch (a) {}
              else
                try {
                  c.setAttribute(a, '');
                } catch (a) {}
          },
          kb = function (a) {
            var b = void 0,
              c = void 0;
            if (Ta) a = '<remove></remove>' + a;
            else {
              var e = ca(a, /^[\r\n\t ]+/);
              c = e && e[0];
            }
            e = F ? F.createHTML(a) : a;
            try {
              b = new wa().parseFromString(e, 'text/html');
            } catch (a) {}
            if (!b || !b.documentElement) {
              b = H.createHTMLDocument('');
              var f = b;
              f = f.body;
              f.parentNode.removeChild(f.parentNode.firstElementChild);
              f.outerHTML = e;
            }
            a && c && b.body.insertBefore(d.createTextNode(c), b.body.childNodes[0] || null);
            return Da.call(b, P ? 'html' : 'body')[0];
          },
          lb = function (a) {
            return Ca.call(
              a.ownerDocument || a,
              a,
              j.SHOW_ELEMENT | j.SHOW_COMMENT | j.SHOW_TEXT,
              function () {
                return j.FILTER_ACCEPT;
              },
              !1
            );
          },
          mb = function (a) {
            if (a instanceof q || a instanceof r) return !1;
            return typeof a.nodeName !== 'string' ||
              typeof a.textContent !== 'string' ||
              typeof a.removeChild !== 'function' ||
              !(a.attributes instanceof l) ||
              typeof a.removeAttribute !== 'function' ||
              typeof a.setAttribute !== 'function' ||
              typeof a.namespaceURI !== 'string' ||
              typeof a.insertBefore !== 'function'
              ? !0
              : !1;
          },
          Z = function (a) {
            return (typeof h === 'undefined' ? 'undefined' : A(h)) === 'object' ? a instanceof h : a && (typeof a === 'undefined' ? 'undefined' : A(a)) === 'object' && typeof a.nodeType === 'number' && typeof a.nodeName === 'string';
          },
          $ = function (a, c, d) {
            if (!I[a]) return;
            aa(I[a], function (a) {
              a.call(b, c, d, V);
            });
          },
          nb = function (a) {
            var c = void 0;
            $('beforeSanitizeElements', a, null);
            if (mb(a)) {
              Y(a);
              return !0;
            }
            if (ca(a.nodeName, /[\u0080-\uFFFF]/)) {
              Y(a);
              return !0;
            }
            var d = n(a.nodeName);
            $('uponSanitizeElement', a, { tagName: d, allowedTags: M });
            if (!Z(a.firstElementChild) && (!Z(a.content) || !Z(a.content.firstElementChild)) && p(/<[/\w]/g, a.innerHTML) && p(/<[/\w]/g, a.textContent)) {
              Y(a);
              return !0;
            }
            if (!M[d] || Na[d]) {
              if (Wa && !Xa[d]) {
                var e = D(a),
                  f = Aa(a);
                if (f && e) {
                  var g = f.length;
                  for (var g = g - 1; g >= 0; --g) e.insertBefore(ya(f[g], !0), za(a));
                }
              }
              Y(a);
              return !0;
            }
            if (a instanceof i && !ib(a)) {
              Y(a);
              return !0;
            }
            if ((d === 'noscript' || d === 'noembed') && p(/<\/no(script|embed)/i, a.innerHTML)) {
              Y(a);
              return !0;
            }
            O && a.nodeType === 3 && ((c = a.textContent), (c = o(c, J, ' ')), (c = o(c, K, ' ')), a.textContent !== c && (m(b.removed, { element: a.cloneNode() }), (a.textContent = c)));
            $('afterSanitizeElements', a, null);
            return !1;
          },
          ob = function (a, b, c) {
            if (Va && (b === 'id' || b === 'name') && (c in d || c in bb)) return !1;
            if (!(Qa && p(Ha, b)))
              if (!(Pa && p(Ia, b)))
                if (!N[b] || Oa[b]) return !1;
                else if (!$a[b]) if (!p(L, o(c, Ka, ''))) if (!((b === 'src' || b === 'xlink:href' || b === 'href') && a !== 'script' && da(c, 'data:') === 0 && Ya[a])) if (!(Ra && !p(Ja, o(c, Ka, '')))) if (!!c) return !1;
            return !0;
          },
          pb = function (a) {
            var c,
              d = void 0,
              e = void 0,
              f = void 0;
            $('beforeSanitizeAttributes', a, null);
            var g = a.attributes;
            if (!g) return;
            var h = { attrName: '', attrValue: '', keepAttr: !0, allowedAttributes: N };
            f = g.length;
            while (f--) {
              c = g[f];
              var i = c,
                j = i.name;
              i = i.namespaceURI;
              d = ea(c.value);
              e = n(j);
              h.attrName = e;
              h.attrValue = d;
              h.keepAttr = !0;
              h.forceKeepAttr = void 0;
              $('uponSanitizeAttribute', a, h);
              d = h.attrValue;
              if (h.forceKeepAttr) continue;
              jb(j, a);
              if (!h.keepAttr) continue;
              if (p(/\/>/i, d)) {
                jb(j, a);
                continue;
              }
              O && ((d = o(d, J, ' ')), (d = o(d, K, ' ')));
              c = a.nodeName.toLowerCase();
              if (!ob(c, e, d)) continue;
              try {
                i ? a.setAttributeNS(i, j, d) : a.setAttribute(j, d), ba(b.removed);
              } catch (a) {}
            }
            $('afterSanitizeAttributes', a, null);
          },
          qb = function a(b) {
            var c = void 0,
              d = lb(b);
            $('beforeSanitizeShadowDOM', b, null);
            while ((c = d.nextNode())) {
              $('uponSanitizeShadowNode', c, null);
              if (nb(c)) continue;
              c.content instanceof e && a(c.content);
              pb(c);
            }
            $('afterSanitizeShadowDOM', b, null);
          };
        b.sanitize = function (d, f) {
          var g = void 0,
            i = void 0,
            j = void 0,
            k = void 0;
          d || (d = '<!-->');
          if (typeof d !== 'string' && !Z(d))
            if (typeof d.toString !== 'function') throw fa('toString is not a function');
            else {
              d = d.toString();
              if (typeof d !== 'string') throw fa('dirty is not a string, aborting');
            }
          if (!b.isSupported) {
            if (A(a.toStaticHTML) === 'object' || typeof a.toStaticHTML === 'function') {
              if (typeof d === 'string') return a.toStaticHTML(d);
              if (Z(d)) return a.toStaticHTML(d.outerHTML);
            }
            return d;
          }
          Sa || cb(f);
          b.removed = [];
          typeof d === 'string' && (T = !1);
          if (!T)
            if (d instanceof h) (g = kb('<!---->')), (f = g.ownerDocument.importNode(d, !0)), f.nodeType === 1 && f.nodeName === 'BODY' ? (g = f) : f.nodeName === 'HTML' ? (g = f) : g.appendChild(f);
            else {
              if (!Q && !O && !P && d.indexOf('<') === -1) return F && S ? F.createHTML(d) : d;
              g = kb(d);
              if (!g) return Q ? null : Ba;
            }
          g && Ta && Y(g.firstChild);
          f = lb(T ? d : g);
          while ((i = f.nextNode())) {
            if (i.nodeType === 3 && i === j) continue;
            if (nb(i)) continue;
            i.content instanceof e && qb(i.content);
            pb(i);
            j = i;
          }
          j = null;
          if (T) return d;
          if (Q) {
            if (R) {
              k = Ea.call(g.ownerDocument);
              while (g.firstChild) k.appendChild(g.firstChild);
            } else k = g;
            Ua && (k = Fa.call(c, k, !0));
            return k;
          }
          i = P ? g.outerHTML : g.innerHTML;
          O && ((i = o(i, J, ' ')), (i = o(i, K, ' ')));
          return F && S ? F.createHTML(i) : i;
        };
        b.setConfig = function (a) {
          cb(a), (Sa = !0);
        };
        b.clearConfig = function () {
          (V = null), (Sa = !1);
        };
        b.isValidAttribute = function (a, b, c) {
          V || cb({});
          a = n(a);
          b = n(b);
          return ob(a, b, c);
        };
        b.addHook = function (a, b) {
          if (typeof b !== 'function') return;
          I[a] = I[a] || [];
          m(I[a], b);
        };
        b.removeHook = function (a) {
          I[a] && ba(I[a]);
        };
        b.removeHooks = function (a) {
          I[a] && (I[a] = []);
        };
        b.removeAllHooks = function () {
          I = {};
        };
        return b;
      }
      j = va();
      return j;
    });
  },
  null
);
__d(
  'TrustedTypes',
  ['DOMPurify', 'FBLogger', 'TrustedTypeUtils', 'TrustedTypesConfig'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    if (typeof trustedTypes !== 'undefined' && c('TrustedTypesConfig').useTrustedTypes) {
      var h = function (a, b) {
          c('FBLogger')('sec_infra').warn(
            "[Trusted-Types]: String '%s' is flowing to DOM XSS sink. Default Trusted Type policy was executed and removed dangerous elements. Returned string is: '%s'. If this is breaking your feature, post in Security Infra group.",
            a.toString().slice(0, 15),
            b.toString().slice(0, 15)
          );
        },
        i = trustedTypes;
      a = babelHelpers['extends']({}, i, {
        createPolicy: function (a, b) {
          a = i.createPolicy(a, b);
          return {
            createHTML: d('TrustedTypeUtils').createTrustedType(i.isHTML.bind(i), a.createHTML.bind(a)),
            createScript: d('TrustedTypeUtils').createTrustedType(i.isScript.bind(i), a.createScript.bind(a)),
            createScriptURL: d('TrustedTypeUtils').createTrustedType(i.isScriptURL.bind(i), a.createScriptURL.bind(a)),
          };
        },
      });
      var j = c('DOMPurify')(window);
      i.createPolicy('default', {
        createHTML: function (a, b) {
          b = j.sanitize(a, { RETURN_TRUSTED_TYPE: !0 });
          if (a == b) return a;
          h(a, b);
          return c('TrustedTypesConfig').reportOnly ? a : b;
        },
      });
      b = a;
    } else {
      var k = function (a) {
        return a;
      };
      e = {
        isHTML: function () {
          return !1;
        },
        isScriptURL: function () {
          return !1;
        },
        isScript: function () {
          return !1;
        },
        createPolicy: function (a, b) {
          return { createHTML: k, createScriptURL: k, createScript: k };
        },
      };
      b = e;
    }
    f = b;
    g['default'] = f;
  },
  98
);
__d(
  'createTrustedFunction',
  ['TrustedTypes', 'TrustedTypesConfig', 'err'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = 'unsafe-function',
      i,
      j = {
        createScript: function (a) {
          var b = trustedTypes;
          for (var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1; f < d; f++) e[f - 1] = arguments[f];
          e.forEach(function (a) {
            if (!b.isScript(a)) throw c('err')('Trusted Function requires TrustedScripts args only.');
          });
          var g = e.slice(0, -1).join(','),
            h = e.pop().toString(),
            i = '(function anonymous(\n    ' + g + '\n    ) {\n    ' + h + '\n    })';
          return i;
        },
      };
    function k() {
      if (i) return;
      i = c('TrustedTypes').createPolicy(h, j);
    }
    function l() {
      i || k();
      return i;
    }
    function b() {
      for (var b = arguments.length, d = new Array(b), e = 0; e < b; e++) d[e] = arguments[e];
      if (typeof trustedTypes !== 'undefined' && c('TrustedTypesConfig').useTrustedTypes) {
        var f;
        return a.eval((f = l()).createScript.apply(f, [''].concat(d)));
      } else return babelHelpers.construct(Function, d);
    }
    g['default'] = b;
  },
  98
);
__d(
  'createTrustedScriptWithoutValidation_DO_NOT_USE',
  ['TrustedTypesWithNoDefaultPolicies'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    b = function (a) {
      return a;
    };
    var h = 'ls-script',
      i,
      j = {
        createScript: function (a) {
          return a;
        },
        createScriptURL: b,
        createHTML: b,
      };
    function k() {
      if (i) return;
      i = c('TrustedTypesWithNoDefaultPolicies').createPolicy(h, j);
    }
    function l() {
      i || k();
      return i;
    }
    function a(a) {
      return l().createScript(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'fastDeepCopy',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a) {
      return typeof a === 'object' && a !== null ? g(a) : a;
    }
    function g(a) {
      var b = typeof a.constructor === 'function' ? a.constructor() : {};
      if (Array.isArray(a))
        for (var c = 0; c < a.length; ++c) {
          var d = a[c];
          b[c] = typeof d === 'object' && d !== null ? g(d) : d;
        }
      else
        for (var e in a) {
          d = a[e];
          b[e] = typeof d === 'object' && d !== null ? g(d) : d;
        }
      return b;
    }
    f['default'] = a;
  },
  66
);
__d(
  'requireDeferred',
  ['RequireDeferredReference'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = {};
    function i(a, b) {
      h[a] = b;
    }
    function j(a) {
      return h[a];
    }
    function a(a) {
      var b = j(a);
      if (b) return b;
      b = new (c('RequireDeferredReference'))(a);
      i(a, b);
      return b;
    }
    g['default'] = a;
  },
  98
);
__d(
  'BigPipe',
  [
    '$',
    'Arbiter',
    'BigPipeExperiments',
    'BigPipeInstance',
    'BigPipePlugins',
    'Bootloader',
    'ErrorUtils',
    'FBLogger',
    'HasteResponse',
    'JSCC',
    'PageEvents',
    'PageletEventConstsJS',
    'PageletSet',
    'RunBlue',
    'ServerJS',
    'TimeSlice',
    'UserTimingUtils',
    'captureUsageSnapshot',
    'clearTimeout',
    'createTrustedFunction',
    'createTrustedScriptWithoutValidation_DO_NOT_USE',
    'fastDeepCopy',
    'ge',
    'gkx',
    'performanceAbsoluteNow',
    'requireDeferred',
    'setTimeout',
  ],
  function (a, b, c, d, e, f, g) {
    a.__bigPipeFactory = c('performanceAbsoluteNow')();
    var h = document.documentMode || +(/MSIE.(\d+)/.exec(navigator.userAgent) || [])[1],
      i = console.timeStamp && window.location.search.indexOf('pagelet_ts=1') > 0;
    function j(a, b) {
      d('UserTimingUtils').measureStart(a + ' ' + b);
    }
    function k(a, b, c) {
      d('UserTimingUtils').measureEnd('\u26cf ' + a + ' [' + b + '][phase ' + c + ']', a + ' ' + b);
    }
    function l(a, b) {
      if (a) for (var d = 0; d < a.length; d++) c('ErrorUtils').applyWithGuard(c('createTrustedFunction')(c('createTrustedScriptWithoutValidation_DO_NOT_USE')(a[d])), b);
    }
    var m = 1;
    b = (function () {
      function a(b) {
        var e = this;
        this._onDisplayDone = function (a) {
          e.arbiter.registerCallback(a, ['display_done']);
        };
        Object.assign(
          this,
          {
            arbiter: c('Arbiter'),
            rootNodeID: 'content',
            lid: null,
            isAjax: !1,
            domContentCallback: d('RunBlue').__domContentCallback,
            onloadCallback: d('RunBlue').__onloadCallback,
            domContentEvt: c('PageEvents').BIGPIPE_DOMREADY,
            onloadEvt: c('PageEvents').BIGPIPE_ONLOAD,
            forceFinish: !1,
            config: {},
            _currentPhase: 0,
            _lastPhaseOfLastResponse: -1,
            _lastPhaseBeforeLastResponse: -1,
            _livePagelets: {},
            _phases: {},
            _orderedPhases: [],
            _maxPhase: 0,
            _displayDoneFired: !1,
            _displayDone: !1,
            _awaitingLIDEventQueue: [],
          },
          b
        );
        this.config || (this.config = {});
        this.automatic ? (this._relevant_instance = d('BigPipeInstance').getCurrentInstance()) : d('BigPipeInstance').setCurrentInstance_DO_NOT_USE(this);
        this._serverJS = new (c('ServerJS'))();
        this._informEventExternal(a.Events.init, { arbiter: this.arbiter }, c('Arbiter'));
        this._displayDoneCallback = this.arbiter.registerCallback(
          function () {
            var b = c('captureUsageSnapshot')();
            e._informEventExternal(a.Events.displayed, { rid: e.rid, ajax: e.isAjax, usageSnapshot: b });
          },
          ['display_done']
        );
        b = ['pagelet_displayed_all'];
        this.config.extra_dom_content_event != null && b.push(this.config.extra_dom_content_event);
        this.arbiter.registerCallback(this.domContentCallback, b);
        this._beginPhase(0);
        this.arbiter.registerCallback(this.onloadCallback, ['bigpipe_e2e_reported']);
        this._loadedCallback = this.arbiter.registerCallback(
          function () {
            e._informEventExternal(a.Events.loaded, { rid: e.rid, ajax: e.isAjax }), e.arbiter.inform('bigpipe_e2e_reported', !0);
          },
          ['pagelet_displayed_all']
        );
        this.arbiter.registerCallback(
          function () {
            return e._serverJS.cleanup(c('TimeSlice'));
          },
          [this.onloadEvt, 'bigpipe_e2e_reported']
        );
      }
      var b = a.prototype;
      b._beginPhase = function (a) {
        var b = this._getOrCreatePhase(a);
        b.begun = !0;
        this._informEventExternal('phase_begin', { phase: a });
        this.arbiter.inform('phase_begin_' + a, !0, 'state');
      };
      b._getOrCreatePhase = function (a) {
        if (this._phases[a]) return this._phases[a];
        var b = { pagelets: [], begun: !1, complete: !1 };
        this._phases[a] = b;
        var c = 0;
        while (c < this._orderedPhases.length) {
          if (a < this._orderedPhases[c]) break;
          c++;
        }
        this._orderedPhases.splice(c, 0, a);
        return b;
      };
      b._tryRenderingNextPhase = function () {
        var a = this._phases[this._currentPhase];
        if (a && a.begun && !a.complete) return;
        for (var a = this._orderedPhases, b = Array.isArray(a), c = 0, a = b ? a : a[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
          var d;
          if (b) {
            if (c >= a.length) break;
            d = a[c++];
          } else {
            c = a.next();
            if (c.done) break;
            d = c.value;
          }
          d = d;
          var e = this._phases[d];
          if (e.begun)
            if (e.complete) continue;
            else return;
          else {
            this._currentPhase = d;
            this._beginPhase(d);
            return;
          }
        }
      };
      b._displayPageletHandler = function (a) {
        this.displayCallback ? this.displayCallback(this._displayPagelet.bind(this, a)) : this._displayPagelet(a);
      };
      b._displayPagelet = function (a) {
        j(a.id, 'display');
        a.displayStarted = !0;
        this._informPageletEvent(c('PageletEventConstsJS').DISPLAY_START, a);
        var b = this._getPagelet(a),
          d = [],
          e = {};
        for (var f in a.content) {
          var g = a.content[f];
          a.append && (f = this._getPageletRootID(a));
          var h = c('ge')(f);
          if (!h || f == null) {
            var i = 'Root element %s is missing for pagelet %s';
            continue;
          }
          f === b.id && b.setRoot(h);
          if (g) {
            if (a.append) p(h, g, d);
            else if (g.nodeType) (h.innerHTML = ''), p(h, g, d);
            else {
              i = n(g);
              h.innerHTML = i;
              e[f] = i;
              d.push(h);
            }
            c('BigPipeExperiments').enable_bigpipe_plugins && c('BigPipePlugins').runPluginOnPagelet(h);
          }
          g = h.getAttribute('data-referrer');
          g || h.setAttribute('data-referrer', f);
        }
        i = null;
        if (a.static_templates) {
          g = c('ge')('static_templates');
          g && ((i = n(a.static_templates)), a.replace_static_templates_if_exists && (i = q(g, i, d)), p(g, i, d));
        }
        this._informPageletDisplayDetails(a.id, a.jsmods, e, i);
        a.displayed = !0;
        if (a.jsmods) {
          h = this._serverJS.handlePartial(a.jsmods, { pagelet: a.id, bigPipeContext: { onDisplayDone: this._onDisplayDone } });
          b.addDestructor(h.cancel.bind(h));
        }
        var l = [];
        d.forEach(function (a) {
          if (typeof a.getElementsByTagName === 'function') {
            a = a.getElementsByTagName('img');
            for (var b = 0; b < a.length; b++) l.push(a[b].src);
          }
        });
        l.length > 0 && this._informEventExternal('images_displayed', { pagelet: a.id, timeslice: c('TimeSlice').getContext() ? c('TimeSlice').getContext().contextID : null, images: l });
        if (c('gkx')('676920')) {
          var m = c('performanceAbsoluteNow')();
          c('requireDeferred')('VisualCompletionGating')
            .__setRef('BigPipe')
            .onReady(function (b) {
              b && b.addElements(a.id, d, m);
            });
        }
        this._informPageletEvent(c('PageletEventConstsJS').DISPLAY_END, a);
        k(a.id, 'display', a.phase);
        this.arbiter.inform(a.id + '_displayed', !0, 'state');
      };
      b._onPhaseDisplayEnd = function (b) {
        var d = this._getOrCreatePhase(b);
        d.complete = !0;
        if (b === this._ttiPhase) {
          d = {};
          var e = c('captureUsageSnapshot')();
          this._informEventExternal(a.Events.tti, { phase: this._ttiPhase, rid: this.rid, ajax: this.isAjax, metrics: d, usageSnapshot: e });
          this.arbiter.inform('tti_pagelet_displayed', !0, 'state');
        }
        this._isRelevant() &&
          (b === this._lastPhaseBeforeLastResponse && this._fireDisplayDone(function () {}),
          b === this._lastPhaseOfLastResponse && (this._displayDoneFired || this._fireDisplayDone(function () {}), this.arbiter.inform('pagelet_displayed_all', !0, 'state')));
        b !== this._lastPhaseOfLastResponse && this._nextPhase();
      };
      b._nextPhase = function () {
        this.config.flush_pagelets_asap
          ? h <= 8
            ? c('setTimeout')(this._tryRenderingNextPhase.bind(this), 20)
            : this._tryRenderingNextPhase()
          : (this._currentPhase++, h <= 8 ? c('setTimeout')(this._beginPhase.bind(this, this._currentPhase), 20) : this._beginPhase(this._currentPhase));
      };
      b._fireDisplayDone = function (a) {
        (this._displayDoneFired = !0), this.arbiter.inform('display_done', !0), (this._displayDone = !0), a(), this.lid != null && k('display_done', this.lid, 'all');
      };
      b._downloadJsForPagelet = function (a) {
        var b = this;
        this._informPageletEvent(c('PageletEventConstsJS').JS_START, a);
        c('Bootloader').loadResources(
          a.allResources || [],
          {
            onAll: function () {
              b._informPageletEvent(c('PageletEventConstsJS').JS_END, a);
              a.requires = a.requires || [];
              (!b.isAjax || a.phase >= 1) && a.requires.push('uipage_onload');
              var d = function () {
                  b._informPageletEvent(c('PageletEventConstsJS').ONLOAD_START, a),
                    b._isRelevantPagelet(a) && l(a.onload),
                    b._informPageletEvent(c('PageletEventConstsJS').ONLOAD_END, a),
                    b.arbiter.inform('pagelet_onload', !0),
                    a.provides && b.arbiter.inform(a.provides, !0, 'state');
                },
                e = function () {
                  b._isRelevantPagelet(a) && l(a.onafterload);
                };
              b.arbiter.registerCallback(d, a.requires);
              b.arbiter.registerCallback(e, [b.onloadEvt]);
            },
          },
          a.id
        );
      };
      b._getPagelet = function (a) {
        a = this._getPageletRootID(a);
        return d('PageletSet').getPagelet(a);
      };
      b._getPageletRootID = function (a) {
        return a.append || Object.keys(a.content)[0] || null;
      };
      b._isRelevant = function () {
        var a = d('BigPipeInstance').getCurrentInstance();
        return this == a || (this.automatic && this._relevant_instance == a) || this.jsNonBlock || this.forceFinish || (a && a.allowIrrelevantRequests);
      };
      b._isRelevantPagelet = function (a) {
        if (!this._isRelevant()) return !1;
        a = this._getPageletRootID(a);
        return !!this._livePagelets[a];
      };
      b._informEventExternal = function (a, b, d) {
        (b = b || {}),
          (d = d || this.arbiter),
          b.ts || (b.ts = c('performanceAbsoluteNow')()),
          i && console.timeStamp && console.timeStamp(a + ' ' + (Object.prototype.hasOwnProperty.call(b, 'arbiter') ? JSON.stringify(babelHelpers['extends']({}, b, { arbiter: null })) : JSON.stringify(b))),
          this.lid === null ? this._awaitingLIDEventQueue.push([d, a, b]) : ((b.lid = this.lid), d.inform(a, b, 'persistent'));
      };
      b._informPageletEvent = function (a, b, c) {
        a = { event: a, id: b.id, ts: c };
        b.phase && (a.phase = b.phase);
        b.categories && (a.categories = b.categories);
        b.allResources && (a.allResources = b.allResources);
        b.displayResources && (a.displayResources = b.displayResources);
        this._informEventExternal('pagelet_event', a);
      };
      b._informPageletDisplayDetails = function (a, b, d, e) {
        if (this.config.dispatch_pagelet_replayable_actions)
          try {
            this._informEventExternal('pagelet_performing_replayable_actions', { id: a, jsmods: c('fastDeepCopy')(b), contentMap: d, staticTemplates: e });
          } catch (a) {
            c('FBLogger')('bigpipe_pagelet_replay').catching(a).warn('failed at _informPageletDisplayDetails'), this._informEventExternal('pagelet_performing_replayable_actions_failed', {});
          }
      };
      a.getCurrentInstance = function () {
        return d('BigPipeInstance').getCurrentInstance();
      };
      return a;
    })();
    Object.assign(b.prototype, {
      beforePageletArrive: function (a, b) {
        var d = this;
        c('TimeSlice').guard(
          function () {
            return d._informPageletEvent(c('PageletEventConstsJS').ARRIVE_START, { id: a }, b);
          },
          'beforePageletArrive ' + a,
          { root: !0 }
        )();
      },
      setPageID: function (a) {
        (this.lid = a),
          this._awaitingLIDEventQueue.forEach(function (b) {
            var c = b[0],
              d = b[1];
            b = b[2];
            b.lid = a;
            c.inform(d, b, 'persistent');
          }),
          (this._awaitingLIDEventQueue = []),
          this.lid && j('display_done', this.lid);
      },
      onPageletArrive: c('ErrorUtils').guard(function (a) {
        var b,
          e = this;
        this._informPageletEvent(c('PageletEventConstsJS').ARRIVE_END, a);
        d('HasteResponse').handleSRPayload((b = a.hsrp) != null ? b : {});
        a.content = a.content || {};
        var f = a.phase;
        if (a.all_phases)
          for (var b = a.all_phases, g = Array.isArray(b), h = 0, b = g ? b : b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'](); ; ) {
            var i;
            if (g) {
              if (h >= b.length) break;
              i = b[h++];
            } else {
              h = b.next();
              if (h.done) break;
              i = h.value;
            }
            i = i;
            this._getOrCreatePhase(i);
          }
        i = this._getOrCreatePhase(f);
        i.pagelets.push(a.id);
        this._maxPhase = Math.max(f, this._maxPhase);
        a.last_in_phase &&
          this.arbiter.registerCallback(
            function () {
              return e._onPhaseDisplayEnd(f);
            },
            i.pagelets
              .map(function (a) {
                return a + '_displayed';
              })
              .concat(['phase_begin_' + f])
          );
        h = this._getPageletRootID(a);
        var j = d('PageletSet').getOrCreatePagelet(h);
        a.last_pagelet && (this._lastPhaseBeforeLastResponse = this._maxPhase);
        a.the_end && (this._lastPhaseOfLastResponse = f);
        a.tti_phase !== void 0 && (this._ttiPhase = a.tti_phase);
        this._livePagelets[j.id] = !0;
        j.addDestructor(function () {
          delete e._livePagelets[j.id];
        });
        if (a.jscc_map != null && a.jscc_map !== '') {
          g = d('JSCC').parse(a.jscc_map);
          b = d('JSCC').init(g);
          j.addDestructor(b);
        }
        var k,
          l = [];
        if (a.jsmods) {
          i = a.jsmods.define;
          h = a.jsmods.instances;
          g = a.jsmods.markup;
          b = a.jsmods.pre_display_requires;
          delete a.jsmods.define;
          delete a.jsmods.instances;
          delete a.jsmods.markup;
          delete a.jsmods.pre_display_requires;
          var n = 19e3;
          n = function () {
            if (a.displayStarted === !0) {
              c('FBLogger')('BigPipe').warn('registerToBlockDisplayUntilDone_DONOTUSE called after pagelet %s was displayed. This is a no-op.', a.id);
              return function () {};
            }
            var b,
              d,
              f = m + '_preDisplayEvent';
            m++;
            k ? e.arbiter.registerCallback(k, [f]) : l.push(f);
            return c('TimeSlice').guard(
              function () {
                (d = !0), c('clearTimeout')(b), e.arbiter.inform(f, !0, 'state');
              },
              'BigPipeDisplayBlockingEvent ' + f,
              { propagationType: c('TimeSlice').PropagationType.EXECUTION }
            );
          };
          this._informPageletDisplayDetails(a.id, { define: i, instances: h, markup: g, pre_display_requires: b }, {});
          this._serverJS.handlePartial({ define: i, instances: h, markup: g, pre_display_requires: b }, { pagelet: a.id, bigPipeContext: { onDisplayDone: this._onDisplayDone, registerToBlockDisplayUntilDone_DONOTUSE: n } });
        }
        this.arbiter.registerCallback(this._loadedCallback, ['pagelet_onload']);
        this._informPageletEvent(c('PageletEventConstsJS').SETUP, a);
        if (a.display_out_of_phase === 'asap') l = l.concat(['first_response_displayed', a.id + '_css_end']);
        else if (a.display_out_of_phase === 'after_tti') {
          var o = a.id + '_greedy_render';
          l = l.concat(['first_response_displayed', a.id + '_css_end', o]);
          var p = !1;
          i = function () {
            if (p) return;
            e.arbiter.inform(o, !0, 'state');
          };
          this.arbiter.registerCallback(i, ['tti_pagelet_displayed']);
          this.arbiter.registerCallback(i, ['phase_begin_' + f]);
        } else l = l.concat(['phase_begin_' + a.phase, a.id + '_css_end']);
        (a.display_dependency || []).forEach(function (a) {
          return l.push(a + '_displayed');
        });
        if (a.display_group) {
          h = document.body.getElementsByClassName('pagelet-group');
          for (var g = 0; g < h.length; g++) {
            b = h[g];
            if (b.id === a.id) break;
            b.getAttribute('data-display-group') === a.display_group && l.push(b.id + '_displayed');
          }
        }
        k = this.arbiter.registerCallback(function () {
          a.display_delay_ms === void 0
            ? e._displayPageletHandler(a)
            : c('setTimeout')(function () {
                return e._displayPageletHandler(a);
              }, a.display_delay_ms);
        }, l);
        var q = !1;
        n = function () {
          if (q) return;
          q = !0;
          e._informPageletEvent(c('PageletEventConstsJS').CSS_START, a);
          var b = a.displayResources || [];
          c('Bootloader').loadResources(
            b,
            {
              onAll: function () {
                e._informPageletEvent(c('PageletEventConstsJS').CSS_END, a), e.arbiter.inform(a.id + '_css_end', !0, 'state');
              },
            },
            a.id
          );
        };
        this.config.flush_pagelets_asap ? n() : this.arbiter.registerCallback(n, ['phase_begin_' + f]);
        i = [a.id + '_displayed'];
        this.jsNonBlock || i.push(this.domContentEvt);
        this.arbiter.registerCallback(this._downloadJsForPagelet.bind(this, a), i);
      }, 'BigPipe#onPageletArrive'),
    });
    b.Events = d('BigPipeInstance').Events;
    function n(a) {
      if (!a || typeof a === 'string') return a;
      if (a.container_id) {
        var b = c('$')(a.container_id);
        a = o(b) || '';
        b.parentNode.removeChild(b);
        return a;
      }
      a.nodeType;
      return null;
    }
    function o(a) {
      if (!a.firstChild) return null;
      if (a.firstChild.nodeType !== 8) return null;
      a = a.firstChild.nodeValue;
      a = a.substring(1, a.length - 1);
      return a.replace(/\\([\s\S]|$)/g, '$1');
    }
    function p(a, b, c) {
      b = r(b);
      for (var d = 0; d < b.childNodes.length; d++) c.push(b.childNodes[d]);
      a.appendChild(b);
    }
    function q(a, b, c) {
      b = r(b);
      var d = document.createDocumentFragment(),
        e = b.childNodes.length;
      for (var f = 0; f < e; f++) {
        var g = b.firstChild,
          h = g.id && document.getElementById(g.id),
          i = h && h.parentNode;
        i === a ? (i.replaceChild(g, h), c.push(g)) : d.appendChild(g);
      }
      return d;
    }
    function r(a) {
      if (a.nodeType) return a;
      var b = document.createDocumentFragment();
      a = n(a);
      if (a) {
        var c = document.createElement('div');
        c.innerHTML = a;
        while (c.firstChild) b.appendChild(c.firstChild);
      }
      return b;
    }
    e = b;
    g['default'] = e;
  },
  98
);
__d(
  'DeadImage',
  [],
  function (a, b, c, d, e, f) {
    window.addEventListener(
      'error',
      function (a) {
        a.target && a.target.nodeName == 'IMG' && (a.target.src = 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
      },
      !0
    );
  },
  null
);
__d(
  'createTrustedHTMLWithoutValidation_DO_NOT_USE',
  ['TrustedTypesWithNoDefaultPolicies'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    b = function (a) {
      return a;
    };
    var h = 'untrusted-html',
      i,
      j = {
        createHTML: function (a) {
          return a;
        },
        createScriptURL: b,
        createScript: b,
      };
    function k() {
      if (i) return;
      i = c('TrustedTypesWithNoDefaultPolicies').createPolicy(h, j);
    }
    function l() {
      i || k();
      return i;
    }
    function a(a) {
      return l().createHTML(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'createTrustedHTMLForLinkTag',
  ['TrustedTypesWithNoDefaultPolicies', 'err'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    b = function (a) {
      return a;
    };
    var h = 'link-tag-html',
      i,
      j = {
        createHTML: function (a) {
          if (a === '<link />') return a;
          throw c('err')("Violating Trusted Type policies. Only works for '<link />' strings.");
        },
        createScriptURL: b,
        createScript: b,
      };
    function k() {
      if (i) return;
      i = c('TrustedTypesWithNoDefaultPolicies').createPolicy(h, j);
    }
    function l() {
      i || k();
      return i;
    }
    function a(a) {
      return l().createHTML(a);
    }
    g['default'] = a;
  },
  98
);
__d(
  'getMarkupWrap',
  ['invariant', 'ExecutionEnvironment', 'createTrustedHTMLForLinkTag'],
  function (a, b, c, d, e, f, g, h) {
    var i = d('ExecutionEnvironment').canUseDOM ? document.createElement('div') : null,
      j = {};
    b = [1, '<select multiple="true">', '</select>'];
    e = [1, '<table>', '</table>'];
    f = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
    var k = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'],
      l = {
        '*': [1, '?<div>', '</div>'],
        area: [1, '<map>', '</map>'],
        col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
        legend: [1, '<fieldset>', '</fieldset>'],
        param: [1, '<object>', '</object>'],
        tr: [2, '<table><tbody>', '</tbody></table>'],
        optgroup: b,
        option: b,
        caption: e,
        colgroup: e,
        tbody: e,
        tfoot: e,
        thead: e,
        td: f,
        th: f,
      };
    d = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
    d.forEach(function (a) {
      (l[a] = k), (j[a] = !0);
    });
    function a(a) {
      a = a;
      !i && h(0, 144);
      Object.prototype.hasOwnProperty.call(l, a) || (a = '*');
      Object.prototype.hasOwnProperty.call(j, a) || (a === '*' ? (i.innerHTML = c('createTrustedHTMLForLinkTag')('<link />')) : (i.innerHTML = '<' + a + '></' + a + '>'), (j[a] = !i.firstChild));
      return j[a] ? l[a] : null;
    }
    g['default'] = a;
  },
  98
);
__d(
  'createNodesFromMarkup',
  ['invariant', 'ExecutionEnvironment', 'createTrustedHTMLWithoutValidation_DO_NOT_USE', 'getMarkupWrap'],
  function (a, b, c, d, e, f, g, h) {
    var i = d('ExecutionEnvironment').canUseDOM ? document.createElement('div') : null,
      j = /^\s*<(\w+)/;
    function k(a) {
      a = a.match(j);
      return a && a[1].toLowerCase();
    }
    function a(a, b) {
      var d = i;
      !i && h(0, 5001);
      var e = k(a);
      e = e && c('getMarkupWrap')(e);
      if (e) {
        d.innerHTML = e[1] + a + e[2];
        e = e[0];
        while (e--) d = d.lastChild;
      } else d.innerHTML = c('createTrustedHTMLWithoutValidation_DO_NOT_USE')(a);
      e = d.getElementsByTagName('script');
      e.length && (b || h(0, 5002), Array.from(e).forEach(b));
      a = Array.from(d.childNodes);
      while (d.lastChild) d.removeChild(d.lastChild);
      return a;
    }
    g['default'] = a;
  },
  98
);
__d(
  'HTML',
  ['createNodesFromMarkup'],
  function (a, b, c, d, e, f, g) {
    a = (function () {
      function a(a) {
        var b = this;
        this.getFragment = function () {
          var a = document.createDocumentFragment(),
            d = c('createNodesFromMarkup')(b.$1);
          for (var e = 0; e < d.length; e++) a.appendChild(d[e]);
          return a;
        };
        typeof a.__html === 'string' && (a = a.__html);
        this.$1 = a;
      }
      var b = a.prototype;
      b.getRootNode = function () {
        var a = this.getFragment();
        if (a.childNodes.length === 1) return a.firstChild;
        else return a;
      };
      a.isHTML = function (b) {
        return !!b && (b instanceof a || b.__html !== void 0);
      };
      a.replaceJSONWrapper = function (b) {
        return b && b.__html !== void 0 ? new a(b.__html) : b;
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'IntervalTrackingBoundedBuffer',
  ['CircularBuffer', 'ErrorPubSub'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h = 5e3;
    a = (function () {
      function a(a) {
        var b = this;
        this.$6 = 0;
        if (a != null) {
          if (a <= 0) throw new Error('Size for a buffer must be greater than zero.');
        } else a = h;
        this.$4 = a;
        this.$1 = new (c('CircularBuffer'))(a);
        this.$1.onEvict(function () {
          b.$6++;
        });
        this.$2 = [];
        this.$3 = 1;
        this.$5 = 0;
      }
      var b = a.prototype;
      b.open = function () {
        var a = this,
          b = this.$3++,
          c = !1,
          d,
          e = this.$5,
          f = {
            id: b,
            startIdx: e,
            hasOverflown: function () {
              return f.getOverflowSize() > 0;
            },
            getOverflowSize: function () {
              return d != null ? d : Math.max(a.$6 - e, 0);
            },
            close: function () {
              if (c) return [];
              else {
                c = !0;
                d = a.$6 - e;
                return a.$7(b);
              }
            },
          };
        this.$2.push(f);
        return f;
      };
      b.pushElement = function (a) {
        this.$2.length > 0 && (this.$1.write(a), this.$5++);
        return this;
      };
      b.isActive = function () {
        return this.$2.length > 0;
      };
      b.$8 = function (a) {
        return Math.max(a - this.$6, 0);
      };
      b.$7 = function (a) {
        var b, d, e, f;
        for (var g = 0; g < this.$2.length; g++) {
          var h = this.$2[g],
            i = h.startIdx;
          h = h.id;
          h === a ? ((e = g), (f = i)) : (d == null || i < d) && (d = i);
          (b == null || i < b) && (b = i);
        }
        if (e == null || b == null || f == null) {
          c('ErrorPubSub').reportError(new Error('messed up state inside IntervalTrackingBoundedBuffer'));
          return [];
        }
        this.$2.splice(e, 1);
        h = this.$8(f);
        i = this.$1.read().slice(h);
        g = this.$8(d == null ? this.$5 : d) - this.$8(b);
        g > 0 && (this.$1.dropFirst(g), (this.$6 += g));
        return i;
      };
      return a;
    })();
    g['default'] = a;
  },
  98
);
__d(
  'WorkerUtils',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function b() {
      try {
        return 'WorkerGlobalScope' in a && a instanceof a.WorkerGlobalScope;
      } catch (a) {
        return !1;
      }
    }
    function c() {
      try {
        return 'SharedWorkerGlobalScope' in a && a instanceof a.SharedWorkerGlobalScope;
      } catch (a) {
        return !1;
      }
    }
    function d() {
      return 'SharedWorker' in a && typeof a.SharedWorker === 'function';
    }
    f.isWorkerContext = b;
    f.isSharedWorkerContext = c;
    f.isSharedWorkerSupported = d;
  },
  66
);
__d(
  'getReusableTimeSliceContinuation',
  [],
  function (a, b, c, d, e, f) {
    'use strict';
    function a(a, b, c) {
      var d = !1,
        e = a.getGuardedContinuation(c),
        f = function (b) {
          e(function () {
            d || (e = a.getGuardedContinuation(c)), b();
          });
        };
      f.last = function (a) {
        var b = e;
        g();
        b(a);
      };
      f[b] = {};
      function g() {
        (d = !0),
          (e = function (a) {
            a();
          });
      }
      return f;
    }
    f['default'] = a;
  },
  66
);
__d(
  'wrapFunction',
  [],
  function (a, b, c, d, e, f) {
    var g = {};
    function a(a, b, c) {
      var d = b in g ? g[b](a, c) : a;
      return function () {
        for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];
        return d.apply(this, b);
      };
    }
    a.setWrapper = function (a, b) {
      g[b] = a;
    };
    f['default'] = a;
  },
  66
);
__d(
  'TimeSliceImpl',
  ['invariant', 'Env', 'ErrorGuard', 'FBLogger', 'IntervalTrackingBoundedBuffer', 'WorkerUtils', 'getReusableTimeSliceContinuation', 'performanceAbsoluteNow', 'wrapFunction'],
  function (a, b, c, d, e, f, g) {
    var h,
      i,
      j,
      k,
      l = [],
      m = [],
      n = 'key' + Math.random(),
      o = 1,
      p = !1;
    c = (h || (h = b('Env'))).timesliceBufferSize;
    c == null && (c = 5e3);
    var q = new (b('IntervalTrackingBoundedBuffer'))(c),
      r = [],
      s = [],
      t = [];
    function u() {
      return v(r);
    }
    function v(a) {
      return a.length > 0 ? a[a.length - 1] : null;
    }
    function w(a, c) {
      var d = {};
      (i || (i = b('ErrorGuard'))).applyWithGuard(z, null, [a, c, d]);
      i.applyWithGuard(A, null, [a, c, d]);
      r.push(a);
      s.push(c);
      t.push(d);
    }
    function x(a, b, c) {
      l.forEach(function (d) {
        var e = d.onNewContextCreated(u(), b, c);
        a[d.getBeforeID()] = e;
      });
    }
    function y(a, b, c) {
      m.forEach(function (d) {
        d.onAfterContextEnded(a, b[d.getBeforeID()], c[d.getBeforeID()], a.meta);
      });
    }
    function z(a, b, c) {
      l.forEach(function (d) {
        var e = d.onBeforeContextStarted(a, b[d.getBeforeID()], a.meta);
        c[d.getBeforeID()] = e;
      });
    }
    function A(a, b, c) {
      l.forEach(function (d) {
        var e = d.onAfterContextStarted(a, b[d.getBeforeID()], c[d.getBeforeID()], a.meta);
        c[d.getBeforeID()] = e;
      });
    }
    function B() {
      var a = u(),
        c = v(s),
        d = v(t);
      if (a == null || c == null || d == null) {
        b('FBLogger')('TimeSlice').mustfix('popped too many times off the timeslice stack');
        p = !1;
        return;
      }
      (i || (i = b('ErrorGuard'))).applyWithGuard(y, null, [a, c, d]);
      p = !a.isRoot;
      r.pop();
      s.pop();
      t.pop();
    }
    var C = {
      PropagationType: { CONTINUATION: 0, EXECUTION: 1, ORPHAN: 2 },
      guard: function (a, c, d) {
        var e;
        typeof a === 'function' || g(0, 3725);
        typeof c === 'string' || g(0, 3726);
        var f = D(d);
        if (a[n]) return a;
        var l;
        p && (l = u());
        var m = {},
          r = 0,
          s = void 0;
        e = (e = (h || (h = b('Env'))).deferred_stack_trace_rate) != null ? e : 0;
        d && d.registerCallStack && e > 0 && Math.random() < 1 / e && (s = new Error('deferred execution source'));
        d = function () {
          var d = (j || (j = b('performanceAbsoluteNow')))(),
            e = o++,
            g = { contextID: e, name: c, isRoot: !p, executionNumber: r++, meta: f, absBeginTimeMs: d };
          w(g, m);
          if (l != null) {
            var h = !!f.isContinuation;
            l.isRoot ? ((g.indirectParentID = l.contextID), (g.isEdgeContinuation = h)) : ((g.indirectParentID = l.indirectParentID), (g.isEdgeContinuation = !!(h && l.isEdgeContinuation)));
          }
          var n = (k || (k = b('WorkerUtils'))).isWorkerContext();
          p = !0;
          try {
            for (var t = arguments.length, v = new Array(t), x = 0; x < t; x++) v[x] = arguments[x];
            if (!g.isRoot || n) return a.apply(this, v);
            else return (i || (i = b('ErrorGuard'))).applyWithGuard(a, this, v, { name: 'TimeSlice' + (c ? ': ' + c : ''), deferredSource: s });
          } finally {
            var y = u();
            if (y == null) b('FBLogger')('TimeSlice').mustfix('timeslice stack misaligned, not logging the block'), (p = !1);
            else {
              var z = y.isRoot,
                A = y.contextID,
                C = y.indirectParentID,
                D = y.isEdgeContinuation,
                E = (j || (j = b('performanceAbsoluteNow')))();
              y.absEndTimeMs = E;
              if (z && d != null) {
                var F = babelHelpers['extends']({ begin: d, end: E, id: A, indirectParentID: C, representsExecution: !0, isEdgeContinuation: l && D, guard: c }, f, a.__SMmeta);
                q.pushElement(F);
              }
              B();
            }
          }
        };
        d[n] = {};
        (i || (i = b('ErrorGuard'))).applyWithGuard(x, null, [m, c, f]);
        return d;
      },
      copyGuardForWrapper: function (a, b) {
        a && a[n] && (b[n] = a[n]);
        return b;
      },
      getContext: function () {
        return u();
      },
      getGuardedContinuation: function (a) {
        function b(a) {
          for (var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1; d < b; d++) c[d - 1] = arguments[d];
          return a.apply(this, c);
        }
        return C.guard(b, a, { propagationType: C.PropagationType.CONTINUATION });
      },
      getReusableContinuation: function (a) {
        return b('getReusableTimeSliceContinuation')(C, n, a);
      },
      getPlaceholderReusableContinuation: function () {
        var a = function (a) {
          return a();
        };
        a.last = a;
        return a;
      },
      getGuardNameStack: function () {
        return r.map(function (a) {
          return a.name;
        });
      },
      registerExecutionContextObserver: function (a) {
        var b = !1;
        for (var c = 0; c < l.length; c++)
          if (l[c].getBeforeID() > a.getBeforeID()) {
            l.splice(c, 0, a);
            b = !0;
            break;
          }
        b || l.push(a);
        for (var c = 0; c < m.length; c++)
          if (m[c].getAfterID() > a.getAfterID()) {
            m.splice(c, 0, a);
            return;
          }
        m.push(a);
      },
      catchUpOnDemandExecutionContextObservers: function (a) {
        for (var b = 0; b < r.length; b++) {
          var c = r[b],
            d = s[b],
            e = t[b] || {};
          d = a.onBeforeContextStartedWhileEnabled(c, d[a.getBeforeID()], c.meta);
          e[a.getBeforeID()] = d;
          t[b] = e;
        }
      },
      getBuffer: function () {
        return q;
      },
    };
    function D(a) {
      var b = {};
      a && a.propagateCounterAttribution !== void 0 && (b.propagateCounterAttribution = a.propagateCounterAttribution);
      a && a.root !== void 0 && (b.root = a.root);
      switch (a && a.propagationType) {
        case C.PropagationType.CONTINUATION:
          b.isContinuation = !0;
          b.extendsExecution = !0;
          break;
        case C.PropagationType.ORPHAN:
          b.isContinuation = !1;
          b.extendsExecution = !1;
          break;
        case C.PropagationType.EXECUTION:
        default:
          (b.isContinuation = !1), (b.extendsExecution = !0);
      }
      return b;
    }
    b('wrapFunction').setWrapper(function (a, b) {
      return C.guard(a, b, { registerCallStack: !0 });
    }, 'entry');
    a.TimeSlice = C;
    e.exports = C;
  },
  6
);
__d(
  'nativeRequestAnimationFrame',
  [],
  function (a, b, c, d, e, f) {
    b = a.__fbNativeRequestAnimationFrame || a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame;
    c = b;
    f['default'] = c;
  },
  66
);
__d(
  'requestAnimationFramePolyfill',
  ['nativeRequestAnimationFrame', 'performanceNow'],
  function (a, b, c, d, e, f, g) {
    var h = 0;
    b =
      c('nativeRequestAnimationFrame') ||
      function (b) {
        var d = c('performanceNow')(),
          e = Math.max(0, 16 - (d - h));
        h = d + e;
        return a.setTimeout(function () {
          b(c('performanceNow')());
        }, e);
      };
    d = b;
    g['default'] = d;
  },
  98
);
__d(
  'IdleCallbackImplementation',
  ['performanceNow', 'requestAnimationFramePolyfill'],
  function (a, b, c, d, e, f, g) {
    var h = [],
      i = 0,
      j = 0,
      k = -1,
      l = !1,
      m = 1e3 / 60,
      n = 2;
    function o(a) {
      return a;
    }
    function p(a) {
      return a;
    }
    function b(b, c) {
      var d = j++;
      h[d] = b;
      r();
      if (c != null && c.timeout > 0) {
        var e = o(d);
        a.setTimeout(function () {
          return x(e);
        }, c.timeout);
      }
      return o(d);
    }
    function q(a) {
      a = p(a);
      h[a] = null;
    }
    function r() {
      l ||
        ((l = !0),
        c('requestAnimationFramePolyfill')(function (a) {
          (l = !1), t(c('performanceNow')() - a);
        }));
    }
    function s(a) {
      var b = m - n;
      if (a < b) return b - a;
      a = a % m;
      if (a > b || a < n) return 0;
      else return b - a;
    }
    function t(a) {
      var b = c('performanceNow')();
      if (b > k) {
        a = s(a);
        if (a > 0) {
          b = b + a;
          w(b);
          k = b;
        }
      }
      u() && r();
    }
    function u() {
      return i < h.length;
    }
    function v() {
      while (u()) {
        var a = h[i];
        i++;
        if (a) return a;
      }
      return null;
    }
    function w(a) {
      var b;
      while (c('performanceNow')() < a && (b = v())) b(new y(a));
    }
    function x(a) {
      var b = p(a);
      b = h[b];
      b && (q(a), b(new y(null)));
    }
    var y = (function () {
      function a(a) {
        (this.didTimeout = a == null), (this.$1 = a);
      }
      var b = a.prototype;
      b.timeRemaining = function () {
        var a = this.$1;
        if (a != null) {
          var b = c('performanceNow')();
          if (b < a) return a - b;
        }
        return 0;
      };
      return a;
    })();
    g.requestIdleCallback = b;
    g.cancelIdleCallback = q;
  },
  98
);
__d(
  'cancelIdleCallbackBlue',
  ['IdleCallbackImplementation'],
  function (a, b, c, d, e, f, g) {
    var h = (c = a.cancelIdleCallback) != null ? c : d('IdleCallbackImplementation').cancelIdleCallback;
    function b(a) {
      h(a);
    }
    g['default'] = b;
  },
  98
);
__d(
  'requestIdleCallbackAcrossTransitions',
  ['IdleCallbackImplementation', 'TimeSlice'],
  function (a, b, c, d, e, f, g) {
    var h = a.requestIdleCallback || d('IdleCallbackImplementation').requestIdleCallback;
    function b(b, d) {
      b = c('TimeSlice').guard(b, 'requestIdleCallback', { propagationType: c('TimeSlice').PropagationType.CONTINUATION, registerCallStack: !0 });
      return h.call(a, b, d);
    }
    g['default'] = b;
  },
  98
);
__d(
  'requestIdleCallbackBlue',
  ['TimeSlice', 'TimerStorage', 'requestIdleCallbackAcrossTransitions'],
  function (a, b, c, d, e, f, g) {
    function b(b, d) {
      var e;
      function f(a) {
        c('TimerStorage').unset(c('TimerStorage').IDLE_CALLBACK, e), b(a);
      }
      c('TimeSlice').copyGuardForWrapper(b, f);
      e = c('requestIdleCallbackAcrossTransitions').call(a, f, d);
      c('TimerStorage').set(c('TimerStorage').IDLE_CALLBACK, e);
      return e;
    }
    g['default'] = b;
  },
  98
);
__d(
  'MPrelude',
  ['BigPipe', 'Bootloader', 'DeadImage', 'ErrorUtils', 'FBLogger', 'HTML', 'StratcomManager', 'TimeSlice', 'TimeSliceImpl', 'cancelIdleCallbackBlue', 'requestIdleCallbackBlue', 'setTimeout'],
  function (a, b, c, d, e, f) {
    var g;
    b('Bootloader');
    b('cancelIdleCallbackBlue');
    b('requestIdleCallbackBlue');
    b('HTML');
    b('TimeSliceImpl');
    b('FBLogger');
    g || (g = b('ErrorUtils'));
    b('setTimeout');
    b('DeadImage');
    b('StratcomManager');
    b('TimeSlice');
    b('BigPipe');
  },
  null
);
