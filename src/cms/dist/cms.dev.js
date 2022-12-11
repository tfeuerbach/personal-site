"use strict";

var _netlifyCmsApp = _interopRequireDefault(require("netlify-cms-app"));

var _PostTemplate = _interopRequireDefault(require("./templates/PostTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_netlifyCmsApp["default"].registerPreviewTemplate('posts', _PostTemplate["default"]);