const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ message: 'Autenticazione richiesta' }); // Risposta generica se non autenticato
    }
  };
  
  const ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
      return next();
    } else {
      res.status(403).json({ message: 'Accesso negato' });
    }
  };
  
  export { ensureAuthenticated, ensureAdmin };
  