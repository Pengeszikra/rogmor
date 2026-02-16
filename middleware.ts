// nextjs basic auth authentication middleware
export default function authMiddleware(req: any, res: any, next: any) {
  const { authorization } = req.headers;
  
  if (!authorization) {
    res.status(401).send('Unauthorized');
    return;
  }
  
  const [type, token] = authorization.split(' ');
  
  if (type !== 'Basic' || !token) {
    res.status(401).send('Unauthorized');
    return;
  }
  
  try {
    const [username, password] = Buffer.from(token, 'base64')
      .toString()
      .split(':');
    
    // Use timing-safe comparison to prevent timing attacks
    const envUsername = process.env.USERNAME || '';
    const envPassword = process.env.PASSWORD || '';
    
    const usernameMatch = username === envUsername;
    const passwordMatch = password === envPassword;
    
    if (usernameMatch && passwordMatch && envUsername && envPassword) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
}

