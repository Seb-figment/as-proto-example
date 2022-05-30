import { Writer, Reader } from "as-proto";
import { foo } from "../foo/baz/foo";

export namespace bar {
  export class Qux {
    static encode(message: Qux, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.a);

      writer.uint32(18);
      writer.string(message.b);

      const c = message.c;
      if (c !== null) {
        writer.uint32(26);
        writer.fork();
        bar.Qux.QuxStuff.encode(c, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): Qux {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new Qux();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.a = reader.uint32();
            break;

          case 2:
            message.b = reader.string();
            break;

          case 3:
            message.c = bar.Qux.QuxStuff.decode(reader, reader.uint32());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    a: u32;
    b: string;
    c: bar.Qux.QuxStuff | null;

    constructor(a: u32 = 0, b: string = "", c: bar.Qux.QuxStuff | null = null) {
      this.a = a;
      this.b = b;
      this.c = c;
    }
  }

  export namespace Qux {
    export class QuxStuff {
      static encode(message: QuxStuff, writer: Writer): void {
        const a = message.a;
        for (let i = 0; i < a.length; ++i) {
          writer.uint32(10);
          writer.fork();
          foo.baz.Foo.encode(a[i], writer);
          writer.ldelim();
        }

        writer.uint32(16);
        writer.uint64(message.b);
      }

      static decode(reader: Reader, length: i32): QuxStuff {
        const end: usize = length < 0 ? reader.end : reader.ptr + length;
        const message = new QuxStuff();

        while (reader.ptr < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.a.push(foo.baz.Foo.decode(reader, reader.uint32()));
              break;

            case 2:
              message.b = reader.uint64();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      }

      a: Array<foo.baz.Foo>;
      b: u64;

      constructor(a: Array<foo.baz.Foo> = [], b: u64 = 0) {
        this.a = a;
        this.b = b;
      }
    }
  }
}
