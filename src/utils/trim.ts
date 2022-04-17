function trim(string: string, chars?: string): string {
  if (string && !chars) {
    return string.trim();
  }

  const regexp = new RegExp(`[${chars}]`, "gi");

  return string.replace(regexp, "");
}

export default trim;
