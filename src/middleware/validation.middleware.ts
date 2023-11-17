// npm i joi (validation library)

// NextFunction (next): fonction qui permet de passer le contrôle au middleware suivant dans la pile middleware. 
// Si appelée avec un argument (next('route')), elle peut également être utilisée pour sauter les middleware restants dans la pile 
// et passer directement à la prochaine route.
// RequestHandler: type générique qui décrit une fonction qui peut agir comme middleware. 
// Il prend généralement trois paramètres : Request, Response, et NextFunction.

import { Request, Response, NextFunction, RequestHandler } from 'express';
import joi, { ValidationErrorItem } from 'joi';

// Middleware de validation prenant un schéma Joi en argument 
// (= structure des données attendue définie dans post.validation.ts)
// Améliore la robustesse et la sécurité de l'API
function validationMiddleware(schema: joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        // Options de validation
        const validationOptions = {
            abortEarly: false,      // Ne pas arrêter à la première erreur
            allowUnknown: true,     // Autoriser des clés inconnues dans l'objet validé
            stripUnknown: true,     // Supprimer les clés inconnues de l'objet validé
        };

        try {
            // Valider le corps de la requête avec le schéma fourni
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            // Remplacer le corps de la requête par la valeur validée
            req.body = value;
            // Passer au middleware suivant
            next();
        } catch (e: any) {
            // En cas d'erreur de validation, construire un tableau d'erreurs
            const errors: string[] = [];
            (e.details as ValidationErrorItem[]).forEach((error: ValidationErrorItem) => {
                errors.push(error.message);
            });
            // Répondre avec un statut 400 et le tableau d'erreurs
            res.status(400).send({ errors: errors });
        }
    };
}

export default validationMiddleware;
