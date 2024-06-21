export class UserDoesNotExist extends Error {
  constructor() {
    super("User doesn't exist");
  }
}
