export interface INotificationCreateDTO {
  type: string;
  title: string;
  description: string;
  city_objective?: string;
  neigh_objective?: string;
}
