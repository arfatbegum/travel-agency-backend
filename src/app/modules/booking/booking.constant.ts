export const bookingFilterableFields: string[] = [
  'searchTerm',
  'id',
  'userId',
  'serviceId',
];

export const bookingFieldSearchableFields: string[] = [
  'name, status',
  'user',
  'service',
];

export const bookingRelationalFields: string[] = ['userId', 'serviceId'];
export const bookingRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
  serviceId: 'service',
};
