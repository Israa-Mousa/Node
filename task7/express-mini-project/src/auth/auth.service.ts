import { LoginDTO, LoginResponseDTO, RegisterDTO, RegisterResponseDTO } from './types/auth.dto';
import { RegisterDTOSchema } from '../users/user.dto';
import { User } from '../users/user.entity';       
import { userService } from '../users/user.service';
import { createArgonHash, verifyArgonHash } from '../shared/utils/argon.utils';
import { removeFields } from '../shared/utils/object.util';
import is from 'zod/v4/locales/is.js';
export class AuthService {
  private _userService = userService;
  
 public async register(
  payload: RegisterDTO): Promise<RegisterResponseDTO> {

    const userData = this._userService.createUser(
      payload.name,
      payload.email,
      payload.password, 
    );

   return userData;
  }
public async login(payload: LoginDTO): Promise<User | null> {
  const foundUser = await this._userService.findByEmail(payload.email);

  if (!foundUser) {
    return null;
  }

  const isPasswordMatch = await verifyArgonHash(payload.password, foundUser.password);
  if (!isPasswordMatch) {
    return null;
  }
  const userWithoutPassword = removeFields(foundUser, ['password']);
  return userWithoutPassword as User;



}



//   public async login(payload:LoginDTO):Promise<LoginResponseDTO | null>{
//     // find the user by email
//     const foundUser=this._userService.findByEmail(payload.email);
//     //if user not found throw error
//     if(!foundUser){
// return null; 
//    }
//    //compare the password
//     const isPasswordMatch= await verifyArgonHash(payload.password,foundUser.password);
//     console.log(isPasswordMatch);
//     console.log('Stored hash:', foundUser.password);
// console.log('Password attempt:', payload.password);
//     if(!isPasswordMatch){
//       return null;
//     }
//     // return user data without password and include token
//     const userWithoutPassword = removeFields(foundUser, ['password']);
//     // TODO: Generate a JWT or session token here. For now, set token to an empty string or implement token generation.
//     const token = ""; // Replace with actual token generation logic if available
//     return {
//       data: userWithoutPassword,
//       token: token
//     };
  
//   }
}

