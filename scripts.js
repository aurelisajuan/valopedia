let agents = [];

window.onload = async function () {
  try{
    const response = await fetch('./data/agents.json');
    const data = await response.json();
    agents = data.agents;

    const filter = document.getElementById("filter");
  
    const roles = ["All", ...new Set(agents.map(agent => agent.role))];
  
    roles.forEach(role => {
      const button = document.createElement("button");
      button.textContent = role;
      button.className = "filter-btn";
      button.onclick = () => renderAgents(role);
      filter.appendChild(button);
    });
  
    renderAgents("All");
  } catch (error) {
    console.error("Error loading agents:", error);
  }
};

function playVoiceLine(filePath){
  const audio = new Audio(filePath);
  audio.play();
}

function renderAgents(selectedRole){
  const agentList = document.getElementById("agent-list");
  agentList.innerHTML = "";

  const filteredAgents = selectedRole === "All"
    ? agents
    : agents.filter(agent => agent.role === selectedRole);

  filteredAgents.forEach(agent => {
    const card = document.createElement("div");
    card.className = "agent-card";

    card.innerHTML = `
      <div class="img-container">
        <img src="${agent.image}" alt="${agent.name}" class="agent-img"/>
      </div>  
      <h3>${agent.name}</h3>
      <p class="agent-role">${agent.role}</p>
      <button class="audio" onclick="event.stopPropagation(); playVoiceLine('${agent.audio}')"><i class="fa-solid fa-play"></i></button>
    `;

    card.addEventListener("click", () => {
      openModal(agent);
    });

    agentList.appendChild(card);
  })
}

function openModal(agent) {
  const modal = document.getElementById("agent-modal");
  const video = document.getElementById("agent-video");
  const desc = document.querySelector(".agent-desc");

  let link = agent.link;
  if (!link){
    console.error("No link available for", agent.name);
    return;
  }

  if (!link.includes("embed")){
    const videoId = getLinkId(link);
    link = "https://www.youtube.com/embed/" + videoId;
  }

  video.src = link + "?autoplay=1";

  const descContent = Array.isArray(agent.desc)
    ? agent.desc.join("<br>")
    : agent.desc || "No description available";

  desc.innerHTML = `
    <h3>${agent.name}</h3>
    <p>${descContent}</p>
    <br>
    <p>Press on the play button to listen to ${agent.name}'s voice line!</p>
  `;

  modal.style.display = "block";
}

function getLinkId(url){
  const regex = /[?&]v=([^&#]+)/;
  const match = url.match(regex);
  return match ? match[1] : ""; 
}

document.querySelector(".close").addEventListener("click", () => {
  const modal = document.getElementById("agent-modal");
  const video = document.getElementById("agent-video");

  modal.style.display = "none";
  video.src = ""; 
});

window.onclick = function(event) {
  const modal = document.getElementById("agent-modal");
  if (event.target === modal) {
    modal.style.display = "none";
    const video = document.getElementById("agent-video");
    video.src = ""; 
  }
}