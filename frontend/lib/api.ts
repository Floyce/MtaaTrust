const API_BASE_URL = "http://localhost:8000/api/v1";

interface RequestOptions extends RequestInit {
    token?: string;
}

async function fetchAPI<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, headers, ...rest } = options;
    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    } else {
        // Try to get token from localStorage if client-side
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("access_token");
            if (storedToken) {
                defaultHeaders["Authorization"] = `Bearer ${storedToken}`;
            }
        }
    }

    const config: RequestInit = {
        ...rest,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
    };

    // If body is FormData, let the browser set Content-Type!
    if (config.body instanceof FormData && config.headers) {
        const h = config.headers as Record<string, string>;
        delete h["Content-Type"];
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: "An error occurred" }));
            throw new Error(errorData.detail || `Error ${response.status}`);
        }

        return response.json();
    } catch (error: any) {
        // MOCK FALLBACK for Demo/Dev purposes when Backend is offline
        if (error.message.includes("Failed to fetch") || error.message.includes("Network request failed")) {
            console.warn(`Backend unreachable for ${endpoint}. Using Mock Data.`);
            return handleMockResponse(endpoint, options) as Promise<T>;
        }
        throw error;
    }
}

// Mock Handler
async function handleMockResponse(endpoint: string, options: RequestOptions): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    if (endpoint === "/auth/register" && options.method === "POST") {
        // Hack: Store type for the subsequent mock /users/me call
        if (typeof window !== "undefined" && options.body) {
            try {
                const body = JSON.parse(options.body as string);
                if (body.user_type) localStorage.setItem("mock_user_type", body.user_type);
            } catch (e) { }
        }
        return { message: "User registered successfully", user_id: "mock_user_123" };
    }

    if (endpoint === "/auth/login" && options.method === "POST") {
        return { access_token: "mock_jwt_token_xyz_123", token_type: "bearer" };
    }

    if (endpoint === "/users/me" && options.method === "GET") {
        let type = "consumer";
        if (typeof window !== "undefined") {
            type = localStorage.getItem("mock_user_type") || "consumer";
        }

        return {
            id: "mock_user_123",
            full_name: "Mock User",
            email: "user@example.com",
            phone: "0712345678",
            user_type: type,
        };
    }

    throw new Error("Backend unavailable and no mock found for this endpoint.");
}

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) => fetchAPI<T>(endpoint, { method: "GET", ...options }),
    post: <T>(endpoint: string, body: any, options?: RequestOptions) => {
        const isFormData = body instanceof FormData;
        return fetchAPI<T>(endpoint, {
            method: "POST",
            body: isFormData ? body : JSON.stringify(body),
            ...options
        });
    },
    put: <T>(endpoint: string, body: any, options?: RequestOptions) => {
        const isFormData = body instanceof FormData;
        return fetchAPI<T>(endpoint, {
            method: "PUT",
            body: isFormData ? body : JSON.stringify(body),
            ...options
        });
    },
    delete: <T>(endpoint: string, options?: RequestOptions) => fetchAPI<T>(endpoint, { method: "DELETE", ...options }),
};

export default api;
