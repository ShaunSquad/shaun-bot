export default function rollD12(message: any, rolls: number) {
  const results: string[] = [];
  for (let i = 0; i < rolls; i++) {
    const rollResult = Math.floor(Math.random() * 12) + 1;
    results.push(rollResult.toString());
  }
  message.reply(
    `You rolled ${rolls} d12s:` + "\n" + `${results.join(", " + "\n")}`
  );
}
