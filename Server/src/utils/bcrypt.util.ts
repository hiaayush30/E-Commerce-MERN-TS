import bcrypt from 'bcrypt';

export const hashPassword=async (password:string)=>{
    return await bcrypt.hash(password,5);
}

export const comparePassword = async (data:string,password:string)=>{
    return await bcrypt.compare(data,password);
}