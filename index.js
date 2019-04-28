var through = require('through2')
var bindexOf = require('buffer-indexof')

var indexOf = function(buf, search, i) {
  i = bindexOf(buf, search, i)
  if (i > -1 && buf.length - i < search.length) return -1;
  return i
}

var partialEnding = function(buffer, needle) {
  while (needle.length) {
    if (indexOf(buffer, needle, buffer.length-needle.length) > -1) return true
    needle = needle.slice(0, needle.length-1)
  }
  return false
}

var createStream = function(opts, fmt) {
  if (typeof opts === 'function') return createStream(null, opts)
  if (!opts) opts = {}

  var start = Buffer.from(opts.start || '{{')
  var end = Buffer.from(opts.end || '}}')

  var min = start.length+end.length
  var first = start[0]
  var prev = null

  return through(function(data, enc, cb) {
    if (prev) {
      data = Buffer.concat([prev, data])
      prev = null
    }

    while (data.length) {
      var si = indexOf(data, start)

      if (si === -1) {
        if (partialEnding(data, start)) {
          prev = data
          return cb()
        }
        return cb(null, data)
      }

      var ei = indexOf(data, end)
      if (ei === -1) {
        prev = data
        return cb()
      }

      this.push(data.slice(0, si))

      while (true) {
        var rem = data.slice(si + 1, ei)
        var idx = indexOf(rem, start)
        if (idx === -1) break
        idx += si + 1
        this.push(data.slice(si, idx))
        si = idx
      }

      var name = data.slice(si+start.length, ei)

      var val = fmt(name.toString())

      if (val) this.push(val)

      data = data.slice(ei+end.length)
    }

    cb()
  }, function(cb) {
    if (prev) this.push(prev)
    cb()
  })
}

module.exports = createStream
