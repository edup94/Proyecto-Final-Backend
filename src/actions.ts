import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Usuario } from './entities/Usuario'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'
import { Local } from './entities/Local'
import { Perfil } from './entities/Perfil'
import { Favorito } from './entities/Favorito'
import { Post } from './entities/Post'
import bcrypt from 'bcrypt';

interface IToken {
user:Usuario,
}

//crear usuario
export const createUser = async (req: Request, res:Response): Promise<Response> =>{

    if(!req.body.username) throw new Exception("Por favor, ingrese un username.")
    if(!req.body.nombre) throw new Exception("Por favor, ingrese un nombre.")
	if(!req.body.apellido) throw new Exception("Por favor, ingrese un apellido.")
	if(!req.body.email) throw new Exception("Por favor, ingrese un email.")
    if(!req.body.contrasena) throw new Exception("Por favor, ingrese una contraseña.")
    if(!req.body.perfil) throw new Exception("Por favor, ingrese un perfil.")

	const userRepo = getRepository(Usuario)
	const user = await userRepo.findOne({ where: {email: req.body.email }})
    if(user) throw new Exception("Ya existe un usuario con este email.")
    
    //encriptar contraseña
    let saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPass = await bcrypt.hash(req.body.contrasena, salt);

    const newUser = getRepository(Usuario).create({username: req.body.username, nombre: req.body.nombre, apellido: req.body.apellido, 
    email: req.body.email, contrasena: hashedPass, perfil: req.body.perfil});
	const results = await getRepository(Usuario).save(newUser); 
	return res.json(results);
}

//buscar todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Usuario).find();
		return res.json(users);
}

//editar usuario
export const updateUser = async (req: Request, res:Response): Promise<Response> =>{
    const user = await getRepository(Usuario).findOne(req.params.id);
	if(user) {
        getRepository(Usuario).merge(user, req.body);
        const results = await getRepository(Usuario).save(user);
        return res.json(results);
    }
	return res.status(404).json({msg: "No se encontró usuario."});
}

//borrar usuario
export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(Usuario).findOne(req.params.id);
    if(!users) {
        return res.json({ msg :"Este usuario no existe."});
    }else {
    const users = await getRepository(Usuario).delete(req.params.id);
		return res.json(users);
    }	
}

//login usuario
export const login = async (req: Request, res: Response): Promise<Response> =>{

	if(!req.body.email) throw new Exception("Por favor, ingresa un mail.", 400)
	if(!req.body.contrasena) throw new Exception("Por favor, ingresa una contraseña.", 400)

	const userRepo = await getRepository(Usuario)
	const user = await userRepo.findOne({ where: { email: req.body.email, contrasena: req.body.contrasena }})
	if(!user) throw new Exception("Email o contraseña incorrectos.", 401)
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
	return res.json({ user, token });
}

//crear local
export const createLocal = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.nombre) throw new Exception("Por favor, ingrese un nombre.")
	if(!req.body.direccion) throw new Exception("Por favor, ingrese una dirección.")
	if(!req.body.horario) throw new Exception("Por favor, ingrese un horario.")
    if(!req.body.telefono) throw new Exception("Por favor, ingrese un teléfono.")
    if(!req.body.descripcion) throw new Exception("Por favor, ingrese una descripción.")

    const usuario = req.user as IToken;
    const usuarioRepo = await getRepository(Usuario).findOne(usuario.user.id);
    if (usuarioRepo) {
        let newLocal = new Local()
        newLocal.nombre = req.body.nombre;
        newLocal.descripcion = req.body.descripcion;
        newLocal.horario = req.body.horario;
        newLocal.direccion = req.body.direccion;
        newLocal.telefono = req.body.telefono;
        newLocal.usuario = usuario.user
        const results = await getRepository(Local).save(newLocal);
        return res.json(results);
    }
    return res.json("Error");
}

//buscar todos los locales
export const getLocal = async (req: Request, res: Response): Promise<Response> =>{
		const local = await getRepository(Local).find();
		return res.json(local);
}

