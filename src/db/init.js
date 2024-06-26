import userModel from '../models/userModel.js';
import postModel from '../models/postModel.js';
import tokenModel from '../models/tokenModel.js';
import emailModel from '../models/emailModel.js';

const syncDB = async () => {
  await userModel.sync({ alter: true, force: false });
  await postModel.sync({ alter: true, force: false });
  await tokenModel.sync({ alter: true, force: false });
  await emailModel.sync({ alter: true, force: false });
};

export default syncDB;
