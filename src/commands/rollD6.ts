export default function rollD6(message: any, rolls: number) {
  const results: string[] = [];
  for (let i = 0; i < rolls; i++) {
    const rollResult = Math.floor(Math.random() * 6) + 1;
    results.push(rollResult.toString());
  }
  message.reply(
    `You rolled ${rolls} d6s:` + "\n" + `${results.join(", " + "\n")}`
  );
}
