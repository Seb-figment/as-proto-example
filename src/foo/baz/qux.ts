import { Writer, Reader } from "as-proto";
import { foo as foo_2 } from "./foo";

export namespace foo {
  export namespace baz {
    export class Qux {
      static encode(message: Qux, writer: Writer): void {
        const a = message.a;
        if (a !== null) {
          writer.uint32(10);
          writer.fork();
          foo_2.baz.Foo.encode(a, writer);
          writer.ldelim();
        }

        writer.uint32(18);
        writer.string(message.b);
      }

      static decode(reader: Reader, length: i32): Qux {
        const end: usize = length < 0 ? reader.end : reader.ptr + length;
        const message = new Qux();

        while (reader.ptr < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.a = foo_2.baz.Foo.decode(reader, reader.uint32());
              break;

            case 2:
              message.b = reader.string();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      }

      a: foo_2.baz.Foo | null;
      b: string;

      constructor(a: foo_2.baz.Foo | null = null, b: string = "") {
        this.a = a;
        this.b = b;
      }
    }
  }
}
