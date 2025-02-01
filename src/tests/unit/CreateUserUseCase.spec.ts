import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository"
import { CreateUserUseCase } from "@/use-cases/CreateUserUseCase"
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "@/use-cases/errors/UserAlreadyExistsError";


let userRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe("Create user use case", () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        sut = new CreateUserUseCase(userRepository);
    });

    it("Should create a new User", async () => {
        const user = await sut.execute({
            name: "Mike test",
            email: "Mike@emailTest.com",
            password: "123456",
        })

        expect(user.id).toEqual(expect.any(String));
    });

    it("Should hash user password upon registration", async () => {
        const user = await sut.execute({
            name: "Mike test",
            email: "Mike@emailTest.com",
            password: "123456",
        })

        const isPasswordHashed = await compare('123456', user.password_hash);

        expect(isPasswordHashed).toBe(true);
    });

    it("Should not allow duplicate emails on user creation", async () => {
        const email = "Mike@emailTest.com";

        await sut.execute({
            name: "Mike test",
            email,
            password: "123456",
        })

        await expect(() =>
            sut.execute({
                name: "Mike test",
                email,
                password: "123456",
            }),).rejects.toBeInstanceOf(UserAlreadyExistsError);



    })
})