// lancer npm i envalid (validation et chargement des variables d'environnement)
import { cleanEnv, str, port } from 'envalid';

// Règles de validation
function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        MONGO_PASSWORD: str(),
        MONGO_PATH : str(),
        MONGO_USER: str(),
        PORT: port({default: 3000}),
    });
}

export default validateEnv;
