import User from "../../domain/User.domain";
import RegisterUseCase from "../../useCases/user/Register.useCase";
import UserRepository from "../../ports/repositories/User.repository";
import MailingRepository from "../../ports/mailing/Mailing.repository";

const initUser = () : User => {
    const user = new User();
    user.email = 'marine.teroitin@gmail.com';
    user.password = 'azerty';
    user.firstName = 'Marine';
    return user;
}

describe("Register unit test", () => {
    let registerUseCase: RegisterUseCase;

    let user: User;
    let rand: number;
    let link: string;

    let userRepository: UserRepository = ({
        register: null,
        getUserByEmail:null
    } as unknown) as UserRepository;

    let mailingRepository: MailingRepository =({
        sendMailRegister: null

    } as unknown) as MailingRepository;

    beforeEach( () => {
        user = initUser();

        rand = Math.floor(Math.random() * 100 + 54);
        link = "http://localhost/server/verify?id=" + rand;
        registerUseCase = new RegisterUseCase(userRepository, mailingRepository);
        spyOn(userRepository, "register").and.callFake((user: User) => {
            if (user) {
                const result: User = { ...user, emailConfirmed: false };
                return new Promise((resolve, reject) => resolve(result));
            }
            return new Promise((resolve, reject) => resolve(null));
        });

        spyOn(mailingRepository, "sendMailRegister");
    });
    it("registerUseCase should return user when it succeeded", async () => {
        spyOn(userRepository, "getUserByEmail").and.returnValue(false);
        const result: User = await registerUseCase.execute(user, link);
        expect(result).toBeDefined();
        expect(result.email).toStrictEqual("marine.teroitin@gmail.com");
        expect(result.firstName).toStrictEqual('Marine');

    });

    it("registerUseCase should throw a parameter exception when the email already exists", async () => {
        try {
            spyOn(userRepository, "getUserByEmail").and.returnValue(true);
            await registerUseCase.execute(user, link);
        } catch (error) {
            expect(error.message).toBe("Un utilisateur existe déjà avec cet email");
        }
    });

    it("registerUseCase should throw a parameter exception when the email is undefined", async () => {
        user.email = undefined;
        try {
            spyOn(userRepository, "getUserByEmail").and.returnValue(false);
            await registerUseCase.execute(user, link);
        } catch (error) {
            expect(error.message).toBe("L'email est obligatoire");
        }
    });

    it("registerUseCase should throw a parameter exception when the firstName is undefined", async () => {
        user.firstName = undefined;
        try {
            spyOn(userRepository, "getUserByEmail").and.returnValue(false);
            await registerUseCase.execute(user, link);
        } catch (error) {
            expect(error.message).toBe("Le prénom est obligatoire");
        }
    });

    it("registerUseCase should throw a parameter exception when the firstName is less than 2 characters ", async () => {
        user.firstName = "a";
        try {
            spyOn(userRepository, "getUserByEmail").and.returnValue(false);
            await registerUseCase.execute(user, link);
        } catch (error) {
            expect(error.message).toBe(
                "Le prénom doit comporter au moins 2 caractères."
            );
        }
    });

    it("registerUseCase should throw a parameter exception when the password is undefined", async () => {
        user.password = undefined;
        try {
            spyOn(userRepository, "getUserByEmail").and.returnValue(false);
            await registerUseCase.execute(user, link);
        } catch (error) {
            expect(error.message).toBe("Le mot de passe est obligatoire");
        }
    });

    it("registerUseCase should throw a parameter exception when the password is less than 4 characters ", async () => {
        user.password = "aze";
        try {
            spyOn(userRepository, "getUserByEmail").and.returnValue(false);
            await registerUseCase.execute(user, link);
        } catch (error) {
            expect(error.message).toBe(
                "Le mot de passe doit comporter au moins 4 caractères."
            );
        }
    });

});
