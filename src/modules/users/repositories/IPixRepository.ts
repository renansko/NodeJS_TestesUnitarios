import { PixTransfer } from "../entities/pixTransfer";
import { IPixDTO } from "./IPixDTO";

export interface IPixRepository {
    create: ({ destiny, sender_id, type, amount, description }: IPixDTO) => Promise<PixTransfer | undefined>;
}

