import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError";
import { IStatementsRepository } from "../../../statements/repositories/IStatementsRepository";
import { CreateStatementError } from "../../../statements/useCases/createStatement/CreateStatementError";
import { IPixDTO } from "../../repositories/IPixDTO";
import { IPixRepository } from "../../repositories/IPixRepository"
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    sender_id: string,
    destiny: string,
    amount: number,
    description: string
}

@injectable()
class PixUseCase {
    constructor(
        @inject('pixRepository')
        private pixRepository: IPixRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StatementsRepository')
        private statementsRepository: IStatementsRepository
    ) { }
    async execute({ sender_id, destiny, amount, description }: IRequest) {

        const verifyExistSenderUser = await this.usersRepository.findById(sender_id);
        const verifyExistDestinyUser = await this.usersRepository.findById(destiny);

        if (!verifyExistSenderUser && verifyExistDestinyUser) {
            throw new CreateStatementError.UserNotFound();
        }

        const user_id = sender_id;
        const { balance } = await this.statementsRepository.getUserBalance({ user_id });

        if (balance > amount) {
            throw new CreateStatementError.InsufficientFunds()
        }

        const type = 'transfer';

        const transfer = await this.pixRepository.create({
            sender_id,
            type,
            destiny,
            amount,
            description
        });

        return transfer;
    }
}

export { PixUseCase }