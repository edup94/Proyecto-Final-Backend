"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// declare a new router to include all the endpoints
var router = express_1.Router();
//middleware/token
var verifyToken = function (req, res, next) {
    var _a;
    //headers con el token
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token)
        return res.status(400).json('ACCESS DENIED');
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
        req.user = decoded;
        // console.log(decoded + "verified token");
        next();
    }
    catch (_b) {
        return res.status(400).json('ACCESS DENIED');
    }
};
router.get('/user', verifyToken, utils_1.safe(actions.getUsers));
router.put('/user/:id', verifyToken, utils_1.safe(actions.updateUser));
router["delete"]('/user/:id', verifyToken, utils_1.safe(actions.deleteUser));
router.post('/local', verifyToken, utils_1.safe(actions.createLocal));
router.get('/local', verifyToken, utils_1.safe(actions.getLocal));
router.get('/local/:id', verifyToken, utils_1.safe(actions.getLocalById));
router.put('/local/:id', verifyToken, utils_1.safe(actions.updateLocal));
router["delete"]('/local/:id', verifyToken, utils_1.safe(actions.deleteLocal));
router.post('/localFav/:userid/:localid', verifyToken, utils_1.safe(actions.addLocalFav));
router.get('/localFav', verifyToken, utils_1.safe(actions.getLocalFav));
router["delete"]('/localFav/:favid', utils_1.safe(actions.deleteLocalFav));
router.post('/post', verifyToken, utils_1.safe(actions.createPost));
router.get('/post', verifyToken, utils_1.safe(actions.getPost));
router.get('/post/:id', verifyToken, utils_1.safe(actions.getPost));
router["delete"]('/post/:id', verifyToken, utils_1.safe(actions.deletePost));
exports["default"] = router;
