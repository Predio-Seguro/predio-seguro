export interface LoginRequest {
    login: string,
    password: string,
}

export interface SendEmailRecorevyPasswordRequest {
    email: string
}

export interface ValidateRecoveryTokenForm {
    code: string,
}

export interface ValidateRecoveryTokenRequest {
    code: string,
    email: string
}