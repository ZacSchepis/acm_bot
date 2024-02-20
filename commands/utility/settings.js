// new SlashCommandBuilder().setName('enablelogging').setDescription("Enables logging for this server.").addChannelOption(option=>option.setName("logchannel").setDescription('The logging channel to log to').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
// 	,new SlashCommandBuilder().setName('enablerolemenu').setDescription("Enables role menu creation for this server.").setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
// 	,new SlashCommandBuilder().setName('enablebasicwelcome').setDescription("Enables the bot to send a basic welcome message.").addChannelOption(option=>option.setName("welcomechannel").setDescription('The channel to send welcomes to').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
module.exports = {
    name: 'settings',
    description:'Enable various server features',
    cooldown: 4,
    data: {
        'name':'settings',
        'description':'Set various server settings',
        'default_member_permissions':String(1<<5),
        'options':[
            {
                'name':'enable',
                'description':'Enable certain server settings',
                'type':2,
                'options':[
                    {
                        'name':'logging',
                        'description':'Enable logging for this server',
                        'type':1,
                        'options':[
                            {'name':'channel','description':'Channel to enable logging to','required':true,'type':7}
                        ]
                    },
                    {
                        'name':'welcome',
                        'description':'Enable welcome message upon user joining',
                        'type':1,
                        'options':[
                            {'name':'channel','description':'Channel to send welcome messages to upon user join','required':true,'type':7}
                        ]
                    },
                    {
                        'name':'rolemenu',
                        'description':'Enable rolemenu creation for this server',
                        'type':1
                    },
                    {
                        'name':'passwordjoin',
                        'description':'[BETA] Allows for password verification',
                        'type':1,
                        'options':[
                            {'name':'passwordchannel','description':'Channel to watch for passwords in','required':true,'type':7},
                        ]
                    }
                ]
            },
            {
                'name':'disable',
                'description':'Disable certain server settings',
                'type':2,
                'options':[
                    {
                        'name':'logging',
                        'description':'Disable logging for this server',
                        'type':1,
                    },
                    {
                        'name':'welcome',
                        'description':'Disable welcome message upon user joining',
                        'type':1,
                    },
                    {
                        'name':'rolemenu',
                        'description':'Disable rolemenu creation for this server',
                        'type':1
                    },
                    {
                        'name':'passwordjoin',
                        'description':'Disables password verification for this server',
                        'type':1,
                    }
                ]
            }
        ]


    },
/*
+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| userid    | varchar(18) | NO   | PRI | NULL    |       |
| level     | tinyint     | YES  |     | NULL    |       |
| xp        | int         | YES  |     | NULL    |       |
| serverid  | varchar(18) | NO   | PRI | NULL    |       |
| hex_value | int         | YES  |     | NULL    |       |
+-----------+-------------+------+-----+---------+-------+
*/
    execute(interaction){
        return interaction.reply({content:'This feature is currently not available', ephemeral:true})
        const client = interaction.client;
        const which = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel('channel')
        const server_id = interaction.guild.id
        if( which === 'logging'){
            const sql = "UPDATE server_settings SET logging = ? WHERE server_id = ?";
            // ACTION:
            // modify servers.json > 
            //  add: servers[serverID] = {'logging':interaction.getChannelOption('channel').id}
        }
        else if( which === 'welcome' ){
            // ACTION:
            // modify servers.json >
            //  add: servers[serverID] = {'welcomeChannel':interaction.getChannelOption('channel').id}
        }
        else if( which === 'rolemenu' ){
            // ACTION:
            // TODO: add handler for role menu.
            //  modify servers.json >
            //    add: servers[serverID][rolemenu] = 
        }
        else if( which === 'passwordjoin' ){
            // ACTION:
            //  modify servers.json >
            //    add: servers[serverID][passwordChannel] = interaction.getChannel('channel').id
        }
    }
}

