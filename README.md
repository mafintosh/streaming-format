# streaming-format

Simple streaming formatter

```
npm install streaming-format
```

[![build status](http://img.shields.io/travis/mafintosh/streaming-format.svg?style=flat)](http://travis-ci.org/mafintosh/streaming-format)

## Usage

Assuming you have a stream that contains handlebars format values like

```
... BIG DATA ...
{{hello}} world
... MORE BIG DATA ...
```

And you want to replace `{{hello}}` with a another value without reading the entire
stream into memory use this module

``` js
var format = require('streaming-format')

bigData
  .pipe(format(function(name) {
    return name.toUpperCase()
  }))
  .pipe(process.stdout)
```

Which will produce

```
... BIG DATA ...
HELLO world
... MORE BIG DATA ...
```

## API

`var stream = format([opts], replacer)` where `opts` can contain

``` js
{
  start: '{{', // set the format start string
  end: '}}'    // set the format end string
}
```

## Command line tool

There is also a command line tool available

```
npm install -g streaming-format
echo 'hello {{hello}}' | format --hello world # prints hello world
```

## License

MIT