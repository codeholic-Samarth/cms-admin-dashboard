import { Country, State } from 'country-state-city'

export const countries = Country.getAllCountries()

export const getStatesByCountry = (countryCode: string) =>
  State.getStatesOfCountry(countryCode)

export const getCountryName = (countryCode: string) => {
  return countries.find(c => c.isoCode === countryCode)?.name || countryCode
}

export const getStateName = (countryCode: string, stateCode: string) => {
  return (
    getStatesByCountry(countryCode).find(
      s => s.isoCode === stateCode,
    )?.name || stateCode
  )
}