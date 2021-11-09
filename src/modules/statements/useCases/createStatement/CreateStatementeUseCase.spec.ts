import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase"

describe("Create Statement Use case", () => {

    let createStatementUseCase: CreateStatementUseCase;
    let statementsRepositoryInMemory: InMemoryStatementsRepository;
    let inMemoryUsersRepository: InMemoryUsersRepository;


    beforeEach(() => {
        statementsRepositoryInMemory = new InMemoryStatementsRepository();
        inMemoryUsersRepository = new InMemoryUsersRepository();
        createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, statementsRepositoryInMemory
        );
    });
    it("Should not to be able create new Statement for user_id not found ", async () => {

        const user = await inMemoryUsersRepository.create({
            name: "Test user",
            email: "Test@test.com",
            password: "123456"
        })

        enum OperationType {
            DEPOSIT = 'deposit',
            WITHDRAW = 'withdraw',
        }

        const userId = user.id as string

        const depo = OperationType.DEPOSIT

        const statement = await createStatementUseCase.execute({
            type: depo,
            amount: 1200,
            description: "deposito test",
            user_id: userId,
        })

        expect(statement).toHaveProperty("id");
        expect(statement).toHaveProperty("amount");
        expect(statement).toHaveProperty("description");
        expect(statement).toHaveProperty("user_id");



    });
    it("Should not to be able create new Statement for user_id not found ", () => {
        expect(async () => {
            enum OperationType {
                DEPOSIT = 'deposit',
                WITHDRAW = 'withdraw',
            }

            const depo = OperationType.DEPOSIT

            await createStatementUseCase.execute({
                type: depo,
                amount: 1200,
                description: "deposito test",
                user_id: "12345"
            })
        }).rejects.toBeInstanceOf(AppError)


    });

})