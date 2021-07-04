import User from "../../domain/User.domain";

export default interface UserRepository {
    register(user: User): Promise<User>;
    googleRegistration(user: User): Promise<User>;

    login(email: any, password: any): Promise<User>;
    googleAuthentication(user: User): Promise<User>;

    existByEmail(email: any): Promise<boolean>;

    forgottenPassword(email: any): Promise<String>;
    updatePassword(id: any,oldPassword:any, newPassword: any): Promise<User>;
    updateFirstName(id: any, firstName: any): Promise<User>;

    deleteAccount(id: any): Promise<String>;
}
