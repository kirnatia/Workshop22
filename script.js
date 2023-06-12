const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-A";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL);
    console.log(response);
    const data = await response.json();
    const players = data.data.players;
    console.log(players);
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (id) => {
  try {
    const response = await fetch("${APIURL}/${players}/${id}");
    const player = await response.json();
    console.log(data.players.name);
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${id}!`, err);
  }
};

const addNewPlayer = async (newplayer) => {
  newplayer.preventDefault();

  const nameInput = document.getElementById("name");
  const breedInput = document.getElementById("breed");
  const imageUrlInput = document.getElementById("imageUrlInput");

  const newPlayer = {
    name: nameInput.value,
    breed: breedInput.value,
    imageUrl: imageUrlInput.value,
  };

  try {
    const response = await fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    if (response.ok) {
      const player = await response.json();
      console.log("New player registered:", player);
      // Do something with the newly registered player, like displaying it on the page
    } else {
      console.error("Failed to register new player:", response.status);
    }
  } catch (error) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const submitButton = document.getElementById("submit-player");
submitButton.addEventListener("click", addNewPlayer);

const removePlayer = async (playerId) => {
    try {
        const remove = {
            method: "DELETE",
          };
          const response = await fetch("${APIURL}/${players}/${id}", remove);
          const player = await response.json();
          console.log("See you next time");
          return player;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};
const getRandomColor = () => {
    const min = 150;
    const max = 256;
    const red = Math.floor(Math.random() * (max - min) + min);
    const green = Math.floor(Math.random() * (max - min) + min);
    const blue = Math.floor(Math.random() * (max - min) + min);
    return `rgb(${red}, ${green}, ${blue})`;
  };
/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (players) => {
    try {
        playerContainer.innerHTML = "";
        players.forEach((player) => {
          const playerElement = document.createElement("div");
          playerElement.classList.add("player");
          const backgroundColor = getRandomColor();
          playerElement.style.backgroundColor = backgroundColor;
          playerElement.innerHTML = `
            <h2><strong>Player Name:</strong> ${player.name}</h2>
            <p><strong>Player Breed:</strong> ${player.breed}</p>
            <p><strong>Player Id:</strong> ${player.id}</p>
            <p><strong>Player Status:</strong> ${player.status}</p>
            <img src="${player.imageUrl}" alt="Player Image">
            
       
            <button class="details-button" data-id="${player.id}">See Details</button>
            <button class="delete-button" data-id="${player.id}">Delete</button>
          `;
          playerContainer.appendChild(playerElement);
    
          const detailsButton = playerElement.querySelector(".details-button");
          detailsButton.addEventListener("click", async (event) => {
            const playerId = event.target.getAttribute("data-id");
            const playerDetails = await fetchSinglePlayer(playerId);
    
            console.log(playerDetails);
            // Handle displaying the player details as needed
          });
    
          const deleteButton = playerElement.querySelector(".delete-button");
          deleteButton.addEventListener("click", async (event) => {
            const playerId = event.target.getAttribute("data-id");
            removePlayer(playerId);
            event.target.closest("div.player").remove();
          });
        });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
    const players = await fetchAllPlayers();
    console.log(players);
    renderAllPlayers(players);
  
    renderNewPlayerForm();
  };
  
  init();
