module.exports = async function(db, {proffyValue, classValue, scheduleValues}){

    // insert data on chart of teachers 
    const insertProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar, 
            whatsapp,
            bio
        ) VALUES(
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertProffy.lastID

    //insert data on chart of classes 

    const insertClass = await db.run(`
        INSERT INTO classes(
            subject,
            cost,
            proffy_id
        ) VALUES(
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );        
    `)

    const class_id = insertClass.lastID

    // Insert data on chart of schedule
    const insertAllSchedules = scheduleValues.map((scheduleValue)=> {
        return db.run(`
            INSERT INTO class_schedule(
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES(
                "${class_id}",
                "${scheduleValue.weekday}",
                "${scheduleValue.time_from}",
                "${scheduleValue.time_to}"
            );

        `)
    })

    // execute all db.runs
    await Promise.all(insertAllSchedules)
     
}