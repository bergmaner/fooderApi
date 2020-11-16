export interface CreateVandorInput{
name: string;
ownerName: string;
foodType: [string];
pinCode: string;
address: string;
phone: string;
email: string;
password: string;
}

export interface LoginVandorInput{
    email: string;
    password: string;
    }