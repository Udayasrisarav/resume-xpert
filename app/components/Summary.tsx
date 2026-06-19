import React from "react";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

type Feedback = {
    overallScore: number;
    toneAndStyle?: { score?: number; tone?: string; style?: string };
    content?: { score?: number; clarity?: string; relevance?: string };
    structure?: { score?: number; layout?: string };
    skills?: { score?: number; keywords?: string[] };
};

const Category = ({ title, score }: { title: string; score?: number }) => {
    if (score === undefined) return null;

    const textColor =
        score > 70 ? "text-green-600" : score > 49 ? "text-yellow-600" : "text-red-600";

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            {/* Tone & Style */}
            <Category title="Tone & Style" score={feedback.toneAndStyle?.score} />
            <p className="text-gray-600">
                {feedback.toneAndStyle?.tone ?? ""}{" "}
                {feedback.toneAndStyle?.style ? `/ ${feedback.toneAndStyle.style}` : ""}
            </p>

            {/* Content */}
            <Category title="Content" score={feedback.content?.score} />
            <p className="text-gray-600">
                Clarity: {feedback.content?.clarity ?? "N/A"} | Relevance:{" "}
                {feedback.content?.relevance ?? "N/A"}
            </p>

            {/* Structure */}
            <Category title="Structure" score={feedback.structure?.score} />
            <p className="text-gray-600">
                Layout: {feedback.structure?.layout ?? "N/A"}
            </p>

            {/* Skills */}
            <Category title="Skills" score={feedback.skills?.score} />
            <p className="text-gray-600">
                {feedback.skills?.keywords?.length
                    ? feedback.skills.keywords.join(", ")
                    : "No keywords detected"}
            </p>
        </div>
    );
};

export default Summary;
