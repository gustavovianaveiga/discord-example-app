import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  DiscordRequest,
} from "./utils.js";
import { getShuffledOptions, getResult } from "./game.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

app.post("/interactions", async function (req, res) {
  const { type, id, data } = req.body;
  console.log(req.body);

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    if (data.name == "lumy") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "vc ta comprimentado" + getRandomEmoji(),
        },
      });
    }

    if (data.name == "test") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "opa, ta testado" + getRandomEmoji(),
        },
      });
    }

    if (data.name === "cade_o_pai_de") {
      let response = "";
      const value = data.options[0].value;
      switch (value) {
        case "gui":
          response = "sla kkkkk";
          break;
        case "sivas":
          response = "na telecom";
          break;
        case "biel":
          response = "trabalhando";
          break;
        case "gustavo":
          response = "trabalhando";
          break;
        case "murilo":
          response = "em casa";
          break;

        default:
          response = "esse cara tem pai?";
          break;
      }

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: response,
        },
      });
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
