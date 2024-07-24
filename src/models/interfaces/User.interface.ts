export interface IUser{
    getId(): string | undefined
    setId(id: string): void
    getName(): string
    setName(name: string): void
    getEmail(): string
    setEmail(email: string): void
    getPassword(): string
    setPassword(password: string): void
    getRole(): string
    setRole(role: string): void
    isProfessor(): boolean
    isStudent(): boolean
}
