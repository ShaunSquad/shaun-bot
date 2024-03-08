export type spellDc = {
  desc: string,
  success: string,
  type: {
    full_name: string,
  },
}

export type SpellData = {
    spells: Spell[],
  }
  
export type Spell = {
    name: string,
    level: number,
    attack_type?: string,
    components?: string,
    concentration?: boolean,
    dc?: spellDc,
    desc?: string[],
    higher_level: string[],
    range?: string,
    duration?: string,
}

