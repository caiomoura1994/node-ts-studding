import dotenv from 'dotenv';
dotenv.config();

import App from '@/app';
import { UserResolver } from '@/resolvers/users.resolver';
import { AuthResolver } from './resolvers/auth.resolver';


const app = new App([
    AuthResolver,
    UserResolver
]);

app.listen();
