# pretty-data-cli

**pretty-data-cli** is a command-line interface (CLI) to
[pretty-data][pretty-data-url] with file and stdin support. As such, it
supports pretty printing of JSON, XML, CSS and SQL.

You can also minify (-m switch) instead of pretty print (also a pretty-data feature).

It uses [mime][mime-url] to detect file types based on file extensions.
If no explicit type was given and no file extension was recognizable, it will fail.

When reading from stdin, the type option is required.

Below is the command-line usage help:

```
usage: pretty <files>... [options]

files     Read from FILE(s). Optional.

options:
   -t TYPE, --type TYPE   Data TYPE. If not present, will guess from file extension. Required if no FILE(s) given.
   -m, --minify           Minify instead of pretty print.
```

[pretty-data-url]: https://github.com/vkiryukhin/pretty-data
[mime-url]: https://github.com/bentomas/node-mime
