document.addEventListener('DOMContentLoaded', () => {
  const greeting = document.getElementById('greeting');
  const nameInput = document.getElementById('nameInput');
  const startButton = document.getElementById('startButton');
  const qualitySlider = document.getElementById('shotQuality');
  const qualityLabel = document.getElementById('qualityLabel');

  // Greeting logic
  startButton?.addEventListener('click', () => {
    const name = nameInput?.value.trim();
    if (!name) return;
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    greeting.innerHTML = `<span class="caps-title">${timeGreeting.toUpperCase()}</span><h1 class="script-title">${name}</h1>`;
  });

  // Taste slider label
  qualitySlider?.addEventListener('input', () => {
    const val = parseInt(qualitySlider.value);
    qualityLabel.textContent = val === 1 ? 'Sour' : val === 3 ? 'Bitter' : 'Balanced';
  });

  // Filter calculator
  window.calculateFilter = function () {
    const coffee = parseFloat(document.getElementById('filterCoffee').value);
    const water = parseFloat(document.getElementById('filterWater').value);
    const people = parseFloat(document.getElementById('filterPeople').value);
    const customRatio = document.getElementById('customRatio');
    const useCustom = document.getElementById('useCustomRatio').checked;
    const flavour = document.getElementById('flavourProfile').value;
    const result = document.getElementById('filterResult');
    const history = document.getElementById('filterHistory');

    let ratio = 60;
    if (useCustom && customRatio.value) {
      ratio = parseFloat(customRatio.value);
    } else {
      if (flavour === 'light') ratio = 55;
      if (flavour === 'balanced') ratio = 60;
      if (flavour === 'syrupy') ratio = 65;
      if (flavour === 'bold') ratio = 70;
    }

    let output = '';

    if (!isNaN(people)) {
      const targetYield = people * 250;
      const totalWater = targetYield / 0.7;
      const neededCoffee = totalWater * (ratio / 1000);
      output = `For ${people} people: use ${neededCoffee.toFixed(1)}g coffee and ${totalWater.toFixed(0)}g water.`;
    } else if (!isNaN(coffee)) {
      const totalWater = (coffee / ratio) * 1000;
      const yieldInCup = totalWater - (coffee * 2);
      output = `With ${coffee}g coffee: use ${totalWater.toFixed(0)}g water. Yield: ${yieldInCup.toFixed(0)}g.`;
    } else if (!isNaN(water)) {
      const neededCoffee = (water / 1000) * ratio;
      const yieldInCup = water - (neededCoffee * 2);
      output = `With ${water}g water: use ${neededCoffee.toFixed(1)}g coffee. Yield: ${yieldInCup.toFixed(0)}g.`;
    } else {
      output = "Please enter coffee, water, or number of people.";
    }

    result.innerHTML = output + "<br><em>Enjoy your coffee!</em>";
    const now = new Date().toLocaleTimeString();
    history.innerHTML += `<div>🕓 ${now} – ${output}</div>`;
    localStorage.setItem('lastBrew', JSON.stringify({ output, time: now }));
  };

  // Espresso calculator
  window.calculateEspresso = function () {
    const dose = parseFloat(document.getElementById('espressoDose').value);
    const ratio = parseFloat(document.getElementById('espressoRatio').value);
    const time = parseFloat(document.getElementById('espressoTime').value);
    const yieldActual = parseFloat(document.getElementById('espressoYield').value);
    const quality = parseInt(document.getElementById('shotQuality').value);
    const qualityText = quality === 1 ? "Sour" : quality === 3 ? "Bitter" : "Balanced";
    const result = document.getElementById('espressoResult');
    const history = document.getElementById('previousEspresso');

    if (!isNaN(dose)) {
      const targetYield = dose * ratio*
