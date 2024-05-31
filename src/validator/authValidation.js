import Joi from "joi";

const AuthValidators = {
    signin: (req, res, next)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const {error, value} = schema.validate(req.body)
    if(error){
        return res.status(400).json({message: "Invalid Data", error})
    }


next()
}


}

export default AuthValidators