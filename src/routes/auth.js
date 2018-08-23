import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import User from '../data/user/userModel';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const app = express();

app.post('/login', async(req, res) => {

    let body = req.body;

    try {
        const userDB = await User.findOne({ email: body.email });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(email) or password invalid'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'email or (password) invalid'
                }
            });
        }

        const token = jwt.sign({
            user: userDB
        }, process.env.JWT_SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

        res.json({
            ok: true,
            token
        });

    } catch (err) {
        return res.status(500).send(err);
    }

});

app.post('/signup', async(req, res) => {

    let body = req.body;

    let newUser = new User();
    newUser.name = body.name;
    newUser.email = body.email;
    newUser.password = body.password;

    try {
        const userDB = await newUser.save();

        res.json({
            ok: true,
            user: userDB
        });

    } catch (err) {
        res.status(500).send(err);
    }

});



//config google sign in
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }

}

app.post('/google', async(req, res) => {

    let token = req.body.idtoken;

    try {
        const googleUser = await verify(token);
        const userDB = await User.findOne({ email: googleUser.email });

    } catch (err) {
        res.status(500).send(err);
    }

    //if user exists
    if (userDB) {
        if (!userDB.google) {
            userDB.google = true;
            await userDB.save();
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.JWT_SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

        return res.json({
            ok: true,
            user: userDB,
            token
        });

    } else {
        let user = new User();
        user.name = googleUser.name;
        user.email = googleUser.email;
        user.img = googleUser.picture;
        user.google = true;
        user.password = ':)';

        const userDB = await user.save();

        let token = jwt.sign({
            user: userDB
        }, process.env.JWT_SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

        return res.json({
            ok: true,
            user: userDB,
            token
        });
    }


});

module.exports = app;