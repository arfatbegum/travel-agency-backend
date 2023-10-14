export const adminFilterableFields: string[] = [
  'searchTerm',
  'id',
  'createdAt',
];

export const adminFieldSearchableFields: string[] = [
  'name, email',
  'contactNo',
];

export const adminRelationalFields: string[] = ['userId', 'serviceId'];
export const adminRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
  serviceId: 'service',
};
