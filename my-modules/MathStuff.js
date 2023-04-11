var fs = require('fs');

const testtext = "Exams:100,69:50\nProjects:94,85,60,69,100,100,95,100,90,90:50"
function fileparser(filetext){
    let filelist = filetext.split("\n");
    var aslistjson = [];
    for(let category=0; category<filelist.length;category++){
        let linebreak= filelist[category].split(":");
        aslistjson[category] ={
            title : linebreak[0],
            scores : stringtoint(linebreak[1].split(",")),
            weight : parseInt(linebreak[2])
        }
    }
   return aslistjson;

}
function stringtoint(liststring){
    let templist = [];
    for(let num = 0;num<liststring.length;num++){
        templist[num] = parseInt(liststring[num]);
    }
    //console.log(templist)
    return templist;
}
function sumanddivde(scores,weight){
    let result = 0;
    if(weight>=1) weight = weight/100;
    for(let sum=0;sum<scores.length;sum++){
        result += scores[sum]
    }
    return (result/scores.length)*weight;
}

function calculategrades(textstuff,name){
    let thingjson = fileparser(textstuff)
    let tempscore=0;
    let sumofscores = 0;
    let descriptionstring = "";
    for(let line=0;line<thingjson.length;line++){
        tempscore=sumanddivde(thingjson[line].scores,thingjson[line].weight)
        sumofscores+=tempscore;
        descriptionstring += `${thingjson[line].title}: ${tempscore}%\n`;
    }descriptionstring += `**Total Score: ${sumofscores}%**`
    const GradesOutput = {
        color:0x00a4c9,title:`${name}'s Final Grade: ${sumofscores}%`, description:descriptionstring, thumbnail:{url:"https://media.discordapp.net/attachments/906667378929197147/987032124865523722/acm_logo_1.png"}
    }
    return GradesOutput;
}
module.exports = {calculategrades};
