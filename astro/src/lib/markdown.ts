import { marked } from "marked";

export const configureMarkdown = () => {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
};

export const parseMarkdown = (content: string) => {
  return content ? marked.parse(content) : null;
};
