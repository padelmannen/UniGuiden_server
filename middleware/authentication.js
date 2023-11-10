function authenticateUser(req, res, next) {
    // Implementera autentisering här
    // Kontrollera användarnamn och lösenord
    // Generera och verifiera JWT-tokens, osv.
  
    if (true) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
  
  module.exports = {
    authenticateUser
  };
  