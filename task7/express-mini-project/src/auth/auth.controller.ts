import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { HttpErrorStatus, StringObject } from '../shared/utils/util.types';
import { LoginDTO, LoginResponseDTO, RegisterDTO, RegisterResponseDTO } from './types/auth.dto';
import { zodValidation } from '../shared/utils/zod.utill';
import { CustomError } from '../shared/utils/exception';
import { MODULES_NAMES } from '../shared/utils/constant';
import { signJwt } from '../shared/utils/jwt.utils';
import { loginDTOSchema, registerDTOSchema } from './auth.schema';


export class AuthController {
  private authService = new AuthService();


   public async register(
    req:Request<StringObject,RegisterDTO>,
    res:Response<RegisterResponseDTO| string>,
    next:NextFunction
  ){
      try {
    const payloadData=zodValidation(registerDTOSchema,req.body,'AUTH');
    const user = await this.authService.register(req.body);
    console.log("user",user);
     res.create(user);
   } 
    catch (error) { 
        return new CustomError.handleError(error,res,next,MODULES_NAMES.auth);
    }
}


    //we user jwt to login
    public async login(req:Request<StringObject,StringObject,LoginDTO>,
    res:Response<LoginResponseDTO | string>){
    const payloadData=zodValidation(loginDTOSchema,req.body,'AUTH');
   
   const userData=await this.authService.login(payloadData);
   if(!userData){
    res.status(HttpErrorStatus.BadRequest).
    send("Invalid credentials");
    return ;
   } 
const token=signJwt({sub:userData.data.id,name:userData.data.name});
   //res.json({data:userData,token});
   res.ok({user:userData,token});
  }


   public logout(req:Request,res:Response,next:NextFunction){
  res.ok({})
}

}
export const authController=new AuthController();