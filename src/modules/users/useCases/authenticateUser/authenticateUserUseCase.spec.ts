import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase


describe("Authenticate User", () => {

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    })



    it("Should be able to authenticate an user", async () => {

        const user: ICreateUserDTO = {
            name: "Test user",
            email: "Test@test.com",
            password: "123456"

        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token");
    })

    it("Should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "Incorrect@EmailTest.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should not be able to authenticate with incorrect password", async () => {

        expect(async () => {
            const user: ICreateUserDTO = {
                name: "Test user Error",
                email: "Test@testErro.com",
                password: "123456"

            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "Incorrect Password"
            })
        }).rejects.toBeInstanceOf(AppError);

    });
    it("Should not be able to authenticate with incorrect email", async () => {

        expect(async () => {
            const user: ICreateUserDTO = {
                name: "Test user Error",
                email: "Test@testErro.com",
                password: "123456"

            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "test@test.com",
                password: user.password
            })
        }).rejects.toBeInstanceOf(AppError);
    })

})

