import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function generateCsrfToken(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

export const secretKey = 'secret-key-for-jwt';

const myusers = {
  "user1": "password-1",
  "user2": "password-2",
}

function checkUserAuthorized(username: string, password: string): boolean {
  const passwordFromUser = myusers[username];
  if (!passwordFromUser) {
    return false;
  }

  return password == passwordFromUser;
}

export const handlerLogin: RequestHandler = (req, res) => {
  const creds = {
    login: req.body.login,
    password: req.body.password,
  };

  if (!checkUserAuthorized(creds.login, creds.password)) {
    res.sendStatus(401);

    return;
  }

  jwt.sign({ user: creds }, secretKey, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      res.sendStatus(500);
    } else {
      // set maxAge to 1 hour (3600000 milliseconds)
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false, maxAge: 3600000 });
      const csrfToken = generateCsrfToken();
      // store csrfToken in session or database here tied to user
      res.cookie('xsrf-token', csrfToken, { sameSite: 'strict', secure: false, maxAge: 3600000 });

      res.json({
        name: "first-name",
        lastName: "last-name",
        email: "my@mail.ru",
      });
    }
  });
};
