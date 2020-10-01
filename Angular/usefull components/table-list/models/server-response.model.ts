
interface Body {
  status: number;
  data: any[];
  msg: string;

}

export interface ServerResponse {
  error: string;
  body: Body;
}
