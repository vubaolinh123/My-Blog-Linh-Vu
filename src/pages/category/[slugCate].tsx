import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { read } from "../../api/categoryBlog";
import PageContent from "../../components/client/PageContent";
import PageHeader from "../../components/client/PageHeader";
import HeadMeta from "../../components/Meta";

type CategoryProps = {
  category: any;
  blogsOfCategory: any;
};

const CategoryPage: NextPage<CategoryProps> = ({
  category,
  blogsOfCategory,
}) => {
  return (
    <div>
      <HeadMeta title={category.name} />
      <PageHeader title={`Danh mục: ${category.name}`} />
      <PageContent data={blogsOfCategory} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugCate = params?.slugCate as string;
  try {
    let blogsOfCategory: any = await read(slugCate);
    const blogsOfCategoryFilter = blogsOfCategory.blog.filter(
      (item: { status: number }) => item.status === 1
    );
    return {
      props: {
        category: blogsOfCategory.cateBlog,
        blogsOfCategory: blogsOfCategoryFilter,
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

export default CategoryPage;
