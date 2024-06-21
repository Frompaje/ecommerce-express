export class ProductAlreadyExist extends Error {
  constructor() {
    super("product already exists");
  }
}
