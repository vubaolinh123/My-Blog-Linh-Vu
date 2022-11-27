import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { read } from "../../api/tag";
import PageContent from "../../components/client/PageContent";
import PageHeader from "../../components/client/PageHeader";

type TagProps = {
  tag: any;
  blogsOfTag: any;
};

const TagPage: NextPage<TagProps> = ({ tag, blogsOfTag }) => {
  return (
    <div>
      <PageHeader title={`Tag: ${tag.name}`} />
      <PageContent data={blogsOfTag} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugTag = params?.slugTag as string;
  try {
    let blogsOfTag: any = await read(slugTag);
    const blogsOfTagFilter = blogsOfTag.blog.filter(
      (item: { status: number }) => item.status === 1
    );
    return {
      props: {
        tag: blogsOfTag.tag,
        blogsOfTag: blogsOfTagFilter,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default TagPage;
