const icons = {
    alert: "../Imagens/Alert.svg",
    location: "../Imagens/Location.svg",
};

const alerts = [
    {
        center: { lat: -22.901683, lng: -47.054598 },
        radius: 150
    }
]

function initMap() {
    const campinas = { lat: -22.903542, lng: -47.056829 };

    const map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 16,
            center: campinas,
        }
    );

    for (const alert in alerts) {
        const circle = new google.maps.Circle({
            strokeColor: "#A70000",
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: "#CF0000",
            fillOpacity: 0.15,
            map,
            center: alerts[alert].center,
            radius: alerts[alert].radius,
        });

        const marker = new google.maps.Marker({
            position: alerts[alert].center,
            icon: icons.alert,
            map: map,
          });
    }

    const marker = new google.maps.Marker({
        position: campinas,
        icon: icons.location,
        map: map, 
    })
}
