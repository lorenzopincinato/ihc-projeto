let ADDING_MARKER = false;

let NEW_MARKER = null;

const icons = {
    alert: "/Imagens/Alert.svg",
    location: "/Imagens/Location.svg",
};

const alerts = [
    {
        begin: {
            hour: 19,
            minutes: 00,
        },
        end: {
            hour: 21,
            minutes: 00,
        },
        center: { lat: -22.901683, lng: -47.054598 },
        radius: 150,
        circle: null,
        marker: null,
    },
    {
        begin: {
            hour: 22,
            minutes: 00,
        },
        end: {
            hour: 24,
            minutes: 00,
        },
        center: { lat: -22.907000, lng: -47.054598 },
        radius: 150,
        circle: null,
        marker: null,
    },
    {
        begin: {
            hour: 11,
            minutes: 00,
        },
        end: {
            hour: 15,
            minutes: 15,
        },
        center: { lat: -22.908683, lng: -47.059598 },
        radius: 150,
        circle: null,
        marker: null,
    }
]

const activeAlerts = []

let map = null;

function initMap() {
    const campinas = { lat: -22.903542, lng: -47.056829 };

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 16,
            center: campinas,
        }
    );

    const marker = new google.maps.Marker({
        position: campinas,
        icon: icons.location,
        map: map, 
    });

    google.maps.event.addListener(map, 'click', function(event) {
        if (ADDING_MARKER) {
            placeMarker(event.latLng);
        }
     });
}

function setCurrentTime() {
    const date = new Date();

    const hour = date.getHours();
    const minutes = date.getMinutes();

    const value = hour * 60 + minutes;

    document.getElementById('time-slider').value = value;
    setTime(hour, minutes);
    setActiveAlerts(value);
}

function handleTimeSlider(value) {
    const hour =  (value - value % 60) / 60;
    const minutes = value % 60;

    setTime(hour, minutes);
    setActiveAlerts(value);
}

function setTime(hour, minutes) {
    document.getElementById('time-selected').innerHTML = `${('0' + hour).slice(-2)}:${('0' + minutes).slice(-2)}`;
}

function setActiveAlerts(value) {
    for (const alert of alerts) {       
        const beginValue = alert.begin.hour * 60 + alert.begin.minutes;
        const endValue = alert.end.hour * 60 + alert.end.minutes;

        if (value >= beginValue && value <= endValue) {
            if (alert.circle) {
                alert.circle.setMap(map);
            }
            else {
                alert.circle = new google.maps.Circle({
                    strokeColor: "#A70000",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: "#CF0000",
                    fillOpacity: 0.15,
                    map,
                    center: alert.center,
                    radius: alert.radius,
                });

                alert.circle.setMap(map);
            }

            if (alert.marker) {
                alert.marker.setMap(map);
            }
            else {
                alert.marker = new google.maps.Marker({
                    position: alert.center,
                    icon: icons.alert,
                    map: map,
                });

                alert.marker.setMap(map);
            }
        }
        else {
            if (alert.circle) {
                alert.circle.setMap(null);
            }

            if (alert.marker) {
                alert.marker.setMap(null);
            }
        }
    }
}

function handleAddMarker() {
    const addMarkerFab = document.getElementById('add-marker-fab');
    const placeMarkerLabel = document.getElementById('place-marker-label');
    const timeControl = document.getElementById('time-control');

    timeControl.classList.add('hidden');
    addMarkerFab.classList.add('hidden');
    placeMarkerLabel.classList.remove('hidden');

    ADDING_MARKER = true;
}

function placeMarker(position) {
    const markerControl = document.getElementById('marker-control');
    
    markerControl.classList.remove('hidden');

    if (NEW_MARKER) {
        NEW_MARKER.setMap(null);
    }

    NEW_MARKER = new google.maps.Marker({
        position: position,
        icon: icons.alert,
        map: map, 
    });
}

function showSelectItemsStep() {
    const selectItems = document.getElementById('select-items');
    selectItems.classList.remove('hidden');

    const itemsDescription = document.getElementById('items-description');
    itemsDescription.classList.add('hidden');

    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = 'O que foi roubado?';

    const nextStepButton = document.getElementById('next-step-button');
    nextStepButton.onclick = showItemsDescriptionStep;

    const peviousStepButton = document.getElementById('previous-step-button');
    peviousStepButton.classList.add('hidden');
}

function showItemsDescriptionStep() {
    const itemsDescription = document.getElementById('items-description');
    itemsDescription.classList.remove('hidden');

    const description = document.getElementById('description');
    description.classList.add('hidden');

    const selectItems = document.getElementById('select-items');
    selectItems.classList.add('hidden');

    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = 'Como são os pertences roubados?';

    const nextStepButton = document.getElementById('next-step-button');
    nextStepButton.onclick = showDescriptionStep;

    const peviousStepButton = document.getElementById('previous-step-button');
    peviousStepButton.classList.remove('hidden');
    peviousStepButton.onclick = showSelectItemsStep;
}

