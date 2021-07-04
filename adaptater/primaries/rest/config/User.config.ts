import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import RegisterUseCase from "../../../../core/usecases/user/Register.usecase";
import ExistByEmailUseCase from "../../../../core/usecases/user/ExistByEmail.usecase";



import MailingRepositoryGmail from "../../../secondaries/gmail/implementation/MailingRepositoryGmail";
import UserRepositoryMongodb from "../../../secondaries/mongodb/repositories/User.repository";

export default class UserConfig {
    private userRepository: UserRepository = new UserRepositoryMongodb();
    private mailingRepository: MailingRepository = new MailingRepositoryGmail();

    public existByEmailUseCase(): ExistByEmailUseCase {
        return new ExistByEmailUseCase(this.userRepository);
    }

    public registerUseCase(): RegisterUseCase {
        return new RegisterUseCase(this.userRepository, this.mailingRepository);
    }

}
