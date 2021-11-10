import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let statementsRepositoryInMemory: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase
let createStatementUseCase: CreateStatementUseCase;

describe("GET Statement Operation", () => {


    beforeEach(() => {
        statementsRepositoryInMemory = new InMemoryStatementsRepository();
        inMemoryUsersRepository = new InMemoryUsersRepository();

        createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, statementsRepositoryInMemory);
        getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, statementsRepositoryInMemory);

    });

    it("Should not be able to get statement with statement_id not found", () => {
        expect(async () => {

            const user = await inMemoryUsersRepository.create({
                name: "Test user",
                email: "Test@test.com",
                password: "123456"

            });

            const user_id = user.id as string;


            await getStatementOperationUseCase.execute({
                user_id,
                statement_id: "123456"
            })


        }).rejects.toBeInstanceOf(AppError)
    });


    it("Should not be able to get statement with user_id not found", () => {
        expect(async () => {

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

            const state = await createStatementUseCase.execute({
                type: depo,
                amount: 1200,
                description: "deposito test",
                user_id: user_id,
            })

            const statement_id = state.id as string


            await getStatementOperationUseCase.execute({
                user_id: "123456",
                statement_id
            })


        }).rejects.toBeInstanceOf(AppError)
    })


})