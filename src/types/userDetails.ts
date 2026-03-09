export type userDetails = {
    id: string;
    name: string;
    email: string;
    password: string;
    otp:number,
    image:string
}

export interface verifyDataTypes{
  email: string;
  otp: number;
}

export type newImageTypes = {
    email:string;
    newImage:string;
}