import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector as VectorSource } from 'ol/source';
import KML from 'ol/format/KML.js';
import { Heatmap as HeatmapLayer } from 'ol/layer.js';
import { GeoJSON } from 'ol/format';
import { NgbdModalComponent } from './NgbdModalComponent';

@Component({
  selector: 'app-mapol',
  templateUrl: './mapol.component.html',
  styleUrls: ['./mapol.component.scss']
})
export class MapolComponent implements OnInit {

  map: Map;
  vector: HeatmapLayer;
  data: VectorSource;
  vectorSource: VectorSource = new VectorSource();
  dateSelected = null;
  cities = 'assets/cities.json';

  currentDate = new Date();
  interval;


  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000
        },
        {
          name: '2011',
          value: 8940000
        }
      ]
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },

    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002
        },
        {
          name: '2011',
          value: 5800000
        }
      ]
    }
  ];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;


  startTimer() {
    this.interval = setInterval(() => {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate() + 1);
      console.log(this.currentDate);
      this.multi[0].series.push({
        name: '2012',
        value: 7300000
      });
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.currentDate = new Date();
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private modalService: NgbModal) { }

  prevDay() {
    if (this.dateSelected === null) {
      this.dateSelected = { year: 2019, month: 5, day: 3 };
      this.selectDate(this.dateSelected);
      return;
    }
    const newDate = new Date(this.dateSelected.year + '-' + this.dateSelected.month + '-' + this.dateSelected.day);
    newDate.setDate(newDate.getDate() - 1);
    this.dateSelected = { year: newDate.getFullYear(), month: newDate.getMonth() + 1, day: newDate.getDate() };
    this.selectDate(this.dateSelected);
  }

  nextDay() {
    if (this.dateSelected === null) {
      this.dateSelected = { year: 2019, month: 5, day: 3 };
      this.selectDate(this.dateSelected);
      return;
    }
    const newDate = new Date(this.dateSelected.year + '-' + this.dateSelected.month + '-' + this.dateSelected.day);
    newDate.setDate(newDate.getDate() + 1);
    this.dateSelected = { year: newDate.getFullYear(), month: newDate.getMonth() + 1, day: newDate.getDate() };
    this.selectDate(this.dateSelected);
  }

  selectDate(date: any) {
    console.log('Change: ' + date);
    this.map.removeLayer(this.vector);
    let month: string = date.month;
    if (date.month < 10) {
      month = '0' + month;
    }
    let day: string = date.day;
    if (date.day < 10) {
      day = '0' + day;
    }
    const dateString = 'assets/geojson/' + date.year + '-' + month + '-' + day + '.json';
    console.log(dateString);
    this.vector = new HeatmapLayer({
      source: new VectorSource({
        url: dateString,
        format: new GeoJSON()
      }),
      blur: 50,
      radius: 8
    });
    this.map.addLayer(this.vector);
  }

  openModal() {
    this.modalService.open(NgbdModalComponent, { windowClass: 'my-class' });
  }

  ngOnInit() {
    this.data = new VectorSource();

    this.vector = new HeatmapLayer({
      source: new VectorSource({
        url: 'assets/GeoObs.json',
        format: new GeoJSON()
      }),
      blur: 50,
      radius: 4
    });

    this.vector.getSource().on('addfeature', (event) => {
      // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
      // standards-violating <magnitude> tag in each Placemark.  We extract it from
      // the Placemark's name instead.
      const name = event.feature.get('name');
      const magnitude = parseFloat(name.substr(2));
      event.feature.set('weight', magnitude * 1000);
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({ url: 'https://{a-c}.tile.osm.org/{z}/{x}/{y}.png' })
        })
      ],
      view: new View({
        center: [-370379, 4801558],
        zoom: 7
      })
    });

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [
              -3703790, 40416775
            ]
          }
        }
      ]
    };

    this.map.addLayer(this.vector);

    this.vectorSource.addFeatures((new GeoJSON()).readFeatures(geojson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }));
  }
}
