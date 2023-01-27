import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import LearningEditor from "../components/LearningEditor";
import LearningsDisplay from "../components/LearningsDisplay";
import { GITHUB_CLIENT_ID } from "../constants";
import LearningsContextProvider from "../contexts/LearningsContext";
import useOctokitClient from "../hooks/useOctokitClient";

type HomeProps = {
	user: { name: string; [key: string]: string | number } | null;
};

const Home: NextPage<HomeProps> = ({ user }) => {
	const octokit = useOctokitClient();

	useEffect(() => {
		if (octokit) {
			octokit.request("GET /user/repos").then((val) => {
				console.log(val);
			});
		}
	}, [octokit]);

	const onLogin = async () => {
		const urlParams = [
			`client_id=${GITHUB_CLIENT_ID}`,
			`redirect_uri=${encodeURIComponent(
				"http://localhost:3000/callback"
			)}`,
			`scopes=${encodeURIComponent("user repo")}`,
		];

		const url = `https://github.com/login/oauth/authorize?${urlParams.join(
			"&"
		)}`;
		window.location.href = url;
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>TIL</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<LearningsContextProvider>
				<main className="basis-full flex flex-col w-full gap-2">
					{user === null ? (
						<button
							className="self-end mr-10 active:scale-90 border-black bg-gray-200 px-2 border-2"
							onClick={onLogin}
						>
							Login
						</button>
					) : (
						<span className="self-end mr-10 font-semibold">
							Hi {user.name}
						</span>
					)}
					<h1 className="text-4xl text-center font-bold">
						Today I Learned
					</h1>
					<LearningEditor />
					<LearningsDisplay />
				</main>
			</LearningsContextProvider>

			<footer className=" flex h-10 w-full items-center justify-center border-t">
				Made with &#9829; by
				<a
					href="https://twitter.com/A_Bhimany_u"
					className="ml-2 underline decoration-sky-500 underline-offset-2 decoration-2"
					target="_blank"
				>
					Abhimanyu
				</a>
			</footer>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const accessToken = context.req.cookies.access_token;

	const userResp = await fetch("https://api.github.com/user", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const user = await userResp.json();

	return {
		props: {
			user: user || null,
		},
	};
};

export default Home;
