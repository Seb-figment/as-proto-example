import { Writer, Reader } from "as-proto";
import { bar as bar_2 } from "./qux";
import { foo } from "../foo/baz/qux";

export namespace bar {
  export class Bar {
    static encode(message: Bar, writer: Writer): void {
      writer.uint32(10);
      writer.bytes(message.a);

      const b = message.b;
      for (let i = 0; i < b.length; ++i) {
        writer.uint32(18);
        writer.fork();
        bar_2.Qux.encode(b[i], writer);
        writer.ldelim();
      }

      const c = message.c;
      for (let i = 0; i < c.length; ++i) {
        writer.uint32(26);
        writer.fork();
        foo.baz.Qux.encode(c[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): Bar {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Bar();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.a = reader.bytes();
            break;

          case 2:
            message.b.push(bar_2.Qux.decode(reader, reader.uint32()));
            break;

          case 3:
            message.c.push(foo.baz.Qux.decode(reader, reader.uint32()));
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    a: Uint8Array;
    b: Array<bar_2.Qux>;
    c: Array<foo.baz.Qux>;

    constructor(
      a: Uint8Array = new Uint8Array(0),
      b: Array<bar_2.Qux> = [],
      c: Array<foo.baz.Qux> = []
    ) {
      this.a = a;
      this.b = b;
      this.c = c;
    }
  }
}
