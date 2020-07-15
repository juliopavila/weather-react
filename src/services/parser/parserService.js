class ParserService {
  /**
   * Method for parse list of weather array to 5 days array
   * @param {*} place
   * @returns {temporary} Array
   */
  static getFiveDayForescast = place => {
    let temporary = [];
    for (let i = 0; i < place.list.length; i += 8) {
      let day = {
        temp: place.list[i].main.temp,
        humidity: place.list[i].main.humidity,
        wind: place.list[i].wind.speed,
        cloud: place.list[i].clouds.all,
        date: this.getLatinDateFormat(place.list[i].dt_txt)
      };
      temporary.push(day);
    }
    return temporary;
  };

  /**
   * Method for parse to latin america time format
   * @param {*} date string
   * @returns {newDate} string
   */
  static getLatinDateFormat = date => {
    let newDate = new Date(date);
    if (!isNaN(newDate.getTime())) {
      let day = newDate.getDate().toString();
      let month = (newDate.getMonth() + 1).toString();
      // Months use 0 index.
      return (
        (day[1] ? day : '0' + day[0]) +
        '/' +
        (month[1] ? month : '0' + month[0]) +
        '/' +
        newDate.getFullYear()
      );
    }
  };
}

export default ParserService;
