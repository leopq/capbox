"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ip = _interopRequireDefault(require("ip"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _log = _interopRequireDefault(require("../../../utils/log"));

require('colors');

var exec = _shelljs.default.exec;

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      rootPath = _ref.rootPath;

  return new Promise( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
      var capacitorConfigFile, capacitorConfigContent, isLivereload, LIVERELOAD_IP, LIVERELOAD_PORT, LIVERELOAD_SERVER;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              capacitorConfigFile = _path.default.join(rootPath, 'capacitor.config.json');
              /* eslint-disable-next-line */

              capacitorConfigContent = require(capacitorConfigFile);
              isLivereload = process.env.CAPBOX_LIVERELOAD;

              if (isLivereload) {
                LIVERELOAD_IP = _ip.default.address();
                LIVERELOAD_PORT = process.env.PORT;
                LIVERELOAD_SERVER = "http://".concat(LIVERELOAD_IP, ":").concat(LIVERELOAD_PORT);
                capacitorConfigContent.server = {
                  url: LIVERELOAD_SERVER
                };
              }

              _fsExtra.default.writeFileSync(capacitorConfigFile, JSON.stringify(capacitorConfigContent, null, 2));

              _log.default.header("Generating capacitor config....".yellow);

              _context.next = 9;
              return exec('npx @capacitor/cli sync', {
                cwd: rootPath
              });

            case 9:
              _log.default.success('Capacitor build updated successfully!'.green);

              resolve();
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.default = _default;