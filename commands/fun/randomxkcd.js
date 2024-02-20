// const rp = require('request-promise');

// async function ScrapeXKCD(){
//     const xkcdlink = "https://c.xkcd.com/random/comic/";
//     const sta = Date.now();
//     let result={}
//     const pat =/<meta property="og:image" content="([^<]*)">/
//     const numpat = /<meta property="og:url" content="([^<]*)">/
//     const titlepat = /<meta property="og:title" content="([^<]*)">/
//     await rp(xkcdlink).then(function(html){
//         result.title = html.split(titlepat)[1];
//         result.url=html.split(numpat)[1];
//         result.picture=html.split(pat)[1]}).catch(function(err){console.log(err)})
//     result.time = Date.now()-sta;
//     return result
// }

module.exports = {
    name: 'randomxkcd',
    description: 'Generates a random XKCD comic',
    cooldown: 4,
    async execute(interaction){
        let xkcdinfo = await ScrapeXKCD();
        const errEmbed = {
            title: 'Odd Error On Node.js End...',
            description: 'Something odd has happened when updating node.js package request-promise, so this feature is temporarily disabled while I work on a fix for it',
            color: 0x00a4c9, 
            thumbnail:{
                url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"
            }
        }
        const xkcdEmbed = {
            title:`${interaction.user.tag}'s Randomly Generated XKCD Comic`,
            description:`[${xkcdinfo.title}](${xkcdinfo.url})`,
            image:{
                url:xkcdinfo.picture
            },
            color:0x00a4c9,
            thumbnail:{
                url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"

            },footer:{text:`Took ${xkcdinfo.time}ms to finish`}}
        
        return interaction.reply({embeds:[errEmbed]})

    }
}