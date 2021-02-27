import { TwiteInterface } from '../Interfaces/TwiteInterface';

export const ITEMS_KEY = 'items';

export class SavedTwitesService {
  static getTwites(): TwiteInterface[] {
    const items = localStorage.getItem(ITEMS_KEY);
    return items? JSON.parse(items) : [];
  }

  static addTwite(twite: TwiteInterface) {
    const items = this.getTwites();

    if (!items.find((item: TwiteInterface) => item.id == twite.id)) {
      items.push(twite);
      localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    }

    return items;
  }
}