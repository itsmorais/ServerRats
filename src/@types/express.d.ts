import { Request } from "express";

declare module "express" {
    export interface JwtRequest extends Request{
        user?:{
            id:string;
            role:string;
        }
    }
}