export default function rollD20(message: any, rolls: number) {
  const results: string[] = [];
  for (let i = 0; i < rolls; i++) {
    const rollResult = Math.floor(Math.random() * 20) + 1;
    if (rollResult === 1) {
      results.push("NAT 1!");
    } else if (rollResult === 20) {
      results.push("NAT 20!");
    } else {
      results.push(rollResult.toString());
    }
  }
  message.reply(
    `You rolled ${rolls} d20s:` + "\n" + `${results.join(", " + "\n")}`
  );
}
