import App from '@/app';

// import { authResolver } from '@resolvers/auth.resolver';
import { userResolver } from '@/resolvers/users.resolver';
import dotenv from 'dotenv';

dotenv.config();

const app = new App([
    // authResolver,
    userResolver
]);

app.listen();
