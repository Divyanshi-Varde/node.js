import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MigrationTable1710852165106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "newTable",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
        ],
      }),
      true
    ); 
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("new_table", true); 
  }
}
