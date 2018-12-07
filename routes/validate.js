const emailProviders = require('email-providers');

module.exports.checkEmail = (email) => {
    if(email.indexOf('@') > -1) {
        const value = email.split('@')[0];
        const provider = email.split('@')[1];

        if(value.length < 1) {
            createMassage(register, res, 'Invalid email', body);
            return false;
        }  else {
            for(let i = 0; i < emailProviders.length; i++) {
                if(emailProviders[i] === provider) {
                    return true
                }
            }

            return false;
        }
    } else {
        return false;
    }
}
