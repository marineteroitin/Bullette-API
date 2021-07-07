import User from "../../domain/User.domain";
import {BusinessException} from "../../exeptions/Business.exeption";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";

export default class RegisterUseCase {
    constructor(
        private userRepository: UserRepository,
        private mailingRepository: MailingRepository
    ) {}
    async execute(user: User, link: any): Promise<User> {
        await this.checkBusinessRules(user)
        this.mailingRepository.sendMailRegister(user, link);
        return this.userRepository.register(user);
    }

    private async checkBusinessRules(user: User): Promise<void> {
        if(user.email) {
            if (await this.userRepository.getUserByEmail(user.email)) {
                throw new BusinessException(
                    "Un utilisateur existe déjà avec cet email"
                );
            } else {
                if(user.firstName && this.checkIfIsValid("prénom", user.firstName, 2) ){
                    if(!user.password || ! (this.checkIfIsValid("mot de passe", user.password, 4))){
                        throw new BusinessException("Le mot de passe est obligatoire");
                    }
                } else {
                    throw new BusinessException("Le prénom est obligatoire");

                }
            }

        } else {
            throw new BusinessException("L'email est obligatoire");
        }


    }

    private checkIfIsValid(champ: string ,value: string, minLength: number) : boolean{
        if(value.length < minLength){
            throw new BusinessException("Le "+ champ +" doit comporter au moins " + minLength+" caractères.");
        }else{
            return true;
        }
    }
}
