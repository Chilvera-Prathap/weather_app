const now = new Date();
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        const dateStr = now.toLocaleDateString("en-US", options); 
        const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

const Timings=document.getElementById("timings");
Timings.innerHTML=`<p> ${timeStr}</p><p style="color:black;">${dateStr}</p>`;

          
async function getWeather() {
      const city = document.getElementById("city").value.trim();
      if (!city) {
        alert("Please enter a city");
        return;
      }

      const apiKey = "cc70a846ac5b889b2cfeeb1f242fbd33"; // Your API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found or invalid API key");

        const data = await response.json();

        const logo = document.querySelector("i");
        iconClass=logo.className;

        document.getElementById("weatherResult").innerHTML = `
          <i class="${iconClass}"></i>
          <h3>${data.name}, ${data.sys.country}</h3>
          <h1>${data.main.temp}°C</h1>
          <p>${data.weather[0].description}</p>
          <div class="weather-details">
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind: ${data.wind.speed} m/s</p>
          </div>
        `;
        const city_name=document.getElementById("city2")
        city_name.textContent=`📍${data.name}, ${data.sys.country}`
      } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
      }
      
    }