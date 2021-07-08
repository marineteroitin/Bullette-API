import User from "../../domain/User.domain";
import {BusinessException} from "../../exeptions/Business.exeption";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


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
            if(!user.email.toLocaleLowerCase().match(regEmail)){
                throw new BusinessException("Email invalide");
            } else {
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
