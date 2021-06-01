"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Usuario = void 0;
var typeorm_1 = require("typeorm");
var Perfil_1 = require("./Perfil");
var Favorito_1 = require("./Favorito");
var Local_1 = require("./Local");
var Post_1 = require("./Post");
var Usuario = /** @class */ (function (_super) {
    __extends(Usuario, _super);
    function Usuario() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Usuario.prototype, "id");
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Usuario.prototype, "username");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "nombre");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "apellido");
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Usuario.prototype, "email");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "contrasena");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Usuario.prototype, "perfil");
    __decorate([
        typeorm_1.ManyToOne(function () { return Perfil_1.Perfil; }, function (perfil) { return perfil.id; }),
        __metadata("design:type", Perfil_1.Perfil)
    ], Usuario.prototype, "perfiles");
    __decorate([
        typeorm_1.OneToMany(function () { return Favorito_1.Favorito; }, function (favorito) { return favorito.usuarioid; }),
        __metadata("design:type", Array)
    ], Usuario.prototype, "favoritos");
    __decorate([
        typeorm_1.OneToMany(function () { return Local_1.Local; }, function (local) { return local.usuarioid; }),
        __metadata("design:type", Array)
    ], Usuario.prototype, "locales");
    __decorate([
        typeorm_1.OneToMany(function () { return Post_1.Post; }, function (post) { return post.usuarioid; }),
        __metadata("design:type", Array)
    ], Usuario.prototype, "posts");
    Usuario = __decorate([
        typeorm_1.Entity()
    ], Usuario);
    return Usuario;
}(typeorm_1.BaseEntity));
exports.Usuario = Usuario;