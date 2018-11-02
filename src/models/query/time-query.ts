/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ********************************************************************************/

export class TimeQuery {
    private timesRequested: number[];

    constructor(start: number, end: number, nb: number) {
        this.timesRequested = this.splitRangeIntoEqualParts(start, end, nb);
    }

    private splitRangeIntoEqualParts(start: number, end: number, nb: number): number[] {
        let result: number[] = new Array(nb);
        if (nb === 1) {
            if (start === end) {
                result[0] = start;
                return result;
            }
        }

        const stepSize: number = Math.abs(end - start) / (nb - 1);
        for (let i = 0; i < nb; i++) {
            result[i] = Math.min(start, end) + Math.round(i * stepSize);
        }
        result[result.length - 1] = Math.max(start, end);
        return result;
    }
}
