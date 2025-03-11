"use client";
import timelineDataEn from "@/public/data/timelineEn.json";
import timelineDataEs from "@/public/data/timelineEs.json";
import Tag from "./about-tag";
import { usePathname } from "next/navigation";

const Timeline = () => {
  const pathname = usePathname();

  let timelineData = timelineDataEn;
  if (pathname.includes("/es")) {
    timelineData = timelineDataEs;
  }

  return (
    <div className="text-lg">
      {timelineData.data.map((item, index) => (
        <div key={"W" + index} className="flex my-5">
          <div>
            <div className="flex justify-start items-center rounded-full w-16 h-16 border">
              <div className="flex h-[72px] w-[72px] font-bold rounded-full justify-center items-center lg:text-xl text-pretty">
                {item.year.toString()}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start h-max mb-5 px-6 text-wrap">
            <div>
              <div className="font-bold text-sm lg:text-xl">{item.title}</div>
              <span className="text-teal-600 font-bold text-sm">
                {item.company}
              </span>
            </div>

            <div className="text-sm lg:text-lg mt-2 text-pretty text-muted-foreground">
              <ul>
                {item.tasks.map((task, index) => (
                  <li key={index}>&bull; {task}</li>
                ))}
              </ul>
            </div>
            <ul className="mt-1 flex flex-wrap" aria-label="Technologies used:">
              {item.tags.map((tag, index) => (
                <li key={"L" + index} className="mr-1.5 mt-2">
                  <Tag title={tag} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
