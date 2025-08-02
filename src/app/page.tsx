import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="shadcn-h1 shadcn-text text-black mb-8">Welcome to Better Auth + SQLite</h1>
        <p className="shadcn-lead shadcn-text text-gray-600 mb-12">Learning authentication with Next.js and SQLite</p>
        
        <Link 
          href="/login" 
          className="shadcn-button shadcn-text bg-black text-white h-11 px-8 rounded-md hover:bg-gray-800 shadcn-transition inline-flex items-center"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
