const {parse} =require('csv-parse')
const fs=require('fs')
const habitablePlanets=[]

// function to check habitable planet
function isHabitablePlanet(planet)
{
    if(planet['koi_disposition']==='CONFIRMED' && planet['koi_insol']>0.36 && planet['koi_insol']<1.11 
    && planet['koi_prad']<1.6)
        return true;
}



// result form createReadStream gives raw buffer
// pipe function connects readable stream source to a writable stream destination
// here planets.csv is the source and parse() function is the destination
// parse() will give array of js objects. format--> readable.pipe(writable) 
fs.createReadStream('planets.csv')
.pipe(parse({
    comment:'#',
   columns:true, // will return array of js objects when columns:true is set else only values
}))
.on('data',(data)=>
{       if(isHabitablePlanet(data)==true)
            habitablePlanets.push(data)
}).on('error',(err)=>{
    console.log(err);
}).on('end',()=>{
    console.log(`${habitablePlanets.length} habitable planets found!`);
    planetNames=habitablePlanets.map((planet)=>{
        return planet['kepler_name']});
    console.log(planetNames);
    console.log("End of File!");
});

