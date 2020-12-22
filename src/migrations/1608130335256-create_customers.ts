import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCustomers1608130335256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "customers",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "code",
            type: "int",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "300",
            isNullable: false,
          },
          {
            name: "document",
            type: "varchar",
            length: "300",
            isNullable: false,
          },
          {
            name: "nickname",
            type: "varchar",
            length: "100",
            isNullable: true,
            default: null,
          },
          {
            name: "first_access",
            type: "boolean",
            default: false,
          },
          {
            name: "city",
            type: "varchar",
            length: "250",
            isNullable: false,
          },
          {
            name: "neigh",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("customers");
  }
}
