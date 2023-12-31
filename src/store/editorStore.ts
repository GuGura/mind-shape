import { create } from "zustand";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import { withImages } from "@/components/editor/plugins/withImages";
import { withHistory } from "@/components/editor/plugins/with-history";
import { CustomEditor } from "../../@types/slate";

type State = {
  editor: CustomEditor;
  title: string;
  isLink: boolean;
  category: string;
  contents: any[] | null;
  isLoading: boolean;
  isOnlyRead: boolean;
};

type Action = {
  setLink: (isLink: boolean) => void;
  setTitle: (value: string) => void;
  setCategory: (value: string) => void;
  setContents: (value: any) => void;
  setIsLoading: (value: boolean) => void;
  setIsOnlyRead: (value: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  editor: withImages(withReact(withHistory(createEditor()))),
  title: "",
  category: "금전/계약",
  contents: [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ],
  isLink: false,
  isLoading: false,
  isOnlyRead: false,
};

export const useEditorStore = create<State & Action>()((set) => ({
  editor: withImages(withReact(withHistory(createEditor()))),
  title: "",
  category: "금전/계약",
  isLink: false,
  contents: null,
  isLoading: false,
  isOnlyRead: false,
  setLink: (isLink) => set(() => ({ isLink: isLink })),
  setTitle: (value) => set(() => ({ title: value })),
  setCategory: (value) => set(() => ({ category: value })),
  setContents: (value) => set(() => ({ contents: value })),
  setIsLoading: (value) => set(() => ({ isLoading: value })),
  setIsOnlyRead: (value) => set(() => ({ isOnlyRead: value })),
  reset: () => set(initialState),
}));
