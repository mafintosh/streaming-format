var tape = require('tape')
var choppa = require('choppa')
var concat = require('concat-stream')
var fmt = require('./')

tape('echo', function(t) {
  var s = fmt(function() {
    // do nothing
  })

  s.pipe(concat(function(data) {
    t.same(data.toString(), 'hello worldy world')
    t.end()
  }))

  s.write('hello')
  s.write(' worldy ')
  s.write('world')
  s.end()
})

tape('formats', function(t) {
  var s = fmt(function(name) {
    return name.toUpperCase()
  })

  s.pipe(concat(function(data) {
    t.same(data.toString(), 'HELLO world')
    t.end()
  }))

  s.write('{{hello}} world')
  s.end()
})

tape('formats twice', function(t) {
  var s = fmt(function(name) {
    return name.toUpperCase()
  })

  s.pipe(concat(function(data) {
    t.same(data.toString(), 'HELLO world HELLO world')
    t.end()
  }))

  s.write('{{hello}} world')
  s.write(' ')
  s.write('{{hello}} world')
  s.end()
})

tape('format in format twice', function(t) {
  var s = fmt(function(name) {
    return name.toUpperCase()
  })

  s.pipe(concat(function(data) {
    t.same(data.toString(), '{HELLO} world {HELLO} world')
    t.end()
  }))

  s.write('{{{hello}}} world')
  s.write(' ')
  s.write('{{{hello}}} world')
  s.end()
})

tape('formats when chunked', function(t) {
  var c = choppa()
  var s = fmt(function(name) {
    return name.toUpperCase()
  })

  c.pipe(s).pipe(concat(function(data) {
    t.same(data.toString(), 'HELLO world HELLO world')
    t.end()
  }))

  c.write('{{hello}} world')
  c.write(' ')
  c.write('{{hello}} world')
  c.end()
})
