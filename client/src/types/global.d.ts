export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      userType: "student" | "teacher";
    };
  }
}
