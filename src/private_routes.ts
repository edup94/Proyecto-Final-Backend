import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken';

// declare a new router to include all the endpoints
const router = Router();

//middleware/token
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    //headers con el token
    const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');
    try {
const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    console.log(decoded);
    next()
    }
    catch {
        return res.status(400).json('ACCESS DENIED');
    }
}

router.get('/user', verifyToken, safe(actions.getUsers));
router.put('/user/:id', verifyToken, safe(actions.updateUser));
router.delete('/user/:id', verifyToken, safe(actions.deleteUser));
router.post('/local', verifyToken, safe(actions.createLocal));
router.get('/local', verifyToken, safe(actions.getLocal));
router.get('/local/:id', verifyToken, safe(actions.getLocalById));
router.delete('/local/:id', verifyToken, safe(actions.deleteLocal));
router.post('/localFav/:userid/:localid', verifyToken, safe(actions.addLocalFav));
router.delete('/localFav/:userid/:localid', verifyToken, safe(actions.deleteLocalFav));

export default router;
