# running-reduce

Reduce streams to a single value, but with a new value on each new piece of data

### usage

```javascript
var reduce = require('streaming-reduce')

fs.createWriteStream('/path/to/some/file.txt')
  .pipe(reduce.obj(function (memo, chunk) {
    var vowels = chunk.toString().match(/[aeiou]/ig)
    return vowels ? memo + vowels.length : memo
  }, 0))
  .on('data', function (chunk) {
    console.log('Number of vowels seen so far: ' + chunk)
  })

```

### api

#### `transform = reduce([options,] fn, memo)`

Creates a transform stream, calling fn(memo, chunk) on each new chunk. memo s updated to be the return value of fn and pushed out.
Optional options object is passed to the Tranform stream constructor

#### `transform = reduce.obj([options,] fn, memo)`

Same as `reduce` but sets `options.objectMode` to true
