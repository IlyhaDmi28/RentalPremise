const bcrypt = require('bcrypt');

const usersDb = require('../repositories/usersDb');
const tokenService = require('../services/tokenService');

const imgSrc = 'data:image/png;base64,';

module.exports = {
    async getResource(req, res) {
        try {
            const user = tokenService.authenticateToken(req, res);
            return user ? res.status(200).send(user) : res.status(401).send(); 
        } catch (error) {
            console.error('Ошибка при получении ресурса:', error);
            return res.status(500).send('Internal Server Error');
        }
    },
    
    async getLogin(req, res) {
        try {
            res.redirect('http://localhost:3000/login');
        } catch (error) {
            console.error('Ошибка при получении страницы входа:', error);
            return res.status(500).send('Internal Server Error');
        }
    },
    
    async executeLogout(req, res) {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.redirect('/auth/login');
        } catch (error) {
            console.error('Ошибка при выполнении выхода:', error);
            return res.status(500).send('Internal Server Error');
        }
    },
    
    async executeLogin(req, res) {
        try {
            let user = await usersDb.findUserByLogin(req.body.login); 
            if (!user || !(await bcrypt.compare(req.body.password, user.Password))) return res.status(401).send(); 
            user.Photo = imgSrc + `${user.Photo ? user.Photo.toString('base64') : null}`; 

            res.status(200).send(tokenService.generateTokens(user));
        } catch (error) {
            console.error('Ошибка при входе:', error);
            return res.status(500).send('Internal Server Error');
        }    
    },
    
    async executeRegister(req, res)  {
        try {
            if(await usersDb.findUserByLogin(req.body.login)) return res.status(409).send();

            let newUser = await usersDb.createEmptyUser(
                req.body.login, 
                req.body.password, 
                req.body.name,
                req.body.surname
            );
    
            newUser.Photo = imgSrc + null;
    
            res.status(200).json(tokenService.generateTokens(newUser));
        } catch (error) {
            console.error('Ошибка при регистрации пользователя:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
}