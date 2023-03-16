export default function rollD100(message: any, rolls: number) {
  const results: string[] = [];
  for (let i = 0; i < rolls; i++) {
    const rollResult = Math.floor(Math.random() * 100) + 1;
    if (rollResult === 100) {
      results.push("NAT 100!");
    } else {
      results.push(rollResult.toString());
    }
  }
  message.reply(
    `You rolled ${rolls} d100s:` + "\n" + `${results.join(", " + "\n")}`
  );
}