//buscar local por id
export const getLocalById = async (req: Request, res: Response): Promise<Response> =>{
    const local = await getRepository(Local).findOne(req.params.id);
    if(!local) throw new Exception("No existe un local con este id.");
    return res.json(local);
}

//editar local
export const updateLocal = async (req: Request, res:Response): Promise<Response> =>{
    const local = await getRepository(Local).findOne(req.params.id);
	if(local) {
        getRepository(Local).merge(local, req.body);
        const results = await getRepository(Local).save(local);
        return res.json(results);
    }
	return res.status(404).json({msg: "No se encontró este local."});
}

//borrar local y sus comentarios
export const deleteLocal = async (req: Request, res: Response): Promise<Response> =>{
    const local = await getRepository(Local).findOne(req.params.id);
    if(!local) {
        return res.json({ msg :"Este local no existe."});
    }else {
    const local = await getRepository(Local).delete(req.params.id);
		return res.json(local);
    }	
}

//agregar local favorito
export const addLocalFav = async (req: Request, res: Response): Promise<Response> => {
    const localRepo = getRepository(Local)
    const usuarioRepo = getRepository(Usuario)
    const favRepo = getRepository(Favorito)
    const usuario = await usuarioRepo.findOne(req.params.usuarioid)
    const local = await localRepo.findOne(req.params.localid)
    if (usuario && local) {
        const newFav = favRepo.create()
        newFav.usuario = usuario
        newFav.local = local
        const results = await favRepo.save(newFav)
        return res.json(results)
    }
    return res.json("Error")
}

//mostrar locales favoritos, agregar usuario como relación para mostrarlo.
export const getLocalFav = async (req: Request, res: Response): Promise<Response> =>{
        const usuario = req.user as IToken;

        const localFav = await getRepository(Favorito).find({relations: ["local"], where: {usuario: {id: usuario.user.id}}});
		return res.json(localFav);
}

//borrar local favorito
export const deleteLocalFav = async (req: Request, res: Response): Promise<Response> =>{
    const fav = await getRepository(Favorito).findOne(req.params.favid);
    if(!fav) {
        return res.json({ msg :"No existe favorito"});
    }else {
    const fav = await getRepository(Favorito).delete(req.params.favid);
		return res.json(fav);
    }	
}

//crear perfiles de usuario
export const createPerfil = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.tipo) throw new Exception("Por favor, ingrese un tipo de perfil.")

	const newPerfil = getRepository(Perfil).create(req.body);  //Creo un perfil
	const results = await getRepository(Perfil).save(newPerfil); //Grabo el nuevo perfil 
	return res.json(results);
}

//crear comentario de usuario a un local
export const createPost = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.comentario) throw new Exception("Por favor, ingrese un comentario.")
    if(!req.body.localId) throw new Exception("Por favor, ingrese un id del local.")
    const usuario = req.user as IToken;
    const localRepo = getRepository(Local)
    const usuarioRepo = await getRepository(Usuario).findOne(usuario.user.id,{relations: ["posts"]}); 
    let local = await localRepo.findOneOrFail(req.body.localId)
    if (usuarioRepo) {
        let newPost = new Post()
        newPost.usuario = usuario.user
        newPost.local = local
        newPost.comentario = req.body.comentario
        const results = await getRepository(Post).save(newPost);
        return res.json(results)
    }
	return res.json("Error");
}

export const getPost = async (req: Request, res: Response): Promise<Response> =>{
		const post = await getRepository(Post).find();
		return res.json(post);
}

//buscar post por id
export const getPostById = async (req: Request, res: Response): Promise<Response> =>{
        const post = await getRepository(Post).findOne(req.params.id);
        if(!post) throw new Exception("No existe un post con este id.");
		return res.json(post);
}

//borrar comentario de usuario
export const deletePost = async (req: Request, res: Response): Promise<Response> =>{
    const post = await getRepository(Post).findOne(req.params.id);
    console.log(req.params.id)
    if(!post) {
        return res.json({ msg :"Este comentario no existe."});
    }else {
    const post = await getRepository(Post).delete(req.params.id);
		return res.json(post);
    }	
}