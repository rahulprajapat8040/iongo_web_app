'use client'
import { RootState } from "@/lib/redux/Store";
import { Video, Mail, NotebookPen, VideoIcon, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Home = () => {
  const router = useRouter()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const apps = [
    {
      name: "Video",
      description: "Watch, upload, and stream videos",
      icon: <Video size={32} />,
      onClick: () => router.push('/iontube'),
    },
    {
      name: "Meet",
      description: "Join or host video meetings",
      icon: <VideoIcon size={32} />,
      onClick: () => console.log("Navigate to Meet App"),
    },
    {
      name: "Mail",
      description: "Manage your inbox and send mails",
      icon: <Mail size={32} />,
      onClick: () => console.log("Navigate to Mail App"),
    },
    {
      name: "Notes",
      description: "Take quick notes & todos",
      icon: <NotebookPen size={32} />,
      onClick: () => console.log("Navigate to Notes App"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col px-4 py-6">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold">Welcome to IonGo</h1>
        {
          !isLoggedIn ? (
            <>
              <Link
                href={'/auth/signup'}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
              >
                <LogIn size={18} />
                Login / Signup
              </Link>
            </>
          ) : (
            <div>
              <Link
                href={'/auth/profile'}
                title="Profile"
              >
                <User />
              </Link>
            </div>
          )
        }
      </div>

      {/* Subtext */}
      <p className="text-gray-300 text-center max-w-xl mx-auto mb-10">
        Select an application below to get started with your productivity suite.
      </p>

      {/* App Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
        {apps.map((app) => (
          <button
            key={app.name}
            onClick={app.onClick}
            className="bg-gray-800 hover:bg-gray-700 transition duration-200 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg border border-gray-700"
          >
            <div className="mb-4 bg-gray-900 p-3 rounded-full text-blue-400">
              {app.icon}
            </div>
            <h2 className="text-lg font-semibold">{app.name}</h2>
            <p className="text-sm text-gray-400 mt-1">{app.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
