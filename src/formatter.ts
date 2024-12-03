
// Function to format the file
function formatGrammarFile(content: string): string {
    // Split the file into lines
    const lines: string[] = content.split('\n');
    let formattedLines: string[] = [];
    let state: number = 0; // 是否发现规则头
    let length: number = 0;

    // Iterate through each line
    for (let i = 0; i < lines.length; i++) {
        let line: string = lines[i];

        // Rule 1: Check for lines containing a word with a '?' followed by ':', calculate length length
        const regex: RegExp = /\??([a-zA-Z_][a-zA-Z0-9_]*)\s*:/;
        const match: RegExpMatchArray | null = line.match(regex);

        if (match) {
            length = match[0].length - 1; // length of the matched word with '?'
            state = 1;
        } else if (state === 1 && /^\s*\|/.test(line)) {
            // Rule 2: If next line starts with "|", trim it and prepend spaces
            line = ' '.repeat(length) + line.trimStart();  // Add spaces of length length to the current line
        }

        formattedLines.push(line);
    }

    return formattedLines.join('\n');
}

// Optionally, export the function if needed in other modules
export { formatGrammarFile };
