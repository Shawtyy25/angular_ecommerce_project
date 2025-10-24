export interface TreeNode {
  label: string,
  data: Category,
  icon: string | null,
  children?: TreeNode[],

}

export interface Category {
  id: number;
  name: string;
  parentId: null | number;
  icon: null | string;
}