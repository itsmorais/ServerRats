import { InMemoryUserRepository } from "@/repositories/InMemoryUserRepository";
import { AuthenticateUserUseCase } from "@/use-cases/AuthenticateUserUseCase";
import { InvalidCredentialsError } from "@/use-cases/errors/InvalidCredentialsError";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";


let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUserUseCase;

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        sut = new AuthenticateUserUseCase(usersRepository);
    });

    it("Should be able to authenticate", async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: "123456"
        });

        expect(user.id).toEqual(expect.any(String));

    });

    it('should not be able to authenticate with wrong email', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        await expect(() =>
            sut.execute({
                email: 'johndoeWrongEmail@example.com',
                password: "123456"

            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})