export interface Item {
  id: string;
  title: string;
  description: string;
  starCount: number;
  labels: string[];
  added?: boolean;
}
