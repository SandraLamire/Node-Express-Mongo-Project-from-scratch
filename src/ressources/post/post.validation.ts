import Joi from 'joi';

// Schéma de validation des posts nécessaire au validation.middleware.ts
const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),

});

// possibilité d'ajouter une fonction de MAJ :
// const update = Joi.object({
//     title: Joi.string().required(),
//     body: Joi.string().required(),

// });

export default { create };
// export default { create, update };