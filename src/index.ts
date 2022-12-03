import App from '@/app';

// import { authResolver } from '@resolvers/auth.resolver';
import { UserResolver } from '@/resolvers/users.resolver';
import dotenv from 'dotenv';
import { AuthResolver } from './resolvers/auth.resolver';

dotenv.config();

const app = new App([
    AuthResolver,
    UserResolver
]);

app.listen();
