export const NatureExpenses = ['NEEDS', 'WANTS', 'SAVINGS'] as const

export type NatureType = (typeof NatureExpenses)[number]
