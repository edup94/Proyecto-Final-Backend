import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Usuario } from './entities/Usuario'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'
import { Local } from './entities/Local'
import { Perfil } from './entities/Perfil'
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

export const deleteLocalFav = async (req: Request, res: Response): Promise<Response> => {
    const usuario = await getRepository(Usuario).findOne({relations:["locales"], where:{id: req.params.usuarioid}});
    const localToDelete = await getRepository(Local).findOne({where: {id: req.params.localid}})
    let result:any = { error: "El usuario o local no existe."};
    if( usuario && localToDelete){
        usuario.locales = usuario.locales.filter( local => {
            return local.id !== localToDelete.id;
        })
        result = await getRepository(Usuario).save(usuario);
    }
    return res.json(result)
}

export const createPerfil = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.tipo) throw new Exception("Por favor, ingrese un tipo de perfil.")

	const newPerfil = getRepository(Perfil).create(req.body);  //Creo un perfil
	const results = await getRepository(Perfil).save(newPerfil); //Grabo el nuevo perfil 
	return res.json(results);
}