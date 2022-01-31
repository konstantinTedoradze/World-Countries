(function(){

    $(function(){      
        let countryArray = [];
        let newArray = [];
   
        $("#searchAll").on("click",function(){
            console.log('clicked search all')
            $.get("https://restcountries.com/v3.1/all").then(countries => {
                console.log(countries);
                countryArray = countries;
                showAllCountries();
            }).catch(e => {
                console.log(e);
            });
       });


        $("#search").on("click", function(){
            $("#container").html("");

            let nameValue ="name/" + $("#name").val().toLowerCase();
            $("#name").val('');

            $.get(`https://restcountries.com/v3.1/${nameValue}`).then(name => {
                console.log(countryArray)
                newArray = name;
                console.log(newArray)
                
                for(let i=0; i < newArray.length; i++) {
                    createCard(newArray[i]);
                }
                
            }).catch(error => {
                console.log(error);
                alert("Enter a current name");
            });

        });

        function showAllCountries(){
            $("#container").html("");
            console.log(countryArray.length,'lengthhh')
            for(let i = 0; i < countryArray.length; i++){
                createCard(countryArray[i]);
            }
        }

        function createCard(name) {
            let currencies = " ";
            let symbol = " ";
            let symbolName = " ";
            let border = " ";
            let bordersArray = name.borders;
            let currenciesArray = Object.keys(name.currencies);
            
            for(let i = 0; i < currenciesArray.length; i++){
                currencies += ` <span>${currenciesArray[i]}</span> `;
                symbol += ` <span>${name.currencies[`${currenciesArray[i]}`].symbol}</span> `
                symbolName += ` <span>${name.currencies[`${currenciesArray[i]}`].name}</span> `
            }

            if(bordersArray === undefined){
                border += ` None `;
            } else {
                for(let j = 0; j < bordersArray.length; j++){
                    border += ` <span>${bordersArray[j]}</span> `
                }
            }

            let countryCard = `<div class="countryCard">
                    <img src="${name.flags.png}">
                    <div class="cardInfo">
                        <p>Country: ${name.name.common}</p>
                        <p>Capital: ${name.capital}</p>
                        <p>Currencie: ${currencies}</p>
                        <p>Symbol: ${symbol}</p>
                        <p>Symbol Name: </p>
                        <p>${symbolName}</p>
                        <p>Country Borders:</p>
                        <p>${border}</p>
                    </div>
            </div>`;
                      
            $("#container").append(countryCard);
        }

    });

})();





