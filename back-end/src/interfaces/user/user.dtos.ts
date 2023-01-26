import Joi from 'joi';

const createSchema = Joi.object({
  email: Joi.string()
    .strip()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com'] },
    })
    .required(),

  password: Joi.string().strip().required(),

  name: Joi.string().strip().required(),
});

export { createSchema };