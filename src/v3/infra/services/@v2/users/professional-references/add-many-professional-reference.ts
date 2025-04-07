import {
  addProfessionalReference,
  AddUserProfessionalReferenceParams,
} from './add-professional-reference'

export async function addManyProfessionalReference(params: AddUserProfessionalReferenceParams[]) {
  return Promise.all(params.map((param) => addProfessionalReference(param)))
}
