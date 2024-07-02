import { beforeEach, describe, expect, it } from '@jest/globals';

import { BcryptoService } from './bcrypto.service';

describe('[Bcrypt]', () => {
  let sut: BcryptoService;
  beforeEach(() => {
    sut = new BcryptoService();
  });
  describe('[Success]', () => {
    it('[Hashed]Should hash the password', async () => {
      const passwordNoHashed = 'password';

      const passwordHashed = await sut.hash(passwordNoHashed);

      expect(passwordHashed).not.toBe(passwordNoHashed);
    });
    it('[Compare]Passwords must match', async () => {
      const passwordNoHashed = 'password';

      const passwordHashed = await sut.hash(passwordNoHashed);

      const isPasswordCorrectHashed = await sut.compare(
        passwordNoHashed,
        passwordHashed,
      );

      expect(isPasswordCorrectHashed).toBe(true);
    });
  });
});
