export default function rollD4(message: any, rolls: number) {
  const results: string[] = [];
  for (let i = 0; i < rolls; i++) {
    const rollResult = Math.floor(Math.random() * 4) + 1;
    results.push(rollResult.toString());
  }
  message.reply(
    `You rolled ${rolls} d4s:` + "\n" + `${results.join(", " + "\n")}`
  );
}
