import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryClosure1761147074536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS "category_closure" (
      "id_ancestor" integer NOT NULL,
      "id_descendant" integer NOT NULL,
      CONSTRAINT "PK_category_closure" PRIMARY KEY ("id_ancestor", "id_descendant")
    )
  `);

    await queryRunner.query(`
    INSERT INTO category_closure (id_ancestor, id_descendant)
    SELECT id, id
    FROM category
    WHERE NOT EXISTS (
      SELECT 1 FROM category_closure WHERE id_ancestor = category.id AND id_descendant = category.id
    )
  `);

    await queryRunner.query(`
    WITH RECURSIVE path (id_ancestor, id_descendant) AS (
      SELECT parent_id, id FROM category WHERE parent_id IS NOT NULL
      UNION ALL
      SELECT p.id_ancestor, c.id
      FROM category c
      JOIN path p ON c.parent_id = p.id_descendant
    )
    INSERT INTO category_closure (id_ancestor, id_descendant)
    SELECT id_ancestor, id_descendant
    FROM path
    WHERE NOT EXISTS (
      SELECT 1 FROM category_closure
      WHERE category_closure.id_ancestor = path.id_ancestor
      AND category_closure.id_descendant = path.id_descendant
    )
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category_closure"`);
  }
}
