import config from "../config.js";
import "./progressbar.js";

let token = new URL(window.location.href).searchParams.get('token');
if (token == null) {
    window.location.href = 'index.html';
}

let bar = new ProgressBar.Line(progressBarDiv, {
    strokeWidth: 2,
    easing: 'easeInOut',
    duration: 1400,
    color: '#d8c899',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    from: {color: '#d8c899'},
    to: {color: '#b89c47'},
    step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
    }
});

document.getElementById('logo1').src = config["spaces"].concat("/logos/B_Physics Inventory-04.png");
document.getElementById('logo2').src = config["spaces"].concat("/logos/B_Physics Inventory-04.png");
document.getElementById('signOutButton').onclick = (event) => {
    fetch(config["server"].concat('/logout'), {
        method: 'POST', headers: {
            'Content-Type': 'application/json', 'Authorization': token
        }
    }).then(function (r) {
        window.location.href = 'index.html'
    });
}
document.getElementById('quicksearch').onkeyup = (event) => {
    if (event.key === 'Enter') {
        let searchInput = document.getElementById('quicksearch');
        bar.set(0.0);
        fetch(config["server"].concat('/app/assets?') + new URLSearchParams({
            search: searchInput.value
        }), {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': token
            }
        }).then(response => checkAuthorization(response))
            .then(response => response.text())
            .then(body => JSON.parse(body))
            .then(assets => updateAssetsTable(assets))
            .then(() => {
                bar.animate(1.0);
            })
    }
}

fetch(config["server"].concat('/app/assets'), {
    method: 'GET', headers: {
        'Content-Type': 'application/json', 'Authorization': token
    }
}).then(response => checkAuthorization(response))
    .then(response => response.text())
    .then(body => JSON.parse(body))
    .then(assets => updateAssetsTable(assets))


function checkAuthorization(response) {
    console.log(response.status)
    if (response.status === 401) {
        window.location.href = 'index.html'
    } else {
        return response;
    }
}

function updateAssetsTable(assets) {
    let table = document.getElementById("tableBody");
    table.replaceChildren();

    function createRow(asset) {
        console.log(asset);

        let row = document.createElement("tr");
        row.id = asset._id;


        /* Name cell */

        let nameCell = document.createElement("td");
        let nameCellContents = document.createElement("div");
        let nameCellImageDiv = document.createElement('div');
        let nameCellNameDiv = document.createElement("div");
        let nameCellNameDivName = document.createElement("div");
        let nameCellNameDivMfrInfo = document.createElement("div");

        nameCell.className = 'whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6';
        nameCellContents.className = 'flex items-center';
        nameCellImageDiv.className = 'h-10 w-10 flex-shrink-0';
        nameCellNameDiv.className = 'ml-4';
        nameCellNameDivName.className = 'font-medium text-gray-900';
        nameCellNameDivMfrInfo.className = 'text-gray-500';

        nameCellNameDivName.innerText = asset.name;
        nameCellNameDivMfrInfo.innerText = [asset.manufacturerInfo.brand, asset.manufacturerInfo.model, asset.manufacturerInfo.partNo, asset.manufacturerInfo.serialNo].filter(Boolean).join(' :: ');

        if (asset.images == null || asset.images.length === 0) {
            let no_image = document.createElement('img');
            no_image.className = 'h-10 w-10 rounded-full'
            no_image.src = '../img/image_not_available.png'
            no_image.alt = 'Image Not Available'
            nameCellImageDiv.appendChild(no_image);
        } else {
            let nameCellImageDivImage = document.createElement('img')
            nameCellImageDivImage.className = 'h-10 w-10 rounded-full'
            nameCellImageDivImage.src = config["spaces"].concat("/images/").concat(asset.images[0]);
            nameCellImageDivImage.alt = asset.name;
            nameCellImageDiv.appendChild(nameCellImageDivImage);
        }

        row.appendChild(nameCell);
        nameCell.appendChild(nameCellContents);
        nameCellContents.append(nameCellImageDiv, nameCellNameDiv);
        nameCellNameDiv.append(nameCellNameDivName, nameCellNameDivMfrInfo);


        /* Location cell */

        let locationCell = document.createElement('td');
        let location = document.createElement('div');

        locationCell.className = 'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
        location.className = 'text-gray-900';

        location.innerText = asset.location

        row.appendChild(locationCell);
        locationCell.appendChild(location);


        /* Status */

        let statusCell = document.createElement('td');
        let statusSpan = document.createElement('span');

        statusCell.className = 'whitespace-nowrap px-3 py-4 text-sm text-gray-500';
        statusSpan.className = 'inline-flex rounded-full bg-green-100 px-2 text-s font-semibold leading-5 text-green-800';

        statusSpan.innerHTML = asset.maintenanceRecord.currentStatus.status.concat('<br/>').concat(asset.maintenanceRecord.currentStatus.effectiveDate);

        row.appendChild(statusCell);
        statusCell.appendChild(statusSpan);


        /* Quantity */

        let quantityCell = document.createElement('td');
        quantityCell.className = 'whitespace-nowrap px-3 py-4 text-sm text-gray-500';
        quantityCell.innerText = [asset.quantity.value, asset.quantity.unit].join(' ');

        row.appendChild(quantityCell);


        /* View/Edit button */

        let viewCell = document.createElement('td');
        let viewLink = document.createElement('a');
        let viewLinkText = document.createElement('p')
        let viewLinkSpan = document.createElement('span');

        viewCell.className = 'relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6';
        viewLink.className = 'text-aublue-600 hover:text-aublue-900';
        viewLinkSpan.className = 'sr-only';

        viewLinkText.innerText = 'View/Edit'
        viewLinkSpan.innerText = ', ' + asset.name;
        viewLink.href = 'view.html?token=' + token + '&id=' + asset._id;

        viewCell.appendChild(viewLink);
        viewLink.append(viewLinkText, viewLinkSpan);

        row.appendChild(viewCell);

        table.appendChild(row);
    }

    assets.forEach(createRow)
}
