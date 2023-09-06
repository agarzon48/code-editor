const generateFile = ({
  format,
  content,
  name,
  config = {
    type: "text/plain",
  },
}: generateFileParams) => {
  const blob = new Blob([content], config);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.${format}`;
  link.click();
  URL.revokeObjectURL(url);
};

export default generateFile;

type generateFileParams = {
  format: string;
  content: string;
  name: string;
  config?: {
    type: string;
  };
};
