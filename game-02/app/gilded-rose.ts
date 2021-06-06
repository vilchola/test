/**
 * Refactoring - change list:
 * 1. Changed `for` statement by `for...of` statement (line: 35)
 * 2. Created and import new file: constants.ts (line: 13)
 * 3. Changed `item names` by constants (line: 36, 41, 47, 49, 50, 67, 68)
 * 4. Changed by `increment operator` and `decrement operator` (line: 40, 47, 61, 67, 68)
 * 5. Changed all `equals operator` by `strict equals operator` (line: 36, 41, 47, 49, 50, 67, 68)
 * 6. New method: qualityUp (line: 60)
 * 7. New method: qualityDown (line: 65)
 * 8. Uncomment tests: conjured items
 * 9. New line: added to test conjured items (line: 68)
*/
import { BACKSTAGE, BRIE, CONJURED, SULFURAS } from './constant';

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, quality, sellIn) {
        this.name = name;
        this.quality = quality;
        this.sellIn = sellIn;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    tick() {
        for (const item of this.items) {
            if (item.name !== BRIE && item.name !== BACKSTAGE)
                this.qualityDown(item);
            else {
                if (item.quality < 50) {
                    item.quality++;
                    if (item.name === BACKSTAGE) {
                        if (item.sellIn < 11) this.qualityUp(item);
                        if (item.sellIn < 6) this.qualityUp(item);
                    }
                }
            }
            if (item.name !== SULFURAS) item.sellIn--;
            if (item.sellIn < 0) {
                if (item.name !== BRIE) {
                    if (item.name !== BACKSTAGE) this.qualityDown(item);
                    else item.quality = item.quality - item.quality;
                } else this.qualityUp(item);
            }
        }

        return this.items;
    }

    /** method to increment quality of item */
    qualityUp(item: Item): void {
        if (item.quality < 50) item.quality++;
    }

    /** method to decrement quality of item */
    qualityDown(item: Item): void {
        if (item.quality > 0) {
            if (item.name !== SULFURAS) item.quality--;
            if (item.name === CONJURED) item.quality--;
        }
    }
}
