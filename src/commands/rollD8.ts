export default function rollD8(message: any, rolls: number) {
  const results: string[] = [];
  for (let i = 0; i < rolls; i++) {
    const rollResult = Math.floor(Math.random() * 8) + 1;
    results.push(rollResult.toString());
  }
  message.reply(
    `You rolled ${rolls} d8s:` + "\n" + `${results.join(", " + "\n")}`
  );
}
