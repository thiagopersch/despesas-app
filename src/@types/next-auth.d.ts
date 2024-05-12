import "next-auth";

import { AccessLevel } from "models/AccessLevel";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      login: string;
      changePassword: boolean;
      // employeeId?: string;
    };
    jwt: string;
    id: string;
    // schoolId?: string;
    configs: {
      name_client?: string;
      status_client?: string;
    };

    profileId?: string;
    // branch: {
    //   id: string;
    //   type: 'SCHOOL' | 'MUNICIPAL_SECRETARY';
    // };
    accessLevel?: AccessLevel;
  }

  interface User {
    id: string;
    name: string;
    login: string;
    jwt: string;
    change_password: boolean;
    profileId: string;
    accessLevel: AccessLevel;
    // schoolYearId: string;
    // schoolId: string;
    // branchId: string;
    // branchType: "SCHOOL" | "MUNICIPAL_SECRETARY";
    // employeeId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    login: string;
    jwt: string;
    changePassword: boolean;
    profileId: string;
    accessLevel: AccessLevel;
    // schoolYearId: string;
    // schoolId: string;
    // branchId: string;
    // branchType: "SCHOOL" | "MUNICIPAL_SECRETARY";
    // sessionId?: string;
  }
}
