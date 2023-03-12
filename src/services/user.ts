//In charge to connect with the dB
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";

const insertUser = async(item: User) => {
    const responseInsert = await UserModel.create(item);
    return responseInsert;
};

const getUsers = async() => {
    const responseItem = await UserModel.find({}).populate('subjects');
    return responseItem;
};

const getUser = async(id: string) => {
    const responseItem = await UserModel.findOne({_id: id});
    return responseItem;
};

const updateUser = async(id: string, data: User) => {
    const responseItem = await UserModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
};

const deleteUser = async(id: string) => {
    const responseItem = await UserModel.findOneAndRemove({_id: id});
    return responseItem;
}

const getSubjectsUser = async(idUser:string) => {
    const user = await UserModel.findById({_id:idUser}).populate('subjects');
    const response = await user?.subjects;    
    console.log(response);
    return response;
}

/*const searchEx3 = async() => {
    const users = await UserModel.find({}).populate('subjects');
    const search = await users.filter(user => user.surname === "Mensa" && user.subjects?.some(subject => subject.semester === 2));
}*/


export {insertUser, getUser, getUsers, updateUser, deleteUser, getSubjectsUser};
