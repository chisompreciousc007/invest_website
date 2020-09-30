const Joi = require("@hapi/joi");

const newUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(150).required(),
    username: Joi.string().min(4).max(20).required(),
    email: Joi.string().min(4).max(60).required(),
    password: Joi.string().min(8).max(60).required(),
    age: Joi.string().min(1).max(4).required(),
    phone: Joi.string().min(11).max(11).required(),
    gender: Joi.string().min(4).max(7).required(),
    upline: Joi.string().min(3).max(20).required(),
    accountName: Joi.string().min(4).max(150).required(),
    bank: Joi.string().min(4).max(150).required(),
    accountNo: Joi.string().min(4).max(150).required(),
  });

  //validate data before sending
  return schema.validate(data);
  // if (error) return res.status(400).send(error.details[0].message);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(8).max(100).required(),
  });

  //validate data before sending
  return schema.validate(data);
  // if (error) return res.status(400).send(error.details[0].message);
};

module.exports.newUserValidation = newUserValidation;
module.exports.loginValidation = loginValidation;
