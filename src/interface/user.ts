

export interface UserInterface {
    id: number
    otp: string
    onboarding_stage: number
    first_name: string
    last_name: string
    created_at: Date
    image: string
    email: string
    phone_number: string
    verified: boolean
    address: string
    state: string
    city: string
    marital_status: 'married' | 'single' | 'divorced'
    admin: boolean
}