import "./index.scss";
import { data } from "@/data";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

import "highlight.js/styles/atom-one-dark.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const len = data.length;

const components = {
  code({ inline, className, children, ...props }: any) {
      return (
        <code {...props} className="inline-code">
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
  return (
    <div className="answer">
      <ReactMarkdown className={"prose prose-lg max-w-none"}>
        {`【${+index+1}】${data[+index]?.title}`}
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
            rehypePlugins={[rehypeRaw, rehypeHighlight,gfm]}
          >
            {data[+index]?.explanation}
          </ReactMarkdown>
        </TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
      <footer>
        <Button variant="secondary" 
          onClick={()=>setIndex(index===0?len-1:index-1)}
        >上一题</Button>
        <Button variant="secondary" 
        onClick={()=>{
          const next = index===len-1?0:index+1
          // console.log(queryParams)
          // queryParams.set("index",next.toString())
          setIndex(next)
        }}
        >下一题</Button>
      </footer>
    </div>
  );
};
