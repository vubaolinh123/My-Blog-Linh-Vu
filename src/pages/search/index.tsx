import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { search } from "../../api/blog";
import PageContent from "../../components/client/PageContent";
import PageHeader from "../../components/client/PageHeader";
import HeadMeta from "../../components/Meta";

type ISearchProps = {
  result: any;
  keyword: string;
};

const SearchPage: NextPage<ISearchProps> = ({ result, keyword }) => {
  return (
    <div>
      <HeadMeta title={`Kết quả tìm kiếm cho: ${keyword}`} />
      <PageHeader title={`Kết quả tìm kiếm: ${keyword}`} />
      <PageContent
        data={result}
        resultText={"Không có bài viết nào! Hãy thử tìm kiếm với từ khóa khác!"}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const keyword = query.keyword as string;
    if (!keyword) {
      return {
        notFound: true,
      };
    }
    const result = await search(keyword);
    if (!result) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        result,
        keyword,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default SearchPage;
