import moment from 'moment';

const axios = require('axios');

export default async function getFlights(days, code, budget) {
  var tomorrow = moment().add(days+1, 'd').format('YYYY-MM-DD')

  var options = [];

  var response = await axios.get(process.env.PUBLIC_URL + "/.netlify/functions/skyscanner", {
      params: {
        code: code,
        date: tomorrow
      }
    })
    .then()
    .catch((err) => {
      console.error(err);
    })

  var quotes = response.data.Quotes.sort(function(a, b) {
    return a.MinPrice - b.MinPrice;
  })

  var overBudget = quotes.findIndex(function(el) {
    return el.MinPrice > budget;
  })

  if (overBudget !== -1) {
    quotes = quotes.slice(0, overBudget);
  }

  var interval = parseInt(quotes.length / 5);
  if (interval === 0) {
    interval = 1;
  }

  var i = 0;

  var destinationId = 0;
  var findDest = (el, id) => {
    return el.PlaceId === destinationId;
  }

  while (options.length < 5 && i < quotes.length) {
    var singleOption = {'price': quotes[i].MinPrice};
    destinationId = quotes[i].OutboundLeg.DestinationId;

    var place = response.data.Places.find(findDest)

    if (place.CityName.length !== 0) {
      singleOption['name'] = place.CityName + ', ' + place.CountryName;
    } else {
      singleOption['name'] = place.Name;
    }
    singleOption['code'] = place.SkyscannerCode;

    options.push(singleOption);
    i += interval;
  }

  for (var j=0; j<options.length; j++) {
    // random from 0 to 20
    var rand = Math.random() * 20;

    if (options[j].price < 0.3*budget) {
      options[j].risk = parseInt(80 + rand);
      options[j].return = 100;
    } else if (options[j].price < 0.5*budget) {
      options[j].risk = parseInt(60 + rand);
      options[j].return = 80;
    } else if (options[j].price < 0.6*budget) {
      options[j].risk = parseInt(40 + rand);
      options[j].return = 60;
    } else if (options[j].price < 0.8*budget) {
      options[j].risk = parseInt(20 + rand);
      options[j].return = 40;
    } else {
      options[j].risk = parseInt(rand);
      options[j].return = 20;
    }
  }
console.log(options);
  return options;
}
