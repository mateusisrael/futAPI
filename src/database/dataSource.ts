import { DataSource } from 'typeorm';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  logging: true,
  synchronize: true,
  entities: [
    './src/modules/Match/entities/*.ts',
    './src/modules/Team/entities/*.ts',
  ],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});
