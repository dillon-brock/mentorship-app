export async function getZipCodesInRadius({ zipCode, radius }) {
  const response = await fetch(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_CLIENT_KEY}/radius.json/${zipCode}/${radius}/miles?minimal`, {
    headers: {
      "Accept": "application/json"
    }
  });

  const zipCodesInRadius = await response.json();
  return zipCodesInRadius;
}

export async function getCityFromZipCode(zipCode) {
  const response = await fetch(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_CLIENT_KEY}/info.json/${zipCode}/degrees`, {
    headers: {
      "Accept": "application/json"
    }
  });

  const cityInfo = await response.json();
  return cityInfo;
}