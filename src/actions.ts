import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Usuario } from './entities/Usuario'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'
import { Local } from './entities/Local'
import { Perfil } from './entities/Perfil'
import { Post } from './entities/Post'
import { Favorito } from './entities/Favorito'

//crear usuario
export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if(!req.body.username) throw new Exception("Por favor ingrese un username")
    if(!req.body.nombre) throw new Exception("Por favor ingrese un nombre")
	if(!req.body.apellido) throw new Exception("Por favor ingrese un apellido")
	if(!req.body.email) throw new Exception("Por favor ingrese un email")
    if(!req.body.contrasena) throw new Exception("Por favor ingrese una contrasena")
    if(!req.body.perfil) throw new Exception("Por favor ingrese un perfil")

	const userRepo = getRepository(Usuario)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Ya existe un usuario con este email")

	const newUser = getRepository(Usuario).create(req.body);  //Creo un usuario
	const results = await getRepository(Usuario).save(newUser); //Grabo el nuevo usuario 
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
	return res.status(404).json({msg: "No user found."});
}

//borrar usuario
export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(Usuario).findOne(req.params.id);
    if(!users) {
        return res.json({ msg :"This user doesn't exist."});
    }else {
    const users = await getRepository(Usuario).delete(req.params.id);
		return res.json(users);
    }	
}

//login usuario
export const login = async (req: Request, res: Response): Promise<Response> =>{
		console.log("entrando a actions.login")
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.contrasena) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(Usuario)

	// We need to validate that a user with this email and password exists in the DB
	const user = await userRepo.findOne({ where: { email: req.body.email, contrasena: req.body.contrasena }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}

//crear local
export const createLocal = async (req: Request, res:Response): Promise<Response> =>{

	if(!req.body.nombre) throw new Exception("Por favor, ingrese un nombre.")
	if(!req.body.direccion) throw new Exception("Por favor, ingrese una dirección.")
	if(!req.body.horario) throw new Exception("Por favor, ingrese un horario.")
    if(!req.body.telefono) throw new Exception("Por favor, ingrese un teléfono.")
    if(!req.body.descripcion) throw new Exception("Por favor, ingrese una descripción.")
    
	const newLocal = getRepository(Local).create(req.body);  
	const results = await getRepository(Local).save(newLocal);
	return res.json(results);
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

export const updateLocal = async (req: Request, res:Response): Promise<Response> =>{
    const local = await getRepository(Local).findOne(req.params.id);
	if(local) {
        getRepository(Local).merge(local, req.body);
        const results = await getRepository(Local).save(local);
        return res.json(results);
    }
	return res.status(404).json({msg: "No se encontró este local."});
}

//borrar local
export const deleteLocal = async (req: Request, res: Response): Promise<Response> =>{
    const local = await getRepository(Local).findOne(req.params.id);
    if(!local) {
        return res.json({ msg :"Este local no existe."});
    }else {
    const local = await getRepository(Local).delete(req.params.id);
		return res.json(local);
    }	
}

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

//interfaz Itoken
interface IToken {
user:Usuario,
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

export const createPerfil = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.tipo) throw new Exception("Por favor, ingrese un tipo de perfil.")

	const newPerfil = getRepository(Perfil).create(req.body);  //Creo un perfil
	const results = await getRepository(Perfil).save(newPerfil); //Grabo el nuevo perfil 
	return res.json(results);
}

export const createPost = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.comentario) throw new Exception("Por favor, ingrese un comentario.")
    const usuario = req.user as IToken;
    const newPost = getRepository(Post).create(req.body);
    console.log(newPost,usuario)
	const results = await getRepository(Post).save(newPost);
	return res.json(results);
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

export const deletePost = async (req: Request, res: Response): Promise<Response> =>{
    const post = await getRepository(Post).findOne(req.params.id);
    if(!post) {
        return res.json({ msg :"This post doesn't exist."});
    }else {
    const post = await getRepository(Usuario).delete(req.params.id);
		return res.json(post);
    }	
}