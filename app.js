const form = document.getElementById("country-form");

const input = document.getElementById("country-input");

const errorMessage = document.getElementById("error-message");

const loading = document.getElementById("loading");

const countryCard = document.getElementById("country-card");





input.addEventListener("input", function(){


    input.removeAttribute("aria-invalid");

    errorMessage.textContent = "";


});





form.addEventListener("submit", async function(event){


    event.preventDefault();



    const country = input.value.trim();



    if(country === ""){


        input.setAttribute("aria-invalid","true");


        errorMessage.textContent =
        "Veuillez entrer un pays.";


        return;

    }




    loading.style.display = "block";


    countryCard.textContent = "";



    try {



        const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
        );



        if(!response.ok){


            throw new Error("not found");


        }



        const data = await response.json();


        const countryData = data[0];



        afficherPays(countryData);



    }


    catch(error){


        if(error.message === "not found"){


            countryCard.textContent =
            "Aucun résultat trouvé pour cette recherche. Veuillez vérifier l'orthographe.";


        }


        else{


            countryCard.textContent =
            "Connexion impossible. Veuillez vérifier votre accès à internet.";


        }


    }


    finally{


        loading.style.display = "none";


    }



});







function afficherPays(country){



    const card = document.createElement("div");

    card.className="country-info";



    const image = document.createElement("img");

    image.src = country.flags.svg;

    image.alt = country.flags.alt;



    const title = document.createElement("h2");

    title.textContent =
    country.name.common;



    const capital = document.createElement("p");

    capital.textContent =
    "Capitale : " + country.capital[0];



    const population = document.createElement("p");

    population.textContent =
    "Population : " +
    country.population.toLocaleString("fr-FR");



    const region = document.createElement("p");

    region.textContent =
    "Région : " + country.region;





    let currency = "Non disponible";


    if(country.currencies){


        currency =
        Object.values(country.currencies)[0].name;


    }



    const money = document.createElement("p");

    money.textContent =
    "Monnaie : " + currency;





    let languages = "Non disponible";


    if(country.languages){


        languages =
        Object.values(country.languages).join(", ");


    }



    const lang = document.createElement("p");


    lang.textContent =
    "Langues : " + languages;





    card.append(
        title,
        capital,
        population,
        region,
        money,
        lang
    );



    countryCard.append(
        image,
        card
    );

}