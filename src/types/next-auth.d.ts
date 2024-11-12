import { UserAttributes } from '../models/User';
import 'next';

declare module 'next' {
    interface NextApiRequest {
        user?: UserAttributes;
        logout: ( callback: ( err: any ) => void ) => void;
        isAuthenticated: () => boolean;
    }
}
