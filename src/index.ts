// Importer tout ce qui doit être disponible dans toute l'appli
import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';

// Vérifier si on a tout ce dont on a besoin
validateEnv();

const app = new App([], Number(process.env.PORT));

app.listen();

