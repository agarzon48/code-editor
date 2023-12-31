import { useEffect, useState, useMemo } from "react";

import Corporative from "../Corporative";
import Editor from "../Editor";
import useCSSContext from "../../contexts/CSSContext";
import useHTMLContext from "../../contexts/HTMLContext";
import useJSContext from "../../contexts/JSContext";

import classes from "./App.module.css";

function App() {
  const HTMLCtx = useHTMLContext();
  const CSSCtx = useCSSContext();
  const JSCtx = useJSContext();
  const [srcDoc, setSrcDoc] = useState("");

  const closedEditors = useMemo(
    () => [HTMLCtx, CSSCtx, JSCtx].filter((ctx) => !ctx.open),
    [HTMLCtx, CSSCtx, JSCtx]
  );

  const canCloseEditors = useMemo(
    () => closedEditors.length !== 2,
    [closedEditors]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <!DOCTYPE html>
      <html>
        <head>${HTMLCtx.head}</head>
        <body>${HTMLCtx.value}</body>
        <style>${CSSCtx.value}</style>
        <script>${JSCtx.value}</script>
      </html>
    `);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [HTMLCtx.value, HTMLCtx.head, CSSCtx.value, JSCtx.value]);

  return (
    <>
      <Corporative />
      <div className={classes["editors-section"]}>
        <Editor canCloseEditors={canCloseEditors} ctx={HTMLCtx} />
        <Editor canCloseEditors={canCloseEditors} ctx={CSSCtx} />
        <Editor canCloseEditors={canCloseEditors} ctx={JSCtx} />
        {Boolean(closedEditors?.length) && (
          <div className={classes.closed}>
            {closedEditors.map((editor) => (
              <p key={editor.id} onClick={editor.openEditor}>
                {editor.id.toUpperCase()}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={classes["preview-section"]}>
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          frameBorder={0}
        ></iframe>
      </div>
    </>
  );
}

export default App;
