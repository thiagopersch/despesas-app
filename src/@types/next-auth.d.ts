import 'next-auth';

import { AccessLevel } from 'models/AccessLevel';

declare module 'next-auth' {
  interface Session {
    jwt: string;
    id: string;
    profileId?: string;
    accessLevel?: AccessLevel;
    user: {
      id: string;
      name: string;
      login: string;
      changePassword: boolean;
    };
    configs: {
      name_client?: string;
      status_client?: string;
    };
  }

  interface User extends User {
    id: string;
    name: string;
    login: string;
    jwt: string;
    //change_password: boolean;
    //profileId: string;
    //accessLevel: AccessLevel;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    login: string;
    jwt: string;
    changePassword: boolean;
    profileId: string;
    accessLevel: AccessLevel;
  }
}
