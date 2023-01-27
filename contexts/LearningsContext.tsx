import { createContext, Dispatch, SetStateAction, useState } from "react";
import Learning from "../types/Learnings";

export const LearningsContext = createContext<{
	dateToLearnings?: Record<string, Learning[]>;
	setDateToLearnings?: Dispatch<SetStateAction<Record<string, Learning[]>>>;
}>({});

function LearningsContextProvider({ children }: { children: JSX.Element }) {
	const [dateToLearnings, setDateToLearnings] = useState<
		Record<string, Learning[]>
	>({});

	return (
		<LearningsContext.Provider
			value={{ dateToLearnings, setDateToLearnings }}
		>
			{children}
		</LearningsContext.Provider>
	);
}

export default LearningsContextProvider;
