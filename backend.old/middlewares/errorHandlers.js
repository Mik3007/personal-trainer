export const badRequestHandler = (err, req, res, next) => {
    if (err.status === 400) {
      res.status(400).send({ message: err.message });
    } else {
      next(err);
    }
  };
  
  export const notFoundHandler = (req, res, next) => {
    res.status(404).send({ message: "Risorsa non trovata" });
  };
  
  export const genericErrorHandler = (err, req, res, next) => {
    res.status(err.status || 500).send({ message: err.message || "Errore generico sul server" });
  };
  