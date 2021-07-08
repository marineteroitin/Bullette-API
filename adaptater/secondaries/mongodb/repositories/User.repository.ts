import User from '../../../../core/domain/User.domain';
import UserRepository from '../../../../core/ports/repositories/User.repository';
// @ts-ignore
import UserMongodb from '../entities/User.model';
const passwordEncryption = require('../encryption/passwordEncryption');

export default class UserRepositoryMongodb implements UserRepository {
    // TODO
    deleteAccount(id: any): Promise<String> {
        return Promise.resolve("");
    }


    async getUserByEmail(email: any): Promise<UserMongodb> {
        try {
            return await UserMongodb.findOne({ email: email })
        } catch (error) {
            throw error;
        }
    }

    // TODO
    forgottenPassword(email: any): Promise<String> {
        return Promise.resolve("");
    }

    // TODO
    googleAuthentication(user: User): Promise<UserMongodb> {
        return Promise.resolve(user);
    }

    // TODO
    googleRegistration(user: User): Promise<UserMongodb> {
        return Promise.resolve(user);
    }

    // TODO
    async login(email: any, password: any): Promise<UserMongodb> {
        try {
            return await UserMongodb.findOne({ email: email, password: password })
        } catch (error) {
            throw error;
        }
    }

    async register(user: User): Promise<UserMongodb> {
        try{
                const hashedPassword = await passwordEncryption.passwordEncryption(user.password);
                const userData = new UserMongodb ({
                    email: user.email,
                    password: hashedPassword,
                    firstName: user.firstName
                });
                return await userData.save();

            } catch (error) {
                throw error;
            }
    }


    // TODO
    async updateFirstName(id: any, firstName: any): Promise<UserMongodb> {
        try {
            return await UserMongodb.updateFirstName({ firstName: firstName })
        } catch (error) {
            throw error;
        }
    }

    // TODO
    async updatePassword(id: any, oldPassword: any, newPassword: any): Promise<UserMongodb> {
        try {
            return await UserMongodb.findByIdAndUpdate({ id: id })
        } catch (error) {
            throw error;
        }
    }

}
