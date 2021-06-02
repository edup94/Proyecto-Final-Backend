import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken';

// declare a new router to include all the endpoints
const router = Router();

//middleware/token
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    //headers con el token
    const token = req.header('Authorization')?.replace("Bearer ","");
    if(!token) return res.status(400).json('ACCESS DENIED');
    try {
    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    // console.log(decoded + "verified token");
    next()
    }
    catch {
        return res.status(400).json('ACCESS DENIED');
    }
}

router.get('/user', verifyToken, safe(actions.getUsers));
router.put('/user/:id', verifyToken, safe(actions.updateUser));
router.delete('/user/:id', verifyToken, safe(actions.deleteUser));
router.post('/local',verifyToken, safe(actions.createLocal));
router.get('/local', verifyToken, safe(actions.getLocal));
router.get('/local/:id',verifyToken, safe(actions.getLocalById));
router.put('/local/:id',verifyToken, safe(actions.updateLocal));
router.delete('/local/:id',verifyToken,  safe(actions.deleteLocal));
router.post('/localFav/:userid/:localid',verifyToken,  safe(actions.addLocalFav));
router.get('/localFav', verifyToken, safe(actions.getLocalFav));
router.delete('/localFav/:favid',  safe(actions.deleteLocalFav));
router.post('/post', verifyToken, safe(actions.createPost));
router.get('/post', verifyToken, safe(actions.getPost));
router.get('/post/:id',verifyToken, safe(actions.getPost));
router.delete('/post/:id',verifyToken, safe(actions.deletePost));

export default router;
