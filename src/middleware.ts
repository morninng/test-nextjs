import { NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  if ((!process.env.NEXT_BASIC_AUTH_USER_NAME || !process.env.NEXT_BASIC_AUTH_PASSWORD ) && (process.env.NEXT_IS_PREVIEW !=='TRUE')) {
    return NextResponse.next();
  }

  // console.log('ip', req);
  console.log('----------')
  console.log('headers', req.headers);
  console.log('----------')
  // console.log('socket', req.socket)
  console.log('ip', req.ip)

  const basicAuth = req.headers.get('authorization');
  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

    if (user === process.env.NEXT_BASIC_AUTH_USER_NAME && pwd === process.env.NEXT_BASIC_AUTH_PASSWORD) {
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
