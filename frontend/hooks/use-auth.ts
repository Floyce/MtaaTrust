"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

interface User {
    id: string
    full_name: string
    email: string
    user_type: "consumer" | "provider" | "admin"
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access_token")
            if (!token) {
                setLoading(false)
                return
            }

            try {
                // Try to get cached user first to be snappy
                const cachedUser = localStorage.getItem("user_data")
                if (cachedUser) {
                    setUser(JSON.parse(cachedUser))
                }

                const userData = await api.get<User>("/users/me")
                setUser(userData)
                localStorage.setItem("user_data", JSON.stringify(userData))
            } catch (error) {
                console.error("Auth check failed", error)
                // If token is invalid, clear it
                localStorage.removeItem("access_token")
                localStorage.removeItem("user_data")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user_data")
        setUser(null)
        router.push("/login")
    }

    return { user, loading, logout }
}
