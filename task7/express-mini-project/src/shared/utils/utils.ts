import { MyEnvs } from "./declartion-merging.types";


export const getEnvOrThrow=(envName:keyof MyEnvs)=>{
    const varValue=process.env[envName];
    if(!varValue) throw new Error(`${envName} is not set in the env`);
 return varValue;
};
