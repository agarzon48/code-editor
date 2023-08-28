import { useEffect, useState } from "react";

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${HTMLCtx.value}</body>
        <style>${CSSCtx.value}</style>
        <script>${JSCtx.value}</script>
      </html>
    `);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [HTMLCtx.value, CSSCtx.value, JSCtx.value]);

  console.log("render");
  return (
    <>
      <div className={classes["editors-section"]}>
        <Editor ctx={HTMLCtx} />
        <Editor ctx={CSSCtx} />
        <Editor ctx={JSCtx} />
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
