const { ModalBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const GuildSettings = require("../models/GuildSettings");
const bardapi = require('@xelcior/bard-api');
const _bard = new bardapi(process.env.BARD);

module.exports = {
  shuffle,
  generateCaptcha,
  nFormatter,
  splitTextIntoParts,
  getBardResponse,
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function splitTextIntoParts(text, length) {
  const parts = [];
  while (text.length > length) {
    const part = text.substring(0, length);
    parts.push(part);
    text = text.substring(length);
  }
  parts.push(text);
  return parts;
}
function generateCaptcha() {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters[randomIndex];
  }

  return captcha;
}

async function getBardResponse(question) {
  const answer = await _bard.getAnswer(question);
  return answer
}

function nFormatter(num, digits = 2) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}
