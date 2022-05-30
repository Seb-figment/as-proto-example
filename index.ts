import { Protobuf } from "as-proto";
import { foo } from "./src/foo/baz/foo"
import { bar } from "./src/bar/bar";
import { bar as bar_2 } from "./src/bar/qux";
import { foo as foo_2 } from "./src/foo/baz/qux"

const a: bar.Bar = new bar.Bar(
    new Uint8Array(4),
    [ new bar_2.Qux(3, "bar_2.Qux", null)],
    [ new foo_2.baz.Qux(
        new foo.baz.Foo(1, 2), "foo.baz.Foo"
    )]);
const encoded = Protobuf.encode<bar.Bar>(a, bar.Bar.encode)
const b: bar.Bar = Protobuf.decode<bar.Bar>(encoded, bar.Bar.decode);
