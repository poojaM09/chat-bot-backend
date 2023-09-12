const DB = require('../database/Database');

exports.CreateMessage = async (req, res) => {
  try {
    const data = {
      answer: req.body.answer,
      question: req.body.question,
      option: JSON.stringify(req.body.option)
    };

    const sql = `INSERT INTO message SET ?`;
    const [result] = await DB.query(sql, [data]);
      
    if (result.insertId) {
      res.send({ MSG: "Create Message Successfully", Data: result.insertId });
    } else {
      res.send({ MSG: "Not Create Message Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

exports.wellMessage = async (req, res) => {
  try {
      res.send({ MSG: "wellcom to chat"});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

exports.GetBotMessage = async (req, res) => {
  try {
    const userMessage = req.body.question;
    const option = req.body.option;
    const botResponse = await generateBotResponse(userMessage, option);
    res.json({
      Botresponse: botResponse.answer,
      UserResponce: userMessage,
      Options: botResponse.options
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

async function generateBotResponse(userMessage, option) {
  const sql = `SELECT * FROM message WHERE question = ?`;
  const [result] = await DB.query(sql, [userMessage]);
  if (result.length > 0) {
    const lowerUserMessage = userMessage;
    if (lowerUserMessage.includes(result[0].question)) {
      const matchingOption = findMatchingOption(result[0].option, option);
      if (matchingOption) {
        return {
          answer: matchingOption.answer,
          options: result[0].option
        };
      } else {
        return {
          answer: result[0].answer,
          options: result[0].option
        };
      }
    }
  }

  return {
    answer: `I'm sorry, I didn't understand that.`,
    options: []
  };
}

function findMatchingOption(options, targetOption) {
  if (Array.isArray(options)) {
    return options.find(opt => opt.question === targetOption);
  }
  return null;
}
