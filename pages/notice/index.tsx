import Layout from '@components/layout';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { NextPage } from 'next';
import Link from 'next/link';

interface NoticeType {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Notice: NextPage<{ notice: NoticeType[] }> = ({ notice }) => {
  return (
    <Layout title='공지사항'>
      <h1>latest post</h1>
      <span>
        {notice.map((text, i) => (
          <div key={i}>
            <details open>
              <summary>{text.title}</summary>
              <Link href={`notice/${text.slug}`} passHref>
                <span className='underline'>{text.date}</span>
              </Link>
            </details>
          </div>
        ))}
      </span>
    </Layout>
  );
};
export async function getStaticProps() {
  const files = readdirSync('./notice');
  const notices = files.map(file => {
    const content = readFileSync(`./notice/${file}`, 'utf-8');
    const [slug, _] = file.split('.');
    /** 파싱된 md파일은 data에
     * slug는 파일명으로 구분하고 '02-new...', 'md' ES6_feat.
     */
    // const { data } = matter(content);

    return { ...matter(content).data, slug: file };
  });
  console.log(notices);
  return {
    props: {
      notice: notices.reverse()
    }
  };
}
export default Notice;
