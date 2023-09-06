import CodeMirror from "@uiw/react-codemirror";
import { Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";

import ToggleIcon from "./components/ToggleIcon";
import DownloadIcon from "./components/DownloadIcon";

import classes from "./Editor.module.css";

export default function Editor({ ctx, canCloseEditors }: EditorProps) {
  const { handleUserInput, closeEditor, open, downloadFile } = ctx;

  if (!open) {
    return null;
  }

  return (
    <div className={classes.editor}>
      <div className={classes["editor-title"]}>
        <h2>{ctx.title}</h2>
        <DownloadIcon onDownload={downloadFile} open={open} />
        {canCloseEditors && (
          <ToggleIcon
            onClose={canCloseEditors ? closeEditor : () => {}}
            open={open}
          />
        )}
      </div>
      <div className={classes["editor-button"]}></div>
      <CodeMirror
        value={ctx.value}
        height="500px"
        extensions={[ctx.lang]}
        theme={oneDark}
        onChange={handleUserInput}
      />
    </div>
  );
}

type EditorProps = {
  ctx: {
    title: string;
    value: string;
    handleUserInput: (value: string, viewUpdate: object) => void;
    lang: Extension;
    logo: string;
    closeEditor: () => void;
    downloadFile: () => void;
    open: boolean;
  };
  canCloseEditors: boolean;
};
