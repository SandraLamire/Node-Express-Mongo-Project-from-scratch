// Importer tout ce qui doit être disponible dans toute l'appli
import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/ressources/post/post.controller';

// Vérifier si on a tout ce dont on a besoin
validateEnv();

// Instancier un Postcontroller via le contructeur de App dans app.ts
const app = new App([new PostController()], Number(process.env.PORT));

app.listen();

