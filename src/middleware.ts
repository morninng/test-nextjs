import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {


  // console.log('ip', req);
  console.log('----------')
  console.log('headers', req.headers);
  console.log('----------')
  // console.log('ss', req?.body?.ip)
  // console.log('socket', req.socket)
  // console.log('ip', req.ip)

  // const xff =
  // req instanceof Request
  //     ? req.headers.get('x-forwarded-for')
  //     : req.headers['x-forwarded-for']

  const ip = req.headers.get('x-forwarded-for')
      ? req.headers.get('x-forwarded-for')!.split(',')[0]
      : '',

  console.log('ip', ip);


  // return NextResponse.next();

  if( ip === '120.74.170.165'){
    return NextResponse.next();
  }



  const basicAuth = req.headers.get('authorization');
  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

    if (user === "aaa" && pwd === "bbb") {
      return NextResponse.next();
    }
  }
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
};
