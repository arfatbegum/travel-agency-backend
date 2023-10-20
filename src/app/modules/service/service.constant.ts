export const serviceFilterableFields: string[] = [
  'searchTerm'
];

export const serviceFieldSearchableFields: string[] = ['name', 'location', 'categorires'];

export const serviceRelationalFields: string[] = ['categoryId'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
