import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";


export function meta() {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback For Your Dream Job" },
  ];
}

export default function Home() {
    const { auth} = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <Navbar/>

            <section className="main-section px-6 py-16">
                <div className="page-heading text-center mb-12">
                    <h1 className="text-4xl font-bold">
                        Track Your Applications & Resume Ratings
                    </h1>
                    <h2 className="text-lg text-gray-600 mt-2">
                        Review your submissions and check AI-powered feedback.
                    </h2>
                </div>

                {resumes.length > 0 && (
                    <div
                        className="resume-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume}/>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}




