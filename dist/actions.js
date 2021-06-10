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
exports.createTransporter = exports.deletePost = exports.getPostById = exports.getPost = exports.createPost = exports.createPerfil = exports.deleteLocalFav = exports.getLocalFav = exports.addLocalFav = exports.deleteLocal = exports.updateLocal = exports.getLocalById = exports.getLocal = exports.createLocal = exports.login = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm");
var Usuario_1 = require("./entities/Usuario");
var utils_1 = require("./utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Local_1 = require("./entities/Local");
var Perfil_1 = require("./entities/Perfil");
var Favorito_1 = require("./entities/Favorito");
var Post_1 = require("./entities/Post");
var bcrypt_1 = __importDefault(require("bcrypt"));
var nodemailer_1 = __importDefault(require("nodemailer"));
//crear usuario
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, saltRounds, salt, hashedPass, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.username)
                    throw new utils_1.Exception("Por favor, ingrese un username.");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Por favor, ingrese un nombre.");
                if (!req.body.apellido)
                    throw new utils_1.Exception("Por favor, ingrese un apellido.");
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor, ingrese un email.");
                if (!req.body.contrasena)
                    throw new utils_1.Exception("Por favor, ingrese una contraseña.");
                if (!req.body.perfil)
                    throw new utils_1.Exception("Por favor, ingrese un perfil.");
                userRepo = typeorm_1.getRepository(Usuario_1.Usuario);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Ya existe un usuario con este email.");
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1["default"].genSalt(saltRounds)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1["default"].hash(req.body.contrasena, salt)];
            case 3:
                hashedPass = _a.sent();
                newUser = typeorm_1.getRepository(Usuario_1.Usuario).create({
                    username: req.body.username, nombre: req.body.nombre, apellido: req.body.apellido,
                    email: req.body.email, contrasena: hashedPass, perfil: req.body.perfil
                });
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).save(newUser)];
            case 4:
                results = _a.sent();
                sendMail();
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
    var userRepo, user, validPass, token;
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
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Email incorrecto.", 401);
                return [4 /*yield*/, bcrypt_1["default"].compare(req.body.contrasena, user.contrasena)];
            case 3:
                validPass = _a.sent();
                if (!validPass)
                    throw new utils_1.Exception("Contraseña incorrecta.", 401);
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
// create reusable transporter object using the default SMTP transport
var createTransporter = function () {
    var transport = nodemailer_1["default"].createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        secure: false,
        auth: {
            user: "9663152fea5ad7",
            pass: "efb38f8b19db42"
        }
    });
    return transport;
};
exports.createTransporter = createTransporter;
// send mail with defined transport object
var sendMail = function () { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transporter = exports.createTransporter();
                return [4 /*yield*/, transporter.sendMail({
                        from: '"enBICIando" <enbiciando@example.com>',
                        to: "bar@example.com, baz@example.com",
                        subject: "Hola! Bienvenido a nuestra comunidad ✔",
                        html: correoEjemplo
                    })];
            case 1:
                info = _a.sent();
                console.log("Mensaje enviado: %s", info.messageId);
                return [2 /*return*/];
        }
    });
}); };
var correoEjemplo = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" style=\"width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0\"><head><meta charset=\"UTF-8\"><meta content=\"width=device-width, initial-scale=1\" name=\"viewport\"><meta name=\"x-apple-disable-message-reformatting\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta content=\"telephone=no\" name=\"format-detection\"><title>Nuevo mensaje</title> <!--[if (mso 16)]><style type=\"text/css\"> a {text-decoration: none;} </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--> <!--[if !mso]><!-- --><link href=\"https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i\" rel=\"stylesheet\"> <!--<![endif]--><style type=\"text/css\">#outlook a { padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div { line-height:100%;}.es-button { mso-style-priority:100!important; text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important; text-decoration:none!important; font-size:inherit!important; font-family:inherit!important; font-weight:inherit!important; line-height:inherit!important;}.es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all;}[data-ogsb] .es-button { border-width:0!important; padding:15px 25px 15px 25px!important;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class=\"gmail-fix\"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }</style></head>\n<body style=\"width:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0\"><div class=\"es-wrapper-color\" style=\"background-color:#F4F4F4\"> <!--[if gte mso 9]><v:background xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"t\"> <v:fill type=\"tile\" color=\"#f4f4f4\"></v:fill> </v:background><![endif]--><table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top\"><tr class=\"gmail-fix\" height=\"0\" style=\"border-collapse:collapse\"><td style=\"padding:0;Margin:0\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px\"><tr style=\"border-collapse:collapse\"><td cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"padding:0;Margin:0;line-height:1px;min-width:600px\" height=\"0\"><img src=\"https://rpaobz.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png\" style=\"display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px\" alt width=\"600\" height=\"1\"></td>\n</tr></table></td>\n</tr><tr style=\"border-collapse:collapse\"><td valign=\"top\" style=\"padding:0;Margin:0\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-content\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0\"><table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px\"> <!--[if mso]><table style=\"width:580px\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"width:282px\" valign=\"top\"><![endif]--><table class=\"es-left\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0;width:282px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td class=\"es-infoblock es-m-txt-c\" align=\"left\" style=\"padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px\">Put your preheader text here<br></p>\n</td></tr></table></td></tr></table> <!--[if mso]></td><td style=\"width:20px\"></td>\n<td style=\"width:278px\" valign=\"top\"><![endif]--><table class=\"es-right\" cellspacing=\"0\" cellpadding=\"0\" align=\"right\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0;width:278px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td align=\"right\" class=\"es-infoblock es-m-txt-c\" style=\"padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px\"><a href=\"https://viewstripo.email\" class=\"view\" target=\"_blank\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif\">View in browser</a></p>\n</td></tr></table></td></tr></table> <!--[if mso]></td></tr></table><![endif]--></td></tr></table></td>\n</tr></table><table class=\"es-header\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#FFA73B;background-repeat:repeat;background-position:center top\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0\"><table class=\"es-header-body\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:580px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0;display:none\"></td>\n</tr></table></td></tr></table></td></tr></table></td>\n</tr></table><table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"><tr style=\"border-collapse:collapse\"><td style=\"padding:0;Margin:0;background-color:#FFA73B\" bgcolor=\"#ffa73b\" align=\"center\"><table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:600px\"><table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FFFFFF;border-radius:4px\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" role=\"presentation\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"Margin:0;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:35px\"><h1 style=\"Margin:0;line-height:58px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:48px;font-style:normal;font-weight:normal;color:#111111\">Bienvenido!</h1>\n</td></tr><tr style=\"border-collapse:collapse\"><td bgcolor=\"#ffffff\" align=\"center\" style=\"Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0\"><table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td style=\"padding:0;Margin:0;border-bottom:1px solid #FFFFFF;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px\"></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td>\n</tr></table><table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0\"><table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:600px\"><table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px;background-color:#FFFFFF\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" role=\"presentation\"><tr style=\"border-collapse:collapse\"><td class=\"es-m-txt-l\" bgcolor=\"#ffffff\" align=\"left\" style=\"Margin:0;padding-top:20px;padding-bottom:20px;padding-left:30px;padding-right:30px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px\">Nos alegra que hayas decidido unirte a nuestra comunidad.</p>\n</td></tr><tr style=\"border-collapse:collapse\"><td class=\"es-m-txt-l\" align=\"left\" style=\"padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px\">Si tienes alguna pregunta, simplemente responde a este e-mail.<br>Siempre estamos dispuestos a ayudarte!</p></td></tr><tr style=\"border-collapse:collapse\"><td class=\"es-m-txt-l\" align=\"left\" style=\"Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px\">Saludos cordiales,</p>\n<p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px\">El equipo de enBICIando.</p></td></tr></table></td></tr></table></td></tr></table></td>\n</tr></table><table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0\"><table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:600px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0\"><table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td style=\"padding:0;Margin:0;border-bottom:1px solid #F4F4F4;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px\"></td>\n</tr></table></td></tr></table></td></tr></table></td></tr></table></td>\n</tr></table><table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0\"><table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:600px\"><table style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FFECD1;border-radius:4px\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffecd1\" role=\"presentation\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0;padding-top:30px;padding-left:30px;padding-right:30px\"><h3 style=\"Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#111111\">Necesitas ayuda?</h3>\n</td></tr><tr style=\"border-collapse:collapse\"><td esdev-links-color=\"#ffa73b\" align=\"center\" style=\"padding:0;Margin:0;padding-bottom:30px;padding-left:30px;padding-right:30px\"><a target=\"_blank\" href=\"https://viewstripo.email/\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFA73B;font-size:18px\">Estamos aqu\u00ED, cont\u00E1ctanos!</a></td></tr></table></td></tr></table></td></tr></table></td>\n</tr></table><table cellpadding=\"0\" cellspacing=\"0\" class=\"es-footer\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0\"><table class=\"es-footer-body\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"Margin:0;padding-top:30px;padding-bottom:30px;padding-left:30px;padding-right:30px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:540px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" role=\"presentation\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px\"><strong><a target=\"_blank\" href=\"https://viewstripo.email\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px\">Dashboard</a> - <a target=\"_blank\" href=\"https://viewstripo.email\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px\">Billing</a> - <a target=\"_blank\" href=\"https://viewstripo.email\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px\">Help</a></strong></p>\n</td></tr><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0;padding-top:25px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px\">Acabas de recibir este correo porque acabas de registrarte como usuario. Si este correo se ve extra\u00F1o, <strong><a class=\"view\" target=\"_blank\" href=\"https://viewstripo.email\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px\">Miralo&nbsp;en tu navegador.</a></strong></p></td>\n</tr><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0;padding-top:25px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px\">Si estos emails se vuelven molestos, por favor si\u00E9ntete libre de&nbsp;<strong><a target=\"_blank\" class=\"unsubscribe\" href=\"\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#111111;font-size:14px\">Cancelar la suscripci\u00F3n.</a></strong></p></td>\n</tr><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"padding:0;Margin:0;padding-top:25px\"><p style=\"Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#666666;font-size:14px\">Ceej - 1234 Main Street - Anywhere, MA - 56789</p></td></tr></table></td></tr></table></td></tr></table></td>\n</tr></table><table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0\"><table class=\"es-content-body\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tr style=\"border-collapse:collapse\"><td align=\"left\" style=\"Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td valign=\"top\" align=\"center\" style=\"padding:0;Margin:0;width:560px\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px\"><tr style=\"border-collapse:collapse\"><td align=\"center\" style=\"padding:0;Margin:0;display:none\"></td>\n</tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>";
