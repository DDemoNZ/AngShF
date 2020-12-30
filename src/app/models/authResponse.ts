import {User} from './user';

export class AuthResponse {

  id: string;
  username: string;
  roles: [];
  generatedJwtToken: string;

}
