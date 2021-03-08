// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"my_module_of_func.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.my_module = void 0;

var _index = require("./index.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Module qui contient toutes les fonctions utilent aux fonctionnement du projet
 */
var my_module = {
  /**
   * Function for moved the cursor
   * @param {string} ligne_i represent ligne in table
   * @param {number} teteDeLecture position of head of read
   */
  move_cursor: function move_cursor(ligne_i, teteDeLecture) {
    if (ligne_i.indexOf("d") != -1) {
      _index.v.value = Number(teteDeLecture) + 1;
      this.color(_index.v.value, _toConsumableArray((0, _index.$$)("#ruban input[type='text']")));
    } else if (ligne_i.indexOf("g") != -1) {
      _index.v.value = Number(teteDeLecture) - 1;
      this.color(_index.v.value, _toConsumableArray((0, _index.$$)("#ruban input[type='text']")));
    }
  },

  /** Change the state
   * @param {string} ligne element of array qui contient les cases qui sont cochés dans la table principal ex: 'A0B'
   * @returns {void}
   */
  change_state: function change_state(ligne) {
    for (var i = 0; i < _index.etats.length; i++) {
      if (ligne.endsWith(_index.etats[i]) && _index.etats[i] !== "FINAL") {
        _index.state_start.value = _index.etats[i];
      } else if (ligne.endsWith(_index.etats[i]) && _index.etats[i] === "FINAL") {
        this.finish();
        _index.state_start.value = "FINAL";
      }
    }
  },

  /**
   * Function when program is over (end of the timer)
   */
  finish: function finish() {
    window.alert("Fin du programme");
    clearInterval(_index.timer);
  },

  /**
   * Paint checkbox when user click for programming machine
  //  *@param {HTMLelement-(input)} checkbox input type checkbox
  //  */
  color_check: function color_check(checkbox) {
    checkbox.className === "check color_check" ? checkbox.classList.remove("color_check") : checkbox.classList.add("color_check");
  },

  /** Fonction qui gère la colorisation des cases de façon synchrone avec la marche du simulateur
   * @param {number} index index qui permet la sélection des cases pour les colorer chacunes leurs tour
   * @returns {void}
   */
  color: function color(index, array) {
    // on boucle sur toutes les cases du ruban pour leur enlever la class color
    array.forEach(function (case_ruban) {
      case_ruban.classList.remove("color");
    }); // color case with good index

    var case_ruban_add_color = document.getElementById("".concat(index));
    case_ruban_add_color.classList.add("color");
  },
  analyse_ligne: function analyse_ligne(tabCelluleRuban, etatStart, index, filterTabIdCheck, teteDeLecture, array) {
    if (tabCelluleRuban[index] == array[0]) {
      //instruction uniquement la ligne quand on rencontre un blanc (filtrage)
      var ligne = filterTabIdCheck.filter(function (el) {
        return el.startsWith(etatStart + array[0]);
      }); // on boucle sur cette ligne

      for (var i = 0; i < ligne.length; i++) {
        //faut il ecraser et réecrire une valeur sur cette case ??
        if (ligne[i].includes(array[1])) {
          console.log(ligne);
          document.getElementById("".concat(teteDeLecture)).value = "";
        } else if (ligne[i].includes(array[2])) {
          document.getElementById("".concat(teteDeLecture)).value = 1;
        } else if (ligne[i].includes(array[3])) {
          document.getElementById("".concat(teteDeLecture)).value = 0;
        } // Mouvement tête de lecture


        this.move_cursor(ligne[i], teteDeLecture); // faut -il changer d'état?

        this.change_state(ligne[i]);
      }
    }
  },
  execute_range: function execute_range(el, array, ligne, head) {
    array.forEach(function (l) {
      ligne = _index.tableProg.insertRow(-1);
      ligne.id = el + l;
      head.forEach(function (c, i) {
        ligne.insertCell().innerHTML = i == 0 ? el : i == 1 ? l : "<input class=\"check\" type=\"checkbox\" id= ".concat(el + l + c, ">");
      });
    });
  }
};
exports.my_module = my_module;
},{"./index.js":"index.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timer = exports.v = exports.etats = exports.state_start = exports.tableProg = exports.$$ = void 0;

var _my_module_of_func = require("./my_module_of_func.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// utilitary
var $ = function $(id) {
  return document.querySelector(id);
};

var $$ = function $$(id) {
  return document.querySelectorAll(id);
}; //


exports.$$ = $$;
var tableProg = $("#table-prog");
exports.tableProg = tableProg;
var ruban = $("#ruban");
var state_start = $("#etat"); //state possible in machine

exports.state_start = state_start;
var etats = ["A", "B", "C", "D", "FINAL"];
exports.etats = etats;
var ecriture = ["b", "0", "1"];
var directions = ["g", "d"];
var head = ["état", "statut"].concat(ecriture, directions, etats);
var dataRuban = Array(21).fill(0); //init state 'A' in beginning

state_start.value = 'A';
var playButton = $("#play").addEventListener("click", turing);
var positionTeteLecture = $("#positionLect");
var v = $("#positionLect");
exports.v = v;
var autoPlay = $("#auto").addEventListener("click", function () {
  exports.timer = timer = setInterval(turing, 2000);
});
var reload_button = $("#re_start").addEventListener("click", function () {
  return window.location.assign("index.html");
}); // make table et ribbon----

var ligne = tableProg.insertRow(0);
var headRuban = ruban.insertRow(0);
var titreRub = ruban.insertRow(1);
var timer;
exports.timer = timer;
head.forEach(function (el) {
  return ligne.insertCell().innerHTML = el;
});
[].concat(etats).forEach(function (el) {
  if (el !== "FINAL") {
    _my_module_of_func.my_module.execute_range(el, [].concat(ecriture), ligne, head);
  }
}); // create ribbon

dataRuban.forEach(function (el, index) {
  return headRuban.insertCell().innerHTML = "<input type='text' id=".concat(index - 10, "  size=1>");
}); //re...

dataRuban.forEach(function (el, index) {
  return titreRub.insertCell().innerHTML = "  ".concat(index - 10);
}); //init color in beginning

_my_module_of_func.my_module.color(positionTeteLecture.value, _toConsumableArray($$("#ruban input[type='text']"))); //------------------------------------/ Master function /--------------------------------------


function turing() {
  // on récupère les infos des inputs etat de départ et position de tete de lecture
  var teteDeLecture = positionTeteLecture.value;
  var etatStart = state_start.value; // on récupères toutes les checkbox qui sont dans l'état checked et on en fait un array/

  var tab = _toConsumableArray($$("#table-prog input[type='checkbox']"));

  var tabIdCheck = [];
  tab.forEach(function (el) {
    el.checked ? tabIdCheck.push(el.id) : null;
  }); //
  // making array with input ribbon

  var tab2 = _toConsumableArray($$("#ruban input[type='text']"));

  var tabCelluleRuban = [];
  tab2.forEach(function (element, index) {
    var cel = element.value ? "".concat(element.value) : "b";
    tabCelluleRuban.push(cel);
  }); // filter the checkboxes results that are checked which correspond to the starting state

  var filterTabIdCheck = tabIdCheck.filter(function (el) {
    return el.startsWith(etatStart);
  });
  var index = 10 + Number(teteDeLecture); // analyse ligne 

  _my_module_of_func.my_module.analyse_ligne(tabCelluleRuban, etatStart, index, filterTabIdCheck, teteDeLecture, ["b", "bb", "1", "0"]);

  _my_module_of_func.my_module.analyse_ligne(tabCelluleRuban, etatStart, index, filterTabIdCheck, teteDeLecture, ["0", "0b", "01", "00"]);

  _my_module_of_func.my_module.analyse_ligne(tabCelluleRuban, etatStart, index, filterTabIdCheck, teteDeLecture, ["1", "1b", "11", "10"]);
}

_toConsumableArray($$("#table-prog input[type='checkbox']")).forEach(function (checkbox) {
  checkbox.addEventListener("click", function () {
    return _my_module_of_func.my_module.color_check(checkbox);
  });
});
},{"./my_module_of_func.js":"my_module_of_func.js"}],"C:/Users/TOSHIBA/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64171" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/TOSHIBA/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Emulateur%20de%20la%20Machine%20de%20TURING%20(all_refacto)%20-no%20bundlé%20multi-state%20ok.e31bb0bc.js.map