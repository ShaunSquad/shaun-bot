export type Class = {
    name: string,
    class_levels: ClassLevel[],
  }

  export type Features = {
    desc?: string[],
    name?: string
  }

  export type ClassLevel = {
    level: number,
    prof_bonus: number,
    features?: Features[],
  }
  