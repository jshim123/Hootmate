async function fetchApartmentData() {
  const response = await fetch('Book1.csv');
  const csvData = await response.text();
  const data = parseCSVData(csvData);
  return data;
}
function parseCSVData(csvData) {
  const parsedData = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
  });
  return parsedData.data;
}
async function initMap() {
  const mapOptions = {
    center: { lat: 38.03479303079166, lng: -78.50851011926862 }, // Set the center to San Francisco (change the latitude and longitude as needed)
    zoom: 13
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  const apartmentData = await fetchApartmentData();
  displayApartmentData(map, apartmentData);
}

function displayApartmentData(map, apartmentData) {
  apartmentData.forEach(apartment => {
    const marker1 = new google.maps.Marker({
      position: { lat: 38.033175, lng: -78.492846 },
      map: map,
      title: apartment.property_name
    });
    const marker2 = new google.maps.Marker({
      position: { lat: 38.031109, lng: -78.493340 },
      map: map,
      title: apartment.property_name
    });
    const marker3 = new google.maps.Marker({
      position: { lat: 38.028629, lng: -78.498876 },
      map: map,
      title: apartment.property_name
    });
    const marker4 = new google.maps.Marker({
      position: { lat: 38.030137, lng: -78.496044 },
      map: map,
      title: apartment.property_name
    });
    const marker5 = new google.maps.Marker({
      position: { lat: 38.036428, lng: -78.501366 },
      map: map,
      title: apartment.property_name
    });
    const marker6 = new google.maps.Marker({
      position: { lat: 38.028353, lng: -78.507803 },
      map: map,
      title: apartment.property_name
    });
    const marker7 = new google.maps.Marker({
      position: { lat: 38.037061, lng: -78.511769 },
      map: map,
      title: apartment.property_name
    });
    
    const infoWindowContent1 = `
      <div>
        <h3=>${"Barrack West"}</h3>
        <p>Address: ${apartment.address}</p>
        <p>Price: ${apartment.price}</p>
        <p>Bedrooms: ${apartment.bedrooms}</p>
        <p>Bathrooms: ${apartment.bathrooms}</p>
      </div>
    `;
    const infoWindowContent2 = `
      <div>
        <h3=>${"University Heights"}</h3>
        <p>Address: ${apartment.address}</p>
        <p>Price: ${apartment.price}</p>
        <p>Bedrooms: ${apartment.bedrooms}</p>
        <p>Bathrooms: ${apartment.bathrooms}</p>
      </div>
    `;
    const infoWindowContent3 = `
      <div>
        <h3=>${"10th and Dairy"}</h3>
        <p>Address: ${apartment.address}</p>
        <p>Price: ${apartment.price}</p>
        <p>Bedrooms: ${apartment.bedrooms}</p>
        <p>Bathrooms: ${apartment.bathrooms}</p>
      </div>
    `;
    const infoWindowContent4 = `
      <div>
        <h3=>${"City Walk Apartments"}</h3>
        <p>Address: ${apartment.address}</p>
        <p>Price: ${apartment.price}</p>
        <p>Bedrooms: ${apartment.bedrooms}</p>
        <p>Bathrooms: ${apartment.bathrooms}</p>
      </div>
    `;
    const infoWindowContent5 = `
      <div>
        <h3=>${"Six Hundred West Main"}</h3>
        <p>Address: ${apartment.address}</p>
        <p>Price: ${apartment.price}</p>
        <p>Bedrooms: ${apartment.bedrooms}</p>
        <p>Bathrooms: ${apartment.bathrooms}</p>
      </div>
    `;
    const infoWindowContent6 = `
      <div>
        <h3=>${"Arden Place"}</h3>
        <p>Address: ${apartment.address}</p>
        <p>Price: ${apartment.price}</p>
        <p>Bedrooms: ${apartment.bedrooms}</p>
        <p>Bathrooms: ${apartment.bathrooms}</p>
      </div>
    `;
    const infoWindowContent7 = `
      <div>
        <h3=>${"Cavalier Crossing"}</h3>
        <p>Address: ${apartment.address}</p>
        <p>Price: ${apartment.price}</p>
        <p>Bedrooms: ${apartment.bedrooms}</p>
        <p>Bathrooms: ${apartment.bathrooms}</p>
      </div>
    `;
    
    const infoWindow1 = new google.maps.InfoWindow({
      content: infoWindowContent1
    });
    const infoWindow2 = new google.maps.InfoWindow({
      content: infoWindowContent2
    });
    const infoWindow3 = new google.maps.InfoWindow({
      content: infoWindowContent3
    });
    const infoWindow4 = new google.maps.InfoWindow({
      content: infoWindowContent4
    });
    const infoWindow5 = new google.maps.InfoWindow({
      content: infoWindowContent5
    });
    const infoWindow6 = new google.maps.InfoWindow({
      content: infoWindowContent6
    });
    const infoWindow7 = new google.maps.InfoWindow({
      content: infoWindowContent7
    });

    marker1.addListener('click', () => {
      infoWindow1.open(map, marker1);
    });
    marker2.addListener('click', () => {
      infoWindow2.open(map, marker2);
    });
    marker3.addListener('click', () => {
      infoWindow3.open(map, marker3);
    });
    marker4.addListener('click', () => {
      infoWindow4.open(map, marker4);
    });
    marker5.addListener('click', () => {
      infoWindow5.open(map, marker5);
    });
    marker6.addListener('click', () => {
      infoWindow6.open(map, marker6);
    });
    marker7.addListener('click', () => {
      infoWindow7.open(map, marker7);
    });
  });
}

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);