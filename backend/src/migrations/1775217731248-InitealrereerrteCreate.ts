import { MigrationInterface, QueryRunner } from "typeorm";

export class InitealrereerrteCreate1775217731248 implements MigrationInterface {
    name = 'InitealrereerrteCreate1775217731248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_ORDER" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "TotalPayment" decimal(10,2) NOT NULL, "orderDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "paymentMethod" varchar CHECK( "paymentMethod" IN ('credit','debit','banktransfer','cashondelivery') ) NOT NULL, "userId" integer, "TaxApplied" decimal(10,2) NOT NULL DEFAULT (0), "SubTotal" decimal(10,2) NOT NULL DEFAULT (0), "deliveryDate" datetime NOT NULL, "orderstatus" varchar CHECK( "orderstatus" IN ('ordered','dispatched','cancelled','delivered') ) NOT NULL, CONSTRAINT "FK_0ef741dece1ca96cbcbd08a73c9" FOREIGN KEY ("userId") REFERENCES "USERS" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ORDER"("id", "TotalPayment", "orderDate", "paymentMethod", "userId") SELECT "id", "TotalPayment", "orderDate", "paymentMethod", "userId" FROM "ORDER"`);
        await queryRunner.query(`DROP TABLE "ORDER"`);
        await queryRunner.query(`ALTER TABLE "temporary_ORDER" RENAME TO "ORDER"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ORDER" RENAME TO "temporary_ORDER"`);
        await queryRunner.query(`CREATE TABLE "ORDER" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "TotalPayment" decimal(10,2) NOT NULL, "orderDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "paymentMethod" varchar CHECK( "paymentMethod" IN ('credit','debit','banktransfer','cashondelivery') ) NOT NULL, "userId" integer, CONSTRAINT "FK_0ef741dece1ca96cbcbd08a73c9" FOREIGN KEY ("userId") REFERENCES "USERS" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "ORDER"("id", "TotalPayment", "orderDate", "paymentMethod", "userId") SELECT "id", "TotalPayment", "orderDate", "paymentMethod", "userId" FROM "temporary_ORDER"`);
        await queryRunner.query(`DROP TABLE "temporary_ORDER"`);
    }

}
