export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50 pt-20 text-gray-900">
            {/* Sidebar */}
           

            {/* Main content */}
            <main className="ml-64 w-full px-10 py-12">{children}</main>
        </div>
    );
}
