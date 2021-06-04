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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deletePost = exports.getPostById = exports.getPost = exports.createPost = exports.createPerfil = exports.deleteLocalFav = exports.getLocalFav = exports.addLocalFav = exports.deleteLocal = exports.updateLocal = exports.getLocalById = exports.getLocal = exports.createLocal = exports.login = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm");
var Usuario_1 = require("./entities/Usuario");
var utils_1 = require("./utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Local_1 = require("./entities/Local");
var Perfil_1 = require("./entities/Perfil");
var Favorito_1 = require("./entities/Favorito");
var Post_1 = require("./entities/Post");
//crear usuario
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
            case 3: return [2 /*return*/, res.status(404).json({ msg: "No se encontró usuario." })];
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
                return [2 /*return*/, res.json({ msg: "Este usuario no existe." })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario)["delete"](req.params.id)];
            case 3:
                users_1 = _a.sent();
                return [2 /*return*/, res.json(users_1)];
        }
    });
}); };
exports.deleteUser = deleteUser;
//login usuario
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor, ingresa un mail.", 400);
                if (!req.body.contrasena)
                    throw new utils_1.Exception("Por favor, ingresa una contraseña.", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario)];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, contrasena: req.body.contrasena } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Email o contraseña incorrectos.", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
//crear local
var createLocal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario, usuarioRepo, newLocal, results;
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
                usuario = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne(usuario.user.id)];
            case 1:
                usuarioRepo = _a.sent();
                if (!usuarioRepo) return [3 /*break*/, 3];
                newLocal = new Local_1.Local();
                newLocal.nombre = req.body.nombre;
                newLocal.descripcion = req.body.descripcion;
                newLocal.horario = req.body.horario;
                newLocal.direccion = req.body.direccion;
                newLocal.telefono = req.body.telefono;
                newLocal.usuario = usuario.user;
                return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local).save(newLocal)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.json("Error")];
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
//editar local
var updateLocal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var local, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local).findOne(req.params.id)];
            case 1:
                local = _a.sent();
                if (!local) return [3 /*break*/, 3];
                typeorm_1.getRepository(Local_1.Local).merge(local, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Local_1.Local).save(local)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.status(404).json({ msg: "No se encontró este local." })];
        }
    });
}); };
exports.updateLocal = updateLocal;
//borrar local y sus comentarios
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
//agregar local favorito
var addLocalFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var localRepo, usuarioRepo, favRepo, usuario, local, newFav, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                localRepo = typeorm_1.getRepository(Local_1.Local);
                usuarioRepo = typeorm_1.getRepository(Usuario_1.Usuario);
                favRepo = typeorm_1.getRepository(Favorito_1.Favorito);
                return [4 /*yield*/, usuarioRepo.findOne(req.params.usuarioid)];
            case 1:
                usuario = _a.sent();
                return [4 /*yield*/, localRepo.findOne(req.params.localid)];
            case 2:
                local = _a.sent();
                if (!(usuario && local)) return [3 /*break*/, 4];
                newFav = favRepo.create();
                newFav.usuario = usuario;
                newFav.local = local;
                return [4 /*yield*/, favRepo.save(newFav)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 4: return [2 /*return*/, res.json("Error")];
        }
    });
}); };
exports.addLocalFav = addLocalFav;
//mostrar locales favoritos, agregar usuario como relación para mostrarlo.
var getLocalFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario, localFav;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usuario = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Favorito_1.Favorito).find({ relations: ["local"], where: { usuario: { id: usuario.user.id } } })];
            case 1:
                localFav = _a.sent();
                return [2 /*return*/, res.json(localFav)];
        }
    });
}); };
exports.getLocalFav = getLocalFav;
//borrar local favorito
var deleteLocalFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fav, fav_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Favorito_1.Favorito).findOne(req.params.favid)];
            case 1:
                fav = _a.sent();
                if (!!fav) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ msg: "No existe favorito" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Favorito_1.Favorito)["delete"](req.params.favid)];
            case 3:
                fav_1 = _a.sent();
                return [2 /*return*/, res.json(fav_1)];
        }
    });
}); };
exports.deleteLocalFav = deleteLocalFav;
//crear perfiles de usuario
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
//crear comentario de usuario a un local
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usuario, localRepo, usuarioRepo, local, newPost, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.comentario)
                    throw new utils_1.Exception("Por favor, ingrese un comentario.");
                if (!req.body.localId)
                    throw new utils_1.Exception("Por favor, ingrese un id del local.");
                usuario = req.user;
                localRepo = typeorm_1.getRepository(Local_1.Local);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne(usuario.user.id, { relations: ["posts"] })];
            case 1:
                usuarioRepo = _a.sent();
                return [4 /*yield*/, localRepo.findOneOrFail(req.body.localId)];
            case 2:
                local = _a.sent();
                if (!usuarioRepo) return [3 /*break*/, 4];
                newPost = new Post_1.Post();
                newPost.usuario = usuario.user;
                newPost.local = local;
                newPost.comentario = req.body.comentario;
                return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).save(newPost)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 4: return [2 /*return*/, res.json("Error")];
        }
    });
}); };
exports.createPost = createPost;
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).find()];
            case 1:
                post = _a.sent();
                return [2 /*return*/, res.json(post)];
        }
    });
}); };
exports.getPost = getPost;
//buscar post por id
var getPostById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
            case 1:
                post = _a.sent();
                if (!post)
                    throw new utils_1.Exception("No existe un post con este id.");
                return [2 /*return*/, res.json(post)];
        }
    });
}); };
exports.getPostById = getPostById;
//borrar comentario de usuario
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, post_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post).findOne(req.params.id)];
            case 1:
                post = _a.sent();
                console.log(req.params.id);
                if (!!post) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ msg: "Este comentario no existe." })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Post_1.Post)["delete"](req.params.id)];
            case 3:
                post_1 = _a.sent();
                return [2 /*return*/, res.json(post_1)];
        }
    });
}); };
exports.deletePost = deletePost;
