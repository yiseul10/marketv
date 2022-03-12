import Layout from '@components/layout';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { NextPage } from 'next';
import Link from 'next/link';

interface NoticeType {
  title: string;
  date: string;
  desc: string;
  slug: string;
}

const Notice: NextPage<{ notice: NoticeType[] }> = ({ notice }) => {
  return (
    <Layout title='공지사항'>
      <div className='w-full mx-auto p-4 text-stone-800'>
        <span className='mb-5 inline-flex items-center bg-amber-300 px-1 text-xs font-medium'>
          <h1>새로운 소식</h1>
        </span>
        <span className='space-y-8'>
          {notice.map((text, i) => (
            <div key={i}>
              <details open>
                <summary className='text-sm cursor-pointer'>
                  {text.title}
                </summary>
                <Link href={`notice/${text.slug}`} passHref>
                  <div className='flex items-center'>
                    <p className='text-xs'>{text.date}</p>
                    <p className='ml-5 hover:underline underline-offset-1 cursor-pointer'>
                      {text.desc}
                    </p>
                  </div>
                </Link>
              </details>
            </div>
          ))}
        </span>
      </div>
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
    const { data } = matter(content); */
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      notice: notices.reverse()
    }
  };
}
export default Notice;
