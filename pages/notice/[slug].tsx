import { readdirSync } from 'fs';
import { GetStaticProps, NextPage } from 'next';
import * as matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import Layout from '@components/layout';

const Post: NextPage<{ notice: string; data: any }> = ({ notice, data }) => {
  return (
    <Layout text={data.desc} back>
      <div
        className='prose prose-stone flex flex-col w-full p-4 lg:ml-16'
        dangerouslySetInnerHTML={{ __html: notice }}
      />
    </Layout>
  );
};

export function getStaticPaths() {
  const files = readdirSync('./notice').map(file => {
    const [name, _] = file.split('.');
    // [slug] 오브젝트
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ctx => {
  // readFileSync의 shortcut gray-matter로 파싱하기
  // {data, content} data는 front-matter content는 컨텐츠
  const { data, content } = matter.read(`./notice/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  console.log(value);
  return {
    props: {
      data,
      notice: value
    }
  };
};

export default Post;
