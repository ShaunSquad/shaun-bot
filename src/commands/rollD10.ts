export default function rollD10(message: any, rolls: number) {
  const results: string[] = [];
  for (let i = 0; i < rolls; i++) {
    const rollResult = Math.floor(Math.random() * 10) + 1;
    results.push(rollResult.toString());
  }
  message.reply(
    `You rolled ${rolls} d10s:` + "\n" + `${results.join(", " + "\n")}`
  );
}
