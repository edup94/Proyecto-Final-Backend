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
exports.Local = void 0;
var typeorm_1 = require("typeorm");
var Usuario_1 = require("./Usuario");
var Post_1 = require("./Post");
var Favorito_1 = require("./Favorito");
var Local = /** @class */ (function (_super) {
    __extends(Local, _super);
    function Local() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Local.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Local.prototype, "nombre");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Local.prototype, "direccion");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Local.prototype, "telefono");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Local.prototype, "horario");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Local.prototype, "descripcion");
    __decorate([
        typeorm_1.ManyToOne(function () { return Usuario_1.Usuario; }, function (usuario) { return usuario.locales; }),
        __metadata("design:type", Usuario_1.Usuario)
    ], Local.prototype, "usuario");
    __decorate([
        typeorm_1.OneToMany(function (type) { return Post_1.Post; }, function (post) { return post.local; }),
        __metadata("design:type", Array)
    ], Local.prototype, "posts");
    __decorate([
        typeorm_1.OneToMany(function () { return Favorito_1.Favorito; }, function (favorito) { return favorito.local; }),
        __metadata("design:type", Array)
    ], Local.prototype, "favoritos");
    Local = __decorate([
        typeorm_1.Entity()
    ], Local);
    return Local;
}(typeorm_1.BaseEntity));
exports.Local = Local;
