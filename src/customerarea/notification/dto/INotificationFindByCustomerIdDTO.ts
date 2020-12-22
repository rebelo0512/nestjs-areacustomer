export interface INotificationFindByCustomerIdDTO {
  id: string;
  created_at: Date;
  type: string;
  title: string;
  description: string;
  city_objective: string;
  neigh_objective: string;
  read: boolean;
}
