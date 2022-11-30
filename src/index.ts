import App from '@/app';
import { userResolver } from '@/resolvers/users.resolver';

import dotenv from 'dotenv';

dotenv.config();

const app = new App([
    userResolver
]);

app.listen();
