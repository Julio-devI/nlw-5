import { getCustomRepository, Repository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { Settings } from "../entities/Settings";


interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: Repository<Settings>

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {

        const userAlreadyExists = await this.settingsRepository.findOne({
            username,
        });

        if (userAlreadyExists) {
            throw new Error("User Already exists!");
        }

        const settings = this.settingsRepository.create({
            chat,
            username,
        });

        await this.settingsRepository.save(settings);

        return settings;
    }

    async findByusername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username
        });

        return settings;

    }

    async update(username: string, chat: boolean) {
        await this.settingsRepository.createQueryBuilder().update(Settings).set({ chat }).
            where("username = :username", {
                username
            }).execute();
    }

}

export { SettingsService };