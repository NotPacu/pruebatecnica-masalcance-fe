export interface AddressDTO {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface CompanyDTO {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UsersDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  address: AddressDTO;
  phone: string;
  website: string;
  company: CompanyDTO;
}