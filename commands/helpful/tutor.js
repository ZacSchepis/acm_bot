// const  Discord  = require("discord.js");

// const TutorInfo = new Discord.Collections()
module.exports = {
    name: 'tutor', 
    description: 'Tutor info commands',
    cooldown: 5,
    data: {
        'name':'tutor',
        'description':'Tutor commands',
        'options':[
            {
                'name':'course',
                'description':'Search for a specifc CS courses tutors',
                'type':1,
                'required':false,
                'focused':true,
                'autocomplete':true,
                'options':[
                    {'name':'number','description':'Course number', 'type':3,'required':true}
                ]
            },
            {
                'name':'tutorer',
                'description':'Search for a specific tutorer to search for',
                'type':1,
                'required':false,
                'focused':true,
                'autocomplete':true,
                'options':[
                    {'name':'name','description':'Tutorer name','type':3,'required':true}
                ]
            }
        ]
    },
    async autocomplete(interaction){
        const client = interaction.client;
        let choices = [];
        const focusedOption = interaction.options.getFocused(true);
        if(focusedOption.name === 'course'){

        }
        else if(focusedOption.name === 'tutorer'){

        }

    },

    execute(interaction){
        // interaction.reply({content:`'/${interaction.commandName}' is not available in this server right now :(`, ephemeral: true})
        // return
        const client = interaction.client;
        const name = interaction.options.getString('name');
        const course = interaction.options.getString('course')

        // const course = interaction.options.getString('course');
        // const name = interaction.options.getString('name');
        // let fields = [];
        // const sta = Date.now();
        // if(course === null && name === null){//THis gets the tutorers for today
        //     let day = await conn.query("SELECT * FROM TUTORS WHERE T_DAY = '"+new Date().getDay().toString()+"';");
        //     if(day !== undefined){
        //         delete day.meta
        //         day.forEach(element => {fields.push({name: `${element.T_NAME}`, value: `@${element.T_TIME},\nIRL: Likely Colonial Hall (poky) room 230.\nZoom by email: ${element.T_EMAIL}`})});
        //         let em = {title: "Tutorers for today: ", fields:fields,color:0x00a4c9,thumbnail:{url:acm_image_link},footer:{text:`Took ${(Date.now()-sta)}ms to finish`}}
        //         interaction.reply({embeds:[em]});
        //     }
        //     else{//interaction.reply({content:"Found no tutorers for today :(",ephemeral: true})
        //         conn.end()
        //         return;
        //     }
        // }
        // if(course === null && name !== null){
        //     let tutorer = await conn.query("SELECT * FROM TUTORS WHERE T_NAME = '"+name+"';");
        //     if(tutorer!==undefined){
        //         delete tutorer.meta;
        //         tutorer.forEach(element => fields.push({name:`${element.T_DAYSTRING}`,value:`${element.T_TIME}\nIRL: Likely Colonial Hall (poky) room 230.\nZoom by email: ${element.T_EMAIL}`}))
        //         const em = {title: `${tutorer[0].T_NAME}'s Tutoring Hours/Days.`,fields:fields,color:0x00a4c9,thumbnail:{url:acm_image_link},footer:{text:`Took ${(Date.now()-sta)}ms to finish`}}
        //         interaction.reply({embeds:[em]})    
        //     }
        //     else{//interaction.reply({content:`Could not find ${name}, please try a different name search`,ephemeral:true})
        //         conn.end();
        //         return;
        //     }
        // }
        // if(course !== null && name === null){//This searche
        //     interaction.reply({content:"This feature doesn't have functionality...",ephemeral:true})
        // }
    }
}