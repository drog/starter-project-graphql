import jwt from 'jsonwebtoken';

// ======================
// verify token
// ======================


let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.JWT_SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    });


};

// ======================
// verify admin token
// ======================
let verifyAdminRole = (req, res, next) => {

    let user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: 'user is not admin'
        });
    }

}


module.exports = {
    verifyToken,
    verifyAdminRole
};