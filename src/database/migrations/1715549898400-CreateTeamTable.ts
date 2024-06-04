import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateTeamTable1715549898400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'team',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'emblem',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'teamId',
            type: 'uuid',
          },
          {
            name: 'path',
            type: 'varchar',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'emblem',
      new TableForeignKey({
        columnNames: ['teamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'team',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('team');

    const emblemTable = await queryRunner.getTable('Emblem');
    const emblemForeignKeys = emblemTable?.foreignKeys;

    if (!!emblemForeignKeys) {
      await queryRunner.dropForeignKeys('emblem', emblemForeignKeys);
    }

    await queryRunner.dropTable('emblem');
  }
}
