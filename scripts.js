const agents = [
  {
    name: "Breach",
    role: "Initiator",
    image: "images/breach.png",
    audio: "audio/breach.mp3",
  },
  {
    name: "Brimstone",
    role: "Controller",
    image: "images/brim.png",
    audio: "audio/brim.mp3",
  },
  {
    name: "Chamber",
    role: "Sentinel",
    image: "images/chamber.png",
    audio: "audio/chamber.mp3",
  },
  {
    name: "Deadlock",
    role: "Sentinel",
    image: "images/deadlock.png",
    audio: "audio/deadlock.mp3",
  },
  {
    name: "Fade",
    role: "Initiator",
    image: "images/fade.png",
    audio: "audio/fade.mp3",
  },
  {
    name: "Gekko",
    role: "Initiator",
    image: "images/gekko.png",
    audio: "audio/gekko.mp3",
  },
  {
    name: "Omen",
    role: "Controller",
    image: "images/omen.png",
    audio: "audio/omen.mp3",
  },
  {
    name: "Reyna",
    role: "Duelist",
    image: "images/reyna.png",
    audio: "audio/reyna.mp3",
  },
  {
    name: "Viper",
    role: "Controller",
    image: "images/viper.png",
    audio: "audio/viper.mp3",
  },
  {
    name: "Yoru",
    role: "Duelist",
    image: "images/yoru.png",
    audio: "audio/yoru.mp3",
  }

]

window.onload = function () {
  const agentList = document.getElementById("agent-list");
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
      <img src="${agent.image}" alt="${agent.name}" class="agent-img"/>
      <h3>${agent.name}</h3>
      <p>${agent.role}</p>
      <button onclick="playVoiceLine('${agent.audio}')">Wanna Hear My Voice?</button>
    `;

    agentList.appendChild(card);
  })
}