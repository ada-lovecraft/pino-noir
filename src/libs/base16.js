const base16ColorMap = new Map([
  [['background', 'black'], 'base00'],
  [
    [
      'lighter-background',
      'bright-black',
      'line-number',
      'folding-marks',
      'status-bar-background'
    ],
    'base01'
  ],
  [['selection-background'], 'base02'],
  [['comments', 'invisibles', 'line-highlighting', 'dim'], 'base03'],
  [['dark-foreground', 'status-bar-foreground','border'], 'base04'],
  [['foreground', 'text','caret', 'delimiters', 'operators'], 'base05'],
  [['light-foreground'], 'base06'],
  [['light-background'], 'base07'],
  [
    [
      'variables',
      'xml-tags',
      'markup-link-text',
      'markup-lists',
      'diff-deleted',
      'red'
    ],
    'base08'
  ],
  [
    [
      'integers',
      'boolean',
      'constants',
      'xml-attributes',
      'markup-link-url',
      'orange'
    ],
    'base09'
  ],
  [['classes', 'markup-bold', 'search-text-background', 'yellow'], 'base0A'],
  [
    ['strings', 'inherited-class', 'markup-code', 'diff-inserted', 'green'],
    'base0B'
  ],
  [
    [
      'support',
      'regular-expressions',
      'escape-characters',
      'markup-quotes',
      'cyan'
    ],
    'base0C'
  ],
  [['functions', 'methods', 'attribute-ids', 'headings', 'blue'], 'base0D'],
  [
    [
      'keywords',
      'storage',
      'selector',
      'markup-italic',
      'diff-changed',
      'magenta'
    ],
    'base0E'
  ],
  [['deprecated', 'embedded-language-tags', 'brown'], 'base0F']
])

export function getBase16ColorName(color) {
  if (/base[0-9A-F]/.test(color)) {
    return color
  }
  const key = Array.from(base16ColorMap.keys()).find(d => d.includes(color))
  if (key) {
    return base16ColorMap.get(key)
  }
  return `base05`
}
