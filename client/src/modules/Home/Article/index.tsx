import { ReactNode } from "react";
export const Article = ({
  title,
  sections,
  children,
}: {
  children: ReactNode;
  title: string;
  sections?: string[];
}) => {
  return (
    <div className="bg-white p-5 flex-1">
      <header className="text-xl">{title}</header>
      {sections?.map((item) => <div className="text-gray-500 text-sm my-4" key={item}>{item}</div>)}
      {children}
    </div>
  );
};
