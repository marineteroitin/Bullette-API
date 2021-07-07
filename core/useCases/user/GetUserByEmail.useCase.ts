import UserRepository from "../../ports/repositories/User.repository";
import User from "../../domain/User.domain";

export default class GetUserByEmailUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: any): Promise<User> {
        return this.userRepository.getUserByEmail(email);
    }
}
