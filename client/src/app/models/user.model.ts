export class User {
  public agreed: boolean;
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public gender: string,
    public avatar: string,
    public password: string,
    public password_confirmation: string
  ) { };
}

export interface Gender {
    name: string;
    value: string;
}

export const FEMALE = 'F';

export const MALE = 'M';

export const GENDERS: Array<Gender> = [
    { name: 'Female', value: 'F' },
    { name: 'Male', value: 'M' }
];