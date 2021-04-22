import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin,
        isGiver: user.isGiver,
    }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET || 'secret', (error, decode) => {
            if(error) {
                res.status(401).send({ message: 'โทเค็นไม่ถูกต้อง' });
            } else {
                req.user = decode;
                next()
            }
        });
    } else {
        res.status(401).send({ message: 'ไม่มีโทเค็น' });
    }
};

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'โทเค็นแอดมินไม่ถูกต้อง' });
    }
};

export const isGiver = (req, res, next) => {
    if(req.user && req.user.isGiver) {
        next();
    } else {
        res.status(401).send({ message: 'โทเค็นผู้บริจาคไม่ถูกต้อง' });
    }
};

export const isGiverOrAdmin = (req, res, next) => {
    if(req.user && (req.user.isAdmin || req.user.isGiver)) {
        next();
    } else {
        res.status(401).send({ message: 'โทเค็นผู้บริจาคและแอดมินไม่ถูกต้อง' });
    }
};