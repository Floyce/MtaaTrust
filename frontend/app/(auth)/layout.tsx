import Link from "next/link"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
            {/* Left Decoration - Desktop Only */}
            <div className="hidden lg:flex flex-col justify-between p-10 bg-teal-900 text-white relative overflow-hidden">
                <div className="z-10">
                    <Link href="/" className="mb-4 inline-block">
                        <span className="text-3xl font-bold tracking-tight">MtaaTrust</span>
                    </Link>
                    <div className="mt-10 max-w-md">
                        <h1 className="text-4xl font-bold mb-6">Find Local Pros You Can Trust</h1>
                        <p className="text-teal-100 text-lg leading-relaxed">
                            Join thousands of Kenyans finding reliable plumbers, electricians, and more.
                            Verified ID. Secure Payments. Real Reviews.
                        </p>
                    </div>
                </div>

                {/* Abstract shapes */}
                <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-teal-800 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-20 -right-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-20" />

                <div className="z-10 text-sm text-teal-200">
                    &copy; {new Date().getFullYear()} MtaaTrust Kenya.
                </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-10">
                <div className="w-full max-w-md space-y-8">
                    {children}

                    <div className="text-center">
                        <Link href="/" className="text-sm text-slate-500 hover:text-teal-600">
                            &larr; Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
