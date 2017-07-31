exports.handler = (event, context, callback) => {
    const RESPONSE_SSMLS = [
        `
        <speak>
            Bibo is your wife.
            <amazon:effect name="whispered">
            Hey, don't tell her I told ya this, but she's a little nervous about her weights
            </amazon:effect>
        </speak>
        `,
        `Bibo is your wife. She's the most beautiful girl in the world.`,
        `Bibo is your wife. She's a lovely girl who can cook and drive you to and from your work.`,
        `Bibo is your wife. She's a clever girl who knows a lot of things.`,
        `Bibo is your wife. She likes watching movie.`,
        `
        <speak>
            Bibo is your wife.
            You usually call her
            <audio src="https://s3.amazonaws.com/hanjoes-stuff/converted.mp3" /> 
        </speak>
        `
    ];

    try {
        if (event.session.new) {
            // New Session
            console.log("NEW SESSION");
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // Launch Request
                console.log("Launching...");
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse(`
                        <speak>who's my wife skill enabled, powered by AWS</speak>.
                        `, true),
                        {}
                    )
                )
                break;

            case "IntentRequest":
                // Intent Request
                let num = RESPONSE_SSMLS.length;
                console.log(`Getting ${event.request.intent.name}`);
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse(RESPONSE_SSMLS[getRandomInt(0, num)], true),
                        {}
                    )
                )
                break;

            case "SessionEndedRequest":
                // Session Ended Request
                console.log("SESSION ENDED REQUEST");
                break;

            default:
                context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);

        }

    } catch (error) { 
        context.fail(`Exception: ${error}`) ;
    }
};

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "SSML",
            ssml: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

generateResponse = (speechletResponse, sessionAttributes) => {

    return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}