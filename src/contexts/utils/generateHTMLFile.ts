import generateFile from "./generateFile";

const generateHTMLFile = ({
  head,
  value,
  name,
  config = {
    type: "text/plain",
  },
}: generateFileParams) => {
  const content = `${head}
  <body>
      ${value}
  </body>
</html>
`;

  generateFile({
    format: "html",
    content,
    name,
    config,
  });
};

export default generateHTMLFile;

type generateFileParams = {
  head: string;
  value: string;
  name: string;
  config?: {
    type: string;
  };
};
