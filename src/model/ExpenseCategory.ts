import { NatureType } from 'interface/expense-nature'

export class ExpenseCategoryModel {
  id: string
  name: string
  nature: NatureType

  constructor(params: { id: string; name: string; nature: NatureType }) {
    this.id = params.id
    this.name = params.name
    this.nature = params.nature
  }
}
