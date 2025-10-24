import { Inject, Injectable } from '@nestjs/common';
import { Category, TreeNode } from './categories.entity';
import { Client } from "pg";



@Injectable()
export class CategoriesService {
  constructor(@Inject('PG_CLIENT') private client: Client) {}

  async getCategories(): Promise<any[]> {
    const result = await this.client.query<any>(
      `with recursive category_hierarchy as (
                    select
                        id,
                        name,
                        parent_id,
                        icon
                    from category
                    where parent_id is null
                
                    union all
                
                    select
                        c.id,
                        c.name,
                        c.parent_id,
                        c.icon
                    from category c
                    join category_hierarchy ch on c.parent_id = ch.id
                    )                  
                    select *
                    from category_hierarchy;`
    );
    const categories: Category[] = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      parentId: row.parent_id,
      icon: row.icon,
    }))
    return this.buildNodeTree(categories);
  }

  private buildNodeTree(categories: Category[]): TreeNode[] {
    const map = new Map<number, TreeNode>();
    categories.forEach(cat => map.set(cat.id, { label: cat.name, data: cat, icon: cat.icon, children: [] }));

    const tree: TreeNode[] = [];
    map.forEach(node => {
      if (node.data.parentId === null){
        tree.push(node);


      } else {
        const parent = map.get(node.data.parentId);
        if (parent) {
          parent.children!.push(node)
        } else {
          tree.push(node);
        }
      }

    });

    return tree;
  }
}

