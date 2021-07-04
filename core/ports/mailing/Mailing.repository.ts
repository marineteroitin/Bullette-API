import User from "../../domain/User.domain";

export default interface MailingRepository {
    sendMailRegister(user: User, link: any): void;
    sendMailForgettenPassword(data: any): void;
}
