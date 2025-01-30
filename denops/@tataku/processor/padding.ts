import { as, assert, is } from "jsr:@core/unknownutil@4.3.0";
import type { ProcessorFactory } from "jsr:@omochice/tataku-vim@1.1.0";

const isOption = is.ObjectOf({
  before: as.Optional(is.ArrayOf(is.String)),
  after: as.Optional(is.ArrayOf(is.String)),
});

const processor: ProcessorFactory = (_: unknown, option: unknown) => {
  assert(option, isOption);
  return new TransformStream<string[]>({
    start: (controller) => {
      if (option.before === undefined) {
        return;
      }
      controller.enqueue(option.before);
    },
    flush: (controller) => {
      if (option.after === undefined) {
        return;
      }
      controller.enqueue(option.after);
    },
  });
};

export default processor;
