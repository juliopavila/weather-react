import http from 'axios';
//Service
import ParserService from '../parser/parserService';

class HttpService {
  /**
   * Method for get weather from place string
   * @param {*} place string
   */
  static getPlaceWeather = async place => {
    let url = `${process.env.REACT_APP_API_URL}/weather?q=${place}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    try {
      const response = await http.get(url);
      if (response.status === 200) return response.data;
    } catch (error) {
      return false;
    }
  };

  /**
   * Method for get weather from current location
   * @param {*} position Object
   */
  static getWeather = async position => {
    let url = `${process.env.REACT_APP_API_URL}forecast?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    try {
      return http.get(url).then(response => {
        if (response.status === 200) {
          return response.data;
        }
      });
    } catch (error) {
      return false;
    }
  };

  /**
   * Method for get 5 days of weather
   * and call parser class for get next 5 days
   * @param {*} place
   */
  static getFiveDays = async place => {
    let url = `${process.env.REACT_APP_API_URL}/forecast?q=${place}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
    // Call the API, and set the state of the weather forecast
    try {
      const response = await http.get(url);
      if (response.status === 200) {
        return ParserService.getFiveDayForescast(response.data);
      }
    } catch (error) {
      return false;
    }
  };
}

export default HttpService;
