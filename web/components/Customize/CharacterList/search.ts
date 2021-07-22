import { MemorySearch } from "../../../utils/memorySearch";
import { Character, Characters } from "../../../db/characters";
import { MultiMap } from "../../../utils/multiMap";
import { Regions } from "../../../db/regions";
import { DomainOfMastery } from "../../../db/domainCategories";

export const CharacterSearch = new MemorySearch<Character>();
const materialToCharacters = new MultiMap<string, Character>();

for (const character of Characters) {
  CharacterSearch.add(character.type, character);
  CharacterSearch.add(character.name, character);

  for (const material of [...character.talentMaterials, ...character.talentMaterialWeekly]) {
    CharacterSearch.add(material.name, character);
    CharacterSearch.add(material.item, character);

    materialToCharacters.add(material.name, character);
  }
}

for (const region of Regions) {
  for (const character of region.characters) {
    CharacterSearch.add(region.name, character);
  }
}

for (const domain of DomainOfMastery.domains) {
  for (const drops of domain.drops) {
    for (const item of drops.items) {
      for (const character of materialToCharacters.get(item.name)) {
        CharacterSearch.add(domain.name, character);

        drops.name && CharacterSearch.add(drops.name, character);
        drops.days.forEach((day) => CharacterSearch.add(day, character));
      }
    }
  }
}
