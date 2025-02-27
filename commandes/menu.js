const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────《𝐀𝐋𝐏𝐇𝐀-𝐓𝐄𝐂𝐇》───𒆓
𒊹 *User* : ${s.OWNER_NAME}
𒊹 *Mode* : ${mode}
𒊹 *Commands* : ${cm.length} 
𒊹 *Time* : ${temps} 
𒊹 *Ram* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
𒄋 𝐊𝐄𝐈𝐓𝐇-𝐓𝐄𝐂𝐇 𒄋
╰─────༒༒༒༒༒────𒆓 \n\n`;
 
    let menuMsg=`  
  ┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆┆
✞➽➽➽➽➽➽➽➽➽➽➽➽➽➽➽↰✞
`;

    for (const cat in coms) {
        menuMsg += `*╭───𒉱* *${cat}* 𒉱⊷*`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*𒉱* ${cmd}`;
        }
        menuMsg += `
*↪════════════𒉱* \n`
    }

    menuMsg += `
◇            ◇
*————— ༒ —————*

  *𝐊𝐄𝐈𝐓𝐇-𝐓𝐄𝐂𝐇✞2024*                                         
*↪═════════════༄*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*Ibrahim-tech*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
