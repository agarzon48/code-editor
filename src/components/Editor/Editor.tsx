import CodeMirror from "@uiw/react-codemirror";
import { Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";

import classes from "./Editor.module.css";

export default function Editor({ ctx }: EditorProps) {
  const handleUserInput = ctx.handleUserInput;

  return (
    <>
      <div className={classes["editor-title"]}>
        <h2>{ctx.title}</h2>
      </div>
      <div className={classes["editor-button"]}></div>
      <CodeMirror
        value={ctx.value}
        height="200px"
        extensions={[ctx.lang]}
        theme={oneDark}
        onChange={handleUserInput}
      />
    </>
  );
}

type EditorProps = {
  ctx: {
    title: string;
    value: string;
    handleUserInput: (value: string, viewUpdate: object) => void;
    lang: Extension;
  };
};
