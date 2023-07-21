import { RequestHandler } from "express";

// curl -H "Authorization: Bearer <your_token>" http://localhost:3000/api/v1/private-endpoint

export const handlerPrivateEndpoint: RequestHandler = (_req, res) => {
    // const csrfToken = req.cookies['xsrf-token'];
    // const csrfHeader = req.header('x-xsrf-token');

    // if (!csrfToken || !csrfHeader || csrfToken !== csrfHeader) {
    //   return res.status(403).json({ error: 'Invalid CSRF token' });
    // }

    res.json({
        message: 'You accessed the protected route'
    });
}
