const profileUpdateEmitter = require("./producer/profileUpdate");
const profileUpdateProfilepicEmitter = require("./producer/profileUpdateProfilepic");
const profileUpdateAddressEmitter = require("./producer/profileUpdateAddress");
const profileUpdateUsernameEmitter = require("./producer/profileUpdateUsername");
const userCreateEmitter = require("./producer/userCreate");
const userDeleteEmitter = require("./producer/userDelete");
const grewtaleCreateEmitter = require("./producer/grewtaleCreate");
const grewtaleDeleteEmitter = require("./producer/grewtaleDelete");
const pastCreateEmitter = require("./producer/pastCreate");
const pastDeleteEmitter = require("./producer/pastDelete");
const presentCreateEmitter = require("./producer/presentCreate");
const presentDeleteEmitter = require("./producer/presentDelete");
const futureCreateEmitter = require("./producer/futureCreate");
const futureDeleteEmitter = require("./producer/futureDelete");
const wordCreateEmitter = require("./producer/wordCreate");
const wordDeleteEmitter = require("./producer/wordDelete");

module.exports = {
    profileUpdateEmitter,
    profileUpdateProfilepicEmitter,
    profileUpdateAddressEmitter,
    profileUpdateUsernameEmitter,
    userCreateEmitter,
    userDeleteEmitter,
    grewtaleCreateEmitter,
    grewtaleDeleteEmitter,
    pastCreateEmitter,
    pastDeleteEmitter,
    presentCreateEmitter,
    presentDeleteEmitter,
    futureCreateEmitter,
    futureDeleteEmitter,
    wordCreateEmitter,
    wordDeleteEmitter
}