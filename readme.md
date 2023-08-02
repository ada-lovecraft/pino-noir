# pino-noir

> A (hopefully -!) robust streaming log viewer. Currently supports only pino log types. Future plans to allow any parsable log lines to be displayed/filtered/grouped/and searched.
> Uses [ink](https://term.ink) to render react to the cli.

## Demo

[![asciicast](https://asciinema.org/a/Zp4Nj5SD52HFmDWTiTNOPiGmY.svg)](https://asciinema.org/a/Zp4Nj5SD52HFmDWTiTNOPiGmY)

## Install

1. Clone the repo
2. Install the dependencies
3. run the `dev:ui` script: `$ npm run dev:ui`

## CLI

```
$ pino-noir --help

  Usage
    $ pino-noir

  Options
    --file  path to pino log file

  Examples
    $ pino-noir --name=Jane
    Hello, Jane
    $ cat some.log | pino-noir
```

## Keybindings

Uses vim keybindings for navigation

- `j`/`k` - down/up
- `g`/`G` - bottom of list / top of list
- `w`/`s` - page up/page down
- `return` - select log line to view expanded details

## TODO:

- [x] stream from local file
- [x] multi panel layout
- [x] Log roll colors
- [x] Log roll scrolling
- [x] Log Details view
- [ ] search with `/`
- [ ] filter with `{` using json path `{$.level >= 50}`
- [ ] group logs with `[` using json path to allow for easy workflow tracking `[$.task.id]` which would group all logs with a `{..., task:{id, ...} ... }`.
- [ ] Global settings with `$HOME/.config/.noirrc`
- [ ] Project settings with `$CWD/.noirrc` merged with global
- [ ] Themeing with Base16
- [ ] Configurable Tokenizer
- [ ] Streaming Data Source (cloudwatch, elasticsearch, kinesis, etc...)

## License

This software is licensed under the [WTF Public License](http://www.wtfpl.net/faq/). There license, in its entirety, is as follows:

```
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2023 Ada Lovecraft <ada@codevinsky.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.

```
