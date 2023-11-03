export const packageFilterableFields: string[] = [
  'searchTerm'
];

export const packageFieldSearchableFields: string[] = ['name', 'location', 'categorires'];

export const packageRelationalFields: string[] = ['categoryId'];
export const packageRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
