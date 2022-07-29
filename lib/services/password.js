const bcrypt = require('bcrypt');

module.exports = class PasswordService {
  static async hashPassword(password, round = 10) {
    return await bcrypt.hash(password, round || 10);
  }

  static async comparePassword(password, plainPassword) {
    const match = await bcrypt.compare(plainPassword, password);

    if (!match) throw new Error('password incorrect');

    return match;
  }
};
