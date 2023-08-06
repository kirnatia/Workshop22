const playerContainer = document.getElementById("all-players-container");

const cohortName = "2302-ACC-PT-WEB-PT-A";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/`;

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL);
    const data = await response.json();
    const players = data.data.players;
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (id) => {
  try {
    const response = await fetch(`${APIURL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch player details");
    }
    const data = await response.json();
    const player = data.data.player;
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${id}!`, err);
    throw err;
  }
};

const addNewPlayer = async (event) => {
  event.preventDefault();

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
      init(); // Refresh the player list after adding a new player
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
    const response = await fetch(`${APIURL}/${playerId}`, remove);
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

const renderAllPlayers = (players) => {
  try {
    playerContainer.innerHTML = "";
    players.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("player");
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
        try {
          const playerDetails = await fetchSinglePlayer(playerId);
          openDetailsWindow(playerDetails);
        } catch (err) {
          console.error("Error while fetching player details:", err);
        }
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

const openDetailsWindow = (playerDetails) => {
  const detailsWindow = window.open(
    "",
    "Player Details",
    "width=500,height=650"
  );
  detailsWindow.document.write(
    `<h2>Player Details</h2>
    <p><strong>Player Name:</strong> ${playerDetails.name}</p>
    <p><strong>Player Breed:</strong> ${playerDetails.breed}</p>
    <p><strong>Player Id:</strong> ${playerDetails.id}</p>
    <p><strong>Player Status:</strong> ${playerDetails.status}</p>
    <img src="${playerDetails.imageUrl}" alt="Player Image">`
  );
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
};

init();
