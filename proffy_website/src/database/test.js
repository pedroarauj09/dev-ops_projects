const DataBase = require('./db')
const createProffy = require('./createProffy')

DataBase.then(async (db) => {
    //Insert data

    proffyValue = { 
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "490910938",
        bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: "Quimica",
        cost: "20"
        //proffy id will come from data bank  
    }
    scheduleValues = [
        //class_id id will come from data bank, after submit class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    
    await createProffy(db,{proffyValue,classValue,scheduleValues})
    
    // Consult the insert data

    const selectedProffys = await db.all("SELECT * FROM proffys")
    
    const selectedProffysAndClasses = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 0;
    `)
    
    // the time from time_from need to be less or equal to requested time 
    // time_to need to be greater 
    
    const selectSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= ""
        AND class_schedule.time_to > ""
    `)

    




})
