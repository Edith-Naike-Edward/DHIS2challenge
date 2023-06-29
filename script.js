// Function to fetch data from the provided URL
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to filter cities based on the search query
function filterCities(data, searchQuery) {
  const filteredCities = data.filter(entry => {
    const cityName = entry.city.toLowerCase();
    const stateName = entry.state.toLowerCase();
    const query = searchQuery.toLowerCase();
    return cityName.includes(query) || stateName.includes(query);
  });
  return filteredCities;
}

// Function to display the search results on the page
function displayResults(results) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  if (results.length === 0) {
    searchResults.innerHTML = '<li>No results found.</li>';
  } else {
    results.forEach(entry => {
      const listItem = document.createElement('li');
      listItem.className = 'search-result';
      const growthPercentage = parseFloat(entry.growth_from_2000_to_2013);
      const growthColor = growthPercentage >= 0 ? 'green' : 'red';
      listItem.innerHTML = `<span>${entry.city}, ${entry.state}</span>,<br>Population: ${entry.population},<br>Rank: ${entry.rank},<br>Growth: <span style="color: ${growthColor};">${entry.growth_from_2000_to_2013}</span>`;
      searchResults.appendChild(listItem);
    });
  }
}


// Function to perform the search
async function searchCities() {
  const searchInput = document.getElementById('searchInput');
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }

  try {
    const data = await fetchData('https://tinyurl.com/5bzzvh6u');
    const filteredCities = filterCities(data, searchQuery);
    displayResults(filteredCities);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
