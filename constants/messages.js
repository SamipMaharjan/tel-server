// const createBetMessage = `
// /createBet- starts the process of creating a bet

//     /submit: to submit the all the information after entering its.

//     /exit: to terminate the whole process

//         /icon - (required)  link for the icon
//         /title - (required)  title of the bet
//         /description - (required)  title of the bet
//         /start - (required)  start date of the bet
//         /end - (required)  end date of the bet
//         /minBet - (required)  minimum amount for participation.
//         /maxBet - (required)  maximum amount for the bet
//         /odds -  title of the bet
//         /creator - creator title of the bet
//         /status -  status of the bet

//         `;

const helpMessage = `
You have started the process of creating a bet.
/createBet - creates a new bet, read more informatino below to dive into the specifics
/help - displays this help message
/list - lists all the bets creted by you.
/delete <link of the bet> - deletes the bet with the link.
/deleteAll - deletes all the bets created by you.

To create a bet, you need to send the following message to the bot.

    The format of the message should be 
    <field>: <value>


    /createBet
    icon: (required) [URL of the event image]
    title: (required) [Event title]
    label: (required) [Event label]
    description: (required) [Detailed description of the event]
    options: [option-1], [option-2]
    amount: [Amount of the bet]
    
    status: [Current status of the event]
    start: [Start time of the event]
    end: [End time of the event]
    minBet: [Minimum bet amount]
    maxBet: [Maximum bet amount]
    odds: [Betting odds]
    icon: [URL of an icon]
    creator: [Name or ID of event creator]

    Example
    /createBet

    icon: https://example.com/chess-match.jpg
    title: Hikaru Nakamura vs Hans Niemann
    description: High-stakes chess match between Grandmasters Hikaru Nakamura and Hans Niemann
    options: Magnus, Hikaru
    input: amount

    start: 2024-10-15T18:00:00Z
    end: 2024-10-15T22:00:00Z
    minBet: 0.1 SOL
    maxBet: 10 SOL
    odds: 1.5
    status: upcoming
    icon: https://example.com/chess-icon.png
    creator: ChessBets


`;

// /link - for the amount if its dynamic
// /button - for the user to pick sides

// /add: (to specify what to add)
module.exports = { helpMessage };
