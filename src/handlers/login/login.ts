import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

function generateCsrfToken(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

export const secretKey = 'secret-key-for-jwt';

const OK = "OK";
const myusers = {
  "user1": OK,
  "user2": OK,
}

function checkUserAuthorized(username: string): boolean {
  const user = myusers[username];
  console.log(user);

  return user == OK;
}

export const handlerLogin: RequestHandler = (req, res) => {
  const user = { username: req.body.username };

  if (!checkUserAuthorized(user.username)) {
    res.sendStatus(500);

    return;
  }

  jwt.sign({ user: user }, secretKey, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      res.sendStatus(500);
    } else {
      // set maxAge to 1 hour (3600000 milliseconds)
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false, maxAge: 3600000 });
      const csrfToken = generateCsrfToken();
      // store csrfToken in session or database here tied to user
      res.cookie('xsrf-token', csrfToken, { sameSite: 'strict', secure: false, maxAge: 3600000 });

      res.json({
        login: "ok"
      });
    }
  });
};
