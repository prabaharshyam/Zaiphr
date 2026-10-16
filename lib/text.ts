/** House style: no em dashes anywhere on the site, including AI-written text. */
export const noEmDash = (s: string) => s.replace(/\s+\u2014\s+/g, ", ").replace(/\u2014/g, "-");
