import { deepStrictEqual } from 'assert';
import { Enum, EnumFactory, EnumItem } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ToValuesParser as Self } from './to-values-parser';

describe('src/to-values-parser.ts', () => {
    describe('.parse(v: any)', () => {
        it('ok', async () => {
            const mockEnumFactory = new Mock<EnumFactory>();
            const self = new Self(mockEnumFactory.actual);

            const mockEnumService = new Mock<Enum<EnumItem>>();
            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnumService.actual
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 1,
                }
            );

            mockEnumFactory.expectReturn(
                r => r.build('ValueTypeData'),
                mockEnumService.actual
            );

            mockEnumService.expectReturn(
                r => r.get(mockAny),
                {
                    value: 2,
                }
            );

            const res = await self.parse(`金币*-13020200000
钻石*4`);
            deepStrictEqual(res, [{
                count: -13020200000,
                valueType: 1,
            }, {
                count: 4,
                valueType: 2,
            }]);
        });
    });
});