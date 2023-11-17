// Contient la logique métier = pour la gestion des posts (create, update...)
import PostModel from '@/ressources/post/post.modele';
import Post from '@/ressources/post/post.interface';

class  PostService {
    // = PostModel.create
    private post = PostModel;

    // Créer un nouveau post et le renvoyer au controleur
    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });
            return post;
        } catch (error) {
            throw new Error('unable to create post');
        }
    }
}

export default PostService;
