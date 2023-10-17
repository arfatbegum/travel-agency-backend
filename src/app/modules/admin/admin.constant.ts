export const adminFilterableFields: string[] = ['searchTerm', 'bookingId'];

export const adminFieldSearchableFields: string[] = [
  'name', 'email', 'contactNo',
];

export const adminRelationalFields: string[] = ['bookingId'];
export const adminRelationalFieldsMapper: { [key: string]: string } = {
  bookingId: 'bookings',
};
