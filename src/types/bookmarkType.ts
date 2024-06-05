export type bookmarkType = {
  id: string;
  userId: string;
  title: string;
  created: Date;
  bookmarkUrl: string;
  favicon: string;
  isPinned: boolean;
  siteImageUrl: string;
  description: string;
  tags: string[];
};

export type bookmarkArrayType = bookmarkType[];
