import { registerMessage } from "../utils";
import { Position } from "../utils/mapPositionUtils";

export const MapZoomMin = 2.5;
export const MapZoomMax = 6;
export const MapBounds = [24, 8, 232, 184];

export type TMarker = {
  name: string;
  location: Position;
};

export type Markers = TMarker[];

export const CountryMarkers: Markers = [
  {
    name: registerMessage({ defaultMessage: "Mondstadt" }),
    location: { x: 2.07, y: -1.25 },
  },
  {
    name: registerMessage({ defaultMessage: "Liyue" }),
    location: { x: -22.29, y: 22.52 },
  },
  {
    name: registerMessage({ defaultMessage: "Inazuma" }),
    location: { x: 35.23, y: 89.82 },
  },
  {
    name: registerMessage({ defaultMessage: "Sumeru" }),
    location: { x: -61.02, y: 41.51 },
  },
];

export const RegionMarkers: Markers = [
  // region Mondstadt
  {
    name: registerMessage({ defaultMessage: "Starfell Valley" }),
    location: { x: 6.46, y: -10.67 },
  },
  {
    name: registerMessage({ defaultMessage: "Galesong Hill" }),
    location: { x: 7, y: 3.77 },
  },
  {
    name: registerMessage({ defaultMessage: "Brightcrown\nMountains" }),
    location: { x: -9.42, y: -12.91 },
  },
  {
    name: registerMessage({ defaultMessage: "Windwail Highland" }),
    location: { x: -5.69, y: -3.62 },
  },
  {
    name: registerMessage({ defaultMessage: "Dragonspine" }),
    location: { x: -2.94, y: 9.02 },
  },
  // endregion

  // region Liyue
  {
    name: registerMessage({ defaultMessage: "Bishui Plain" }),
    location: { x: -22.94, y: 8.35 },
  },
  {
    name: registerMessage({ defaultMessage: "Qiongji Estuary" }),
    location: { x: -14.98, y: 20.09 },
  },
  {
    name: registerMessage({ defaultMessage: "Sea of Clouds" }),
    location: { x: -11.86, y: 35.33 },
  },
  {
    name: registerMessage({ defaultMessage: "Minlin" }),
    location: { x: -38.26, y: 21.26 },
  },
  {
    name: registerMessage({ defaultMessage: "Lisha" }),
    location: { x: -30.84, y: 38.07 },
  },
  {
    name: registerMessage({ defaultMessage: "The Chasm" }),
    location: { x: -41.45, y: 39.38 },
  },
  // endregion

  // region Inazuma
  {
    name: registerMessage({ defaultMessage: "Narukami Island" }),
    location: { x: 49.22, y: 70.4 },
  },
  {
    name: registerMessage({ defaultMessage: "Kannazuka" }),
    location: { x: 33.96, y: 79.97 },
  },
  {
    name: registerMessage({ defaultMessage: "Yashiori Island" }),
    location: { x: 16.52, y: 87.73 },
  },
  {
    name: registerMessage({ defaultMessage: "Watatsumi Island" }),
    location: { x: -1.62, y: 83.81 },
  },
  {
    name: registerMessage({ defaultMessage: "Seirai Island" }),
    location: { x: 47.51, y: 100.1 },
  },
  {
    name: registerMessage({ defaultMessage: "Tsurumi Island" }),
    location: { x: 27.87, y: 126.0 },
  },
  // endregion

  // region Sumeru
  {
    name: registerMessage({ defaultMessage: "Lokapala Jungle" }),
    location: { x: -51.52, y: 24.99 },
  },
  {
    name: registerMessage({ defaultMessage: "Avidya Forest" }),
    location: { x: -55.41, y: 36.24 },
  },
  {
    name: registerMessage({ defaultMessage: "Ardravi Valley" }),
    location: { x: -54.27, y: 53.13 },
  },
  {
    name: registerMessage({ defaultMessage: "Vanarana" }),
    location: { x: -68.69, y: 31.09 },
  },
  {
    name: registerMessage({ defaultMessage: "Vissudha Field" }),
    location: { x: -65.13, y: 35.25 },
  },
  {
    name: registerMessage({ defaultMessage: "Ashavan Realm" }),
    location: { x: -65.67, y: 48.24 },
  },
  {
    name: registerMessage({ defaultMessage: "Lost Nursery" }),
    location: { x: -75.08, y: 38.34 },
  },
  // endregion
];

