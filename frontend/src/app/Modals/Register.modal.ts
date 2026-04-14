export interface UserData{
name: string;
email: string;
password: string;
address: string;
contactno: string;
dateofbirth: Date;
role: string;
}


export interface profileData{
id: number;
name: string;
email: string;
password: string;
address: string;
contactno: string;
dateofbirth: Date;
role: string;
}

export interface LoginData{
    email: string;
    password: string;
}

export interface resetPassword{
email: string;
otp: string; 
newPassword: string;
confirmPassword: string;
}


