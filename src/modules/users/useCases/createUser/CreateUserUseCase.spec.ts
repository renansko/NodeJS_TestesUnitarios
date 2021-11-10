import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { ICreateUserDTO } from "./ICreateUserDTO"

let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
describe("Create User", () => {
    beforeEach(() => {
        inMemoryUsersRepository = new
            InMemoryUsersRepository();

        createUserUseCase = new
            CreateUserUseCase(
                inMemoryUsersRepository
            )
    })

    it("Should be able create a new User", async () => {

        const user: ICreateUserDTO = {
            name: "test User",
            email: "Test@Email.com",
            password: "123456"
        };

        await createUserUseCase.execute(user);

        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("password");

    })

    it("Should not be able create a new User with same email", async () => {

        expect(async () => {
            const user: ICreateUserDTO = {
                name: "test User",
                email: "Test@Email.com",
                password: "123456"
            };

            const user2: ICreateUserDTO = {
                name: "test User 2",
                email: "Test@Email.com",
                password: "123456"
            };

            await createUserUseCase.execute(user);
            await createUserUseCase.execute(user2);
        }).rejects.toBeInstanceOf(AppError);

    })


})