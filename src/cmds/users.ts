exports.command = 'users <command>'
exports.desc = 'Manage users'
exports.builder = function (yargs: any) {
  return yargs.commandDir('users')
}
exports.handler = function (argv: any) {}