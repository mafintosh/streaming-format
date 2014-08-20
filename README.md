# streaming-format

Simple streaming formatter

```
npm install streaming-format
```

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

## License

MIT