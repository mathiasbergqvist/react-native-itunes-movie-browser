const API_URL = "https://itunes.apple.com/search";

export function urlForQuery(query: string): string{
  if(query.length > 2){
    return API_URL + '?media=movie&term=' + encodeURIComponent(query);
  }
  else{
    API_URL + '?media=movie&term=mission+impossible';
  }
}

export function fetchContentFromiTuens(queryURL: string){
  fetch(queryURL)
}
