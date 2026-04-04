import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreate1775024722182 implements MigrationInterface {
    name = 'InitialCreate1775024722182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PRODUCTTYPE" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "typename" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "CATEGORY" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "categoryname" varchar NOT NULL, "producttypeId" integer)`);
        await queryRunner.query(`CREATE TABLE "SUBCATEGORY" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subcategoryname" varchar NOT NULL, "categoryId" integer)`);
        await queryRunner.query(`CREATE TABLE "ORDER" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "TotalPayment" decimal(10,2) NOT NULL, "orderDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "paymentMethod" varchar CHECK( "paymentMethod" IN ('credit','debit','banktransfer','cashondelivery') ) NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "ORDERITEM" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceAtPurchase" decimal(10,2) NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "productId" integer)`);
        await queryRunner.query(`CREATE TABLE "PRODUCT" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "available" integer NOT NULL, "imagePath" varchar NOT NULL, "subCategoryId" integer)`);
        await queryRunner.query(`CREATE TABLE "CARTITEM" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "cartId" integer, "productcId" integer)`);
        await queryRunner.query(`CREATE TABLE "CART" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "USERS" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar CHECK( "role" IN ('admin','user') ) NOT NULL DEFAULT ('user'), "isLocked" boolean NOT NULL DEFAULT (0), "orderDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_a1689164dbbcca860ce6d17b2e1" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_CATEGORY" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "categoryname" varchar NOT NULL, "producttypeId" integer, CONSTRAINT "FK_a337b0800a877104b1a44ad1a94" FOREIGN KEY ("producttypeId") REFERENCES "PRODUCTTYPE" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_CATEGORY"("id", "categoryname", "producttypeId") SELECT "id", "categoryname", "producttypeId" FROM "CATEGORY"`);
        await queryRunner.query(`DROP TABLE "CATEGORY"`);
        await queryRunner.query(`ALTER TABLE "temporary_CATEGORY" RENAME TO "CATEGORY"`);
        await queryRunner.query(`CREATE TABLE "temporary_SUBCATEGORY" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subcategoryname" varchar NOT NULL, "categoryId" integer, CONSTRAINT "FK_37e852b6efc07e71601fe938b11" FOREIGN KEY ("categoryId") REFERENCES "CATEGORY" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_SUBCATEGORY"("id", "subcategoryname", "categoryId") SELECT "id", "subcategoryname", "categoryId" FROM "SUBCATEGORY"`);
        await queryRunner.query(`DROP TABLE "SUBCATEGORY"`);
        await queryRunner.query(`ALTER TABLE "temporary_SUBCATEGORY" RENAME TO "SUBCATEGORY"`);
        await queryRunner.query(`CREATE TABLE "temporary_ORDER" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "TotalPayment" decimal(10,2) NOT NULL, "orderDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "paymentMethod" varchar CHECK( "paymentMethod" IN ('credit','debit','banktransfer','cashondelivery') ) NOT NULL, "userId" integer, CONSTRAINT "FK_0ef741dece1ca96cbcbd08a73c9" FOREIGN KEY ("userId") REFERENCES "USERS" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ORDER"("id", "TotalPayment", "orderDate", "paymentMethod", "userId") SELECT "id", "TotalPayment", "orderDate", "paymentMethod", "userId" FROM "ORDER"`);
        await queryRunner.query(`DROP TABLE "ORDER"`);
        await queryRunner.query(`ALTER TABLE "temporary_ORDER" RENAME TO "ORDER"`);
        await queryRunner.query(`CREATE TABLE "temporary_ORDERITEM" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceAtPurchase" decimal(10,2) NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "FK_c3fa8e14d73fa21c0328480b87c" FOREIGN KEY ("orderId") REFERENCES "ORDER" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0e52d3abc1de9a79493867d49eb" FOREIGN KEY ("productId") REFERENCES "PRODUCT" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ORDERITEM"("id", "priceAtPurchase", "quantity", "orderId", "productId") SELECT "id", "priceAtPurchase", "quantity", "orderId", "productId" FROM "ORDERITEM"`);
        await queryRunner.query(`DROP TABLE "ORDERITEM"`);
        await queryRunner.query(`ALTER TABLE "temporary_ORDERITEM" RENAME TO "ORDERITEM"`);
        await queryRunner.query(`CREATE TABLE "temporary_PRODUCT" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "available" integer NOT NULL, "imagePath" varchar NOT NULL, "subCategoryId" integer, CONSTRAINT "FK_2c10996e7b4c5b91d641b44ac8e" FOREIGN KEY ("subCategoryId") REFERENCES "SUBCATEGORY" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_PRODUCT"("id", "name", "description", "price", "available", "imagePath", "subCategoryId") SELECT "id", "name", "description", "price", "available", "imagePath", "subCategoryId" FROM "PRODUCT"`);
        await queryRunner.query(`DROP TABLE "PRODUCT"`);
        await queryRunner.query(`ALTER TABLE "temporary_PRODUCT" RENAME TO "PRODUCT"`);
        await queryRunner.query(`CREATE TABLE "temporary_CARTITEM" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "cartId" integer, "productcId" integer, CONSTRAINT "FK_592725682e7c285eb4d3a0174ea" FOREIGN KEY ("cartId") REFERENCES "CART" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_02fea127f188527496e66565bd0" FOREIGN KEY ("productcId") REFERENCES "PRODUCT" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_CARTITEM"("id", "quantity", "cartId", "productcId") SELECT "id", "quantity", "cartId", "productcId" FROM "CARTITEM"`);
        await queryRunner.query(`DROP TABLE "CARTITEM"`);
        await queryRunner.query(`ALTER TABLE "temporary_CARTITEM" RENAME TO "CARTITEM"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CARTITEM" RENAME TO "temporary_CARTITEM"`);
        await queryRunner.query(`CREATE TABLE "CARTITEM" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "cartId" integer, "productcId" integer)`);
        await queryRunner.query(`INSERT INTO "CARTITEM"("id", "quantity", "cartId", "productcId") SELECT "id", "quantity", "cartId", "productcId" FROM "temporary_CARTITEM"`);
        await queryRunner.query(`DROP TABLE "temporary_CARTITEM"`);
        await queryRunner.query(`ALTER TABLE "PRODUCT" RENAME TO "temporary_PRODUCT"`);
        await queryRunner.query(`CREATE TABLE "PRODUCT" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "available" integer NOT NULL, "imagePath" varchar NOT NULL, "subCategoryId" integer)`);
        await queryRunner.query(`INSERT INTO "PRODUCT"("id", "name", "description", "price", "available", "imagePath", "subCategoryId") SELECT "id", "name", "description", "price", "available", "imagePath", "subCategoryId" FROM "temporary_PRODUCT"`);
        await queryRunner.query(`DROP TABLE "temporary_PRODUCT"`);
        await queryRunner.query(`ALTER TABLE "ORDERITEM" RENAME TO "temporary_ORDERITEM"`);
        await queryRunner.query(`CREATE TABLE "ORDERITEM" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceAtPurchase" decimal(10,2) NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "productId" integer)`);
        await queryRunner.query(`INSERT INTO "ORDERITEM"("id", "priceAtPurchase", "quantity", "orderId", "productId") SELECT "id", "priceAtPurchase", "quantity", "orderId", "productId" FROM "temporary_ORDERITEM"`);
        await queryRunner.query(`DROP TABLE "temporary_ORDERITEM"`);
        await queryRunner.query(`ALTER TABLE "ORDER" RENAME TO "temporary_ORDER"`);
        await queryRunner.query(`CREATE TABLE "ORDER" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "TotalPayment" decimal(10,2) NOT NULL, "orderDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "paymentMethod" varchar CHECK( "paymentMethod" IN ('credit','debit','banktransfer','cashondelivery') ) NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "ORDER"("id", "TotalPayment", "orderDate", "paymentMethod", "userId") SELECT "id", "TotalPayment", "orderDate", "paymentMethod", "userId" FROM "temporary_ORDER"`);
        await queryRunner.query(`DROP TABLE "temporary_ORDER"`);
        await queryRunner.query(`ALTER TABLE "SUBCATEGORY" RENAME TO "temporary_SUBCATEGORY"`);
        await queryRunner.query(`CREATE TABLE "SUBCATEGORY" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subcategoryname" varchar NOT NULL, "categoryId" integer)`);
        await queryRunner.query(`INSERT INTO "SUBCATEGORY"("id", "subcategoryname", "categoryId") SELECT "id", "subcategoryname", "categoryId" FROM "temporary_SUBCATEGORY"`);
        await queryRunner.query(`DROP TABLE "temporary_SUBCATEGORY"`);
        await queryRunner.query(`ALTER TABLE "CATEGORY" RENAME TO "temporary_CATEGORY"`);
        await queryRunner.query(`CREATE TABLE "CATEGORY" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "categoryname" varchar NOT NULL, "producttypeId" integer)`);
        await queryRunner.query(`INSERT INTO "CATEGORY"("id", "categoryname", "producttypeId") SELECT "id", "categoryname", "producttypeId" FROM "temporary_CATEGORY"`);
        await queryRunner.query(`DROP TABLE "temporary_CATEGORY"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
        await queryRunner.query(`DROP TABLE "CART"`);
        await queryRunner.query(`DROP TABLE "CARTITEM"`);
        await queryRunner.query(`DROP TABLE "PRODUCT"`);
        await queryRunner.query(`DROP TABLE "ORDERITEM"`);
        await queryRunner.query(`DROP TABLE "ORDER"`);
        await queryRunner.query(`DROP TABLE "SUBCATEGORY"`);
        await queryRunner.query(`DROP TABLE "CATEGORY"`);
        await queryRunner.query(`DROP TABLE "PRODUCTTYPE"`);
    }

}
