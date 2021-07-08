import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import RegisterUseCase from "../../../../core/usecases/user/Register.usecase";
import GetUserByEmailUseCase from "../../../../core/useCases/user/GetUserByEmail.useCase";



import MailingRepositoryGmail from "../../../secondaries/gmail/implementation/MailingRepositoryGmail";
import UserRepositoryMongodb from "../../../secondaries/mongodb/repositories/User.repository";

export default class UserConfig {
    private userRepository: UserRepository = new UserRepositoryMongodb();
    private mailingRepository: MailingRepository = new MailingRepositoryGmail();

    public getUserByEmailUseCase(): GetUserByEmailUseCase {
        return new GetUserByEmailUseCase(this.userRepository);
    }

    public registerUseCase(): RegisterUseCase {
        return new RegisterUseCase(this.userRepository, this.mailingRepository);
    }
}
