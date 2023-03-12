import { Types } from "mongoose";
import { Subject } from "../interfaces/subject.interface";
import SubjectModel from "../models/subject";
import UserModel from "../models/user";

const insertSubject=async(item:Subject)=>{
    const responseInsert=await SubjectModel.create(item);
    return responseInsert;
};

const getSubjects=async()=>{
    const responseItem=await SubjectModel.find({}).populate('users');
    return responseItem;
};

const getSubject=async(id:string)=>{
    const responseItem=await SubjectModel.findOne({_id:id}).populate('users');
    return responseItem;
};

const updateSubject=async(id:string,data:Subject)=>{
    const responseItem=await SubjectModel.findOneAndUpdate(
        {_id:id},
        data,
        {
            new:true,
        }
    ).populate('users');
    return responseItem;
};

const deleteSubject=async(id:string)=>{
    const responseItem=await SubjectModel.deleteOne({_id:id});
    return responseItem;
}

const matriculateSubject=async(idUser:string,idSubject:string)=>{
    const responseSubject = await SubjectModel.findOneAndUpdate(
        {_id:idSubject},
        {$addToSet: {users: new Types.ObjectId(idUser)}},
        {new: true}
    ).populate('users');
    
    const responseUser = await UserModel.findOneAndUpdate(
        {_id:idUser},
        {$addToSet: {subjects: new Types.ObjectId(idSubject)}},
        {new: true}
    ).populate('subjects');

    return {responseSubject, responseUser};
};

const getUsersSubject = async(idSubject:string) => {
    const subject = await SubjectModel.findById({_id:idSubject}).populate('users');
    const response = await subject?.users;    
    return response;
}

export { insertSubject, getSubject, getSubjects, updateSubject, deleteSubject, matriculateSubject, getUsersSubject };
