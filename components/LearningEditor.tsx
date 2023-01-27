import React, { useContext } from "react";
import { LearningsContext } from "../contexts/LearningsContext";

function LearningEditor() {
	const { setDateToLearnings } = useContext(LearningsContext);

	return (
		<div className="w-1/2 flex flex-col items-center self-center">
			<textarea
				name="learning"
				id="learning-textarea"
				className="border-2 border-black w-full h-20 p-2 text-sm "
			/>
			<button
				className="self-end border-2 active:scale-90 border-black bg-gray-200 px-2"
				onClick={() => {
					const elem = document.getElementById(
						"learning-textarea"
					) as HTMLTextAreaElement;
					const learning = elem.value;
					if (setDateToLearnings) {
						const dateString = new Date().toLocaleDateString();
						setDateToLearnings((prev) => ({
							...prev,
							[dateString]: [
								...(prev[dateString] || []),
								{
									data: learning,
									date: new Date(),
									child: null,
									parent: null,
								},
							],
						}));
					}
				}}
			>
				Save
			</button>
		</div>
	);
}

export default LearningEditor;
