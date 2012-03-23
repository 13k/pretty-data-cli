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

## (\*nix) Examples

* Page through the <s>in</s>human-readable GData API

```
curl -s "https://gdata.youtube.com/feeds/api/standardfeeds/top_rated" | pretty -t xml | less
```
PS: I think almost all GData APIs have a [prettyprint][pretty-print-param-url] parameter available

* Read Twitter's global trends

```
curl -s "http://api.twitter.com/1/trends/1.json" | pretty -t json
```

[pretty-data-url]: https://github.com/vkiryukhin/pretty-data
[mime-url]: https://github.com/bentomas/node-mime
[pretty-print-param-url]: https://developers.google.com/youtube/2.0/developers_guide_protocol#prettyprintsp
