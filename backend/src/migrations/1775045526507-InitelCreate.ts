import { MigrationInterface, QueryRunner } from "typeorm";

export class InitelCreate1775045526507 implements MigrationInterface {
    name = 'InitelCreate1775045526507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_CART" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "UQ_5556ed4f84e14462a56f4116508" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_CART"("id") SELECT "id" FROM "CART"`);
        await queryRunner.query(`DROP TABLE "CART"`);
        await queryRunner.query(`ALTER TABLE "temporary_CART" RENAME TO "CART"`);
        await queryRunner.query(`CREATE TABLE "temporary_CART" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "UQ_5556ed4f84e14462a56f4116508" UNIQUE ("userId"), CONSTRAINT "FK_44dcec32d1366b0e664d3ddbdee" FOREIGN KEY ("userId") REFERENCES "USERS" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_CART"("id", "userId") SELECT "id", "userId" FROM "CART"`);
        await queryRunner.query(`DROP TABLE "CART"`);
        await queryRunner.query(`ALTER TABLE "temporary_CART" RENAME TO "CART"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CART" RENAME TO "temporary_CART"`);
        await queryRunner.query(`CREATE TABLE "CART" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "UQ_5556ed4f84e14462a56f4116508" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "CART"("id", "userId") SELECT "id", "userId" FROM "temporary_CART"`);
        await queryRunner.query(`DROP TABLE "temporary_CART"`);
        await queryRunner.query(`ALTER TABLE "CART" RENAME TO "temporary_CART"`);
        await queryRunner.query(`CREATE TABLE "CART" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`INSERT INTO "CART"("id") SELECT "id" FROM "temporary_CART"`);
        await queryRunner.query(`DROP TABLE "temporary_CART"`);
    }

}
