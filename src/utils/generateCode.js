export function generateAxiosCode(req) {
  const { url, method, headers, params, data } = req;
  
  if (!url) {
    return "URL cannot be empty.";
  }

  const codeSnippet = `
import axios from "axios";

let options = {
  url: "${url}",
  method: "${method}",
  headers: ${JSON.stringify(headers, null, 2)},
  params: ${JSON.stringify(params, null, 2)},
  data: ${JSON.stringify(data, null, 2)},
};

axios.request(options)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Request error: ", error);
  });
`;

  return codeSnippet.trim();
}

export function generateFetchCode(req) {
  const { url, method, headers, data } = req;

  if (!url) {
    return "URL cannot be empty.";
  }

  const codeSnippet = `
let url = "${url}";

let options = {
  method: "${method}",
  headers: ${JSON.stringify(headers, null, 2)},
  body: ${JSON.stringify(data, null, 2)},
};

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Fetch error: ", error);
  });
`;

  return codeSnippet.trim();
}
