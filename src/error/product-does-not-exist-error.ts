export class ProductDoesNotExist extends Error {
  constructor() {
    super("Product doesn't exist");
  }
}
