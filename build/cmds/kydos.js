"use strict";
exports.command = 'kydos <command>';
exports.desc = 'Manage kydos';
exports.builder = function (yargs) {
    return yargs.commandDir('kydos');
};
exports.handler = function (argv) { };
