import { data } from "@/data";
import { useLocation } from "react-router-dom";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import { ClassAttributes, HTMLAttributes } from "react";
import "highlight.js/styles/atom-one-dark.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const len = data.length;

const components = {
  code({children, ...props }: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps) {
    return (
      <code {...props} className="before:hidden after:hidden">
        {children}
      </code>
    );
  },
};

export const Answer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const indexVal = queryParams.get("index") || "";
  const [index, setIndex] = useState(+indexVal);

  const changeIndex = (index:number) => {
    window.history.replaceState(
      {},
      "title",
      window.location.href.replace(/index=\d+/, `index=${index}`)
    );
    setIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <div
      className="flex flex-col gap-6 mb-14"
    >
      <ReactMarkdown className={"prose prose-lg max-w-none"}>
        {`【${+index + 1}】${data[+index]?.title}`}
      </ReactMarkdown>
      <Tabs defaultValue="account">
        <TabsList className="">
          <TabsTrigger value="account">参考答案</TabsTrigger>
          <TabsTrigger value="password">答题要点</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ReactMarkdown
            components={components}
            className="prose prose-g max-w-none"
            rehypePlugins={[rehypeRaw, rehypeHighlight, gfm]}
          >
            {data[+index]?.explanation}
          </ReactMarkdown>
        </TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
      <footer className="fixed left-0 bottom-0 p-3 bg-white border-t border-solid border-t-gray-200 flex justify-end gap-3 box-border w-[100%] sm:w-4/5 sm:left-[10%]">
        <Button
          variant="secondary"
          onClick={() => {
            const pre = index === 0 ? len - 1 : index - 1;
            changeIndex(pre);
          }}
        >
          上一题
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            const next = index === len - 1 ? 0 : index + 1;
            changeIndex(next);
          }}
        >
          下一题
        </Button>
      </footer>
    </div>
  );
};
