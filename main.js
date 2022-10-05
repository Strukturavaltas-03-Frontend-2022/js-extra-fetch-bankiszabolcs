const url1 = 'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json'
const url2 = 'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json'

const getData = async()=>{
try {
    const promise1 = fetch(url1).then(data=>data.json())
    const promise2 = fetch(url2).then(data=>data.json())
    const result = await Promise.all([promise1, promise2]).then(data=>data)
    return result
} catch (error) {
    console.error(error);
}
}

const result = await getData()

const [countries, teams] = result

const team = teams.sheets.Players
console.log(team);
const hungary = countries.sheets.Teams.find(element=>element.Team === 'Hungary')
console.log(hungary);

const infoList = document.querySelector('.infList')
const playerList = document.querySelector('.playerList')

const makeHungary = ()=>{
    for(let k in hungary){
        const li = document.createElement('li')
        const span = document.createElement('span')
        span.style.fontWeight = 'bold'
        span.innerHTML = k;
        li.appendChild(span)
        li.innerHTML += `: ${hungary[k]}`
        infoList.appendChild(li) 
    }
}

makeHungary()

const makeTeam = ()=>{
    team.forEach(element => {
        const li = document.createElement('li')
        for(let k in element){
            if(k==='name'){
            const span = document.createElement('span')
            span.style.fontWeight = 'bold'
            span.innerHTML = element[k];
            li.appendChild(span)
            }

            if(k==='date of birth' || k==='position' || k==='club'){
                li.innerHTML += ` - ${element[k]}`
                }
        }
        playerList.appendChild(li)

    })
}

makeTeam()