import type { IDGenerator } from "../../../domain/interfaces/id-generator.interface.js";

export class StaticIdGenerator implements IDGenerator {
    generate(): string {
        return '1';
    }
}