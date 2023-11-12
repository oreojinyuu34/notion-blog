import { Client } from "@notionhq/client";

const notion =new Client ({
  auth: process.env.NOTION_TOKEN,
})

export const getAllPosts =async () => {
  const databaseId: string = process.env.NOTION_DATABASE_ID as string;
  const posts = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
  })

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  })
}

type Tag = {
  name: string;
}

const getPageMetaData = (post: any) => {
  const getTags = (tags: Tag[]) => {
    const allTags = tags.map((tag: Tag) => {
      return tag.name;
    });
    return allTags;
  }
  return {
    id: post.id,
    icon: post.icon?.external?.url ?? '',
    title: post.properties.名前.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.日付.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    //tags: post.properties.タグ.multi_select,下のコードに変更してmap関数で複数データ取得
    tags: getTags(post.properties.タグ.multi_select),
  };

}

export const getSinglePost = async (slug: string) => {
  const databaseId: string = process.env.NOTION_DATABASE_ID as string;
  const response = await notion.databases.query({
    database_id:databaseId,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        }
      }
    }
  })

  const page = response.results[0]
  // console.log(page)

  return {
    page,
  }
}
