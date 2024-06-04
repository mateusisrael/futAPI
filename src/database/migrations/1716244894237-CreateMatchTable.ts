import { MatchStatus } from '../../modules/Match/entities/Match';

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateMatchTable1716244894237 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "status" AS ENUM ('${MatchStatus.NAO_INICIADA}', '${MatchStatus.EM_ANDAMENTO}', '${MatchStatus.FINALIZADA}')`
    );

    await queryRunner.createTable(
      new Table({
        name: 'match',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'status',
            enumName: 'status',
            type: 'enum',
            enum: [
              MatchStatus.EM_ANDAMENTO,
              MatchStatus.NAO_INICIADA,
              MatchStatus.FINALIZADA,
            ],
            default: `'${MatchStatus.NAO_INICIADA}'`,
          },
          {
            name: 'date',
            type: 'Date',
            isNullable: false,
          },
          {
            name: 'round',
            type: 'int',
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'score_board',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'principalTeamId',
            type: 'uuid',
          },
          {
            name: 'guestTeamId',
            type: 'uuid',
          },
          {
            name: 'principalTeamPoints',
            type: 'int',
          },
          {
            name: 'guestTeamPoints',
            type: 'int',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'score_board',
      new TableForeignKey({
        columnNames: ['guestTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'team',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'score_board',
      new TableForeignKey({
        columnNames: ['principalTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'team',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.addColumn(
      'match',
      new TableColumn({
        name: 'scoreBoardId',
        type: 'uuid',
      })
    );

    await queryRunner.addColumn(
      'match',
      new TableColumn({
        name: 'guestTeamId',
        type: 'uuid',
      })
    );

    await queryRunner.addColumn(
      'match',
      new TableColumn({
        name: 'principalTeamId',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'match',
      new TableForeignKey({
        columnNames: ['scoreBoardId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'score_board',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'match',
      new TableForeignKey({
        columnNames: ['guestTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'team',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'match',
      new TableForeignKey({
        columnNames: ['principalTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'team',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const matchTable = await queryRunner.getTable('match');

    const matchForeignKeys = matchTable?.foreignKeys;

    if (!!matchForeignKeys) {
      await queryRunner.dropForeignKeys('match', matchForeignKeys);
    }

    const scoreBoardTable = await queryRunner.getTable('score_board');

    const scoreBoardForeignKeys = scoreBoardTable?.foreignKeys;

    if (!!scoreBoardForeignKeys) {
      await queryRunner.dropForeignKeys('score_board', scoreBoardForeignKeys);
    }

    await queryRunner.dropTable('match');
    await queryRunner.dropTable('score_board');
    await queryRunner.query("DROP TYPE 'status'");
  }
}
