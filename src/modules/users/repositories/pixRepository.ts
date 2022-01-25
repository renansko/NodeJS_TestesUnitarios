import { getRepository, Repository } from "typeorm";
import { Statement } from "../../statements/entities/Statement";
import { PixTransfer } from "../entities/pixTransfer";
import { IPixDTO } from "./IPixDTO";
import { IPixRepository } from "./IPixRepository";

export class PixRepository implements IPixRepository {
    private repository: Repository<PixTransfer>;
    private repositoryStatement: Repository<Statement>;

    constructor() {
        this.repository = getRepository(PixTransfer);
    }
    async create({ destiny, sender_id, type, amount, description }: IPixDTO): Promise<PixTransfer | undefined> {

        const statementSender_id = await this.repositoryStatement.find({
            where: { sender_id }
        });

        const statementDestiny_id = await this.repositoryStatement.find({
            where: { destiny }
        });

        statementSender_id.reduce((acc, operation) => {
            {
                return acc - operation.amount;
            }
        }, 0)

        statementDestiny_id.reduce((acc, operation) => {
            {
                return acc + operation.amount;
            }
        }, 0)

        const transfer = this.repository.create({ destiny, sender_id, type, amount, description });


        return this.repository.save(transfer);
    }

}

