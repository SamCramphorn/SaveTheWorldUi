import { Component, AfterViewInit, ViewChild, ElementRef, NgModule } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 52.232118;
  lng = -0.89862;


  constructor(private http: HttpClient) {
    console.log("Getting Data");
    var result = this.http.get('http://localhost:5001/api/Data/GetCustomerData').map((res: Response) => res.json().response);
    console.log(result);
    console.log("Got Data");

  }
  markers = [
    {
      position: new google.maps.LatLng(40.73061, 73.935242),
      map: this.map,
      title: "Marker 1"
    },
    {
      position: new google.maps.LatLng(32.06485, 34.763226),
      map: this.map,
      title: "Marker 2"
    }
  ];

  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 11
  };

  //Default Marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: "Hello World!"
  });

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    //Adding Click event to default marker
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    //Adding default marker to map
    this.marker.setMap(this.map);

    //Adding other markers
    this.loadAllMarkers();

    this.loadPolys();
  }

  loadPolys(): void {

    var brixworth = [
      { lat: 52.32905, lng: -0.90351 },
      { lat: 52.332722, lng: -0.911621 },
      { lat: 52.332564, lng: -0.895656 },
      { lat: 52.321024, lng: -0.898317 },
      { lat: 52.32286, lng: -0.914539 }
    ];

    var towcester = [
      { lat: 52.133103, lng: -1.004919 },
      { lat: 52.117611, lng: -1.003546 },
      { lat: 52.121195, lng: -0.973333 },
      { lat: 52.13363, lng: -0.975737 }]




    var brixworthPoly = new google.maps.Polygon({
      paths: brixworth,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });

    var towcesterPoly = new google.maps.Polygon({
      paths: towcester,
      strokeColor: '#000000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#000000',
      fillOpacity: 0.35
    });
    brixworthPoly.setMap(this.map);
    towcesterPoly.setMap(this.map);
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }
}
