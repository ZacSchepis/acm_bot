const {calculategrades} = require('../../my-modules/MathStuff.js')
module.exports = {
    name: 'gradecalc',
    description: 'Calculates some grades',
    cooldown: 10,
    data: {
        'name':'gradecalc',
        'description':'Calculates some grades',
        'options':[
            {
                'name':'gradefile',
                'description':'Formatted file of grades',
                'type':1,
                'required':false,
                'options':[
                    {'name':'file','description':"File",'type':11,'required':true}
                ]
            },
            {
                'name':'gradestring',
                'description':'Formatted string of grades',
                'type':1,
                'required':false,
                'options':[
                    {'name':'grades','description':'Grades in string form','type':3,'required':true}
                ]
            }
        ]
    },
    async execute(interaction){
        const client = interaction.client;
        // Quite possibly not set up properly so, ummmmm
        const gradefile = interaction.options.getAttachment('gradefile');
        if(!gradefile) interaction.reply("No file was attached, try again");
        try{
            const response = await fetch(gradefile.url);
            if(!response.ok){return interaction.reply("There was an error with fetching the file: "+response.statusText)}
            const text = await response.text();
            if(text) interaction.reply({content:`${interaction.user}`, embeds:[calculategrades(text, interaction.user.username)],ephemeral:true})
        }catch(error){console.log(error)}
    }
}