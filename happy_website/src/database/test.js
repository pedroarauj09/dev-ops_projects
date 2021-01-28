const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then(async db =>{
    //insert data on table
     await saveOrphanage(db,{
        
            lat:"41.5512535",
            lng:"-8.4236012",
            name:"Lar dos Meninos ",
            about:"Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social",
            whatsapp:"036898",
            images:[
                "https://images.unsplash.com/photo-1573261524302-6f1dc1458378?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
                "https://images.unsplash.com/photo-1576043061888-8751653f46af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
            ].toString(),
            instructions:"Venha como se sentir a vontade e traga muito amor e paciência para dar",
            opening_hours:"Horario de visitas das 12h até 8h",
            open_on_weekends:"0"
        }) 
  
   //consult data from table
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)
    
    // consult data based on id
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "1"')
    //console.log(orphanage)

    // delete some data from table
        // To delete all data
        console.log(await db.run("DELETE FROM orphanages")) 
    
    console.log(await db.run("DELETE FROM orphanages WHERE id = '2'"))
       
})