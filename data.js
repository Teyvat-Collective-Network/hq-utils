const PYRO = "<:pyro:1021232648351387668>";
const HYDRO = "<:hydro:1021232713149190264>";
const ANEMO = "<:anemo:1021232755608133712>";
const ELECTRO = "<:electro:1021232812835213362>";
const DENDRO = "<:dendro:1021232875665883196>";
const CRYO = "<:cryo:1021232910268903434>";
const GEO = "<:geo:1021232946289578004>";
const OTHER = "<:other:1021233139856719932>";

const SWORD = "<:sword:1021232974848589864>";
const POLEARM = "<:polearm:1021233017055871006>";
const CLAYMORE = "<:claymore:1021233053097525348>";
const BOW = "<:bow:1021233074618515486>";
const CATALYST = "<:catalyst:1021233107287937074>";
const UNKNOWN = ":question:";

const MONDSTADT = "<:mondstadt:1026030859071004743>";
const LIYUE = "<:liyue:1026030857812705391>";
const INAZUMA = "<:inazuma:1026030856420204584>";
const SUMERU = "<:sumeru:1026030854788616302>";
const SNEZHNAYA = "<:other_region:1026031780039499826>";
const OTHER_REGION = "<:other_region:1026031780039499826>";

export const characters = {
    albedo: [GEO, SWORD, MONDSTADT, "Albedo"],
    alhaitham: [DENDRO, SWORD, SUMERU, "Alhaitham"],
    aloy: [CRYO, BOW, OTHER_REGION, "Aloy"],
    amber: [PYRO, BOW, MONDSTADT, "Amber"],
    itto: [GEO, CLAYMORE, INAZUMA, "Arataki Itto"],
    baizhu: [DENDRO, CATALYST, LIYUE, "Baizhu"],
    barbara: [HYDRO, CATALYST, MONDSTADT, "Barbara"],
    beidou: [ELECTRO, CLAYMORE, LIYUE, "Beidou"],
    bennett: [PYRO, SWORD, MONDSTADT, "Bennett"],
    candace: [HYDRO, POLEARM, SUMERU, "Candace"],
    chongyun: [CRYO, CLAYMORE, LIYUE, "Chongyun"],
    collei: [DENDRO, BOW, SUMERU, "Collei"],
    cyno: [ELECTRO, POLEARM, SUMERU, "Cyno"],
    dainsleif: [OTHER, UNKNOWN, OTHER_REGION, "Dainsleif"],
    dehya: [PYRO, CLAYMORE, SUMERU, "Dehya"],
    diluc: [PYRO, CLAYMORE, MONDSTADT, "Diluc"],
    diona: [CRYO, BOW, MONDSTADT, "Diona"],
    dori: [ELECTRO, CLAYMORE, SUMERU, "Dori"],
    eula: [CRYO, CLAYMORE, MONDSTADT, "Eula"],
    faruzan: [ANEMO, BOW, SUMERU, "Faruzan"],
    fischl: [ELECTRO, BOW, MONDSTADT, "Fischl"],
    ganyu: [CRYO, BOW, LIYUE, "Ganyu"],
    gorou: [GEO, BOW, INAZUMA, "Gorou"],
    hutao: [PYRO, POLEARM, LIYUE, "Hu Tao"],
    jean: [ANEMO, SWORD, MONDSTADT, "Jean"],
    kazuha: [ANEMO, SWORD, INAZUMA, "Kaedehara Kazuha"],
    kaeya: [CRYO, SWORD, MONDSTADT, "Kaeya"],
    kaveh: [DENDRO, CLAYMORE, SUMERU, "Kaveh"],
    ayaka: [CRYO, SWORD, INAZUMA, "Kamisato Ayaka"],
    ayato: [HYDRO, SWORD, INAZUMA, "Kamisato Ayato"],
    keqing: [ELECTRO, SWORD, LIYUE, "Keqing"],
    klee: [PYRO, CATALYST, MONDSTADT, "Klee"],
    sara: [ELECTRO, BOW, INAZUMA, "Kujou Sara"],
    shinobu: [ELECTRO, SWORD, INAZUMA, "Kuki Shinobu"],
    layla: [CRYO, SWORD, SUMERU, "Layla"],
    lisa: [ELECTRO, CATALYST, MONDSTADT, "Lisa"],
    mika: [CRYO, POLEARM, MONDSTADT, "Mika"],
    mona: [HYDRO, CATALYST, MONDSTADT, "Mona"],
    nahida: [DENDRO, CATALYST, SUMERU, "Nahida"],
    nilou: [HYDRO, SWORD, SUMERU, "Nilou"],
    ningguang: [GEO, CATALYST, LIYUE, "Ningguang"],
    noelle: [GEO, CLAYMORE, MONDSTADT, "Noelle"],
    qiqi: [CRYO, SWORD, LIYUE, "Qiqi"],
    raiden: [ELECTRO, POLEARM, INAZUMA, "Raiden Shogun"],
    razor: [ELECTRO, CLAYMORE, MONDSTADT, "Razor"],
    rosaria: [CRYO, POLEARM, MONDSTADT, "Rosaria"],
    kokomi: [HYDRO, CATALYST, INAZUMA, "Sangonomiya Kokomi"],
    sayu: [ANEMO, CLAYMORE, INAZUMA, "Sayu"],
    shenhe: [CRYO, POLEARM, LIYUE, "Shenhe"],
    heizou: [ANEMO, CATALYST, INAZUMA, "Shikanoin Heizou"],
    sucrose: [ANEMO, CATALYST, MONDSTADT, "Sucrose"],
    tartaglia: [HYDRO, BOW, SNEZHNAYA, "Tartaglia"],
    thoma: [PYRO, POLEARM, INAZUMA, "Thoma"],
    tighnari: [DENDRO, BOW, SUMERU, "Tighnari"],
    traveler: [OTHER, SWORD, OTHER_REGION, "Traveler"],
    venti: [ANEMO, BOW, MONDSTADT, "Venti"],
    xiangling: [PYRO, POLEARM, LIYUE, "Xiangling"],
    xiao: [ANEMO, POLEARM, LIYUE, "Xiao"],
    xingqiu: [HYDRO, SWORD, LIYUE, "Xingqiu"],
    xinyan: [PYRO, CLAYMORE, LIYUE, "Xinyan"],
    yae: [ELECTRO, CATALYST, INAZUMA, "Yae Miko"],
    yaoyao: [DENDRO, POLEARM, LIYUE, "Yaoyao"],
    yanfei: [PYRO, CATALYST, LIYUE, "Yanfei"],
    yelan: [HYDRO, BOW, LIYUE, "Yelan"],
    yoimiya: [PYRO, BOW, INAZUMA, "Yoimiya"],
    yunjin: [GEO, POLEARM, LIYUE, "Yun Jin"],
    zhongli: [GEO, POLEARM, LIYUE, "Zhongli"],
};

// Taken with permission from
// https://github.com/Teyvat-Collective-Network/websites/blob/main/www/src/images.js

const mhy = (name) =>
    `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${name}.png`;

export function get_image(name) {
    return (
        {
            amber: mhy`Ambor`,
            dainsleif:
                "https://i.ibb.co/svCrpqD/d87702b9c1ba7231d3e898906d56a0b7-removebg-preview.png",
            noelle: mhy`Noel`,
            jean: mhy`Qin`,
            raiden: mhy`Shougun`,
            thoma: mhy`Tohma`,
            traveler: mhy`PlayerBoy`,
            yanfei: mhy`Feiyan`,
            alhaitham: mhy`Alhatham`,
            kaveh: "https://i.imgur.com/cv97twy.png",
            baizhu: "https://i.imgur.com/37uByIX.png",
            unknown:
                "https://static.wikia.nocookie.net/gensin-impact/images/7/74/Character_Unknown_Thumb.png",
        }[name] || mhy(name[0].toUpperCase() + name.slice(1))
    );
}

export const _bar = "https://i.imgur.com/U9Wqlug.png";
export const bar = { image: { url: _bar } };
export const space = "<:space:1021233715751424060>";
