import { defineComponent as s, openBlock as m, createElementBlock as p, createVNode as a, unref as t } from "vue";
import { useEditor as c, EditorContent as l } from "@tiptap/vue-3";
import u from "@tiptap/starter-kit";
const _ = { class: "rounded-md border border-input" }, B = /* @__PURE__ */ s({
  __name: "RichTextInput",
  props: {
    modelValue: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: r }) {
    const n = o, d = r, i = c({
      content: n.modelValue,
      extensions: [u],
      onUpdate: ({ editor: e }) => {
        d("update:modelValue", e.getHTML());
      }
    });
    return (e, f) => (m(), p("div", _, [
      a(t(l), {
        editor: t(i),
        class: "prose prose-sm max-w-none min-h-[200px] p-3"
      }, null, 8, ["editor"])
    ]));
  }
});
export {
  B as default
};
