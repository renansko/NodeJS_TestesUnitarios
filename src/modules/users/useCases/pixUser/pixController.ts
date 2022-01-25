import { Request, Response } from "express";
import { container } from "tsyringe";
import { PixUseCase } from "./pixUseCase";

export class PixController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { description, amount } = request.body;
        const { destiny } = request.params;
        const { sender_id } = request.headers;

        const createTransfer = container.resolve(PixUseCase);

        await createTransfer.execute({
            destiny,
            sender_id: sender_id as string,
            amount,
            description
        });

        return response.status(201).send();

    }
}

