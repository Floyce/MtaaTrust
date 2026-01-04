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

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "An error occurred" }));
        throw new Error(errorData.detail || `Error ${response.status}`);
    }

    return response.json();
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
