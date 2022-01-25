import { PixTransfer } from "../entities/pixTransfer";

export type IPixDTO =
    Pick<
        PixTransfer,
        'id' |
        'sender_id' |
        'destiny' |
        'description' |
        'amount' |
        'type'
    >
