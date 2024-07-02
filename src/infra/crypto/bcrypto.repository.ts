export abstract class BcryptoRepository {
  abstract compare(password: string, hashedPassword: string): Promise<boolean>;
  abstract hash(password: string): Promise<string>;
}
