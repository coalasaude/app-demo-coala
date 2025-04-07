import { addHealthInsurance, AddUserHealthInsuranceParams } from './add-health-insurance'

export async function addManyHealthInsurance(params: AddUserHealthInsuranceParams[]) {
  return Promise.all(params.map((param) => addHealthInsurance(param)))
}
