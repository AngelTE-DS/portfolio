import { Monitor, Smartphone } from "lucide-react";
import Tag from "./about-tag";
import Image from "next/image";

function Project({
  headline,
  image,
  text,
  tags,
  link,
  indev,
  desktop,
  mobile,
}: {
  headline: string;
  image: string;
  text: string;
  tags: string[];
  link: string;
  indev?: boolean;
  desktop: boolean;
  mobile: boolean;
}) {
  return (
    <div className="flex flex-col transition-all hover:scale-105 scale-100 rounded-lg max-h-max max-w-96 m-4">
      <a href={link} aria-label={text} target="_blank">
        {(mobile || desktop) && (
          <div className="absolute top-4 right-4 flex gap-1 text-white">
            {mobile && <Smartphone />}
            {desktop && <Monitor />}
          </div>
        )}

        <Image
          className="rounded-lg object-cover w-full h-auto"
          priority={true}
          alt={text}
          src={image}
          height={288}
          width={512}
        />
        <div className="p-4 rounded-lg">
          <div className="text-xl font-medium flex gap-2">
            {headline}
            {indev && <div className="text-green-500">&bull;</div>}
          </div>
          <p className="text-muted-foreground">{text}</p>
          <ul className="flex flex-wrap" aria-label="Technologies used:">
            {tags.map((item, index) => (
              <li key={index} className="mr-1.5 mt-2">
                <Tag title={item} />
              </li>
            ))}
          </ul>
        </div>
      </a>
    </div>
  );
}

export default Project;
