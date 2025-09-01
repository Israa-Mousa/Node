import { ZodError,ZodType } from "zod";
import tr from "zod/v4/locales/tr.js";
import { CustomError } from "./exception";
import { ModuleNameType } from "./constant";
import { HttpErrorStatus } from "./util.types";
import th from "zod/v4/locales/th.js";

export const  zodValidation=<T>(schema:ZodType<T>,payload:T,moduleName:ModuleNameType)=>{
//validate
// return the validated data
// catch error
// custom error c
try {
    const safeData=schema.parse(payload);
    return safeData;
} catch (error) {
    if(error instanceof ZodError){
throw new CustomError(error.message,
    moduleName,
    HttpErrorStatus.BadRequest);  

}
if(error instanceof Error){
    throw new CustomError(error.message,
        moduleName,
        HttpErrorStatus.BadRequest);

}
throw  error;
}
}