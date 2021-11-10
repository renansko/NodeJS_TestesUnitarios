import exp from "constants";
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let statementsRepositoryInMemory: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let getBalanceUseCase: GetBalanceUseCase
let createStatementUseCase: CreateStatementUseCase

describe("Get balance with user_id", () => {
    beforeEach(() => {
        statementsRepositoryInMemory = new InMemoryStatementsRepository();
        inMemoryUsersRepository = new InMemoryUsersRepository();
        createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, statementsRepositoryInMemory);
        getBalanceUseCase = new GetBalanceUseCase(statementsRepositoryInMemory, inMemoryUsersRepository);

    });

    it("get balance for specific user", async () => {

        const user = await inMemoryUsersRepository.create({
            name: "Test user",
            email: "Test@test.com",
            password: "123456"

        });
        const user_id = user.id as string;

        enum OperationType {
            DEPOSIT = 'deposit',
            WITHDRAW = 'withdraw',
        }
        const depo = OperationType.DEPOSIT

        await createStatementUseCase.execute({
            type: depo,
            amount: 1200,
            description: "deposito test",
            user_id: user_id,
        })

        await createStatementUseCase.execute({
            type: depo,
            amount: 1200,
            description: "deposito test",
            user_id: user_id,
        })


        const balance = await getBalanceUseCase.execute({ user_id })


        expect(balance).toHaveProperty("balance");
        expect(balance.statement.length).toBe(2);
    })

    it("Not do be able get balance for a user_id not found", () => {

        expect(async () => {
            const user_id = "123456"
            await getBalanceUseCase.execute({ user_id })


        }

        ).rejects.toBeInstanceOf(AppError);
    })

});