function showDescriptionStep() {
    const description = document.getElementById('description');
    description.classList.remove('hidden');

    const edit = document.getElementById('edit');
    edit.classList.add('hidden');

    const itemsDescription = document.getElementById('items-description');
    itemsDescription.classList.add('hidden');

    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = 'Como o roubo aconteceu?';

    const nextStepButton = document.getElementById('next-step-button');
    nextStepButton.classList.remove('hidden');
    nextStepButton.onclick = showEditStep;

    const peviousStepButton = document.getElementById('previous-step-button');
    peviousStepButton.onclick = showItemsDescriptionStep;

    const saveButton = document.getElementById('save-button');
    saveButton.classList.add('hidden');
}

function isChecked(name) {
    const checkbox = document.getElementById(`item-${name}`);
    return checkbox.checked;
}

function showEditStep() {
    const edit = document.getElementById('edit');
    edit.classList.remove('hidden');

    const description = document.getElementById('description');
    description.classList.add('hidden');

    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = 'As informações estão certas?';

    const nextStepButton = document.getElementById('next-step-button');
    nextStepButton.classList.add('hidden');

    const saveButton = document.getElementById('save-button');
    saveButton.classList.remove('hidden');

    const items = [
        {
            name: 'money',
            label: 'Dinheiro'
        },
        {
            name: 'wallet',
            label: 'Carteira'
        },
        {
            name: 'car',
            label: 'Carro'
        },
        {
            name: 'motorcycle',
            label: 'Moto'
        },
        {
            name: 'cellphone',
            label: 'Celular'
        },
        {
            name: 'purse',
            label: 'Bolsa'
        },
        {
            name: 'jewelry',
            label: 'Joias'
        },
        {
            name: 'others',
            label: 'Outros'
        }
    ];

    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    items.forEach(item => {
        if (isChecked(item.name)) {
            const newItem = document.createElement('li');
            newItem.innerText = item.label;

            itemsList.appendChild(newItem);
        }
    });

    const peviousStepButton = document.getElementById('previous-step-button');
    peviousStepButton.onclick = showDescriptionStep;

    const itemsDescriptionInput = document.getElementById('items-description-input');
    const itemsDescriptionText = document.getElementById('items-description-text');

    itemsDescriptionText.innerText = itemsDescriptionInput.value;

    const descriptionInput = document.getElementById('description-input');
    const descriptionText = document.getElementById('description-text');

    descriptionText.innerText = descriptionInput.value;
}

function showSuccess() {
    const edit = document.getElementById('edit');
    edit.classList.add('hidden');  

    const success = document.getElementById('success');
    success.classList.remove('hidden');  

    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = 'Sucesso!';

    const previousStepButton = document.getElementById('previous-step-button');
    previousStepButton.classList.add('hidden');

    const nextStepButton = document.getElementById('next-step-button');
    nextStepButton.classList.add('hidden');

    const saveButton = document.getElementById('save-button');
    saveButton.classList.add('hidden');

    const closeButton = document.getElementById('close-button');
    closeButton.classList.remove('hidden');
}

function closeModal() {
    const success = document.getElementById('success');
    success.classList.add('hidden');  

    const nextStepButton = document.getElementById('next-step-button');
    nextStepButton.classList.remove('hidden');

    const saveButton = document.getElementById('save-button');
    saveButton.classList.add('hidden');

    const closeButton = document.getElementById('close-button');
    closeButton.classList.add('hidden');

    const closeModalButton = document.getElementById("close-modal");
    closeModalButton.click();

    const startDate = new Date();

    const startHour = startDate.getHours();
    const startMinutes = startDate.getMinutes();

    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 60);

    const endHour = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    alerts.push({
        begin: {
            hour: startHour,
            minutes: startMinutes,
        },
        end: {
            hour: endHour,
            minutes: endMinutes,
        },
        center: { lat: NEW_MARKER.position.lat(), lng: NEW_MARKER.position.lng() },
        radius: 150,
        circle: null,
        marker: null,
    })

    setCurrentTime();

    const addMarkerFab = document.getElementById('add-marker-fab');
    const placeMarkerLabel = document.getElementById('place-marker-label');
    const timeControl = document.getElementById('time-control');
    const markerControl = document.getElementById('marker-control');

    timeControl.classList.remove('hidden');
    addMarkerFab.classList.remove('hidden');
    placeMarkerLabel.classList.add('hidden');
    markerControl.classList.add('hidden');

    const items = [
        {
            name: 'money',
            label: 'Dinheiro'
        },
        {
            name: 'wallet',
            label: 'Carteira'
        },
        {
            name: 'car',
            label: 'Carro'
        },
        {
            name: 'motorcycle',
            label: 'Moto'
        },
        {
            name: 'cellphone',
            label: 'Celular'
        },
        {
            name: 'purse',
            label: 'Bolsa'
        },
        {
            name: 'jewelry',
            label: 'Joias'
        },
        {
            name: 'others',
            label: 'Outros'
        }
    ];

    items.forEach(item => {
        const checkbox = document.getElementById(`item-${item.name}`);
        checkbox.checked = false;
    });

    const itemsDescriptionInput = document.getElementById('items-description-input');
    itemsDescriptionInput.value = '';

    const descriptionInput = document.getElementById('description-input');
    descriptionInput.value = '';
    

    NEW_MARKER.setMap(null);

    ADDING_MARKER = false;
    NEW_MARKER = null;

    showSelectItemsStep();
}