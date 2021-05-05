import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1619098071748 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Users",
                columns: [
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary: true
                    },

                    {
                        name:"email",
                        type:"varchar"
                    },

                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Users");
    }

}
