#! /bin/bash

# fix import
sed -i -e 's|"./bar/qux"|"./qux"|' -e 's/import { bar }/import { bar as bar_2 }/' ./src/bar/bar.ts
sed -i -e 's/import { bar }/import { bar as bar_2 }/' ./src/bar/bar.ts
sed -i -e 's|"./foo/baz/qux"|"../foo/baz/qux"|' ./src/bar/bar.ts

sed -i -e 's|"./foo/baz/foo"|"../foo/baz/foo"|' ./src/bar/qux.ts

sed -i -e 's|"./foo/baz/foo"|"./foo"|' ./src/foo/baz/qux.ts
sed -i -e 's/import { foo }/import { foo as foo_2 }/' ./src/foo/baz/qux.ts

# fix field name
sed -i -e 's/bar.Qux/bar_2.Qux/' ./src/bar/bar.ts
sed -i -e 's/foo.baz.Foo/foo_2.baz.Foo/' ./src/foo/baz/qux.ts