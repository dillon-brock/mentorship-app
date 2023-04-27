import { CityErrorResponse, ZipCodeCityResponse, ZipCodeErrorResponse, ZipCodeListResponse, ZipCodeRadiusArgs } from "../types";

export async function getZipCodesInRadius({ zipCode, radius }: ZipCodeRadiusArgs): Promise<ZipCodeListResponse | ZipCodeErrorResponse> {
  const response = await fetch(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_CLIENT_KEY}/radius.json/${zipCode}/${radius}/miles?minimal`, {
    headers: {
      "Accept": "application/json"
    }
  });

  const zipCodesInRadius = await response.json();
  if (zipCodesInRadius.zip_codes != undefined) {
    zipCodesInRadius.valid = true
  }
  else {
    zipCodesInRadius.valid = false;
  }
  return zipCodesInRadius;
}

export async function getCityFromZipCode(zipCode: string): Promise<ZipCodeCityResponse | CityErrorResponse> {
  const response = await fetch(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_CLIENT_KEY}/info.json/${zipCode}/degrees`, {
    headers: {
      "Accept": "application/json"
    }
  });

  const cityInfo = await response.json();
  if (cityInfo.error_msg) cityInfo.valid = false;
  else cityInfo.valid = true;
  return cityInfo;
}