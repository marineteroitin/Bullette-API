import UserRepository from "../../ports/repositories/User.repository";

export default class ExistByEmailUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: any): Promise<boolean> {
        return this.userRepository.existByEmail(email);
    }
}
