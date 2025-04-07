import { TApiMedicineResponse } from "../medicine"

export interface TApiMedicineListResponse {
  count: number;
  results: TApiMedicineResponse[]
}
