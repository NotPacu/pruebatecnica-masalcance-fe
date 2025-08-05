export interface LogDTO {
  id: string;
  query_type: string;
  route: string;
  status_code: string;
  response: string;
  query_date: string | Date;
}
