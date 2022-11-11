"use strict";
exports.command = 'rewards <command>';
exports.desc = 'Manage rewards';
exports.builder = function (yargs) {
    return yargs.commandDir('rewards');
};
exports.handler = function (argv) { };
