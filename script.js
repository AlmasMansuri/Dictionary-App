//----define in put and button ----//
//---when search button press put addevent listner function---//
//----make another function to fetch data----//
//---call api function(above) into addeventlistener fun---//
const input = document.querySelector("#input");
const searchBtn = document.querySelector("#search");
let resultDiv = document.querySelector(".result");

searchBtn.addEventListener("click", function (event) {
  console.log("clcked");
  event.preventDefault();
  const word = input.value;
  getword(word);
});

const getword = async (word) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const data = await response.json();
  console.log(data);

  resultDiv.innerHTML = `
  <h3> <strong>result:</strong> ${data[0].word}</h3>
  <p>${data[0].meanings[0].partOfSpeech}</p>
  <p><strong>Phonetics:</strong>${data[0].phonetics[0].text}</p>
  <p><strong>Meaning:</strong>${
    data[0].meanings[0].definitions[0].definition === undefined
      ? "Not found"
      : data[0].meanings[0].definitions[0].definition
  }</p>
  <p><strong>Synonyms:</strong>
  `;
  if (data[0].meanings[0].synonyms.length === 0) {
    resultDiv.innerHTML += `<span>Not Found</span>`;
  } else {
    for (let i = 0; i < data[0].meanings[0].synonyms.length; i++) {
      resultDiv.innerHTML += `<li>${data[0].meanings[0].synonyms[i]}</li>`;
    }
  }

  resultDiv.innerHTML += `<p class="anchortag"><a href="${data[0].sourceUrls}"target="_blank">Read More</a></p>`;
};
