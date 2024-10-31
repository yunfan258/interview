import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabItem } from "./TabItem";
import { Article } from "./Article";
import logoURL from "@/../assets/imgs/home.jpg";

const tabs = [
  { title: "平台介绍", content: "综合性的前端面试平台", value: "introduction" },
  { title: "访问方式", content: "支持小程序、PC端访问", value: "method" },
  {
    title: "关注、加群",
    content: "关注公众号，加群与大家分享面试经验",
    value: "qq",
  },
];

const imgs = [
  "https://pic.leetcode.cn/1670469513-zaLvON-%E5%B2%97%E4%BD%8D%E9%9D%A2%E8%AF%95%E6%A8%A1%E6%8B%9F%E9%A2%98%E9%9B%86%20%E9%A2%98%E5%BA%93:%E9%A6%96%E9%A1%B5.png?x-oss-process=image%2Fformat%2Cwebp",
  "https://pic.leetcode.cn/1712023852-jdVSOe-%E9%A2%98%E5%BA%93%E6%8E%A8%E8%8D%90%E4%BD%8D%EF%BC%88%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95%EF%BC%89.png?x-oss-process=image%2Fformat%2Cwebp",
  "https://pic.leetcode.cn/1667274067-boYcDi-%E9%AB%98%E9%A2%91%E7%AE%97%E6%B3%95%E5%AE%9E%E6%88%98%EF%BC%88%E5%B0%8F%EF%BC%89-%20%E9%A2%98%E5%BA%93.png?x-oss-process=image%2Fformat%2Cwebp",
];

const contents = [
  {
    value: "introduction",
    block1: {
      title: "综合性的前端面试平台",
      content: [
        "“前端面试题宝典”是一个支持提供面试题库、面试技巧、面试经历、技术文章等诸多内容，综合性的前端面试平台。目前题库已录入 1000+ 前端常见面试题，覆盖 22 类前端方向。并且我们还提供了前端面试辅导服务，由大厂面试官进行一对一的面试辅导。",
      ],
    },
    block2: {
      title: "做更专业的刷题工具",
      content: [
        "各种技术论坛中的面试题集有很多，但是链接分散，而且维护人员的技术良莠不齐，很多题库甚至长期无人维护，可能对大家进行面试准备时造成困扰。",
        "“前端面试题宝典”的目标是做全网更专业的前端面试题库。",
        "“前端面试题宝典”的题库中，所有题目都经过团队成员的校对与审核，保证答案的准确性和实效性。如果大家在使用过程中，对于题目和答案有任何疑问，可以直接添加工作人员微信（微信号：interview-fe2），加群进行反馈。",
      ],
    },
  },
  {
    value: "method",
    block1: {
      title: "小程序端",
      content: [
        "微信搜索小程序“前端面试题宝典”，或者使用微信扫描下方二维码，即可进行刷题。小程序支持“题目收藏”等个性化功能哦~",
      ],
      children: <img className="m-auto" src={logoURL} />,
    },
    block2: {
      title: "PC端",
      content: [
        "《前端面试题宝典》的PC端，在众多用户的期许下，于2021年12月正式推出。访问 这儿 即可在PC端进行刷题。",
        "目前PC端已经支持免登录刷题，并且提供了免费题库和会员题库供大家使用。",
        "PC端的登录功能已在2022年2月份正式推出，使用微信扫码登录。并且将小程序和PC端的用户数据打通，实现多端同步刷题。",
      ],
    },
  },
  {
    value: "qq",
    block1: {
      title: "关注公众号，获取最新资讯",
      content: [
        "官方公众号“前端面试”，不定期提供大厂面经、技术文章，赶紧扫码关注吧~",
      ],
      children: <img className="m-auto" src={logoURL} />,
    },
    block2: {
      title: "加交流群，与大家共同成长",
      content: [
        "我们成立了微信交流群，大家可以在群里讨论技术问题，一块成长。添加工作人员微信，备注“加群”，即可入群哦。",
      ],
      children: <img className="m-auto" src={logoURL} />,
    },
  },
];

export const Home = () => {
  return (
    <div>
      <Carousel className="-mx-3">
        <CarouselContent>
          {imgs.map((src) => (
            <CarouselItem key={src}>
              <img className="w-full" src={src} alt="" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" translate-x-16" />
        <CarouselNext className="-translate-x-16" />
      </Carousel>
      <main className="text-2xl sm:text-3xl text-center my-10">
        面霸修炼场，铸就新一代面霸
      </main>
      <Tabs defaultValue="introduction" className="sm:flex w-full">
        <TabsList className=" flex sm:flex-col justify-start sm:w-[200px] sm:h-[450px]  sm:bg-white">
          {tabs.map(({ title, content, value }) => {
            return (
              <TabsTrigger
                className="p-0 m-0 flex-1 sm:grow-0"
                value={value}
                key={value}
              >
                <TabItem title={title} content={content}></TabItem>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {contents.map(({ value, block1, block2 }) => {
          return (
            <TabsContent className="mt-0" value={value} key={value}>
              <div className="flex gap-6 p-12  bg-gray-50 flex-col sm:flex-row sm:h-[450px]">
                <Article title={block1.title} sections={block1.content}>
                  {block1.children}
                </Article>
                <Article title={block2.title} sections={block2.content}>
                  {block2.children}
                </Article>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
