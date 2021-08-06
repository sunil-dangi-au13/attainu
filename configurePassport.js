let passport = require("passport");
let Strategy = require("passport-local").Strategy;
const mu = require("./db/MongoUtils.js");

let usersMap = new Map();

const luis = { name: "luis", username: "luis", password: "luis" };
const pedrin = { name: "pedrin", username: "pedrin", password: "pedrin" };
usersMap.set(luis.username, luis);
usersMap.set(pedrin.username, pedrin);

mu.passport.getAll().then((res) => {
    for (let k in res) {
        let usr = res[k];
        console.log(usr);
        usersMap.set(usr.username, usr);
    }
});

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
    new Strategy(function (username, password, cb) {
        console.log("Strategy", username, password);
        mu.passport.getUser(username, password).then((usr) => {
            console.log(usr);
            if (!usr) {
                return cb(null, false);
            } else {
                return cb(null, usr);
            }
        });
    })
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});

const fillMap = () => {
    return mu.passport.getAll().then((res) => {
        for (let k in res) {
            let usr = res[k];
            console.log(usr);
            if (!usersMap.has(usr.username)) usersMap.set(usr.username, usr);
        }
        console.log(usersMap);
    });
};

passport.deserializeUser(function (username, cb) {
    fillMap().then(() => {
        if (usersMap.has(username)) {
            cb(null, usersMap.get(username));
        } else {
            cb(new Error("user serialized not found"));
        }
    });
});

const configurePassport = (app) => {
    app.use(require("body-parser").urlencoded({ extended: true }));
    app.use(
        require("express-session")({
            secret: "luis loves me ",
            resave: false,
            saveUninitialized: false,
        })
    );

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = configurePassport;
