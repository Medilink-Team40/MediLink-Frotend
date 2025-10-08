import { ReactNode } from "react";

interface AppLayoutProps{
    children: ReactNode
}


const AppLayout = ({ children}: AppLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50">
        {/* Add your app layout structure here */}
        <main className="container mx-auto p-4">
          {children}
        </main>
      </div>
    )
}

export default AppLayout;