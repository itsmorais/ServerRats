import { UserRepository } from './UserRepository'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = []

    async create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User> {
        const user: User = {
            id: randomUUID(),
            name,
            email,
            password_hash,
            role: 'MEMBER',
            created_at: new Date()
        }
        this.users.push(user);
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;

    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }
}