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

export interface NewPasswordRequest {
    new_password: string,
    confirm_new_password: string,
    code: string
}

export interface NewPasswordForm{
    new_password: string,
    confirm_new_password: string,
}