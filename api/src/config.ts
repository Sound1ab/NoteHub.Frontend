export const config = {
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  host: process.env.TYPEORM_HOST,
  logging: process.env.TYPEORM_LOGGING,
  migrations: [process.env.TYPEORM_MIGRATIONS],
  password: process.env.TYPEORM_PASSWORD,
  port: process.env.TYPEORM_PORT,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  type: process.env.TYPEORM_TYPE,
  username: process.env.TYPEORM_USERNAME,
}
