var test = require('tape')
var reduce = require('./')

test('it exports a function', (t) => {
  t.equals(typeof reduce, 'function')
  t.end()
})

test('it exports a function on the obj property', (t) => {
  t.equals(typeof reduce.obj, 'function')
  t.end()
})

test('the reduce function', (t) => {
  t.test('it pushes the memo on each new piece of data', (t) => {
    var results = []
    var transform = reduce((memo, chunk) => { return memo + chunk }, '0')
    transform.on('data', (chunk) => results.push(chunk))
    transform.write('1')
    transform.write('2')
    transform.write('3')
    transform.end()
    t.deepEquals([new Buffer('01'), new Buffer('012'), new Buffer('0123')], results)
    t.end()
  })

  t.end()
})

test('the reduce.obj function', (t) => {
  t.test('it pushes the memo on each new piece of data', (t) => {
    var results = []
    var transform = reduce.obj((memo, chunk) => { return memo + chunk }, 0)
    transform.on('data', (chunk) => results.push(chunk))
    transform.write(1)
    transform.write(2)
    transform.write(3)
    transform.end()
    t.deepEquals([1, 3, 6], results)
    t.end()
  })

  t.end()
})
