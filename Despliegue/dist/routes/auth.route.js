"use strict";var __importDefault=this&&this.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.router=void 0;const express_1=require("express"),auth_repository_1=require("../repositories/auth.repository"),auth_controller_1=require("../controllers/auth.controller"),error_handler_1=__importDefault(require("../handlers/error.handler")),router=express_1.Router();exports.router=router;const authRepository=new auth_repository_1.AuthRepository,authController=new auth_controller_1.AuthController(authRepository);router.post("/login",error_handler_1.default.catchAsync(authController.login)),router.post("/generate-new-access-token",error_handler_1.default.catchAsync(authController.newAccessToken));