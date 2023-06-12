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

const addNewPlayer = async (newPlayer) => {
  newPlayer.preventDefault();

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
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
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
const renderAllPlayers = (playerList) => {
  try {
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
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
