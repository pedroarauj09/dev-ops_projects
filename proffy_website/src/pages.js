const DataBase = require('./database/db')


const {subjects,weekdays,getSubject,convertHourToMin} = require('./utils/format')



function pageLanding(req,res){
        return res.render("index.html")
}
async function pageStudy(req,res){
        const filters = req.query
        
        
        if (!filters.subject || !filters.weekday || !filters.time){
            
            return res.render("study.html",{filters,subjects,weekdays})
            
        }
        
        // convert hour to minutes
        const timeTomin = convertHourToMin(filters.time)

        const query = `
            SELECT classes.*, proffys.*
            FROM proffys
            JOIN classes ON (classes.proffy_id = proffys.id)
            WHERE EXISTS(
                SELECT class_schedule.*
                FROM class_schedule
                WHERE class_schedule.class_id = classes.id
                AND class_schedule.weekday = ${filters.weekday}
                AND class_schedule.time_from <= ${timeTomin}
                AND class_schedule.time_to > ${timeTomin}
            )
            AND classes.subject = '${filters.subject}'
            
            `
        // if have hour-miss on consult on data bank 
        try{
            const db = await DataBase
            const proffys = await db.all(query)
            proffys.map((proffy)=>{
                proffy.subject = getSubject(proffy.subject)
            })

            return res.render('study.html', {proffys,subjects,weekdays})

        } 
        catch(error){
            console.log(error)
        }

}

function pageGiveClass(req,res){
    return res.render("give-classes.html",{subjects,weekdays})
}

async function saveClasses(req,res){
    const createProffy = require('./database/createProffy')
    const proffyValue = { 
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    const scheduleValues = req.body.weekday.map((weekday, index) => {
        
        return {
            weekday,
            time_from: convertHourToMin(req.body.time_from[index]),
            time_to: convertHourToMin( req.body.time_to[index])
        }
    })
    

    try{
        const db = await DataBase
        await createProffy(db,{proffyValue,classValue,scheduleValues})
    

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]


        return res.redirect("/study" + queryString)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {pageLanding,pageStudy,pageGiveClass,saveClasses}
