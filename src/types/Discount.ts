export interface Discount {
  id: number;
  name: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  start_date: string;
  end_date: string;
}
