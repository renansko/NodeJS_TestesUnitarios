import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class pixTransfers1642720070214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "pixTransferense",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "sender_id",
                    type: "uuid",
                },
                {
                    name: "destiny",
                    type: "uuid",
                },
                {
                    name: "amount",
                    type: "decimal",
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "type",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: 'pixTransferense',
                    columnNames: ['sender_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'pixTransferense',
                    columnNames: ['destiny'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pixTransfer');
    }

}
