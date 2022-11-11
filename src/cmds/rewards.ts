exports.command = 'rewards <command>'
exports.desc = 'Manage rewards'
exports.builder = function (yargs: any) {
  return yargs.commandDir('rewards')
}
exports.handler = function (argv: any) {}