<br/>

# 마켓

<br/>

마켓은 사용자가 판매할 상품을 올리고 다른 사용자와 소통할 수 있는 공간입니다.

<br/>

- ### [👀 <u>View live.</u>](https://market-sand.vercel.app/)

- ### [✨ <u>작업이야기</u>](https://my-portpolio.vercel.app/blog/market)

<br/>
<br/>

## Tech

- [Next.js]
- [tailwind css]
- [TypeScript]
- [Vercel]

## DB

- [Prisma]
- [PlanetScale]

<br/>

## Features

**_로그인 인증_**

sendGrid API를 이용해 이메일로 토큰을 받아 일회성 로그인을 합니다.

<br />

> 1.  로그인 화면의 email 정보로 유저의 존재여부를 확인 → 없다면 생성하고
> 2.  유저와 연결된 토큰을 발급 → (이메일 발송) 1회성 토큰 넘버 입력 →
> 3.  백엔드에서 토큰의 정보로 연결된 유저의 정보를 찾는다 → 로그인이 되었습니다.

<br />

NextJS에서 제안하는 2가지의 인증 방법 중 암호화된 쿠키를 사용하는 `Iron session` 으로 로그인 한 사용자의 정보를 확인합니다.

<br />

```javascript
// confirm API
async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { token } = req.body;
  const tokenFound = await client.token.findUnique({
    where: {
      payload: token
    }
  });
  if (!tokenFound) return res.status(400).end();

  // 토큰이 존재하면 그 토큰의 유저id를 req.session.user에
  req.session.user = {
    id: tokenFound.userId
  };
  // 세션저장
  await req.session.save();

  // tokenFound 모두삭제
  await client.token.deleteMany({
    where: {
      userId: tokenFound.userId
    }
  });
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
```

<br />

**_데이터 전달방식_**

앱을 개별적인 페이지의 관점으로 보고 자주 사용하는 기능을 `hook`으로 만들어 각 페이지에서 데이터를 불러옵니다.

인증되지 않은 사용자는 다시 로그인 페이지로 오게 됩니다.

<br />

```javascript
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users/me')
      .then(response => response.json())
      .then(data => {
        if (!data.ok) {
          return router.replace('/login');
        }
        setUser(data.profile);
      });
  }, [router]);

  return user;
}
```

<br />

앱을 개별적인 페이지로 보고 api를 요청하게 되면 매 페이지마다 반복적으로 요청을 하게 됩니다. 이를 피하기 위해 데이터 캐싱을 이용합니다.

`swr`은 메모리에 있는 캐싱된 데이터를 먼저 보여주고 뒤에서 api 요청을 보내
데이터 내용이 변경되었는지 확인 후 가장 최신 상태로 업데이트 합니다.

때문에 사용자는 로딩 중인 상태를 보지 않아도 되며, 해당 데이터의 캐시를 모든 페이지에서 공유하는 것이 가능해졌습니다.

<br />

```javascript
const onFavorite = () => {
  if (!data) return;
  boundMutate(
    (prev: any) => prev && { ...prev, isLiked: !data.isLiked },
    false
  );
  mutate('/api/users/me', (prev: any) => ({ ok: !prev.ok }), false);
  toggleFav({});
};
```

<br />

SWR의 캐시를 변경하는 방식으로 데이터 응답을 기다리지 않고 변경 사항을 즉시 반영해서

사용자에게 최적화된 UI를 제공하고 서버리스이지만 마치 실시간처럼 보이게 상태를 업데이트합니다.

<br />

**SSR**

서버사이드 렌더링을 통한 정적 페이지 구성

```javascript
export function getStaticPaths() {
  const files = readdirSync('./notice').map(file => {
    const [name, _] = file.split('.');
    // [slug]
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false
  };
}
```

<br />

미리 생성될 html에 getstaticProps를 통해 생성할 동적 url의 주소를 알려줍니다.

---

<br/>

**_web_**

<img width="600" src="https://user-images.githubusercontent.com/60907634/158328766-92b260ad-d93f-467e-a59d-9a35f96323bb.png" />

**_mobile_**

![Hnet-image](https://user-images.githubusercontent.com/60907634/158518516-16c1e014-4438-4105-b7be-4659b94978ff.gif)

---

[next.js]: https://nextjs.org
[tailwind css]: https://tailwindcss.com
[typescript]: https://www.typescriptlang.org/
[planetscale]: https://planetscale.com
[prisma]: https://www.prisma.io/
[vercel]: https://vercel.com
