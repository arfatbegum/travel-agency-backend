export const serviceFilterableFields: string[] = [
  'searchTerm',
  'id',
  'categoryId',
];

export const serviceFieldSearchableFields: string[] = ['name, location','category'];

export const serviceRelationalFields: string[] = ['categoryId'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};