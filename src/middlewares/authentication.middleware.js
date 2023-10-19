const requireAuth = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin' || req.session.user.role === 'usuario') {
            next();
        } else {
            res.status(403).send("No tiene permisos para acceder a esta página");
        }
    } else {
        res.redirect('/login');
    }
};

const auth = (name, role) => (req, res, next) => {
    if (req.session.user && req.session.user.first_name === name && req.session.user.role === role) {
        next();
    } else {
        res.status(401).send("Error de autenticación");
    }
};

module.exports = { requireAuth, auth };