export const PlaceMarkers: Markers = [
  // region Mondstadt
  {
    name: registerMessage({ defaultMessage: "Stormbearer Point" }),
    location: { x: 13.62, y: -17.73 },
  },
  {
    name: registerMessage({ defaultMessage: "Starsnatch Cliff" }),
    location: { x: 12.87, y: -12.11 },
  },
  {
    name: registerMessage({ defaultMessage: "Thousand Winds\nTemple" }),
    location: { x: 12.76, y: -8.22 },
  },
  {
    name: registerMessage({ defaultMessage: "Stormbearer Mountains" }),
    location: { x: 5.97, y: -15.72 },
  },
  {
    name: registerMessage({ defaultMessage: "Starfell Lake" }),
    location: { x: 6.78, y: -12.75 },
  },
  {
    name: registerMessage({ defaultMessage: "Whispering Woods" }),
    location: { x: 3.84, y: -10.53 },
  },
  {
    name: registerMessage({ defaultMessage: "Windrise" }),
    location: { x: 5.4, y: -3.41 },
  },

  {
    name: registerMessage({ defaultMessage: "Falcon Coast" }),
    location: { x: 12.67, y: 0.09 },
  },
  {
    name: registerMessage({ defaultMessage: "Dadaupa Gorge" }),
    location: { x: 10.48, y: 6.44 },
  },
  {
    name: registerMessage({ defaultMessage: "Cape Oath" }),
    location: { x: 17.81, y: 4.73 },
  },
  {
    name: registerMessage({ defaultMessage: "Musk Reef" }),
    location: { x: 26.7, y: 3.9 },
  },

  {
    name: registerMessage({ defaultMessage: "Wolvendom" }),
    location: { x: -7.83, y: -5.58 },
  },
  {
    name: registerMessage({ defaultMessage: "Springvale" }),
    location: { x: -1.18, y: -1.81 },
  },
  {
    name: registerMessage({ defaultMessage: "Dawn Winery" }),
    location: { x: -7.97, y: -0.13 },
  },

  {
    name: registerMessage({ defaultMessage: "Cider Lake" }),
    location: { x: -1.05, y: -13.63 },
  },
  {
    name: registerMessage({ defaultMessage: "Mondstadt​" }), // ZWSP is for make a diff with Country label
    location: { x: -1.43, y: -9.7 },
  },
  {
    name: registerMessage({ defaultMessage: "Brightcrown Canyon" }),
    location: { x: -7.94, y: -14.8 },
  },
  {
    name: registerMessage({ defaultMessage: "Stormterror's Lair" }),
    location: { x: -16.22, y: -15.02 },
  },

  {
    name: registerMessage({ defaultMessage: "Snow-Covered Path" }),
    location: { x: 1.78, y: 6.02 },
  },
  {
    name: registerMessage({
      defaultMessage: "Entombed City - Ancient\nPalace",
    }),
    location: { x: 1.4, y: 10.63 },
  },
  {
    name: registerMessage({ defaultMessage: "Skyfrost Nail" }),
    location: { x: -0.08, y: 12.73 },
  },
  {
    name: registerMessage({ defaultMessage: "Starglow\nCavern" }),
    location: { x: -1.5, y: 14.64 },
  },
  {
    name: registerMessage({ defaultMessage: "Wyrmrest Valley" }),
    location: { x: -3.78, y: 7.36 },
  },
  {
    name: registerMessage({ defaultMessage: "Entombed City -\nOutskirts" }),
    location: { x: -7.75, y: 12.13 },
  },
  // endregion

  // region Liyue
  {
    name: registerMessage({ defaultMessage: "Qingce Village" }),
    location: { x: -24.58, y: 0.35 },
  },
  {
    name: registerMessage({ defaultMessage: "Wuwang Hill" }),
    location: { x: -20.83, y: 3.23 },
  },
  {
    name: registerMessage({ defaultMessage: "Stone Gate" }),
    location: { x: -17.72, y: 5.11 },
  },
  {
    name: registerMessage({ defaultMessage: "Dihua Marsh" }),
    location: { x: -20.27, y: 9.33 },
  },
  {
    name: registerMessage({ defaultMessage: "Sal Terrae" }),
    location: { x: -11.94, y: 7.73 },
  },
  {
    name: registerMessage({ defaultMessage: "Mingyun Village" }),
    location: { x: -10.02, y: 15.8 },
  },
  {
    name: registerMessage({ defaultMessage: "Yaoguang Shoal" }),
    location: { x: -11.07, y: 20.78 },
  },

  {
    name: registerMessage({ defaultMessage: "Wangshu Inn" }),
    location: { x: -19.52, y: 15.45 },
  },
  {
    name: registerMessage({ defaultMessage: "Guili Plains" }),
    location: { x: -18.13, y: 19.84 },
  },
  {
    name: registerMessage({ defaultMessage: "Luhua Pool" }),
    location: { x: -23.96, y: 24.61 },
  },
  {
    name: registerMessage({ defaultMessage: "Cuijue Slope" }),
    location: { x: -26.94, y: 21.33 },
  },

  {
    name: registerMessage({ defaultMessage: "Mt. Tianheng" }),
    location: { x: -23.61, y: 35.72 },
  },
  {
    name: registerMessage({ defaultMessage: "Liyue Harbor" }),
    location: { x: -17.44, y: 34.95 },
  },
  {
    name: registerMessage({ defaultMessage: "Guyun Stone Forest" }),
    location: { x: -2.58, y: 31.02 },
  },

  {
    name: registerMessage({ defaultMessage: "Dunyu Ruins" }),
    location: { x: -28.57, y: 31.19 },
  },
  {
    name: registerMessage({ defaultMessage: "Lingju Pass" }),
    location: { x: -32.43, y: 35.66 },
  },
  {
    name: registerMessage({ defaultMessage: "Qingxu Pool" }),
    location: { x: -34.43, y: 41.48 },
  },

  {
    name: registerMessage({ defaultMessage: "Mt. Aocang" }),
    location: { x: -38.72, y: 10.31 },
  },
  {
    name: registerMessage({ defaultMessage: "Huaguang Stone Forest" }),
    location: { x: -41.43, y: 13.64 },
  },
  {
    name: registerMessage({ defaultMessage: "Qingyun Peak" }),
    location: { x: -38.21, y: 15.03 },
  },
  {
    name: registerMessage({ defaultMessage: "Mt. Hulao" }),
    location: { x: -43.89, y: 16.91 },
  },
  {
    name: registerMessage({ defaultMessage: "Jueyun Karst" }),
    location: { x: -32.82, y: 16.5 },
  },
  {
    name: registerMessage({ defaultMessage: "Nantianmen" }),
    location: { x: -41.27, y: 21.8 },
  },
  {
    name: registerMessage({ defaultMessage: "Tianqiu Valley" }),
    location: { x: -33.64, y: 25.56 },
  },

  {
    name: registerMessage({ defaultMessage: "Lumberpick Valley" }),
    location: { x: -38.72, y: 31.72 },
  },
  {
    name: registerMessage({ defaultMessage: "Fuao Vale" }),
    location: { x: -42.57, y: 35.81 },
  },
  {
    name: registerMessage({ defaultMessage: "The Surface" }),
    location: { x: -42.57, y: 37.34 },
  },
  {
    name: registerMessage({ defaultMessage: "The Chasm's Maw" }),
    location: { x: -43.03, y: 39.47 },
  },
  {
    name: registerMessage({ defaultMessage: "Cinnabar Cliff" }),
    location: { x: -46.99, y: 40.2 },
  },
  {
    name: registerMessage({ defaultMessage: "Tiangong Gorge" }),
    location: { x: -43.08, y: 42.05 },
  },
  {
    name: registerMessage({ defaultMessage: "Glaze Peak" }),
    location: { x: -38.64, y: 41.66 },
  },
  // endregion

  // region Inazuma
  {
    name: registerMessage({ defaultMessage: "Jinren Island" }),
    location: { x: 51.43, y: 56.89 },
  },
  {
    name: registerMessage({ defaultMessage: "Ritou" }),
    location: { x: 45.25, y: 66.8 },
  },
  {
    name: registerMessage({ defaultMessage: "Araumi" }),
    location: { x: 52.2, y: 63.72 },
  },
  {
    name: registerMessage({ defaultMessage: "Grand Narukami Shrine" }),
    location: { x: 54.11, y: 66.39 },
  },
  {
    name: registerMessage({ defaultMessage: "Mt. Yougou" }),
    location: { x: 54.04, y: 67.97 },
  },
  {
    name: registerMessage({ defaultMessage: "Kamisato Estate" }),
    location: { x: 58.67, y: 68.2 },
  },
  {
    name: registerMessage({ defaultMessage: "Konda Village" }),
    location: { x: 49.84, y: 70.03 },
  },
  {
    name: registerMessage({ defaultMessage: "Chinju Forest" }),
    location: { x: 55.82, y: 70.83 },
  },
  {
    name: registerMessage({ defaultMessage: "Byakko Plain" }),
    location: { x: 51.0, y: 72.73 },
  },
  {
    name: registerMessage({ defaultMessage: "Amakane Island" }),
    location: { x: 48.14, y: 74.19 },
  },
  {
    name: registerMessage({ defaultMessage: "Inazuma City" }),
    location: { x: 57.01, y: 77.47 },
  },

  {
    name: registerMessage({ defaultMessage: "Kujou Encampment" }),
    location: { x: 39.81, y: 78.79 },
  },
  {
    name: registerMessage({ defaultMessage: "Tatarasuna" }),
    location: { x: 34.01, y: 86.55 },
  },

  {
    name: registerMessage({ defaultMessage: "Nazuchi Beach" }),
    location: { x: 27.92, y: 83.06 },
  },
  {
    name: registerMessage({ defaultMessage: "Fort Fujitou" }),
    location: { x: 18.92, y: 84.34 },
  },
  {
    name: registerMessage({ defaultMessage: "Musoujin Gorge" }),
    location: { x: 22.64, y: 84.81 },
  },
  {
    name: registerMessage({ defaultMessage: "Higi Village" }),
    location: { x: 19.31, y: 86.91 },
  },
  {
    name: registerMessage({ defaultMessage: "Serpent's Head" }),
    location: { x: 21.28, y: 88.42 },
  },
  {
    name: registerMessage({ defaultMessage: "Jakotsu Mine" }),
    location: { x: 22.23, y: 91.58 },
  },
  {
    name: registerMessage({ defaultMessage: "Fort Mumei" }),
    location: { x: 13.11, y: 85.7 },
  },

  {
    name: registerMessage({ defaultMessage: "Suigetsu Pool" }),
    location: { x: 2.62, y: 83.67 },
  },
  {
    name: registerMessage({ defaultMessage: "Sangonomiya Shrine" }),
    location: { x: -1.97, y: 86.58 },
  },
  {
    name: registerMessage({ defaultMessage: "Mouun Shrine" }),
    location: { x: -6.38, y: 87.64 },
  },
  {
    name: registerMessage({ defaultMessage: "Bourou Village" }),
    location: { x: -0.58, y: 89.84 },
  },

  {
    name: registerMessage({ defaultMessage: "Fort Hiraumi" }),
    location: { x: 54.43, y: 94.14 },
  },
  {
    name: registerMessage({ defaultMessage: "Koseki Village" }),
    location: { x: 47.95, y: 96.41 },
  },
  {
    name: registerMessage({ defaultMessage: '"Seiraimaru"' }),
    location: { x: 44.06, y: 97.13 },
  },
  {
    name: registerMessage({ defaultMessage: "Amakumo Peak" }),
    location: { x: 52.11, y: 100.67 },
  },
  {
    name: registerMessage({ defaultMessage: "Asase Shrine" }),
    location: { x: 42.54, y: 102.41 },
  },

  {
    name: registerMessage({ defaultMessage: "Shirikoro Peak" }),
    location: { x: 25.93, y: 121.56 },
  },
  {
    name: registerMessage({ defaultMessage: "Chirai Shrine" }),
    location: { x: 31.04, y: 122.89 },
  },
  {
    name: registerMessage({ defaultMessage: "Oina Beach" }),
    location: { x: 27.07, y: 123.39 },
  },
  {
    name: registerMessage({ defaultMessage: "Autake Plains" }),
    location: { x: 25.51, y: 126.3 },
  },
  {
    name: registerMessage({ defaultMessage: "Mt. Kanna" }),
    location: { x: 27.82, y: 126.75 },
  },
  {
    name: registerMessage({ defaultMessage: "Moshiri Ceremonial Site" }),
    location: { x: 29.68, y: 127.45 },
  },
  {
    name: registerMessage({ defaultMessage: "Wakukau Shoal" }),
    location: { x: 29.11, y: 129.31 },
  },
  // endregion

  // region Sumeru
  {
    name: registerMessage({ defaultMessage: "Mawtiyima Forest" }),
    location: { x: -50.17, y: 23.44 },
  },
  {
    name: registerMessage({ defaultMessage: "The Palace of\nAlcazarzaray" }),
    location: { x: -55.31, y: 27.2 },
  },
  {
    name: registerMessage({ defaultMessage: "Chatrakam Cave" }),
    location: { x: -58.99, y: 28.84 },
  },

  {
    name: registerMessage({ defaultMessage: "Sumeru City" }),
    location: { x: -57.31, y: 33.86 },
  },
  {
    name: registerMessage({ defaultMessage: "Gandha Hill" }),
    location: { x: -50.26, y: 34.12 },
  },
  {
    name: registerMessage({ defaultMessage: "Chinvat Ravine" }),
    location: { x: -54.13, y: 36.84 },
  },
  {
    name: registerMessage({ defaultMessage: "Yazadaha Pool" }),
    location: { x: -59.1, y: 37.36 },
  },
  {
    name: registerMessage({ defaultMessage: "Gandharva Ville" }),
    location: { x: -52.4, y: 40.64 },
  },

  {
    name: registerMessage({ defaultMessage: "Vimara Village" }),
    location: { x: -56.08, y: 45.07 },
  },
  {
    name: registerMessage({ defaultMessage: "Devantaka Mountain" }),
    location: { x: -51.36, y: 49.96 },
  },
  {
    name: registerMessage({ defaultMessage: "Port Ormos" }),
    location: { x: -53.53, y: 58.59 },
  },

  {
    name: registerMessage({ defaultMessage: "Vanarana" }),
    location: { x: -68.35, y: 30.98 },
  },
  {
    name: registerMessage({ defaultMessage: "Old Vanarana" }),
    location: { x: -75.36, y: 38.55 },
  },

  {
    name: registerMessage({ defaultMessage: "Fane of Ashvattha" }),
    location: { x: -70.24, y: 38.0 },
  },
  {
    name: registerMessage({ defaultMessage: "Yasna Monument" }),
    location: { x: -70.97, y: 45.45 },
  },
  {
    name: registerMessage({ defaultMessage: "Pardis Dhyai" }),
    location: { x: -64.15, y: 44.77 },
  },

  {
    name: registerMessage({ defaultMessage: "Caravan Ribat" }),
    location: { x: -73.97, y: 52.98 },
  },
  {
    name: registerMessage({ defaultMessage: "Ruins of Dahri" }),
    location: { x: -71.89, y: 55.84 },
  },
  {
    name: registerMessage({ defaultMessage: "Apam Woods" }),
    location: { x: -65.63, y: 52.72 },
  },
  // endregion
];
