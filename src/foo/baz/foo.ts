import { Writer, Reader } from "as-proto";

export namespace foo {
  export namespace baz {
    @unmanaged
    export class Foo {
      static encode(message: Foo, writer: Writer): void {
        writer.uint32(8);
        writer.int32(message.a);

        writer.uint32(16);
        writer.int32(message.b);
      }

      static decode(reader: Reader, length: i32): Foo {
        const end: usize = length < 0 ? reader.end : reader.ptr + length;
        const message = new Foo();

        while (reader.ptr < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.a = reader.int32();
              break;

            case 2:
              message.b = reader.int32();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      }

      a: i32;
      b: i32;

      constructor(a: i32 = 0, b: i32 = 0) {
        this.a = a;
        this.b = b;
      }
    }
  }
}
