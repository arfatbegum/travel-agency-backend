export const bookingFilterableFields: string[] = [
  'searchTerm',
  'id',
  'userId',
  'packageId',
];

export const bookingFieldSearchableFields: string[] = [
  'name', 'status', 'date', 'user', 'package',
];

export const bookingRelationalFields: string[] = ['userId', 'packageId'];
export const bookingRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
  serviceId: 'package',
};
