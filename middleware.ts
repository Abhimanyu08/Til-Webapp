import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { GITHUB_CLIENT_ID } from './constants';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const code = /code=(.*)$/.exec(request.url)?.at(1)

    console.log(code)
    const urlParams = [
        `client_id=${GITHUB_CLIENT_ID}`,
        `client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
        `code=${code}`,
    ];
    console.log(urlParams)
    const githubResp = await fetch(`https://github.com/login/oauth/access_token?${urlParams.join('&')}`, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    });

    const body = await githubResp.json()
    console.log(body);
    const access_token = body.access_token

    const resp = NextResponse.redirect(`http://localhost:3000`)
    resp.cookies.set("access_token", access_token)

    return resp
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/callback',
}
