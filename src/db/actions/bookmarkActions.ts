import db from '@/db/drizzle';
import { bookmarks } from '@/db/schema';
import { bookmarkType } from '@/types/bookmarkType';
import { asc, eq } from 'drizzle-orm';

export const addBookmark = async (data: bookmarkType) => {
  await db.insert(bookmarks).values({
    id: data.id,
    title: data.title,
    favicon: data.favicon,
    isPinned: data.isPinned,
    userId: data.userId,
    bookmarkUrl: data.bookmarkUrl,
    siteImageUrl: data.siteImageUrl,
    description: data.description,
    tags: data.tags,
    created: data.created,
  });
};

export const deleteBookmark = async (id: string) => {
  await db.delete(bookmarks).where(eq(bookmarks.id, id));
};

export const editBookmark = async (data: bookmarkType) => {
  await db
    .update(bookmarks)
    .set({
      id: data.id,
      userId: data.userId,
      created: data.created,
      bookmarkUrl: data.bookmarkUrl,
      siteImageUrl: data.siteImageUrl,
      description: data.description,
      tags: data.tags,
    })
    .where(eq(bookmarks.id, data.id));
};

export const getData = async (userId: string) => {
  const data = await db
    .select()
    .from(bookmarks)
    .orderBy(asc(bookmarks.created))
    .where(eq(bookmarks.userId, userId));
  return data;
};
