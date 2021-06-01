"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createPerfil = exports.deleteLocalFav = exports.addLocalFav = exports.login = exports.deleteLocal = exports.getLocalById = exports.getLocal = exports.createLocal = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Usuario_1 = require("./entities/Usuario");
var utils_1 = require("./utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Local_1 = require("./entities/Local");
var Perfil_1 = require("./entities/Perfil");
//crear usuario
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.username)
                    throw new utils_1.Exception("Por favor ingrese un username");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Por favor ingrese un nombre");
                if (!req.body.apellido)
                    throw new utils_1.Exception("Por favor ingrese un apellido");
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor ingrese un email");
                if (!req.body.contrasena)
                    throw new utils_1.Exception("Por favor ingrese una contrasena");
                if (!req.body.perfil)
                    throw new utils_1.Exception("Por favor ingrese un perfil");
                userRepo = typeorm_1.getRepository(Usuario_1.Usuario);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Ya existe un usuario con este email");
                newUser = typeorm_1.getRepository(Usuario_1.Usuario).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
//buscar todos los usuarios
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
//editar usuario
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                typeorm_1.getRepository(Usuario_1.Usuario).merge(user, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.status(404).json({ msg: "No user found." })];
        }
    });
}); };
exports.updateUser = updateUser;
//borrar usuario
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, users_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne(req.params.id)];
            case 1:
                users = _a.sent();
                if (!!users) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ msg: "This user doesn't exist." })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario)["delete"](req.params.id)];
            case 3:
                users_1 = _a.sent();
                return [2 /*return*/, res.json(users_1)];
        }
    });
}); };
exports.deleteUser = deleteUser;
//crear local
var createLocal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newLocal, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.nombre)
                    throw new utils_1.Exception("Por favor, ingrese un nombre.");
                if (!req.body.direccion)
                    throw new utils_1.Exception("Por favor, ingrese una dirección.");
                if (!req.body.horario)
                    throw new utils_1.Exception("Por favor, ingrese un horario.");
                if (!req.body.telefono)
                    throw new utils_1.Exception("Por favor, ingrese un teléfono.");
                if (!req.body.descripcion)
                    throw new utils_1.Exception("Por favor, ingrese una descripción.");
                newLocal = typeorm_1.getRepository(Local_1.Local).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local).save(newLocal)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createLocal = createLocal;
//buscar todos los locales
var getLocal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var local;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local).find()];
            case 1:
                local = _a.sent();
                return [2 /*return*/, res.json(local)];
        }
    });
}); };
exports.getLocal = getLocal;
//buscar local por id
var getLocalById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var local;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local).findOne(req.params.id)];
            case 1:
                local = _a.sent();
                if (!local)
                    throw new utils_1.Exception("No existe un local con este id.");
                return [2 /*return*/, res.json(local)];
        }
    });
}); };
exports.getLocalById = getLocalById;
//borrar local
var deleteLocal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var local, local_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local).findOne(req.params.id)];
            case 1:
                local = _a.sent();
                if (!!local) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ msg: "Este local no existe." })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local)["delete"](req.params.id)];
            case 3:
                local_1 = _a.sent();
                return [2 /*return*/, res.json(local_1)];
        }
    });
}); };
exports.deleteLocal = deleteLocal;
//login usuario
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("entrando a actions.login");
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.contrasena)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario)
                    // We need to validate that a user with this email and password exists in the DB
                ];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, contrasena: req.body.contrasena } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var addLocalFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var localRepo, usuarioRepo, usuario, local, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                localRepo = typeorm_1.getRepository(Local_1.Local);
                usuarioRepo = typeorm_1.getRepository(Usuario_1.Usuario);
                return [4 /*yield*/, usuarioRepo.findOne(req.params.usuarioid, { relations: ["locales"] })];
            case 1:
                usuario = _a.sent();
                return [4 /*yield*/, localRepo.findOne(req.params.localid)];
            case 2:
                local = _a.sent();
                if (!(usuario && local)) return [3 /*break*/, 4];
                usuario.locales = __spreadArray(__spreadArray([], usuario.locales), [local]);
                return [4 /*yield*/, usuarioRepo.save(usuario)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 4: return [2 /*return*/, res.json("Error")];
        }
    });
}); };
exports.addLocalFav = addLocalFav;
var deleteLocalFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario, localToDelete, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne({ relations: ["locales"], where: { id: req.params.usuarioid } })];
            case 1:
                usuario = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local).findOne({ where: { id: req.params.localid } })];
            case 2:
                localToDelete = _a.sent();
                result = { error: "El usuario o local no existe." };
                if (!(usuario && localToDelete)) return [3 /*break*/, 4];
                usuario.locales = usuario.locales.filter(function (local) {
                    return local.id !== localToDelete.id;
                });
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).save(usuario)];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deleteLocalFav = deleteLocalFav;
var createPerfil = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPerfil, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.tipo)
                    throw new utils_1.Exception("Por favor, ingrese un tipo de perfil.");
                newPerfil = typeorm_1.getRepository(Perfil_1.Perfil).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Perfil_1.Perfil).save(newPerfil)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPerfil = createPerfil;
