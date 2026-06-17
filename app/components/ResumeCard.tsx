import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";



const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {

    return (
        <Link
            to={`/resume/${id}`}
            className="resume-card w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col gap-4"
        >
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h2 className="text-black font-bold">{companyName}</h2>
                    <h3 className="text-gray-500">{jobTitle}</h3>
                </div>
                <ScoreCircle score={feedback.overallScore} />
            </div>

            <img
                src={imagePath}
                alt="resume"
                className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-md"
            />
        </Link>
    )
}
    export default ResumeCard;
