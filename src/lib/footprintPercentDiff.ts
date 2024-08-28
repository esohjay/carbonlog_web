export function calculatePercentageDifference(
  footprint: number,
  userFootprint: number
) {
  if (userFootprint > footprint) {
    let percentageDifference = ((userFootprint - footprint) / footprint) * 100;
    return `${percentageDifference.toFixed(2)}% greater`;
  } else if (userFootprint < footprint) {
    let percentageDifference = ((footprint - userFootprint) / footprint) * 100;
    return `${percentageDifference.toFixed(2)}% lesser`;
  } else {
    return "0% lesser";
  }
}
