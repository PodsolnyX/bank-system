export function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
}

export function getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
}

export function getSessionToken(): string | null {
    return sessionStorage.getItem("refreshToken");
}

export function removeAccessToken(): void {
    localStorage.removeItem("accessToken");
}

export function removeRefreshToken(): void {
    localStorage.removeItem("refreshToken");
}

export function removeSessionToken(): void {
    sessionStorage.removeItem("refreshToken");
}

export function setAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
}

export function setRefreshToken(token: string): void {
    localStorage.setItem("refreshToken", token);
}

export function setSessionToken(token: string): void {
    sessionStorage.setItem("refreshToken", token);
}