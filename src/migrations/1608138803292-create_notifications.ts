import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createNotifications1608138803292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notifications",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "type",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "title",
            type: "varchar",
            length: "300",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            length: "300",
            isNullable: false,
          },
          {
            name: "city_objective",
            type: "varchar",
            length: "200",
            isNullable: true,
          },
          {
            name: "neigh_objective",
            type: "varchar",
            length: "200",
            isNullable: true,
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
    await queryRunner.dropTable("notifications");
  }
}
