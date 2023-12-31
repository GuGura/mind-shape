"use client";
import {
  BLOCK_HEADING_ONE,
  BLOCK_HEADING_THREE,
  BLOCK_HEADING_TWO,
  BLOCK_QUOTE,
  BULLETED_LIST,
  HR,
  IMAGE,
  LIST_ITEM,
  NUMBER_LIST,
} from "@/constant/slate";
import { HrElement } from "@/components/editor/plugins/hr-element";
import { ImageElement } from "@/components/editor/plugins/image-element";
import * as Tooltip from "@radix-ui/react-tooltip";
import { IconQuote } from "@/public/svg";

export type ElementProps = {
  attributes: any;
  children?: any;
  element: any;
};
type LeafProps = {
  attributes: any;
  children?: any;
  underline?: any;
  leaf: any;
  code?: any;
};

export const Element = ({ attributes, children, element }: ElementProps) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case BLOCK_HEADING_ONE:
      return (
        <h1 style={style} className={`text-[32px] font-bold`} {...attributes}>
          {children}
        </h1>
      );
    case BLOCK_HEADING_TWO:
      return (
        <h2 style={style} className={`text-[28px] font-bold`} {...attributes}>
          {children}
        </h2>
      );
    case BLOCK_HEADING_THREE:
      return (
        <h3 style={style} className={`text-[24px] font-bold`} {...attributes}>
          {children}
        </h3>
      );
    case BLOCK_QUOTE:
      return (
        <div className={"relative"}>
          <blockquote
            style={style}
            className={`mb-2 ml-[20px] gap-[5px] text-[17px] italic leading-[2]`}
            {...attributes}
          >
            {children}
          </blockquote>
          <div className={"absolute top-0"}>
            <IconQuote
              isActive={false}
              css={{ width: "17px", height: "17px", color: "#cfcfcf" }}
            />
          </div>
        </div>
      );
    // case LIST_ITEM:
    //   return (
    //     <li style={style} className={`mb-2`} {...attributes}>
    //       {children}
    //     </li>
    //   );
    // case BULLETED_LIST:
    //   return (
    //     <ul
    //       style={style}
    //       className={`mb-2 list-inside list-disc text-[20px]`}
    //       {...attributes}
    //     >
    //       {children}
    //     </ul>
    //   );
    // case NUMBER_LIST:
    //   return (
    //     <ol
    //       style={style}
    //       className={`list-inside list-decimal text-[20px]`}
    //       {...attributes}
    //     >
    //       {children}
    //     </ol>
    //   );
    case IMAGE:
      return (
        <ImageElement element={element} attributes={attributes}>
          {children}
        </ImageElement>
      );
    case HR:
      return <HrElement element={element} attributes={attributes} />;
    default:
      return (
        <p style={style} className={`text-[16px]`} {...attributes}>
          {children}
        </p>
      );
  }
};

export const Leaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.code && leaf.text.length > 0) {
    children = (
      <code className={`rounded bg-gray-100 p-0.5 text-[18px] font-thin`}>
        {children}
      </code>
    );
  }
  if (leaf.link && leaf.text.length > 0) {
    leaf.link = leaf.link.includes("http://")
      ? leaf.link
      : `http://${leaf.link}`;
    children = (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className={"text-[#3f6aef]"}>{children}</span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="select-none rounded-[4px] bg-[#222] px-[15px] py-[10px] text-[15px] leading-none text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >
            <a href={`${leaf.link}`} target="_blank">
              {leaf.link}
            </a>
            <Tooltip.Arrow className="fill-[#222]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    );
  }
  return <span {...attributes}>{children}</span>;
};
