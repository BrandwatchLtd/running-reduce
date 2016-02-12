var through = require('through2')

module.exports = make(through)
module.exports.obj = make(through.obj)

function make (thru) {
  return function reduce (options, fn, memo) {
    if (typeof options === 'function') {
      memo = fn
      fn = options
      options = {}
    }
    return thru(options, function (chunk, encoding, callback) {
      memo = fn(memo, chunk)
      this.push(memo)
      callback()
    })
  }
}
