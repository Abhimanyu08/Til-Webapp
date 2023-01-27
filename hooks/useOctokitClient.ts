import React, { useEffect, useState } from 'react'

import { Octokit } from "@octokit/core";
function useOctokitClient() {
    const [octokit, setOctoKit] = useState<Octokit | null>()

    useEffect(() => {

        const accessToken = document.cookie.match(/access_token=(.*)?(;?)/)?.at(1)
        if (accessToken) {

            const o = new Octokit({ auth: accessToken })
            setOctoKit(o)
        }

    }, [])
    return octokit
}

export default useOctokitClient