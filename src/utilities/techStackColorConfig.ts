export function getProgrammingLanguageColor(language: string): string | undefined {
    const languageColorMap: Map<string, string> = new Map<string, string>([
      ['Python', 'bg-gradient-to-r from-blue-300 via-yellow-300 to-blue-300'], // Maintained consistency
      ['Docker', 'bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300'],    // Cyan and Blue at lower tones
      ['JavaScript', 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300'], // Yellow
      ['Java', 'bg-gradient-to-r from-red-300 via-gray-300 to-red-300'],       // Reduced to use lighter shades
      ['C#', 'bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300'], // Purple lighter tone
      ['C++', 'bg-gradient-to-r from-blue-300 via-gray-400 to-blue-300'],      // Blue and Gray
      ['Ruby', 'bg-gradient-to-r from-red-300 via-red-400 to-red-300'],        // Predominantly Red
      ['TypeScript', 'bg-gradient-to-r from-blue-300 via-indigo-400 to-blue-300'], // Blue and Indigo
      ['Go', 'bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300'],       // Cyan and Blue
      ['Rust', 'bg-gradient-to-r from-orange-300 via-brown-400 to-orange-300'], // Orange and Brown
      ['PHP', 'bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300'], // Indigo and Purple
      ['Swift', 'bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300'], // Orange
      ['Kotlin', 'bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300'], // Purple and Pink
      ['Objective-C', 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300'], // Gray
      ['R', 'bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300'],        // Blue
      ['Scala', 'bg-gradient-to-r from-red-300 via-red-400 to-red-300'],       // Red
      ['Shell', 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300'],    // Gray
      ['Perl', 'bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300'],     // Pink
      ['Lua', 'bg-gradient-to-r from-blue-300 via-purple-400 to-blue-300'],    // Blue and Purple
      ['Haskell', 'bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-300'] // Indigo
    ]);
  
    return languageColorMap.get(language);
  }