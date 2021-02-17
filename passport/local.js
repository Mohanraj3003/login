import LocalStrategy from 'passport-local';
LocalStrategy.Strategy;

import bcrypt from 'bcrypt';

function passportInitialize(passport, getEmail, getId) {

    let valid = async (mail, password, done) => {
        let getUser = await getEmail(mail)
        if (getUser == null) {
            return done(null, false, { message: 'Incorrect Mail..' })
        }
        console.log(getUser)
        try {
            if (await bcrypt.compare(password, getUser.password)) {
                return done(null, getUser)
            } else {
                return done(null, false, { message: 'Incorrect Password...' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'mail' }, valid))
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (id, done) => done(null, await getId(id)))

}

export default passportInitialize