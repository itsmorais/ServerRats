import { UserRepository } from "@/repositories/UserRepository";
import { ResourceNotFoundErrorError } from "./errors/ResourceNotFoundError";

export class FindUserByEmailUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ResourceNotFoundErrorError()
        }
        return user;
    }
}
