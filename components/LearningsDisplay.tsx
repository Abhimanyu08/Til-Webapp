import React, { useContext } from "react";
import { LearningsContext } from "../contexts/LearningsContext";

function LearningsDisplay() {
	const { dateToLearnings, setDateToLearnings } =
		useContext(LearningsContext);

	return (
		<>
			{Object.entries(dateToLearnings || {}).map(([date, learnings]) => {
				return (
					<>
						<h2>{date}</h2>
						{learnings.map((l) => (
							<p>{l.data}</p>
						))}
					</>
				);
			})}
		</>
	);
}

export default LearningsDisplay;
