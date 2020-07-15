import React from 'react';
//Styles
import './home.scss';
//Components
import Input from '../../../components/input/Input';
//Service
import HttpService from '../../../services/http/httpService';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_country: {
        id: '',
        name: '',
        country: '',
        temp: '',
        humidity: '',
        wind: '',
        cloud: '',
        forecast: []
      },
      places: []
    };
  }

  /**
   * Method is called after constructor
   * In this method we get the current location of the user
   */
  componentDidMount = async () => {
    navigator.geolocation.getCurrentPosition(this.handleCurrentPlace);
  };

  /**
   * Method for get current weather from our location
   * @param {*} position Object
   */
  handleCurrentPlace = async position => {
    let pos = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    const response = await HttpService.getWeather(pos);
    if (response) {
      let respforecast = await HttpService.getFiveDays(response.city.name);
      let place = {
        id: response.city.id,
        name: response.city.name,
        country: response.city.country,
        temp: response.list[0].main.temp,
        humidity: response.list[0].main.humidity,
        wind: response.list[0].wind.speed,
        cloud: response.list[0].clouds.all,
        forecast: respforecast
      };
      this.setState({
        current_country: place,
        places: [...this.state.places, place]
      });
    } else {
      console.log('No se encontro el lugar buscado');
    }
  };

  /**
   * Method get event with the input value and
   * handler petition for search new place weather
   * @param {*} event Strign
   */
  handleInput = async event => {
    let response = await HttpService.getPlaceWeather(event);
    let respforecast = await HttpService.getFiveDays(event);
    if (response) {
      let place = {
        id: response.id,
        name: response.name,
        country: response.sys.country,
        temp: response.main.temp,
        humidity: response.main.humidity,
        wind: response.wind.speed,
        cloud: response.clouds.all,
        forecast: respforecast
      };
      this.setState({
        current_country: place,
        places: [...this.state.places, place]
      });
    } else {
      console.log('No se encontro el lugar buscado');
    }
  };

  /**
   * Method for change the place to see
   * @param {*} place_index Int
   */
  handlePlace = place_index => {
    this.setState({
      current_country: this.state.places[place_index]
    });
  };

  /**
   * Method for delete place
   * @param {*} place_index int
   */
  removePlace = place_index => {
    this.setState({
      places: this.state.places.filter(
        p => p.id !== this.state.places[place_index].id
      )
    });
  };

  /**
   * Method for get current date
   */
  getCurrentDate = () => {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  render() {
    return (
      <>
        <div className="d-flex align-items-center vh-100">
          <div className="container ">
            <div className="row">
              {/** Current Place */}
              <div className="card1 col-lg-8 col-md-7">
                <small>Weather App</small>
                <div className="text-center">
                  <img
                    className="image mt-5"
                    src="https://i.imgur.com/M8VyA2h.png"
                    alt="Weather pic"
                  />
                </div>
                {this.state.current_country.name !== '' ? (
                  <>
                    <div className="row px-3 mt-3 mb-2 align-items-center">
                      <h1 className="large-font mr-3">
                        {this.state.current_country.temp}&#176;
                      </h1>
                      <div className="d-flex flex-column mr-3">
                        <h2 className="mt-3">
                          {this.state.current_country.name}
                        </h2>

                        <small>{this.getCurrentDate()}</small>
                      </div>
                    </div>
                    <div className="row px-3  align-items-center">
                      <h1 className="mt-4 mr-3">Pronostico</h1>
                      <div className="row">
                        {this.state.current_country.forecast.map(
                          (forecast, index) => {
                            return (
                              <>
                                <div
                                  className="col text-align-center"
                                  key={`forecast_${index}`}
                                >
                                  <label>{forecast.date}</label>
                                  <h6>{forecast.temp}&#176;</h6>
                                </div>
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {/** Dates */}
              <div className="card2 col-lg-4 col-md-5">
                <Input onInputChange={this.handleInput}></Input>
                <div className="mr-5">
                  {this.state.places.length > 0 ? (
                    <>
                      {this.state.places.map((recent, index) => {
                        return (
                          <div
                            className="d-flex justify-content-between"
                            key={`places_${index}`}
                          >
                            <div
                              className="light-text suggestion"
                              onClick={() => this.handlePlace(index)}
                            >
                              {recent.name}
                            </div>
                            <div onClick={() => this.removePlace(index)}>
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </div>
                          </div>
                        );
                      })}
                      <div className="line my-5"></div>
                    </>
                  ) : null}

                  {this.state.current_country.name !== '' ? (
                    <>
                      <p>Detalles del clima</p>
                      <div className="row px-3">
                        <p className="light-text">Nubes</p>
                        <p className="ml-auto">
                          {this.state.current_country.cloud}%
                        </p>
                      </div>
                      <div className="row px-3">
                        <p className="light-text">Humedad</p>
                        <p className="ml-auto">
                          {this.state.current_country.humidity}%
                        </p>
                      </div>
                      <div className="row px-3">
                        <p className="light-text">Viento</p>
                        <p className="ml-auto">
                          {this.state.current_country.wind}Km/h
                        </p>
                      </div>
                      <div className="line mt-3"></div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
