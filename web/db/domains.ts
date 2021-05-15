import {
  AltarOfTheFalls,
  BeneathTheDragonQuellerDrops,
  CityOfReflections,
  ClearPoolAndMountainCavernDrops,
  ConfrontStormterrorDrops,
  DomainDropSet,
  DomainOfGuyunDrops,
  ElectrostaticField,
  EnterTheGoldenHouseDrops,
  ForsakenRiftDrops1,
  ForsakenRiftDrops2,
  ForsakenRiftDrops3,
  ForsakenRiftDrops4,
  HiddenPalaceOfZhouFormulaDrops,
  MidsummerCourtyardDrops,
  PeakOfVindagnyrDrops,
  RidgeWatchDrops,
  RuinsOfThirstingCapital,
  SubmergedValley,
  TaishanMansionDrops1,
  TaishanMansionDrops2,
  TaishanMansionDrops3,
  TaishanMansionDrops4,
  Thundercloud,
  ThunderingRuins,
  TrailGroundsOfThunder,
  ValleyOfRemembranceDrops,
  WolfOfTheNorthChallengeDrops,
} from "./domainDropSets";
import { registerMessage } from "../utils";

export type Domain = {
  type: "Domain";
  name: string;
  wiki: string;
  drops: DomainDropSet[];
};

export const CeciliaGarden: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Cecilia Garden" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Cecilia_Garden",
  drops: [CityOfReflections, SubmergedValley, RuinsOfThirstingCapital, AltarOfTheFalls],
};

export const HiddenPalaceOfLianshanFormula: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Hidden Palace of Lianshan Formula" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Hidden_Palace_of_Lianshan_Formula",
  drops: [Thundercloud, ThunderingRuins, TrailGroundsOfThunder, ElectrostaticField],
};

export const MidsummerCourtyard: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Midsummer Courtyard" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Midsummer_Courtyard",
  drops: [MidsummerCourtyardDrops],
};

export const DomainOfGuyun: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Domain of Guyun" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Domain_of_Guyun",
  drops: [DomainOfGuyunDrops],
};

export const ValleyOfRemembrance: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Valley of Remembrance" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Valley_of_Remembrance",
  drops: [ValleyOfRemembranceDrops],
};

export const HiddenPalaceOfZhouFormula: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Hidden Palace of Zhou Formula" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Hidden_Palace_of_Zhou_Formula",
  drops: [HiddenPalaceOfZhouFormulaDrops],
};

export const ClearPoolAndMountainCavern: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Clear Pool and Mountain Cavern" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Clear_Pool_and_Mountain_Cavern",
  drops: [ClearPoolAndMountainCavernDrops],
};

export const ForsakenRift: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Forsaken Rift" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Forsaken_Rift",
  drops: [ForsakenRiftDrops1, ForsakenRiftDrops2, ForsakenRiftDrops3, ForsakenRiftDrops4],
};

export const TaishanMansion: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Taishan Mansion" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Taishan_Mansion",
  drops: [TaishanMansionDrops1, TaishanMansionDrops2, TaishanMansionDrops3, TaishanMansionDrops4],
};

export const ConfrontStormterror: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Confront Stormterror" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Confront_Stormterror",
  drops: [ConfrontStormterrorDrops],
};

export const WolfOfTheNorthChallenge: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Wolf of the North Challenge" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Wolf_of_the_North_Challenge",
  drops: [WolfOfTheNorthChallengeDrops],
};

export const PeakOfVindagnyr: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Peak of Vindagnyr" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Peak_of_Vindagnyr",
  drops: [PeakOfVindagnyrDrops],
};

export const EnterTheGoldenHouse: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Enter the Golden House" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Enter_the_Golden_House",
  drops: [EnterTheGoldenHouseDrops],
};

export const BeneathTheDragonQueller: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Beneath the Dragon-Queller" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Beneath_the_Dragon-Queller",
  drops: [BeneathTheDragonQuellerDrops],
};

export const RidgeWatch: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Ridge Watch" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ridge_Watch",
  drops: [RidgeWatchDrops],
};

export const Domains = [
  CeciliaGarden,
  HiddenPalaceOfLianshanFormula,
  MidsummerCourtyard,
  DomainOfGuyun,
  ValleyOfRemembrance,
  HiddenPalaceOfZhouFormula,
  ClearPoolAndMountainCavern,
  ForsakenRift,
  TaishanMansion,
  ConfrontStormterror,
  WolfOfTheNorthChallenge,
  PeakOfVindagnyr,
  EnterTheGoldenHouse,
  BeneathTheDragonQueller,
  RidgeWatch,
];
