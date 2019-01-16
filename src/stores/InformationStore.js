import { observable, action } from 'mobx';

export default class InformationStore {
  @observable licensePlate = '';
  @observable brand = '';
  @observable commercialName = '';
  @observable type = '';
  @observable color = '';
  @observable numberOfSeats = '';
  @observable catalogPrice = '';
  @observable imageLink = '';
  @observable vehicleInfoFetched = '';
  @observable pushedToServer = '';

  @action
  fetchVehicleDetails(licensePlate) {
    this.pushedToServer = false;
    this.imageLink = '';

    const requestUrl =
      'https://opendata.rdw.nl/resource/m9d7-ebf2.json' +
      `?kenteken=${licensePlate}`;

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          data = data[0];
          this.licensePlate = licensePlate || 'placeholder';
          this.brand = data.merk || 'placeholder';
          this.commercialName = data.handelsbenaming || 'placeholder';
          this.type = data.voertuigsoort || 'placeholder';
          this.color = data.eerste_kleur || 'placeholder';
          this.numberOfSeats = data.aantal_zitplaatsen || 'placeholder';
          this.catalogPrice = data.catalogusprijs || 'placeholder';
          this.fetchImage(data.merk.split(' ').join('+'), data.handelsbenaming);
          this.vehicleInfoFetched = true;
        } else {
          alert('no data found');
        }
      });
  }

  @action
  fetchImage(brand, commercialName) {
    const googleSearchUrl = 'https://www.googleapis.com/customsearch/v1?';

    const searchApiKey = 'key=AIzaSyDZQ58V9dpiMfBZYfMbVE7oWgYEXRdm6SE';
    const cx = '&cx=011802052787730633294:w8pqno6kq3k';

    if (brand === 'BMW+I') {
      brand = 'BMW';
      commercialName = 'I2';
    }

    const searchParams = `&q=${brand}+${commercialName}&num=1`;
    const requestUrl = googleSearchUrl + searchApiKey + cx + searchParams;

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        if (!!data) {
          this.imageLink = data.items[0].pagemap.cse_image[0].src;
        }
      });
  }

  @action
  searchVehicle() {
    fetch(
      `https://arcane-scrubland-64110.herokuapp.com/vehicles/search/${
        this.licensePlate
      }`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('auth_token')
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        if (!!data && data.id > 0) {
          this.deleteVehicle(data.id);
          this.createVehicle();
          this.pushedToServer = true;
        } else {
          this.createVehicle();
          this.pushedToServer = true;
        }
      });
  }

  @action
  deleteVehicle(id) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log('successfully deleted');
      }
    });

    xhr.open(
      'DELETE',
      `https://arcane-scrubland-64110.herokuapp.com/vehicles/${id}`
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth_token')
    );
    xhr.send();
  }

  @action
  createVehicle() {
    var data = JSON.stringify({
      vehicle: {
        merk: this.brand,
        handelsbenaming: this.commercialName,
        eerste_kleur: this.color,
        license_plate: this.licensePlate
      }
    });

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
        console.log('successfully created');
      }
    });

    xhr.open('POST', 'https://arcane-scrubland-64110.herokuapp.com/vehicles/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader(
      'Authorization',
      'Bearer ' + localStorage.getItem('auth_token')
    );
    xhr.send(data);
  }
}
