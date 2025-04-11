export class UserAlreadyInGroupError extends Error {
    constructor() {
      super("User is already a member of this group.");
      this.name = "UserAlreadyInGroupError";
    }
  }
  