import { Protobuf } from "as-proto";
import { foo, bar } from "./src/"

const a: bar.Bar = new bar.Bar(
    new Uint8Array(4),
    [ new bar.Qux(3, "bar.Qux", null)],
    [ new foo.baz.Qux(
        new foo.baz.Foo(1, 2), "foo.baz.Foo"
    )]);
const encoded = Protobuf.encode<bar.Bar>(a, bar.Bar.encode)
const b: bar.Bar = bar.decodeBar(encoded);
