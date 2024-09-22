const jwt = require('jsonwebtoken');

const accessSecretKey = 'ILYHA_ACCES';
const refreshSecretKey = 'ILYHA_REFRESH';

module.exports = { 
    authenticateToken(req, res) {
        try {
            const tokens = req.headers['authorization'].split(';').map(token => token.trim());
            
            const accessToken = tokens[0].replace('Bearer ', '');
            const refreshToken = tokens[1];

            if (!accessToken && !refreshToken) return false;

            return jwt.verify(accessToken, accessSecretKey, (err, user) => {
                if (err) {
                    return false;
                }
                return user;
            }) 
        } catch {
            return false;
        }
    },

    generateTokens(user) {
        try {
            return {
                accessToken: jwt.sign({ id: user.ID, role: user.Role }, accessSecretKey, { expiresIn: '1h' }),
                refreshToken: jwt.sign({ id: user.ID, role: user.Role }, refreshSecretKey, { expiresIn: '24h' })
            }; 
        } catch {
            return false;
        }
    }
}