const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
    const mu = {},
        hostname = process.env.DB_HOST,
        port = process.env.DB_PORT,
        dbName = process.env.DB_NAME,
        colName = process.env.DB_COL;

    //Connection to db
    mu.connect = () => {
        const uri = process.env.MONGO_DB_ATLAS;
        const url = `mongodb://${hostname}:${port}`;
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        console.log("Connecting");
        return client.connect();
    };

    mu.algo = {};

    //Find documents in DB
    mu.algo.find = (query) =>
        mu.connect().then((client) => {
            const reportesCol = client.db(dbName).collection(colName);
            return reportesCol
                .find(query)
                .sort({ timestamp: -1 })
                .toArray()
                .finally(() => client.close());
        });

    mu.algo.findLast = (query) =>
        mu.connect().then((client) => {
            const reportesCol = client.db(dbName).collection(colName);
            return reportesCol
                .find(query)
                .limit(1)
                .sort({ _id: -1 })
                .toArray()
                .finally(() => client.close());
        });

    //Insert documents in DB
    mu.algo.insert = (grade) =>
        mu.connect().then((client) => {
            const reportesCol = client.db(dbName).collection(colName);
            return reportesCol.insertOne(grade).finally(() => client.close());
        });

    //Find one document in db
    mu.algo.findOne = (query) =>
        mu.connect().then((client) => {
            const algoCol = client.db(dbName).collection(colName);
            return algoCol.findOne(query).finally(() => client.close());
        });

    //Update a document
    mu.algo.updateOne = (algo, nuevo) =>
        mu.connect().then((client) => {
            const algoCol = client.db(dbName).collection(colName);
            return algoCol.updateOne(algo, nuevo).finally(() => client.close());
        });

    mu.algo.getProgramas = () =>
        mu.connect().then((client) => {
            const reportesCol = client.db(dbName).collection("programas");
            return reportesCol
                .find()
                .sort({ programa: -1 })
                .toArray()
                .finally(() => client.close());
        });

    mu.algo.getMaterias = (query) =>
        mu.connect().then((client) => {
            const reportesCol = client.db(dbName).collection("programas");
            return reportesCol
                .find(query)
                .toArray()
                .finally(() => client.close());
        });

    mu.passport = {};

    mu.passport.register = (user) =>
        mu.connect().then((client) => {
            console.log("back ", user);
            const newUser = client.db(dbName).collection("users");
            return newUser.insertOne(user).finally(() => client.close());
        });

    mu.passport.getUser = (username, password) =>
        mu.connect().then((client) => {
            const findUser = client.db(dbName).collection("users");
            const query = { username: username, password: password };
            return findUser.findOne(query).finally(() => client.close());
        });

    mu.passport.findLast = (query) =>
        mu.connect().then((client) => {
            const reportesCol = client.db(dbName).collection("users");
            return reportesCol
                .find(query)
                .limit(1)
                .sort({ _id: -1 })
                .toArray()
                .finally(() => client.close());
        });

    mu.passport.getAll = () =>
        mu.connect().then((client) => {
            const reportesCol = client.db(dbName).collection("users");
            return reportesCol
                .find()
                .sort({ timestamp: -1 })
                .toArray()
                .finally(() => client.close());
        });

    return mu;
}

module.exports = MongoUtils();
