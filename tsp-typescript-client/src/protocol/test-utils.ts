import fs = require('fs');
import path = require('path');
import type { HttpResponse } from './rest-client';

export class FixtureSet {

    static async fromFolder(...paths: string[]): Promise<FixtureSet> {
        const folder = path.resolve(...paths);
        const files = await fs.promises.readdir(folder);
        const fixtures = new Map<string, string>();
        for (const file of files) {
            fixtures.set(file, path.resolve(folder, file));
        }
        return new this(fixtures);
    }

    /**
     * Set of unused fixtures (file names).
     */
    protected unused: Set<string>;

    protected constructor(
        /**
         * Key: fixture file name.
         * Value: fixture file path.
         */
        protected fixtures: Map<string, string>
    ) {
        this.unused = new Set(fixtures.keys());
    }

    async asResponse(fixtureName: string, options: Partial<HttpResponse> = {}): Promise<HttpResponse> {
        const { status = 200, statusText = 'Success' } = options;
        return {
            status,
            statusText,
            text: await this.readFixture(fixtureName),
        };
    }

    assertUsedAllFixtures(): void {
        if (this.unused.size > 0) {
            throw new Error(`Some fixtures were not used!\n${
                Array.from(this.unused, fixture => ` - ${fixture}`).join('\n')
            }`);
        }
    }

    protected async readFixture(fixtureName: string): Promise<string> {
        const fixturePath = this.fixtures.get(fixtureName);
        if (!fixturePath) {
            throw new Error(`no fixture named ${fixtureName}`);
        }
        const content = await fs.promises.readFile(fixturePath, 'utf8');
        this.unused.delete(fixtureName);
        return content;
    }
}
