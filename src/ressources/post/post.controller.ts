// Routage de la logique métier
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/ressources/post/post.validation';
import PostService from '@/ressources/post/post.service';

class PostController implements Controller {
    // S'ajoute derrière le début de toutes les routes défini dans app.ts : /api/...
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);
            res.status(201).json({ post });
        } catch (error) {
            // Gestion des erreurs grâce à error.middleware.ts
            next(new HttpException(400, 'Cannot create post'));
        }
    }
}

export default PostController;
