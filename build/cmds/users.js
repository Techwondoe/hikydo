"use strict";
exports.command = 'users <command>';
exports.desc = 'Manage users';
exports.builder = function (yargs) {
    return yargs.commandDir('users');
};
exports.handler = function (argv) { };
