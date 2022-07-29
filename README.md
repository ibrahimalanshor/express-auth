# Express Auth

## Instal

```bash
npm install @ibrahimanshor/express-auth
```

## Usage

Create `AuthService` Class, the class must have a config attribute and some service methods (user, refresh token, verification, and reset password).

```js
class AuthService extends ExpressAuth.PasswordService {
  static config = {
    withRegisterVerification: false, // send register verification (default false)
    auth: {
      secret: 'devpass', // jwt secret token
      accessToken: { expire: '30m' }, // jwt access token expire time
      refreshToken: { expire: '365d' }, // jwt refresh token expire time
    },
  };

  // user service
  static async createUser(credentials) {} // create new user (credential = { ...req.body, password: hashedPassword }), return created user
  static async getUserByEmail(email) {} // return user by email
  static async getUserById(id) {} // return user by id

  // refresh token service
  static async createRefreshToken(token, user) {} // create refresh token (token = random string, user = userId)
  static async getRefreshTokenByToken(token) {} // get refresh token by token
  static async deleteRefreshTokenByToken(token) {} // delete refresh token by token

  // verification service
  static async createVerification(user) {} // create new verification (user = user object), return created verification
  static async sendVerificationEmail(verification) {} // send verification email (verification = verification object)
  static async getVerification(userId, token) {} // get verification by user and token
  static async verificateUserById(userId) {} // update user verification status
  static async deleteVerificationById(verificationId) {} // delete verification by verification id

  // reset password service
  static async createResetPassword(user) {} // create new reset password (user = user object), return created forgot password
  static async sendForgotPasswordEmail(resetPassword) {} // send forgot password email (resetPassword = reset password object)
  static async getResetPassword(userId, token) {} // get reset password by user id and token
  static async resetPasswordByUserId(userId, password) {} // change user password by user id
  static async deleteResetPasswordById(resetPasswordId) {} // delete reset password by reset password id
}
```

Use `AuthService` class in router

```js
const ExpressAuth = require('@ibrahimanshor/express-auth');
const { Router } = require('express');

const router = Router();

router.post('/login', ExpressAuth.login(AuthService));
router.post('/register', ExpressAuth.register(AuthService));
router.post('/refresh_token', ExpressAuth.refreshToken(AuthService));
router.post('/logout', ExpressAuth.logout(AuthService));
router.post('/forgot_password', ExpressAuth.forgotPassword(AuthService));
router.get('/verify/:user/:token', ExpressAuth.verification(AuthService));
router.get(
  '/reset_password/:user/:token',
  ExpressAuth.resetPassword(AuthService)
);

router.get('/require-auth', ExpressAuth.requireAuth(AuthService), (req, res) =>
  res.json({ auth: req.auth, user: req.user })
);
```
