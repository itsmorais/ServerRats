import { UserRepository } from "@/repositories/UserRepository";

export class FindUserByEmailUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }
}
