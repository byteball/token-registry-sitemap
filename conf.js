/*jslint node: true */
"use strict";
exports.bServeAsHub = false;
exports.bLight = true;
exports.bNoPassphrase = true;
exports.webPort = null;

exports.webServerPort = process.env.testnet ? 3003 : 3000;
exports.testnet = process.env.testnet == "1";

exports.hub = process.env.testnet ? 'obyte.org/bb-test' : 'obyte.org/bb';

exports.token_registry_aa_address = "O6H6ZIFI57X3PLTYHOCVYPP5A553CYFQ"
