import joi from "joi"

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi.string().min(8).max(11).required(),
    cpf: joi.string().max(11).required(),
});


export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});
