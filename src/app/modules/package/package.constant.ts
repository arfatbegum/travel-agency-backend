export const packageFilterableFields: string[] = [
  'searchTerm'
];

export const packageFieldSearchableFields: string[] = ['name', 'location'];

export const packageRelationalFields: string[] = ['categoryId'];
export const packageRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
