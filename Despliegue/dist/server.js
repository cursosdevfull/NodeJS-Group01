"use strict";var __awaiter=this&&this.__awaiter||function(e,t,r,i){return new(r||(r=Promise))((function(a,o){function c(e){try{_(i.next(e))}catch(e){o(e)}}function s(e){try{_(i.throw(e))}catch(e){o(e)}}function _(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,s)}_((i=i.apply(e,t||[])).next())}))},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const app_1=__importDefault(require("./app")),server_service_1=__importDefault(require("./services/server.service")),database_service_1=__importDefault(require("./services/database.service")),start=()=>__awaiter(void 0,void 0,void 0,(function*(){try{yield server_service_1.default(app_1.default),yield database_service_1.default()}catch(e){console.log("An exception ocurred: "+e),process.exit(1)}}));__awaiter(void 0,void 0,void 0,(function*(){try{yield server_service_1.default(app_1.default),yield database_service_1.default()}catch(e){console.log("An exception ocurred: "+e),process.exit(1)}}));