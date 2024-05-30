import tokenModel from "./tokenModel.js"
import postModel from "./postModel.js"
import userModel from "./userModel.js"




userModel.hasMany(postModel,{foreignKey: "userId"})
postModel.belongsTo(userModel,{foreignKey: "userId"})

userModel.hasMany(tokenModel,{foreignKey: 'userId'})
tokenModel.belongsTo(userModel,{foreignKey: 'userId'})


// export default {postModel, userModel}