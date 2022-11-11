exports.command = 'kydos <command>'
exports.desc = 'Manage kydos'
exports.builder = function (yargs: any) {
  return yargs.commandDir('kydos')
}
exports.handler = function (argv: any) {}