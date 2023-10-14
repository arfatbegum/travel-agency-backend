export const userFilterableFields: string[] = [
    'searchTerm',
    'id',
    'createdAt',
  ];
  
  export const userFieldSearchableFields: string[] = [
    'name, email',
    'contactNo',
  ];
  
  export const userRelationalFields: string[] = ['userId', 'serviceId'];
  export const userRelationalFieldsMapper: { [key: string]: string } = {
    userId: 'user',
    serviceId: 'service',
  };
  