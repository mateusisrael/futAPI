import { DataSource } from 'typeorm';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mateus',
  password: '1212',
  database: 'futAPI',
  logging: true,
  synchronize: true,
  entities: [
    './src/modules/Match/entities/*.ts',
    './src/modules/Team/entities/*.ts',
  ],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});
