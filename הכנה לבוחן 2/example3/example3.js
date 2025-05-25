const listElement = document.getElementById("abilityList")
const descBox = document.getElementById("descriptions")
async function loadAbilities() {
    //first fetch
    const res = await fetch("https://pokeapi.co/api/v2/ability/?limit=20&offset=20");
    const data = await res.json();
    data.results.forEach((ability) => {
      const li = document.createElement("li");
      li.innerText = ability.name;//יצירת רשימת השמות
      listElement.appendChild(li);//הוספה לרשימה
      //another fetch
      li.addEventListener("click", async () => {
        const res2 = await fetch(ability.url);//New API url
        const data2 = await res2.json();//convert
        const texts = data2.flavor_text_entries//get the relevant category
        .filter(entry => entry.language.name === "en")
        .map(entry => entry.flavor_text);
        const unique = [...new Set(texts)];//מסיר כפילויות   
        descBox.innerText = unique.join("\n\n");
      });



    })
    
}
loadAbilities() 

