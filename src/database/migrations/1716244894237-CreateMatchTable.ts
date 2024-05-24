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
        name: 'Match',
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
        name: 'ScoreBoard',
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
      'ScoreBoard',
      new TableForeignKey({
        columnNames: ['guestTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Team',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'ScoreBoard',
      new TableForeignKey({
        columnNames: ['principalTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Team',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.addColumn(
      'Match',
      new TableColumn({
        name: 'scoreBoardId',
        type: 'uuid',
      })
    );

    await queryRunner.addColumn(
      'Match',
      new TableColumn({
        name: 'guestTeamId',
        type: 'uuid',
      })
    );

    await queryRunner.addColumn(
      'Match',
      new TableColumn({
        name: 'principalTeamId',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'Match',
      new TableForeignKey({
        columnNames: ['scoreBoardId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ScoreBoard',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'Match',
      new TableForeignKey({
        columnNames: ['guestTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Team',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'Match',
      new TableForeignKey({
        columnNames: ['principalTeamId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Team',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const matchTable = await queryRunner.getTable('Match');

    const matchForeignKeys = matchTable?.foreignKeys;

    if (!!matchForeignKeys) {
      await queryRunner.dropForeignKeys('Match', matchForeignKeys);
    }

    const scoreBoardTable = await queryRunner.getTable('ScoreBoard');

    const scoreBoardForeignKeys = scoreBoardTable?.foreignKeys;

    if (!!scoreBoardForeignKeys) {
      await queryRunner.dropForeignKeys('ScoreBoard', scoreBoardForeignKeys);
    }

    await queryRunner.dropTable('Match');
    await queryRunner.dropTable('ScoreBoard');
    await queryRunner.query("DROP TYPE 'status'");
  }
}
