import { MigrationInterface, QueryRunner } from "typeorm";

export class InitilCreate1775025938935 implements MigrationInterface {
    name = 'InitilCreate1775025938935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_USERS" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar CHECK( "role" IN ('admin','user') ) NOT NULL DEFAULT ('user'), "isLocked" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_a1689164dbbcca860ce6d17b2e1" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_USERS"("id", "name", "email", "password", "role", "isLocked", "createdAt") SELECT "id", "name", "email", "password", "role", "isLocked", "orderDate" FROM "USERS"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
        await queryRunner.query(`ALTER TABLE "temporary_USERS" RENAME TO "USERS"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "USERS" RENAME TO "temporary_USERS"`);
        await queryRunner.query(`CREATE TABLE "USERS" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar CHECK( "role" IN ('admin','user') ) NOT NULL DEFAULT ('user'), "isLocked" boolean NOT NULL DEFAULT (0), "orderDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_a1689164dbbcca860ce6d17b2e1" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "USERS"("id", "name", "email", "password", "role", "isLocked", "orderDate") SELECT "id", "name", "email", "password", "role", "isLocked", "createdAt" FROM "temporary_USERS"`);
        await queryRunner.query(`DROP TABLE "temporary_USERS"`);
    }

}
