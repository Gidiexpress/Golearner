/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FunctionTraceStep {
  description: string;
  vars: Record<string, any>;
}

export interface FunctionDefinition {
  id: string;
  name: string;
  level: number;
  goCode: string[];
  explanations: string[];
  defaultArgs: any[];
  simulator: (args: any[]) => { output: string; trace: FunctionTraceStep[] };
  quizHints: string[];
  intro?: string;
}

export const FUNCTIONS: FunctionDefinition[] = [
  {
    id: "onlyz",
    name: "onlyz",
    intro: "The simplest robot command! It just gives you the letter 'z'. Sometimes the simplest things are the most important! 💤",
    level: 1,
    goCode: [
      "func OnlyZ() string {",
      "    return \"z\"",
      "}"
    ],
    explanations: [
      "Declares a function named OnlyZ. It takes no parameters and returns a string (text).",
      "Use 'return' to send back the character \"z\" as our final result.",
      "The final '}' ends the entire function."
    ],
    defaultArgs: [],
    quizHints: ["return \"z\""],
    simulator: (args: any[]) => {
      return { output: "z", trace: [{ description: "Returning 'z' as requested.", vars: { res: "z" } }] };
    }
  },
  {
    id: "only1",
    name: "only1",
    intro: "Just like OnlyZ, but with the number '1'! Simple and sweet. 🍬",
    level: 1,
    goCode: [
      "func Only1() string {",
      "    return \"1\"",
      "}"
    ],
    explanations: [
      "Declares a function named Only1. It takes no parameters and returns a string (text).",
      "Use 'return' to send back the character \"1\" as our final result.",
      "The final '}' ends the entire function."
    ],
    defaultArgs: [],
    quizHints: ["return \"1\""],
    simulator: (args: any[]) => {
      return { output: "1", trace: [{ description: "Returning '1'.", vars: { res: "1" } }] };
    }
  },
  {
    id: "onlya",
    name: "onlya",
    intro: "The first letter of the alphabet! This robot only knows how to say 'a'. 🅰️",
    level: 1,
    goCode: [
      "func OnlyA() string {",
      "    return \"a\"",
      "}"
    ],
    explanations: [
      "Declares a function named OnlyA. It takes no parameters and returns a string (text).",
      "Use 'return' to send back the character \"a\" as our final result.",
      "The final '}' ends the entire function."
    ],
    defaultArgs: [],
    quizHints: ["return \"a\""],
    simulator: (args: any[]) => {
      return { output: "a", trace: [{ description: "Returning 'a'.", vars: { res: "a" } }] };
    }
  },
  {
    id: "onlyb",
    name: "onlyb",
    intro: "Buzzing with the letter 'b'! 🐝",
    level: 1,
    goCode: [
      "func OnlyB() string {",
      "    return \"b\"",
      "}"
    ],
    explanations: [
      "Declares a function named OnlyB. It takes no parameters and returns a string (text).",
      "Use 'return' to send back the character \"b\" as our final result.",
      "The final '}' ends the entire function."
    ],
    defaultArgs: [],
    quizHints: ["return \"b\""],
    simulator: (args: any[]) => {
      return { output: "b", trace: [{ description: "Returning 'b'.", vars: { res: "b" } }] };
    }
  },
  {
    id: "onlyf",
    name: "onlyf",
    intro: "Fantastic 'f'! 🍀",
    level: 1,
    goCode: [
      "func OnlyF() string {",
      "    return \"f\"",
      "}"
    ],
    explanations: [
      "Declares a function named OnlyF. It takes no parameters and returns a string (text).",
      "Use 'return' to send back the character \"f\" as our final result.",
      "The final '}' ends the entire function."
    ],
    defaultArgs: [],
    quizHints: ["return \"f\""],
    simulator: (args: any[]) => {
      return { output: "f", trace: [{ description: "Returning 'f'.", vars: { res: "f" } }] };
    }
  },
  {
    id: "hello",
    name: "hello",
    intro: "Say hello to the world! This handles the classic 'Hello World!' output. 👋",
    level: 1,
    goCode: [
      "func Hello() {",
      "    fmt.Println(\"Hello World!\")",
      "}"
    ],
    explanations: [
      "Declares a function named Hello which takes no parameters and returns nothing.",
      "Use 'fmt.Println' to display the text \"Hello World!\" followed by a new line.",
      "The final '}' ends our function."
    ],
    defaultArgs: [],
    quizHints: ["fmt.Println"],
    simulator: (args: any[]) => {
      return { output: "Hello World!\n", trace: [{ description: "Printing hello message.", vars: {} }] };
    }
  },
  {
    id: "checknumber",
    name: "checknumber",
    intro: "Find out if a number is positive, negative, or zero. We want to know the 'sign' of the number!",
    level: 2,
    goCode: [
      "func CheckNumber(n int) string {",
      "    if n > 0 {",
      "        return \"Positive\"",
      "    } else if n < 0 {",
      "        return \"Negative\"",
      "    } else {",
      "        return \"Zero\"",
      "    }",
      "}"
    ],
    explanations: [
      "Declares a function named CheckNumber. Takes one 'int' parameter 'n' and returns a 'string'.",
      "Checks if 'n' is greater than 0. The '>' symbol means 'is it bigger?'.",
      "If it's bigger than 0, return the word \"Positive\".",
      "If the first check failed, we use 'else if' to check if 'n' is less than 0 ('<').",
      "If it's smaller than 0, return the word \"Negative\".",
      "The 'else' handles any other case (which must be when 'n' is exactly 0).",
      "Return the word \"Zero\" for the final case.",
      "End of the decision blocks.",
      "The final '}' ends the function."
    ],
    defaultArgs: [5],
    quizHints: ["n > 0", "n < 0"],
    simulator: (args: any[]) => {
      const n = Number(args[0]);
      const trace: FunctionTraceStep[] = [];
      trace.push({ description: `Judging number ${n}`, vars: { n } });
      if (n > 0) return { output: "Positive", trace: [{ description: `${n} is bigger than 0!`, vars: { n } }] };
      if (n < 0) return { output: "Negative", trace: [{ description: `${n} is smaller than 0!`, vars: { n } }] };
      return { output: "Zero", trace: [{ description: `${n} is exactly 0!`, vars: { n } }] };
    }
  },
  {
    id: "countalpha",
    name: "countalpha",
    intro: "Count the letters! This function ignores numbers and symbols and only counts the characters of the alphabet. 🔠",
    level: 2,
    goCode: [
      "func CountAlpha(s string) int {",
      "    count := 0",
      "    for _, r := range s {",
      "        if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') {",
      "            count++",
      "        }",
      "    }",
      "    return count",
      "}"
    ],
    explanations: [
      "Declares a function named CountAlpha. Takes one parameter: s which is a string. Returns an integer (the count).",
      "Creates a variable count and initializes it to 0. This will store the number of alphabetic characters we find.",
      "Loops through each character in the string s. range s gives us each character one by one. _ ignores the index (we don't need it). char holds the current character (as a rune/Unicode point).",
      "Checks if the character is alphabetic: char >= 'a' && char <= 'z' → lowercase (a-z), char >= 'A' && char <= 'Z' → uppercase (A-Z). || means 'OR'.",
      "If the character is alphabetic, add 1 to our count.",
      "End of the decision block.",
      "End of the loop.",
      "After checking all characters, return the total count.",
      "End of the function."
    ],
    defaultArgs: ["Hello 123!"],
    quizHints: ["r >= 'a' && r <= 'z'", "count++"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      let count = 0;
      const trace: FunctionTraceStep[] = [];
      for (const char of s) {
        if (/[a-zA-Z]/.test(char)) {
          count++;
          trace.push({ description: `Found letter '${char}'. Total: ${count}`, vars: { char, count } });
        }
      }
      return { output: String(count), trace };
    }
  },
  {
    id: "countcharacter",
    name: "countcharacter",
    intro: "Find the needle in the haystack! Count how many times a specific letter appears in a piece of text. 📍",
    level: 2,
    goCode: [
      "func CountChar(s string, c rune) int {",
      "    count := 0",
      "    for _, r := range s {",
      "        if r == c {",
      "            count++",
      "        }",
      "    }",
      "    return count",
      "}"
    ],
    explanations: [
      "Declares a function named CountChar. Takes a 'string' 's' and a 'rune' 'c' (the target character). Returns an 'int'.",
      "Creates a variable 'count' and sets it to 0 using ':=' (the short assignment operator).",
      "Loops through every character 'r' in the text 's' using 'range'.",
      "Checks if the current character 'r' is exactly the same as our target letter 'c'.",
      "If they match, add 1 to our 'count' total.",
      "End of the decision block.",
      "End of the character loop.",
      "After checking everything, return the final count.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["hello world", "l"],
    quizHints: ["r == c", "count++"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      const c = String(args[1])[0];
      let count = 0;
      const trace: FunctionTraceStep[] = [];
      for (const char of s) {
        if (char === c) {
          count++;
          trace.push({ description: `Found matching '${char}'. Total: ${count}`, vars: { char, count } });
        }
      }
      return { output: String(count), trace };
    }
  },
  {
    id: "printif",
    name: "printif",
    intro: "Only print a word if it's long enough! If it has 3 or more letters, we print it with a new line. Otherwise, we say nothing.",
    level: 2,
    goCode: [
      "func PrintIf(s string) string {",
      "    if len(s) < 3 {",
      "        return \"\"",
      "    }",
      "    return s + \"\\n\"",
      "}"
    ],
    explanations: [
      "Declares a function named PrintIf which takes a 'string' and returns a 'string'.",
      "Use 'if' to check: Is the length of the word ('len(s)') less than 3 ('<')?",
      "If it's too short, return an empty string \"\" and stop immediately.",
      "End of the length check.",
      "If the word is 3 or more letters long, return it plus a new line ('\\n').",
      "The final '}' ends the function."
    ],
    defaultArgs: ["Go"],
    quizHints: ["len(s) < 3"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      const trace: FunctionTraceStep[] = [];
      trace.push({ description: `Checking word length for '${s}'`, vars: { s, len: s.length } });
      if (s.length < 3) return { output: "", trace: [{ description: `Length ${s.length} is too short. No print.`, vars: { s } }] };
      return { output: s + "\n", trace: [{ description: `Length ${s.length} is 3 or more. Printing!`, vars: { s } }] };
    }
  },
  {
    id: "printifnot",
    name: "printifnot",
    intro: "The opposite of PrintIf! Only print the word if it's SHORT. If it has less than 3 letters, we print it. Otherwise, silence! 🤫",
    level: 2,
    goCode: [
      "func PrintIfNot(s string) string {",
      "    if len(s) >= 3 {",
      "        return \"\"",
      "    }",
      "    return s + \"\\n\"",
      "}"
    ],
    explanations: [
      "Declares a function named PrintIfNot which takes a 'string' and returns a 'string'.",
      "Use 'if' to check: Is the length of the word greater than or equal to 3 ('>=')?",
      "If it's 3 or more letters long, return an empty string \"\" to print nothing.",
      "End of the length check.",
      "If the word is short (less than 3 letters), return it with a new line ('\\n').",
      "The final '}' ends the function."
    ],
    defaultArgs: ["No"],
    quizHints: ["len(s) >= 3"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      if (s.length >= 3) return { output: "", trace: [] };
      return { output: s + "\n", trace: [{ description: `Word '${s}' is short enough. Printing.`, vars: { s, len: s.length } }] };
    }
  },
  {
    id: "rectperimeter",
    name: "rectperimeter",
    intro: "Walk around the rectangle! Calculate the total distance around the edge using length and width. 📐",
    level: 2,
    goCode: [
      "func RectPerimeter(w, h int) int {",
      "    if w < 0 || h < 0 { return -1 }",
      "    return 2 * (w + h)",
      "}"
    ],
    explanations: [
      "Declares a function named RectPerimeter. Takes width 'w' and height 'h' as integers.",
      "Use 'if' to check if 'w' is less than 0 OR 'h' is less than 0. Negative numbers are not allowed for shapes!",
      "Return the perimeter: 2 times the sum of width and height. '2 * (w + h)'",
      "The final '}' ends the function."
    ],
    defaultArgs: [5, 10],
    quizHints: ["2 * (w + h)"],
    simulator: (args: any[]) => {
      const w = Number(args[0]);
      const h = Number(args[1]);
      if (w < 0 || h < 0) return { output: "-1", trace: [] };
      const res = 2 * (w + h);
      return { output: String(res), trace: [{ description: `Calculated perimeter for ${w}x${h}.`, vars: { w, h, res } }] };
    }
  },
  {
    id: "retainfirsthalf",
    name: "retainfirsthalf",
    intro: "Half and half! Chop off the second half of a word and only keep the first part. It's like a word haircut! ✂️",
    level: 2,
    goCode: [
      "func RetainFirstHalf(s string) string {",
      "    if len(s) <= 1 { return s }",
      "    return s[:len(s)/2]",
      "}"
    ],
    explanations: [
      "Declares a function named RetainFirstHalf which takes a 'string' and returns a 'string'.",
      "Checks if the word is very short (1 or 0 letters). If so, just return it as is.",
      "Return the first half of the word using a 'slice' '[:len(s)/2]'. Dividing by 2 finds the middle!",
      "The final '}' ends the function."
    ],
    defaultArgs: ["Hello World"],
    quizHints: ["s[:len(s)/2]"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      if (s.length <= 1) return { output: s, trace: [] };
      const half = s.substring(0, Math.floor(s.length / 2));
      return { output: half, trace: [{ description: `Kept first half of '${s}'.`, vars: { s, half, end: Math.floor(s.length / 2) } }] };
    }
  },
  {
    id: "cameltosnakecase",
    name: "cameltosnakecase",
    intro: "Convert 'CamelCase' names like 'MyVariable' into 'snake_case' like 'my_variable'. It's like adding underscores between words!",
    level: 3,
    goCode: [
      "func CamelToSnakeCase(s string) string {",
      "    var res string",
      "    for i, r := range s {",
      "        if r >= 'A' && r <= 'Z' {",
      "            if i > 0 && (s[i-1] < 'A' || s[i-1] > 'Z') {",
      "                res += \"_\"",
      "            }",
      "        }",
      "        res += string(r)",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Declares the CamelToSnakeCase function. It converts 'CamelCase' to 'snake_case'.",
      "Creates an empty string 'res' to build our new word.",
      "Loops through each character 'r' in the text 's'. 'i' is the character's position.",
      "Checks if the character 'r' is a capital letter ('A' to 'Z').",
      "If it's capital AND not the very first letter, check if the letter before it was NOT capital.",
      "If it's a new word starting with a capital, add an underscore '_' to 'res'.",
      "End of the inner checks.",
      "End of the capital letter check.",
      "Add the current character to our 'res' result.",
      "End of the loop.",
      "Return the final completed snake_case string.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["CamelCaseString"],
    quizHints: ["i > 0 && (s[i-1] < 'A' || s[i-1] > 'Z')", "res += \"_\""],
    simulator: (args: any[]) => {
      const s = String(args[0] || "");
      let res = "";
      const trace: FunctionTraceStep[] = [];
      for (let i = 0; i < s.length; i++) {
        const r = s[i];
        const isUpper = r >= 'A' && r <= 'Z';
        if (isUpper) {
          if (i > 0) {
            const prev = s[i-1];
            if (!(prev >= 'A' && prev <= 'Z')) {
              res += "_";
              trace.push({ description: `Found capital letter '${r}' at index ${i}. Adding underscore.`, vars: { i, r, res } });
            }
          }
        }
        res += r;
        trace.push({ description: `Adding character '${r}' to result.`, vars: { i, r, res } });
      }
      return { output: res, trace };
    }
  },
  {
    id: "lastword",
    name: "lastword",
    intro: "Find the very last word in a sentence. We walk backward from the end and pick out the characters until we see a space!",
    level: 3,
    goCode: [
      "func LastWord(s string) string {",
      "    res := \"\"",
      "    for i := len(s) - 1; i >= 0; i-- {",
      "        if s[i] == ' ' {",
      "            if res == \"\" { continue }",
      "            break",
      "        }",
      "        res = string(s[i]) + res",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Declares a function named LastWord which takes a 'string' and returns a 'string'.",
      "Creates an empty string 'res' to store the last word.",
      "Loops backward from the end of the text to the beginning using 'i--'.",
      "Checks if the current character is a space ' '.",
      "If it's a space and we haven't found any letters yet, keep skipping them (continue).",
      "If it's a space and we already started collecting letters, we finished the word! Stop (break).",
      "End of the space checks.",
      "Add the character to the beginning of our 'res' string.",
      "End of the loop.",
      "Return the word we found.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["Hello World  "],
    quizHints: ["len(s) - 1", "res = string(s[i]) + res"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      let res = "";
      const trace: FunctionTraceStep[] = [];
      for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ' ') {
          if (res === "") continue;
          break;
        }
        res = s[i] + res;
        trace.push({ description: `Backwards pass: found '${s[i]}', adding to result.`, vars: { i, res } });
      }
      return { output: res, trace };
    }
  },
  {
    id: "digitlen",
    name: "digitlen",
    intro: "How many digits are in a number? We count them by repeatedly dividing by 10 until nothing is left. For example, 123 has 3 digits!",
    level: 3,
    goCode: [
      "func DigitLen(n int) int {",
      "    if n < 0 { n = -n }",
      "    count := 0",
      "    for n > 0 {",
      "        n = n / 10",
      "        count++",
      "    }",
      "    return count",
      "}"
    ],
    explanations: [
      "Declares a function named DigitLen which takes an integer 'n' and returns an integer.",
      "If the number is negative, turn it positive so we can count the digits properly.",
      "Creates a variable 'count' and initializes it to 0 using ':='.",
      "Loops as long as the number 'n' is greater than 0.",
      "Chops off the last digit of 'n' by dividing it by 10 ('n = n / 10').",
      "Adds 1 to our 'count' for each digit we chop off.",
      "End of the loop.",
      "Return the total number of digits we counted.",
      "The final '}' ends the function."
    ],
    defaultArgs: [12345],
    quizHints: ["n / 10", "count++"],
    simulator: (args: any[]) => {
      let n = Number(args[0]);
      const trace: FunctionTraceStep[] = [];
      if (isNaN(n)) return { output: "Error", trace };
      
      trace.push({ description: `Starting with number ${n}`, vars: { n } });
      if (n < 0) {
        n = -n;
        trace.push({ description: "Making negative number positive.", vars: { n } });
      }
      let count = 0;
      while (n > 0) {
        n = Math.floor(n / 10);
        count++;
        trace.push({ description: `Divided by 10. Number is now ${n}. Count is ${count}.`, vars: { n, count } });
      }
      return { output: String(count), trace };
    }
  },
  {
    id: "firstword",
    name: "firstword",
    intro: "Find the very first word in a sentence. We skip any leading spaces and stop as soon as we hit the next space!",
    level: 3,
    goCode: [
      "func FirstWord(s string) string {",
      "    res := \"\"",
      "    for _, r := range s {",
      "        if r == ' ' {",
      "            if res == \"\" { continue }",
      "            break",
      "        }",
      "        res += string(r)",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Declares a function named FirstWord which takes a 'string' and returns a 'string'.",
      "Creates an empty string 'res' to store the first word.",
      "Loops through each character 'r' in the text 's' using 'range'.",
      "Checks if the character is a space ' '.",
      "If it's a space and we haven't found any letters yet, keep skipping (continue).",
      "If it's a space and we already have some letters, we finished the first word! Stop (break).",
      "End of the space checks.",
      "Add the character 'r' to our 'res' string using '+='.",
      "End of the loop.",
      "Return the first word we found.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["  Hello World"],
    quizHints: ["res == \"\"", "break"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      let res = "";
      const trace: FunctionTraceStep[] = [];
      trace.push({ description: "Starting search.", vars: { s, res } });
      
      for (let i = 0; i < s.length; i++) {
        const r = s[i];
        if (r === ' ') {
          if (res === "") {
            trace.push({ description: "Skipping leading space.", vars: { i, r, res } });
            continue;
          }
          trace.push({ description: "Found space after word. Stopping.", vars: { i, r, res } });
          break;
        }
        res += r;
        trace.push({ description: `Adding character '${r}' to word.`, vars: { i, r, res } });
      }
      return { output: res, trace };
    }
  },
  {
    id: "fishandchips",
    name: "fishandchips",
    intro: "A fun sorting game! If a number is divisible by 2 we say 'fish', if by 3 we say 'chips'. If it fits both, we say 'fish and chips'!",
    level: 3,
    goCode: [
      "func FishAndChips(n int) string {",
      "    if n < 0 { return \"error: number is negative\" }",
      "    if n%2 == 0 && n%3 == 0 { return \"fish and chips\" }",
      "    if n%2 == 0 { return \"fish\" }",
      "    if n%3 == 0 { return \"chips\" }",
      "    return \"error: non divisible\"",
      "}"
    ],
    explanations: [
      "Declares the FishAndChips function. It takes an integer and returns a string.",
      "Checks if the number 'n' is less than 0. Negative numbers aren't allowed in our game!",
      "If negative, return an error message immediately.",
      "Checks if 'n' is divisible by both 2 AND 3 using '%' (the modulo operator).",
      "If it fits both (remainder is 0), return the result 'fish and chips'.",
      "Checks if divisible by 2 using 'n%2 == 0'. If true, return 'fish'.",
      "Checks if divisible by 3 using 'n%3 == 0'. If true, return 'chips'.",
      "If none of those worked, return an error saying it's not divisible.",
      "The final '}' ends the function."
    ],
    defaultArgs: [6],
    quizHints: ["n%2 == 0", "n%3 == 0"],
    simulator: (args: any[]) => {
      const n = Number(args[0]);
      const trace: FunctionTraceStep[] = [];
      trace.push({ description: `Checking number ${n}`, vars: { n } });
      if (n < 0) return { output: "error: number is negative", trace };
      if (n % 2 === 0 && n % 3 === 0) return { output: "fish and chips", trace: [{ description: "Divisible by both 2 and 3!", vars: { n } }] };
      if (n % 2 === 0) return { output: "fish", trace: [{ description: "Divisible by 2.", vars: { n } }] };
      if (n % 3 === 0) return { output: "chips", trace: [{ description: "Divisible by 3.", vars: { n } }] };
      return { output: "error: non divisible", trace: [{ description: "Not divisible by 2 or 3.", vars: { n } }] };
    }
  },
  {
    id: "gcd",
    name: "gcd",
    intro: "Find the Greatest Common Divisor. This is the largest number that fits perfectly into both 'a' and 'b'!",
    level: 3,
    goCode: [
      "func Gcd(a, b int) int {",
      "    for b != 0 {",
      "        a, b = b, a % b",
      "    }",
      "    return a",
      "}"
    ],
    explanations: [
      "Declares the Gcd function. It takes two integers 'a' and 'b' and returns an integer.",
      "Loops as long as 'b' is not equal to 0. We use '!=' to say 'not equal'.",
      "The Go swap trick! It moves 'b' to 'a', and sets 'b' to the remainder of 'a % b'.",
      "End of the loop.",
      "Return the result stored in 'a'.",
      "The final '}' ends the function."
    ],
    defaultArgs: [42, 12],
    quizHints: ["a % b", "b != 0"],
    simulator: (args: any[]) => {
      let a = Number(args[0]);
      let b = Number(args[1]);
      const trace: FunctionTraceStep[] = [];
      trace.push({ description: `Starting with a=${a}, b=${b}`, vars: { a, b } });
      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
        trace.push({ description: `Modulo step: a is now ${a}, b is now ${b}`, vars: { a, b } });
      }
      return { output: String(a), trace };
    }
  },
  {
    id: "hashcode",
    name: "hashcode",
    intro: "Create a secret code from a word! We shift each letter code by adding the size of the word to it.",
    level: 3,
    goCode: [
      "func HashCode(dec string) string {",
      "    size := len(dec)",
      "    res := \"\"",
      "    for _, r := range dec {",
      "        val := (int(r) + size) % 127",
      "        if val < 32 { val += 31 }",
      "        res += string(val)",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Declares the HashCode function. It takes a 'string' and returns a 'string'.",
      "Measures the length of the word and saves it in 'size' using ':='.",
      "Creates an empty string 'res' to hold our scrambled result.",
      "Loops through each character 'r' in the word using 'range'.",
      "Math magic! Convert letter to number, add 'size', and use '% 127' to keep it in range.",
      "If the result is a 'secret' control character (less than 32), we add 31 to make it readable.",
      "Convert the number back to a letter using 'string(val)' and add it to our 'res'.",
      "End of the loop.",
      "Return the scrambled 'res' string.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["hello"],
    quizHints: ["(int(r) + size) % 127", "val < 32"],
    simulator: (args: any[]) => {
      const dec = String(args[0]);
      const size = dec.length;
      let res = "";
      const trace: FunctionTraceStep[] = [];
      for (let i = 0; i < dec.length; i++) {
        let val = (dec.charCodeAt(i) + size) % 127;
        if (val < 32) val += 31;
        res += String.fromCharCode(val);
        trace.push({ description: `Char '${dec[i]}' transformed using size ${size} to '${String.fromCharCode(val)}'`, vars: { i, val, res } });
      }
      return { output: res, trace };
    }
  },
  {
    id: "repeatalpha",
    name: "repeatalpha",
    intro: "Repeat letters like a stuttering robot! 'a' repeats once, 'b' repeats twice, and so on. It depends on where they are in the alphabet!",
    level: 3,
    goCode: [
      "func RepeatAlpha(s string) string {",
      "    res := \"\"",
      "    for _, r := range s {",
      "        count := 0",
      "        if r >= 'a' && r <= 'z' { count = int(r - 'a' + 1) }",
      "        else if r >= 'A' && r <= 'Z' { count = int(r - 'A' + 1) }",
      "        else { res += string(r); continue }",
      "        for i := 0; i < count; i++ { res += string(r) }",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Declares the RepeatAlpha function which takes a 'string' and returns a 'string'.",
      "Creates an empty string 'res' to hold our stuttering result.",
      "Loops through each character 'r' in the text 's'.",
      "Initializes 'count' to 0. This will track how many times to repeat.",
      "If it's lowercase, calculate its spot in the alphabet (a=1, b=2, etc.).",
      "If it's uppercase, do the same calculation but use 'A'.",
      "If it's not a letter, just add it to 'res' once and skip the rest (continue).",
      "Start a second loop inside to add the character 'r' to 'res' many times using 'count'.",
      "End of the inner loop.",
      "Return the final repeated string.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["abc"],
    quizHints: ["int(r - 'a' + 1)", "res += string(r)"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      let res = "";
      const trace: FunctionTraceStep[] = [];
      for (let i = 0; i < s.length; i++) {
        const r = s[i];
        let count = 0;
        if (r >= 'a' && r <= 'z') count = r.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        else if (r >= 'A' && r <= 'Z') count = r.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
        else {
          res += r;
          trace.push({ description: `'${r}' is not a letter, skipping repetition.`, vars: { res } });
          continue;
        }
        for (let j = 0; j < count; j++) res += r;
        trace.push({ description: `Letter '${r}' repeats ${count} times.`, vars: { res, count } });
      }
      return { output: res, trace };
    }
  },
  {
    id: "findprevprime",
    name: "findprevprime",
    intro: "Find the prime number that comes just before our target! Primes are lonely numbers that can only be divided by 1 and themselves.",
    level: 4,
    goCode: [
      "func FindPrevPrime(n int) int {",
      "    for i := n; i >= 2; i-- {",
      "        if IsPrime(i) { return i }",
      "    }",
      "    return 0",
      "}"
    ],
    explanations: [
      "Declares the FindPrevPrime function. It takes an integer and returns an integer.",
      "Loops backward from the starting number 'n' down to 2 using 'i--'.",
      "Checks if the current number 'i' is prime. If yes, return it immediately!",
      "End of the loop.",
      "If we finished the loop without finding anything, return 0.",
      "The final '}' ends the function."
    ],
    defaultArgs: [15],
    quizHints: ["IsPrime(i)", "i >= 2"],
    simulator: (args: any[]) => {
      const n = Number(args[0]);
      const isPrime = (num: number) => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      };
      const trace: FunctionTraceStep[] = [];
      for (let i = n; i >= 2; i--) {
        const prime = isPrime(i);
        trace.push({ description: `Checking if ${i} is prime... Result: ${prime}`, vars: { i, prime } });
        if (prime) return { output: String(i), trace };
      }
      return { output: "0", trace };
    }
  },
  {
    id: "fromto",
    name: "fromto",
    intro: "Count from one number to another! We write down all the numbers in between, either counting up or counting down, always using two digits like '01' or '05'.",
    level: 4,
    goCode: [
      "func FromTo(from, to int) string {",
      "    if from > 99 || from < 0 || to > 99 || to < 0 { return \"Invalid Input\\n\" }",
      "    res := \"\"",
      "    if from <= to {",
      "        for i := from; i <= to; i++ {",
      "            res += fmt.Sprintf(\"%02d\", i) + \", \"",
      "        }",
      "    } else {",
      "        for i := from; i >= to; i-- {",
      "            res += fmt.Sprintf(\"%02d\", i) + \", \"",
      "        }",
      "    }",
      "    return res[:len(res)-2] + \"\\n\"",
      "}"
    ],
    explanations: [
      "Declares the FromTo function which takes two integers 'from' and 'to'. Returns a string.",
      "Checks if any inputs are outside the 0-99 range. We only handle small numbers!",
      "Creates an empty string 'res' to store our counting result.",
      "If the first number is smaller than or equal to the second, we count up.",
      "Loop from 'from' to 'to', adding each number to 'res' using '%02d' (two-digit format).",
      "End of the counting up loop.",
      "If 'from' was bigger, use 'else' to handle counting down.",
      "Loop from 'from' back to 'to', adding numbers to 'res'.",
      "End of the counting down loop.",
      "End of the up/down choice.",
      "Return the final string after cutting off the last extra comma.",
      "The final '}' ends the function."
    ],
    defaultArgs: [1, 5],
    quizHints: ["%02d", "from <= to"],
    simulator: (args: any[]) => {
      const from = Number(args[0]);
      const to = Number(args[1]);
      const trace: FunctionTraceStep[] = [];
      if (from > 99 || from < 0 || to > 99 || to < 0) return { output: "Invalid Input\n", trace };
      let res = "";
      const pad = (n: number) => n.toString().padStart(2, '0');
      if (from <= to) {
        for (let i = from; i <= to; i++) {
          res += pad(i) + ", ";
          trace.push({ description: `Counting up: ${pad(i)}`, vars: { i, res } });
        }
      } else {
        for (let i = from; i >= to; i--) {
          res += pad(i) + ", ";
          trace.push({ description: `Counting down: ${pad(i)}`, vars: { i, res } });
        }
      }
      return { output: res.slice(0, -2) + "\n", trace };
    }
  },
  {
    id: "iscapitalized",
    name: "iscapitalized",
    intro: "Check if all words in a sentence start with a big capital letter! If we find even one word that starts small, the answer is false.",
    level: 4,
    goCode: [
      "func IsCapitalized(s string) bool {",
      "    if len(s) == 0 { return false }",
      "    for _, word := range strings.Fields(s) {",
      "        if word[0] < 'A' || word[0] > 'Z' { return false }",
      "    }",
      "    return true",
      "}"
    ],
    explanations: [
      "Declares the IsCapitalized function. It returns 'true' if words start with a capital letter.",
      "If the text is empty, return 'false' because there are no words to check.",
      "Splits the text into words using 'strings.Fields' and loops through each word.",
      "Checks if the very first letter of the word is small (not between 'A' and 'Z').",
      "End of the check. If it was small, return 'false'.",
      "End of the word loop.",
      "If we checked every word and they all passed, return 'true'.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["Hello World"],
    quizHints: ["strings.Fields(s)", "word[0]"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      const trace: FunctionTraceStep[] = [];
      if (s.length === 0) return { output: "false", trace };
      const words = s.split(/\s+/).filter(w => w.length > 0);
      for (const word of words) {
        const first = word[0];
        const ok = first >= 'A' && first <= 'Z';
        trace.push({ description: `Checking word '${word}'. Starts with '${first}'. Is capital? ${ok}`, vars: { word, ok } });
        if (!ok) return { output: "false", trace };
      }
      return { output: "true", trace };
    }
  },
  {
    id: "itoa",
    name: "itoa",
    intro: "Convert a number into words! This is the reverse of what we usually do. We take each digit and turn it into its text version.",
    level: 4,
    goCode: [
      "func Itoa(n int) string {",
      "    if n == 0 { return \"0\" }",
      "    res := \"\"",
      "    isNeg := n < 0",
      "    if isNeg { n = -n }",
      "    for n > 0 {",
      "        res = string(n%10 + '0') + res",
      "        n /= 10",
      "    }",
      "    if isNeg { res = \"-\" + res }",
      "    return res",
      "}"
    ],
    explanations: [
      "Declares the Itoa function. It converts a number into text.",
      "If the number is 0, return the string \"0\" immediately.",
      "Creates an empty string 'res' to build our number word.",
      "Uses a true/false variable 'isNeg' to remember if the number is negative.",
      "If negative, flip it to positive so we can process the digits one by one.",
      "Loops as long as the number 'n' has digits left.",
      "Chops off the last digit, turns it into a character, and puts it at the front of 'res'.",
      "Divide 'n' by 10 ('n /= 10') to move to the next digit.",
      "End of the loop.",
      "If the number was negative, add the minus sign '-' to the very front.",
      "Return the final number word.",
      "The final '}' ends the function."
    ],
    defaultArgs: [123],
    quizHints: ["n%10 + '0'", "n /= 10"],
    simulator: (args: any[]) => {
      let n = Number(args[0]);
      const trace: FunctionTraceStep[] = [];
      if (n === 0) return { output: "0", trace };
      let res = "";
      const isNeg = n < 0;
      if (isNeg) n = -n;
      while (n > 0) {
        const digit = n % 10;
        res = digit.toString() + res;
        n = Math.floor(n / 10);
        trace.push({ description: `Extracted digit ${digit}. Word is currently '${res}'`, vars: { n, digit, res } });
      }
      if (isNeg) res = "-" + res;
      return { output: res, trace };
    }
  },
  {
    id: "printmemory",
    name: "printmemory",
    intro: "Peek inside the robot's brain! This function shows the secret codes (hexadecimal) for each piece of memory.",
    level: 4,
    goCode: [
      "func PrintMemory(arr [10]byte) {",
      "    for i := 0; i < 10; i++ {",
      "        fmt.Printf(\"%02x \", arr[i])",
      "        if (i+1)%4 == 0 {",
      "            fmt.Println()",
      "        }",
      "    }",
      "}"
    ],
    explanations: [
      "Declares the PrintMemory function which takes an array of 10 small numbers (bytes).",
      "Loops from the first box to the last box in the array.",
      "Display each number as a two-digit hexadecimal code ('%02x'). Hex is a special robot language!",
      "If we have printed 4 numbers in a row, start a new line.",
      "End of the line check.",
      "End of the box loop.",
      "The final '}' ends our function."
    ],
    defaultArgs: [[72, 101, 108, 108, 111, 44, 32, 71, 111, 33]],
    quizHints: ["%02x", "(i+1)%4 == 0"],
    simulator: (args: any[]) => {
      const arr = Array.isArray(args[0]) ? args[0] : [72, 101, 108, 108, 111, 44, 32, 71, 111, 33];
      let output = "";
      const trace: FunctionTraceStep[] = [];
      for (let i = 0; i < 10; i++) {
        const hex = (arr[i] || 0).toString(16).padStart(2, '0');
        output += hex + " ";
        if ((i + 1) % 4 === 0) output += "\n";
        trace.push({ description: `Byte ${i}: ${arr[i]} -> hex ${hex}`, vars: { i, byte: arr[i], hex } });
      }
      return { output, trace };
    }
  },
  {
    id: "printrevcomb",
    name: "printrevcomb",
    intro: "Count backward in groups of three! It's a triple-loop challenge that finds all sets of 3 digits in reverse order.",
    level: 4,
    goCode: [
      "func PrintRevComb() {",
      "    for i := '9'; i >= '0'; i-- {",
      "        for j := i - 1; j >= '0'; j-- {",
      "            for k := j - 1; k >= '0'; k-- {",
      "                fmt.Printf(\"%c%c%c, \", i, j, k)",
      "            }",
      "        }",
      "    }",
      "}"
    ],
    explanations: [
      "Declares the PrintRevComb function. It finds combinations of 3 digits in backward order.",
      "Outer loop: Starts 'i' at the number '9' and counts down to '0'.",
      "Middle loop: Starts 'j' just below 'i' and counts down. This keeps the numbers unique!",
      "Inner loop: Starts 'k' just below 'j' and counts down.",
      "Prints the three digits 'i', 'j', and 'k' together with a comma.",
      "End of the triple loops.",
      "The final '}' ends the function."
    ],
    defaultArgs: [],
    quizHints: ["%c%c%c", "j := i - 1"],
    simulator: (args: any[]) => {
      const trace: FunctionTraceStep[] = [];
      let output = "";
      for (let i = 9; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
          for (let k = j - 1; k >= 0; k--) {
            output += `${i}${j}${k}, `;
            if (trace.length < 20) {
                trace.push({ description: `Found combo: ${i}${j}${k}`, vars: { i, j, k } });
            }
          }
        }
      }
      return { output: output.slice(0, -2), trace };
    }
  },
  {
    id: "thirdtimeisacharm",
    name: "thirdtimeisacharm",
    intro: "Pick out every 3rd letter like a lucky charm! It's like finding hidden messages in a long string of letters.",
    level: 4,
    goCode: [
      "func ThirdTimeIsACharm(s string) string {",
      "    if len(s) < 3 { return \"\" }",
      "    res := \"\"",
      "    for i := 2; i < len(s); i += 3 {",
      "        res += string(s[i])",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'ThirdTimeIsACharm' taking a 'string' and returning a 'string'.",
      "Check: if text length is less than 3, return an empty string immediately.",
      "Initialize 'res' as an empty string.",
      "Loop starting at index 2 (the 3rd letter) and jumping forward by 3 ('i += 3') each time.",
      "Append the character at 's[i]' to 'res'.",
      "The '}' ends the loop.",
      "Finally, 'return' the lucky collection of letters.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["123456789"],
    quizHints: ["i += 3", "len(s) < 3"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      let res = "";
      const trace: FunctionTraceStep[] = [];
      if (s.length < 3) return { output: "", trace };
      for (let i = 2; i < s.length; i += 3) {
        res += s[i];
        trace.push({ description: `Found 3rd letter '${s[i]}' at index ${i}`, vars: { i, char: s[i], res } });
      }
      return { output: res, trace };
    }
  },
  {
    id: "zipstring",
    name: "zipstring",
    intro: "Compress a string! If multiple same letters are next to each other, we count them. For example, 'aaabb' becomes '3a2b'.",
    level: 4,
    goCode: [
      "func ZipString(s string) string {",
      "    if s == \"\" { return \"\" }",
      "    res := \"\"",
      "    count := 1",
      "    for i := 1; i < len(s); i++ {",
      "        if s[i] == s[i-1] {",
      "            count++",
      "        } else {",
      "            res += strconv.Itoa(count) + string(s[i-1])",
      "            count = 1",
      "        }",
      "    }",
      "    res += strconv.Itoa(count) + string(s[len(s)-1])",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'ZipString' which takes a 'string' 's' and returns a 'string'.",
      "If the input is an empty string '\"\"', return it immediately.",
      "Initialize 'res' as an empty string.",
      "Initialize 'count' to 1 using ':='.",
      "Loop through 's' starting from the second character (index 1).",
      "Check if current character 's[i]' matches previous 's[i-1]' using '=='.",
      "If they are the same, increment 'count' by 1.",
      "The 'else' handles when a letter sequence ends.",
      "Add 'strconv.Itoa(count)' (count turned to text) and the repeating letter to 'res'.",
      "Reset 'count' back to 1 for the new letter sequence.",
      "Final braces '}' to close logic and loop.",
      "Add the very last count and character after the loop finishes.",
      "Finally, 'return' the compressed result string.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["aaabbeeeeff"],
    quizHints: ["s[i] == s[i-1]", "strconv.Itoa(count)"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      if (s === "") return { output: "", trace: [] };
      let res = "";
      let count = 1;
      const trace: FunctionTraceStep[] = [];
      for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i-1]) {
          count++;
        } else {
          res += count.toString() + s[i-1];
          trace.push({ description: `Found transition from '${s[i-1]}'. Count was ${count}. Added to result.`, vars: { i, res, count } });
          count = 1;
        }
      }
      res += count.toString() + s[s.length-1];
      trace.push({ description: `Added last group: ${count}${s[s.length-1]}`, vars: { res, count } });
      return { output: res, trace };
    }
  },
  {
    id: "weareunique",
    name: "weareunique",
    level: 4,
    goCode: [
      "func WeAreUnique(s1, s2 string) int {",
      "    if s1 == \"\" && s2 == \"\" { return -1 }",
      "    count := 0",
      "    m1 := make(map[rune]bool)",
      "    m2 := make(map[rune]bool)",
      "    for _, r := range s1 { m1[r] = true }",
      "    for _, r := range s2 { m2[r] = true }",
      "    for r := range m1 { if !m2[r] { count++ } }",
      "    for r := range m2 { if !m1[r] { count++ } }",
      "    return count",
      "}"
    ],
    explanations: [
      "Define 'WeAreUnique' taking two strings and returning an 'int'.",
      "Check if both are empty using '&&' (AND). If so, return -1 as an error code.",
      "Initialize 'count' to 0.",
      "Use 'make(map[rune]bool)' to create two memory maps. 'rune' is a Go character type.",
      "Loop through 's1' and 's2' to check off every unique character found.",
      "Loop through map 'm1'. If character is NOT ('!') in 'm2', it's unique! Add to 'count'.",
      "Loop through map 'm2'. If character is NOT in 'm1', add to 'count' too.",
      "Finally, 'return' the total number of unique characters.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["abc", "bcd"],
    quizHints: ["make(map[rune]bool)", "!m2[r]"],
    simulator: (args: any[]) => {
      const s1 = String(args[0]);
      const s2 = String(args[1]);
      const trace: FunctionTraceStep[] = [];
      if (s1 === "" && s2 === "") return { output: "-1", trace };
      
      const m1 = new Set(s1);
      const m2 = new Set(s2);
      let count = 0;
      
      m1.forEach(c => {
          if (!m2.has(c)) {
              count++;
              trace.push({ description: `'${c}' is in S1 but not S2. Count: ${count}`, vars: { char: c, count } });
          }
      });
      m2.forEach(c => {
          if (!m1.has(c)) {
              count++;
              trace.push({ description: `'${c}' is in S2 but not S1. Count: ${count}`, vars: { char: c, count } });
          }
      });
      
      return { output: String(count), trace };
    }
  },
  {
    id: "addprimesum",
    name: "addprimesum",
    intro: "Collect all the prime numbers up to 'n' and add them together! Primes are special numbers that only have two friends: 1 and themselves. Like finding rare gems! 💎",
    level: 5,
    goCode: [
      "func AddPrimeSum(n int) int {",
      "    if n <= 1 { return 0 }",
      "    sum := 0",
      "    for i := 2; i <= n; i++ {",
      "        if IsPrime(i) { sum += i }",
      "    }",
      "    return sum",
      "}"
    ],
    explanations: [
      "Define 'AddPrimeSum' taking an 'int' and returning an 'int'.",
      "Check: if 'n' is 1 or less, return 0 because there are no primes.",
      "Initialize 'sum' variable to 0.",
      "Loop from 2 up to 'n' using 'i++'.",
      "Check if 'i' is prime using 'IsPrime(i)'. If true, add 'i' to 'sum'.",
      "The '}' ends the loop.",
      "Finally, 'return' the total sum of all found primes.",
      "The final '}' ends the function."
    ],
    defaultArgs: [10],
    quizHints: ["IsPrime(i)", "sum += i"],
    simulator: (args: any[]) => {
      const n = Number(args[0]);
      const isPrime = (num: number) => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      };
      let sum = 0;
      const trace: FunctionTraceStep[] = [];
      for (let i = 2; i <= n; i++) {
        const prime = isPrime(i);
        if (prime) {
          sum += i;
          trace.push({ description: `${i} is prime! Adding to sum. Total: ${sum}`, vars: { i, sum } });
        } else {
          trace.push({ description: `${i} is not prime, skip.`, vars: { i, sum } });
        }
      }
      return { output: String(sum), trace };
    }
  },
  {
    id: "canjump",
    name: "canjump",
    intro: "A fun parkour game! You have steps with jump power on them. Can you make it to the very last stone without getting stuck? Jump, jump, jump! 🏃‍♂️",
    level: 5,
    goCode: [
      "func CanJump(steps []int) bool {",
      "    if len(steps) == 0 { return false }",
      "    if len(steps) == 1 { return true }",
      "    furthest := 0",
      "    for i, jump := range steps {",
      "        if i > furthest { return false }",
      "        if i + jump > furthest { furthest = i + jump }",
      "        if furthest >= len(steps) - 1 { return true }",
      "    }",
      "    return false",
      "}"
    ],
    explanations: [
      "Define 'CanJump' taking a slice of integers '[]int' and returning a 'bool'.",
      "Check: if there are no steps ('len(steps) == 0'), return false.",
      "Check: if there is only 1 step, we are already at the finish! Return true.",
      "Initialize 'furthest' reach to 0.",
      "Loop through 'steps' using 'range'. 'i' is current index, 'jump' is value.",
      "If current index 'i' is past our 'furthest' reach, we are stuck! Return false.",
      "If jumping from here reaches further ('i + jump > furthest'), update 'furthest'.",
      "Check: if our reach is already past the finish line, return true immediately.",
      "Ending braces '}' for logic and loop.",
      "If we finish the loop but never reached the end, return false.",
      "The final '}' ends the function."
    ],
    defaultArgs: [[2, 3, 1, 1, 4]],
    quizHints: ["i > furthest", "i + jump > furthest"],
    simulator: (args: any[]) => {
      const steps = Array.isArray(args[0]) ? args[0] : [2, 3, 1, 1, 4];
      const trace: FunctionTraceStep[] = [];
      if (steps.length === 0) return { output: "false", trace };
      if (steps.length === 1) return { output: "true", trace };
      let furthest = 0;
      for (let i = 0; i < steps.length; i++) {
        const jump = steps[i];
        if (i > furthest) {
          trace.push({ description: `Index ${i} is unreachable! Game over.`, vars: { i, furthest } });
          return { output: "false", trace };
        }
        if (i + jump > furthest) furthest = i + jump;
        trace.push({ description: `At index ${i}. Jump power ${jump}. Max reach now: ${furthest}`, vars: { i, jump, furthest } });
        if (furthest >= steps.length - 1) return { output: "true", trace };
      }
      return { output: "false", trace };
    }
  },
  {
    id: "chunk",
    name: "chunk",
    intro: "Chop a long list into smaller bite-sized pieces! You choose how big each chunk should be. It's like cutting a long sandwich! 🥪",
    level: 5,
    goCode: [
      "func Chunk(slice []int, size int) {",
      "    if size <= 0 { fmt.Println(); return }",
      "    for i := 0; i < len(slice); i += size {",
      "        end := i + size",
      "        if end > len(slice) { end = len(slice) }",
      "        fmt.Println(slice[i:end])",
      "    }",
      "}"
    ],
    explanations: [
      "Define 'Chunk' taking a slice of integers and a 'size' integer.",
      "Check: if 'size' is 0 or less, print a blank line and stop ('return').",
      "Loop through 'slice' incrementing by 'size' ('i += size') each step.",
      "Calculate potential 'end' of current chunk.",
      "If 'end' goes past the total length, cap it at 'len(slice)'.",
      "Print the chunk using slice syntax 'slice[i:end]'.",
      "The '}' ends the loop.",
      "The final '}' ends the function."
    ],
    defaultArgs: [[1, 2, 3, 4, 5], 2],
    quizHints: ["i += size", "slice[i:end]"],
    simulator: (args: any[]) => {
      const slice = Array.isArray(args[0]) ? args[0] : [1, 2, 3, 4, 5];
      const size = Number(args[1]);
      const trace: FunctionTraceStep[] = [];
      if (size <= 0) return { output: "\n", trace };
      let output = "";
      for (let i = 0; i < slice.length; i += size) {
        let end = i + size;
        if (end > slice.length) end = slice.length;
        const chunk = slice.slice(i, end);
        output += JSON.stringify(chunk) + "\n";
        trace.push({ description: `Chipped off chunk: ${JSON.stringify(chunk)}`, vars: { i, end, chunk } });
      }
      return { output, trace };
    }
  },
  {
      id: "concatalternate",
      name: "concatalternate",
      intro: "Mix two lists like a deck of cards! Take one from the first, then one from the second, back and forth until you run out! 🃏",
      level: 5,
      goCode: [
        "func ConcatAlternate(s1, s2 []int) []int {",
        "    res := []int{}",
        "    for i := 0; i < len(s1) || i < len(s2); i++ {",
        "        if i < len(s1) { res = append(res, s1[i]) }",
        "        if i < len(s2) { res = append(res, s2[i]) }",
        "    }",
        "    return res",
        "}"
      ],
      explanations: [
        "Define 'ConcatAlternate' taking two integer slices.",
        "Make a new empty slice 'res' using '[]int{}'.",
        "Loop as long as 'i' is less than EITHER slice length using '||' (OR).",
        "If index 'i' is within 's1', use 'append' to add the element to 'res'.",
        "If index 'i' is within 's2', use 'append' to add that element too.",
        "The '}' ends the loop.",
        "Finally, 'return' the mixed result slice.",
        "The final '}' ends the function."
      ],
      defaultArgs: [[1, 2], [3, 4, 5]],
      quizHints: ["i < len(s1)", "res = append(res, s1[i])"],
      simulator: (args: any[]) => {
          const s1 = Array.isArray(args[0]) ? args[0] : [];
          const s2 = Array.isArray(args[1]) ? args[1] : [];
          const res = [];
          const trace: FunctionTraceStep[] = [];
          for (let i = 0; i < Math.max(s1.length, s2.length); i++) {
              if (i < s1.length) { res.push(s1[i]); trace.push({ description: `Added ${s1[i]} from S1`, vars: { i, res } }); }
              if (i < s2.length) { res.push(s2[i]); trace.push({ description: `Added ${s2[i]} from S2`, vars: { i, res } }); }
          }
          return { output: JSON.stringify(res), trace };
      }
  },
  {
    id: "concatslice",
    name: "concatslice",
    intro: "Two slices become one! It's like gluing two blocks of wood together to make a bigger one! 🪵",
    level: 5,
    goCode: [
      "func ConcatSlice(slice1, slice2 []int) []int {",
      "    return append(slice1, slice2...)",
      "}"
    ],
    explanations: [
      "Define 'ConcatSlice' taking two integer slices.",
      "Use 'append' to Combine them. The '...' operator means 'take all items from slice2' (variadic expansion).",
      "The final '}' ends the function."
    ],
    defaultArgs: [[1, 2], [3, 4]],
    quizHints: ["slice2..."],
    simulator: (args: any[]) => {
      const s1 = Array.isArray(args[0]) ? args[0] : [];
      const s2 = Array.isArray(args[1]) ? args[1] : [];
      return { output: JSON.stringify([...s1, ...s2]), trace: [{ description: "Combined slices using spread operator (equivalent to Go's ...)", vars: { s1, s2, res: [...s1, ...s2] } }] };
    }
  },
  {
      id: "fprime",
      name: "fprime",
      intro: "Find the prime factors! Every number is built from special prime bricks. Let's break the number down into its building blocks! 🧱",
      level: 5,
      goCode: [
        "func Fprime(n int) {",
        "    if n <= 1 { return }",
        "    for i := 2; i <= n; i++ {",
        "        if n % i == 0 {",
        "            fmt.Printf(\"%d\", i)",
        "            if n > i { fmt.Print(\"*\"); Fprime(n/i) }",
        "            break",
        "        }",
        "    }",
        "}"
      ],
      explanations: [
        "Define 'Fprime' taking an 'int' 'n'.",
        "If 'n' is 1 or less, return immediately (stopping recursion).",
        "Loop from 2 up to 'n' using 'i++' to find factors.",
        "Check if 'n' is divisible by 'i' using 'n % i == 0' (modulo).",
        "If yes, print the factor 'i' using 'fmt.Printf'.",
        "If more factors remain ('n > i'), print a '*' and call 'Fprime(n/i)' (recursion).",
        "Use 'break' to exit the loop after finding the smallest prime factor.",
        "Closing braces '}' manage logic and loops.",
        "Function ends."
      ],
      defaultArgs: [42],
      quizHints: ["n % i == 0", "Fprime(n/i)"],
      simulator: (args: any[]) => {
          let n = Number(args[0]);
          const factors = [];
          const trace: FunctionTraceStep[] = [];
          const findFactors = (num: number) => {
              if (num <= 1) return;
              for (let i = 2; i <= num; i++) {
                  if (num % i === 0) {
                      factors.push(i);
                      trace.push({ description: `Found factor ${i}. Remaining: ${num/i}`, vars: { factor: i, remaining: num/i } });
                      findFactors(num / i);
                      break;
                  }
              }
          };
          findFactors(n);
          return { output: factors.join("*"), trace };
      }
  },
  {
    id: "hiddenp",
    name: "hiddenp",
    intro: "Play hide and seek with letters! Can you find all the letters of the first word hidden inside the second word in the same order? 🕵️‍♂️",
    level: 5,
    goCode: [
      "func HiddenP(s1, s2 string) int {",
      "    if s1 == \"\" { return 1 }",
      "    j := 0",
      "    for i := 0; i < len(s2) && j < len(s1); i++ {",
      "        if s2[i] == s1[j] { j++ }",
      "    }",
      "    if j == len(s1) { return 1 }",
      "    return 0",
      "}"
    ],
    explanations: [
      "Define 'HiddenP' taking two strings and returning an 'int'.",
      "If the target string 's1' is empty, return 1 immediately.",
      "Initialize 'j' to 0 to track our position in 's1'.",
      "Loop through 's2' as long as both 'i' and 'j' represent valid indices (using '&&' AND).",
      "If characters match ('s2[i] == s1[j]'), move to the next target character using 'j++'.",
      "The '}' ends the loop.",
      "If 'j' reached the length of 's1', we found the whole word! Return 1.",
      "Otherwise, return 0.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["abc", "azbkcc"],
    quizHints: ["s2[i] == s1[j]", "j == len(s1)"],
    simulator: (args: any[]) => {
      const s1 = String(args[0]);
      const s2 = String(args[1]);
      const trace: FunctionTraceStep[] = [];
      if (s1 === "") return { output: "1", trace };
      let j = 0;
      for (let i = 0; i < s2.length && j < s1.length; i++) {
        if (s2[i] === s1[j]) {
          j++;
          trace.push({ description: `Found matching letter '${s1[j-1]}' at s2[${i}]. Found ${j} letters so far.`, vars: { i, j, char: s1[j-1] } });
        }
      }
      return { output: j === s1.length ? "1" : "0", trace };
    }
  },
  {
    id: "inter",
    name: "inter",
    intro: "Find what's shared! This function looks at two words and shows the letters they both have, in the order they first appear. 🤝",
    level: 5,
    goCode: [
      "func Inter(s1, s2 string) {",
      "    for _, r1 := range s1 {",
      "        if strings.ContainsRune(s2, r1) {",
      "            fmt.Print(string(r1))",
      "            s2 = strings.Replace(s2, string(r1), \"\", -1)",
      "        }",
      "    }",
      "}"
    ],
    explanations: [
      "Define 'Inter' taking two strings.",
      "Loop through 's1' using 'range'. '_' skips the index, 'r1' is the character.",
      "Use 'strings.ContainsRune' to check if 'r1' exists in 's2'.",
      "If found, convert 'r1' to string and print it using 'fmt.Print'.",
      "Update 's2' using 'strings.Replace' to remove ALL occurrences ('-1') of that character.",
      "Closing braces '}' finish checks and loops.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["padinton", "paatrick"],
    quizHints: ["strings.ContainsRune", "strings.Replace"],
    simulator: (args: any[]) => {
      const s1 = String(args[0]);
      let s2 = String(args[1]);
      let output = "";
      const trace: FunctionTraceStep[] = [];
      for (const char of s1) {
          if (s2.includes(char)) {
              output += char;
              s2 = s2.split(char).join("");
              trace.push({ description: `Both have '${char}'. Adding to result and removing from S2.`, vars: { char, output, s2 } });
          }
      }
      return { output, trace };
    }
  },
  {
    id: "reversestrcap",
    name: "reversestrcap",
    intro: "FLIP and CHANGE! Reverse a string and make everything CAPS except the first letter. Or is it the other way? Let's find out! 🔄",
    level: 5,
    goCode: [
      "func ReverseStrCap(s string) string {",
      "    res := \"\"",
      "    for i := len(s)-1; i >= 0; i-- {",
      "        char := s[i]",
      "        if char >= 'a' && char <= 'z' { char -= 32 }",
      "        res += string(char)",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'ReverseStrCap' taking a 'string' and returning a 'string'.",
      "Initialize 'res' as an empty string.",
      "Loop backward from the last character ('len(s)-1') down to 0 using 'i--'.",
      "Store character 's[i]' in variable 'char'.",
      "Check: if 'char' is lowercase ('a' to 'z'), subtract 32 to convert to uppercase.",
      "Add the character back to 'res' after converting to 'string'.",
      "The '}' ends the loop.",
      "Finally, 'return' the capitalized reversed string.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["Hello"],
    quizHints: ["char -= 32", "len(s)-1"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      let res = "";
      const trace: FunctionTraceStep[] = [];
      for (let i = s.length - 1; i >= 0; i--) {
        let char = s[i];
        if (char >= 'a' && char <= 'z') char = String.fromCharCode(char.charCodeAt(0) - 32);
        else char = char.toUpperCase();
        res += char;
        trace.push({ description: `Flipped character at index ${i}: '${char}'`, vars: { i, char, res } });
      }
      return { output: res, trace };
    }
  },
  {
      id: "saveandmiss",
      name: "saveandmiss",
      intro: "Keep some, skip some! This function skips 'n' items, keeps 'n' items, and repeats. It's like playing leapfrog with data! 🐸",
      level: 5,
      goCode: [
        "func SaveAndMiss(s string, n int) string {",
        "    if n <= 0 { return s }",
        "    res := \"\"",
        "    for i := 0; i < len(s); i += 2 * n {",
        "        end := i + n",
        "        if end > len(s) { end = len(s) }",
        "        res += s[i:end]",
        "    }",
        "    return res",
        "}"
      ],
      explanations: [
        "Define 'SaveAndMiss' taking a 'string' and an 'int' 'n'.",
        "If 'n' is 0 or less, return the original string immediately.",
        "Initialize 'res' as an empty string.",
        "Loop through 's' jumping by '2 * n' each time ('i += 2 * n').",
        "Set 'end' for the saved portion to 'i + n'.",
        "If 'end' is past the string length, cap it at 'len(s)'.",
        "Append the slice 's[i:end]' to 'res'.",
        "The '}' ends the loop.",
        "Finally, 'return' the saved portions.",
        "The final '}' ends the function."
      ],
      defaultArgs: ["123456789", 3],
      quizHints: ["i += 2 * n", "s[i:end]"],
      simulator: (args: any[]) => {
        const s = String(args[0]);
        const n = Number(args[1]);
        const trace: FunctionTraceStep[] = [];
        if (n <= 0) return { output: s, trace };
        let res = "";
        for (let i = 0; i < s.length; i += 2 * n) {
          let end = i + n;
          if (end > s.length) end = s.length;
          const chunk = s.substring(i, end);
          res += chunk;
          trace.push({ description: `Saving chunk '${chunk}'. Skipping next ${n} characters.`, vars: { i, end, chunk, res } });
        }
        return { output: res, trace };
      }
  },
  {
    id: "union",
    name: "union",
    intro: "Two worlds combined! Find all the unique letters from two words and put them together in one big list. No repeats allowed! 🤝",
    level: 5,
    goCode: [
      "func Union(s1, s2 string) string {",
      "    res := \"\"",
      "    combined := s1 + s2",
      "    for _, r := range combined {",
      "        if !strings.ContainsRune(res, r) {",
      "            res += string(r)",
      "        }",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'Union' taking two strings and returning a 'string'.",
      "Initialize 'res' as an empty string.",
      "Combine 's1' and 's2' into one string using '+'.",
      "Loop through every character 'r' in the 'combined' string.",
      "Use '!' (NOT) with 'strings.ContainsRune' to check if 'r' is NOT already in 'res'.",
      "If it's new, add character 'r' to 'res'.",
      "Closing braces '}' manage the loop and logic.",
      "Finally, 'return' the unique collection of characters.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["hello", "world"],
    quizHints: ["strings.ContainsRune", "s1 + s2"],
    simulator: (args: any[]) => {
      const s1 = String(args[0]);
      const s2 = String(args[1]);
      let res = "";
      const combined = s1 + s2;
      const trace: FunctionTraceStep[] = [];
      for (const char of combined) {
        if (!res.includes(char)) {
          res += char;
          trace.push({ description: `Adding character '${char}' to union.`, vars: { char, res } });
        }
      }
      return { output: res, trace };
    }
  },
  {
    id: "wdmatch",
    name: "wdmatch",
    intro: "Can we build it? Checks if the first word can be built by deleting letters from the second word. The letters must stay in their original order! 🧩",
    level: 5,
    goCode: [
      "func WdMatch(s1, s2 string) bool {",
      "    i := 0",
      "    for j := 0; i < len(s1) && j < len(s2); j++ {",
      "        if s1[i] == s2[j] { i++ }",
      "    }",
      "    return i == len(s1)",
      "}"
    ],
    explanations: [
      "Define 'WdMatch' taking two strings and returning a 'bool'.",
      "Initialize 'i' to 0 to track progress in 's1'.",
      "Loop through 's2' using index 'j'. Stop if 'i' reaches 'len(s1)' or 'j' reaches 'len(s2)'.",
      "If characters match ('s1[i] == s2[j]'), move to next target letter using 'i++'.",
      "The '}' ends the loop.",
      "Return true if 'i' matches length of 's1' ('i == len(s1)').",
      "The final '}' ends the function."
    ],
    defaultArgs: ["fwe", "fdfwree"],
    quizHints: ["i == len(s1)", "s1[i] == s2[j]"],
    simulator: (args: any[]) => {
      const s1 = String(args[0]);
      const s2 = String(args[1]);
      const trace: FunctionTraceStep[] = [];
      let i = 0;
      for (let j = 0; j < s2.length && i < s1.length; j++) {
        if (s1[i] === s2[j]) {
          i++;
          trace.push({ description: `Found match for '${s1[i-1]}' at s2[${j}].`, vars: { i, j, char: s1[i-1] } });
        }
      }
      return { output: i === s1.length ? "true" : "false", trace };
    }
  },
  {
      id: "fifthandskip",
      name: "fifthandskip",
      intro: "Skip the fifth! Take a string and remove every 5th character. It's like a game of musical chairs where someone has to sit out! 🪑",
      level: 6,
      goCode: [
        "func FifthAndSkip(s string) string {",
        "    if len(s) == 0 { return \"\\n\" }",
        "    res := \"\"",
        "    count := 0",
        "    for _, r := range s {",
        "        if r == ' ' { continue }",
        "        if count == 5 {",
        "            res += \" \"",
        "            count = 0",
        "            continue",
        "        }",
        "        res += string(r)",
        "        count++",
        "    }",
        "    return res + \"\\n\"",
        "}"
      ],
      explanations: [
        "Define 'FifthAndSkip' taking a 'string' and returning a 'string'.",
        "If string is empty, return a new line character \"\\n\".",
        "Initialize 'res' as empty string and 'count' to 0.",
        "Loop through 's' using 'range' to get character 'r'.",
        "If 'r' is a space (' '), use 'continue' to skip it immediately.",
        "If 'count' is 5, add a space to 'res', reset 'count' to 0, and 'continue' to next char.",
        "Add character 'r' to 'res' and increment 'count' by 1.",
        "Closing braces '}' manage loops and conditions.",
        "Return result with a new line at the end.",
        "The final '}' ends the function."
      ],
      defaultArgs: ["123456789"],
      quizHints: ["count == 5", "res += \" \""],
      simulator: (args: any[]) => {
          const s = String(args[0]).replace(/\s/g, "");
          if (s.length === 0) return { output: "\n", trace: [] };
          let res = "";
          let count = 0;
          const trace: FunctionTraceStep[] = [];
          for (const char of s) {
              if (count === 5) {
                  res += " ";
                  count = 0;
                  trace.push({ description: "Reached 5th character. Adding space and skipping.", vars: { char, res, count } });
              }
              res += char;
              count++;
              trace.push({ description: `Adding '${char}'. Count is ${count}`, vars: { char, res, count } });
          }
          return { output: res + "\n", trace };
      }
  },
  {
    id: "notdecimal",
    name: "notdecimal",
    intro: "Are you a number? Check if a string is NOT a decimal number. Only digits 0-9 and one minus sign at the front are allowed! 🔢",
    level: 6,
    goCode: [
      "func NotDecimal(s string) bool {",
      "    if len(s) == 0 { return true }",
      "    for i, r := range s {",
      "        if i == 0 && r == '-' { continue }",
      "        if r < '0' || r > '9' { return true }",
      "    }",
      "    return false",
      "}"
    ],
    explanations: [
      "Define 'NotDecimal' taking a 'string' and returning a 'bool'.",
      "If string is empty, return 'true' immediately.",
      "Loop through 's' with index 'i' and character 'r'.",
      "If 'i == 0' AND 'r == '-'', skip checking this character using 'continue'.",
      "If 'r' is less than '0' OR greater than '9', it's not a digit! Return 'true'.",
      "The '}' ends the loop.",
      "If all checks passed, return 'false' (it is a decimal!).",
      "The final '}' ends the function."
    ],
    defaultArgs: ["123a"],
    quizHints: ["r < '0' || r > '9'", "i == 0 && r == '-'"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      const trace: FunctionTraceStep[] = [];
      if (s.length === 0) return { output: "true", trace };
      for (let i = 0; i < s.length; i++) {
        const r = s[i];
        if (i === 0 && r === '-') continue;
        const ok = r >= '0' && r <= '9';
        trace.push({ description: `Checking character '${r}'. Is it a digit? ${ok}`, vars: { i, r, ok } });
        if (!ok) return { output: "true", trace };
      }
      return { output: "false", trace };
    }
  },
  {
      id: "revconcatalternate",
      name: "revconcatalternate",
      intro: "Reverse THEN alternate! It's the ultimate mixing challenge. Flip both lists and then deal them out one by one! 🙃",
      level: 6,
      goCode: [
        "func RevConcatAlternate(s1, s2 []int) []int {",
        "    for i, j := 0, len(s1)-1; i < j; i, j = i+1, j-1 { s1[i], s1[j] = s1[j], s1[i] }",
        "    for i, j := 0, len(s2)-1; i < j; i, j = i+1, j-1 { s2[i], s2[j] = s2[j], s2[i] }",
        "    res := []int{}",
        "    for i := 0; i < len(s1) || i < len(s2); i++ {",
        "        if i < len(s1) { res = append(res, s1[i]) }",
        "        if i < len(s2) { res = append(res, s2[i]) }",
        "    }",
        "    return res",
        "}"
      ],
      explanations: [
        "Define 'RevConcatAlternate' taking two integer slices.",
        "Reverse 's1' in-place using a multi-variable 'for' loop ('i, j := 0, len(s1)-1') and parallel swap ('s1[i], s1[j] = s1[j], s1[i]').",
        "Reverse 's2' in-place using the same swap pattern.",
        "Initialize 'res' as an empty slice.",
        "Loop as long as 'i' is less than either slice length ('||').",
        "If 'i' exists in 's1', append it to 'res'.",
        "If 'i' exists in 's2', append it to 'res'.",
        "The '}' ends our mixing loop.",
        "Finally, 'return' the result.",
        "The final '}' ends the function."
      ],
      defaultArgs: [[1, 2], [3, 4, 5]],
      quizHints: ["len(s1)-1", "res = append(res, s1[i])"],
      simulator: (args: any[]) => {
          const s1 = Array.isArray(args[0]) ? [...args[0]] : [];
          const s2 = Array.isArray(args[1]) ? [...args[1]] : [];
          s1.reverse();
          s2.reverse();
          const res = [];
          const trace: FunctionTraceStep[] = [];
          trace.push({ description: "Reversed both input slices.", vars: { s1, s2 } });
          for (let i = 0; i < Math.max(s1.length, s2.length); i++) {
              if (i < s1.length) { res.push(s1[i]); trace.push({ description: `Added ${s1[i]} from reversed S1`, vars: { i, res } }); }
              if (i < s2.length) { res.push(s2[i]); trace.push({ description: `Added ${s2[i]} from reversed S2`, vars: { i, res } }); }
          }
          return { output: JSON.stringify(res), trace };
      }
  },
  {
    id: "slice",
    name: "slice",
    intro: "Take a slice of words! Just like cutting a piece of cake, you choose where to start and where to stop. Yummy! 🍰",
    level: 6,
    goCode: [
      "func Slice(s []string, start, end int) []string {",
      "    if start < 0 || end < 0 || start > end || start >= len(s) { return nil }",
      "    if end > len(s) { end = len(s) }",
      "    res := []string{}",
      "    for i := start; i < end; i++ {",
      "        res = append(res, s[i])",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'Slice' taking a slice of strings and 'start', 'end' as integers.",
      "Validation 'if': check for negative values or 'start > end' or 'start' out of range using '||'. If invalid, return 'nil'.",
      "If 'end' is too large, reset it to 'len(s)'.",
      "Initialize 'res' as an empty slice of strings.",
      "Loop from 'start' to 'end' using 'i++'.",
      "Append each element to 'res'.",
      "The '}' ends the loop.",
      "Finally, 'return' the new slice.",
      "The final '}' ends the function."
    ],
    defaultArgs: [["a", "b", "c", "d", "e"], 1, 3],
    quizHints: ["res = append(res, s[i])", "start > end"],
    simulator: (args: any[]) => {
      const s = Array.isArray(args[0]) ? args[0] : ["a", "b", "c", "d", "e"];
      let start = Number(args[1]);
      let end = Number(args[2]);
      const trace: FunctionTraceStep[] = [];
      if (start < 0 || end < 0 || start > end || start >= s.length) return { output: "nil", trace };
      if (end > s.length) end = s.length;
      const res = [];
      for (let i = start; i < end; i++) {
        res.push(s[i]);
        trace.push({ description: `Adding element at index ${i}: '${s[i]}'`, vars: { i, res } });
      }
      return { output: JSON.stringify(res), trace };
    }
  },
  {
    id: "findpairs",
    name: "findpairs",
    intro: "Two numbers are better than one! Find all pairs of numbers in a list that add up to a target sum. It's like finding a perfect match! 🧩",
    level: 7,
    goCode: [
      "func FindPairs(arr []int, target int) [][]int {",
      "    res := [][]int{}",
      "    for i := 0; i < len(arr); i++ {",
      "        for j := i + 1; j < len(arr); j++ {",
      "            if arr[i] + arr[j] == target {",
      "                res = append(res, []int{arr[i], arr[j]})",
      "            }",
      "        }",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'FindPairs' taking an integer slice and a 'target' integer.",
      "Initialize 'res' as a 2D slice '[][]int{}' (list of lists).",
      "Outer 'for' loop iterates through each number in 'arr'.",
      "Inner 'for' loop starts from 'i + 1' to find a second unique number.",
      "Check: if the sum of both numbers equals the 'target' using '=='.",
      "If they match, 'append' a new slice containing the pair to 'res'.",
      "Closing braces '}' manage our nested loops and logic.",
      "Finally, 'return' all found pairs.",
      "The final '}' ends the function."
    ],
    defaultArgs: [[1, 2, 3, 4, 5], 6],
    quizHints: ["i + 1", "arr[i] + arr[j] == target"],
    simulator: (args: any[]) => {
      const arr = Array.isArray(args[0]) ? args[0] : [1, 2, 3, 4, 5];
      const target = Number(args[1]);
      const res = [];
      const trace: FunctionTraceStep[] = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] + arr[j] === target) {
            res.push([arr[i], arr[j]]);
            trace.push({ description: `Match found! ${arr[i]} + ${arr[j]} = ${target}`, vars: { i, j, res } });
          }
        }
      }
      return { output: JSON.stringify(res), trace };
    }
  },
  {
      id: "revwstr",
      name: "revwstr",
      intro: "Sentence flipped backward! But wait, not just word order—every letter stays in its place in the word, only the words move! 🔄",
      level: 7,
      goCode: [
        "func RevWstr(s string) string {",
        "    words := strings.Fields(s)",
        "    res := \"\"",
        "    for i := len(words) - 1; i >= 0; i-- {",
        "        res += words[i]",
        "        if i > 0 { res += \" \" }",
        "    }",
        "    return res",
        "}"
      ],
      explanations: [
        "Define 'RevWstr' taking a 'string' and returning a 'string'.",
        "Split string into words using 'strings.Fields'.",
        "Initialize 'res' as an empty string.",
        "Loop backward from 'len(words) - 1' down to 0 using 'i--'.",
        "Append the word at index 'i' to 'res'.",
        "If more words follow ('i > 0'), add a space string \" \".",
        "The '}' ends the loop.",
        "Finally, 'return' the reversed sentence.",
        "The final '}' ends the function."
      ],
      defaultArgs: ["the first shall be last"],
      quizHints: ["len(words) - 1", "res += \" \""],
      simulator: (args: any[]) => {
        const s = String(args[0]);
        const words = s.trim().split(/\s+/).filter(w => w.length > 0);
        let res = "";
        const trace: FunctionTraceStep[] = [];
        for (let i = words.length - 1; i >= 0; i--) {
          res += words[i];
          if (i > 0) res += " ";
          trace.push({ description: `Added word '${words[i]}'. Current result: '${res}'`, vars: { i, res } });
        }
        return { output: res, trace };
      }
  },
  {
      id: "rostring",
      name: "rostring",
      intro: "Word rotation! Take the first word and move it to the very end of the sentence. It's like a line at the cafeteria! 🏃‍♂️",
      level: 7,
      goCode: [
        "func RoString(s string) string {",
        "    words := strings.Fields(s)",
        "    if len(words) == 0 { return \"\" }",
        "    res := strings.Join(words[1:], \" \")",
        "    if len(words) > 1 { res += \" \" }",
        "    res += words[0]",
        "    return res",
        "}"
      ],
      explanations: [
        "Define 'RoString' taking a 'string' and returning a 'string'.",
        "Break the string into a list of words.",
        "If no words exist, return an empty string.",
        "Join all words from index 1 to the end ('words[1:]') with spaces.",
        "If multiple words existed, add a trailing space to 'res'.",
        "Append the very first word ('words[0]') to the end of 'res'.",
        "Finally, 'return' the rotated string.",
        "The final '}' ends the function."
      ],
      defaultArgs: ["Hello World Friends"],
      quizHints: ["words[1:]", "words[0]"],
      simulator: (args: any[]) => {
        const s = String(args[0]);
        const words = s.trim().split(/\s+/).filter(w => w.length > 0);
        if (words.length === 0) return { output: "", trace: [] };
        const trace: FunctionTraceStep[] = [];
        let res = words.slice(1).join(" ");
        if (words.length > 1) res += " ";
        res += words[0];
        trace.push({ description: `Moving first word '${words[0]}' to the back.`, vars: { words, res } });
        return { output: res, trace };
      }
  },
  {
      id: "wordflip",
      name: "wordflip",
      intro: "Flip a sentence backward! But each word stays the same - only the order changes. It's like mirror writing for whole words! 🪞",
      level: 7,
      goCode: [
        "func WordFlip(s string) string {",
        "    words := strings.Fields(s)",
        "    if len(words) == 0 { return \"\" }",
        "    for i, j := 0, len(words)-1; i < j; i, j = i+1, j-1 {",
        "        words[i], words[j] = words[j], words[i]",
        "    }",
        "    return strings.Join(words, \" \")",
        "}"
      ],
      explanations: [
        "Define 'WordFlip' taking a 'string' and returning a 'string'.",
        "Split the input into a slice of words.",
        "Check: if empty, return an empty string.",
        "Loop with two pointers 'i' (start) and 'j' (end). Move them toward each other.",
        "A Go parallel swap: 'words[i], words[j] = words[j], words[i]' flips the elements at once.",
        "The '}' ends the swap loop.",
        "Join the flipped words back into a single string with spaces and 'return' it.",
        "The final '}' ends the function."
      ],
      defaultArgs: ["Hello world from Go"],
      quizHints: ["words[i], words[j] = words[j], words[i]", "strings.Fields(s)"],
      simulator: (args: any[]) => {
        const s = String(args[0]);
        const trace: FunctionTraceStep[] = [];
        const words = s.trim().split(/\s+/).filter(w => w.length > 0);
        if (words.length === 0) return { output: "", trace };
        
        trace.push({ description: "Splitting string into words.", vars: { words } });
        let i = 0, j = words.length - 1;
        while (i < j) {
          const temp = words[i];
          words[i] = words[j];
          words[j] = temp;
          trace.push({ description: `Swapping '${words[j]}' and '${words[i]}'`, vars: { i, j, words: [...words] } });
          i++;
          j--;
        }
        return { output: words.join(" "), trace };
      }
  },
  {
    id: "itoabase",
    name: "itoabase",
    intro: "Convert a number to any base! Decimal to Binary, Hex, or anything else you choose. It's like translating between robot languages! 🤖",
    level: 8,
    goCode: [
      "func ItoaBase(n int, base int) string {",
      "    if base < 2 || base > 16 { return \"\" }",
      "    digits := \"0123456789ABCDEF\"",
      "    res := \"\"",
      "    isNeg := n < 0",
      "    if isNeg { n = -n }",
      "    for n > 0 {",
      "        res = string(digits[n%base]) + res",
      "        n /= base",
      "    }",
      "    if isNeg { res = \"-\" + res }",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'ItoaBase' taking two integers: 'n' (value) and 'base'.",
      "Check: 'if' base is outside 2-16, return an empty string.",
      "Initialize 'digits' string and 'res' string.",
      "Use 'bool' called 'isNeg' to remember if input was negative.",
      "If negative, convert 'n' to positive for digit extraction.",
      "Use 'for' to process each digit while 'n > 0'.",
      "Use 'n % base' to get the remainder and pick the right character from 'digits'. Add to front of 'res'.",
      "Divide 'n' by 'base' using '/='.",
      "The '}' ends the loop.",
      "Add leading '-' if it was negative, then 'return' the result string.",
      "The final '}' ends the function."
    ],
    defaultArgs: [255, 16],
    quizHints: ["base < 2", "digits[n%base]"],
    simulator: (args: any[]) => {
      let n = Number(args[0]);
      const base = Number(args[1]);
      if (base < 2 || base > 16) return { output: "", trace: [] };
      let res = n.toString(base).toUpperCase();
      return { output: res, trace: [{ description: `Converted ${n} to base ${base}`, vars: { n, base, res } }] };
    }
  },
  {
    id: "piglatin",
    name: "piglatin",
    intro: "Pig Latin translator! Move the first consonant cluster to the end and add 'ay'. If it starts with a vowel, just add 'ay'. Oigpay Atinlay! 🐷",
    level: 8,
    goCode: [
      "func PigLatin(s string) string {",
      "    vowels := \"aeiouAEIOU\"",
      "    firstVowel := -1",
      "    for i, r := range s {",
      "        if strings.ContainsRune(vowels, r) {",
      "            firstVowel = i",
      "            break",
      "        }",
      "    }",
      "    if firstVowel == -1 { return \"No vowels\" }",
      "    return s[firstVowel:] + s[:firstVowel] + \"ay\"",
      "}"
    ],
    explanations: [
      "Define 'PigLatin' taking a 'string' and returning a 'string'.",
      "Define a string of vowels to check against.",
      "Initialize 'firstVowel' index to -1.",
      "Loop through string 's' to find the first vowel character.",
      "If 'strings.ContainsRune' finds a vowel, save its index and 'break' the loop.",
      "The '}' ends the loop.",
      "If no vowels were found, return an error message.",
      "Slice the word: take everyone from 'firstVowel' to the end, add the beginning, then add \"ay\".",
      "The final '}' ends the function."
    ],
    defaultArgs: ["pig"],
    quizHints: ["s[firstVowel:]", "strings.ContainsRune"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      const vowels = "aeiouAEIOU";
      let firstVowel = -1;
      for (let i = 0; i < s.length; i++) {
          if (vowels.includes(s[i])) { firstVowel = i; break; }
      }
      if (firstVowel === -1) return { output: "No vowels", trace: [] };
      const res = s.substring(firstVowel) + s.substring(0, firstVowel) + "ay";
      return { output: res, trace: [{ description: `Pig Latin: ${res}`, vars: { s, res } }] };
    }
  },
  {
    id: "romannumbers",
    name: "romannumbers",
    intro: "Roman numerals! Convert numbers into the symbols used by the Romans like I, V, X, L, C, D, M. 🏛️",
    level: 8,
    goCode: [
      "func RomanNumbers(n int) string {",
      "    if n <= 0 || n >= 4000 { return \"\" }",
      "    vals := []int{1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}",
      "    syms := []string{\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"}",
      "    res := \"\"",
      "    for i := 0; i < len(vals); i++ {",
      "        for n >= vals[i] {",
      "            res += syms[i]",
      "            n -= vals[i]",
      "        }",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'RomanNumbers' taking an 'int' and returning a 'string'.",
      "Validation 'if': check if input is between 1 and 3999. If not, return empty.",
      "Define slices with integer values and their corresponding Roman symbols.",
      "Initialize 'res' as an empty string.",
      "Outer loop iterates through each defined Roman value.",
      "Inner loop runs as long as 'n' is greater than or equal to current value.",
      "Append the symbol to 'res' and subtract the value from 'n'.",
      "Closing braces '}' manage our nested loops.",
      "Finally, 'return' the Roman numeral string.",
      "The final '}' ends the function."
    ],
    defaultArgs: [2024],
    quizHints: ["n >= vals[i]", "res += syms[i]"],
    simulator: (args: any[]) => {
      let n = Number(args[0]);
      if (n <= 0 || n >= 4000) return { output: "", trace: [] };
      const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
      let res = "";
      for (let i = 0; i < vals.length; i++) {
          while (n >= vals[i]) {
              res += syms[i];
              n -= vals[i];
          }
      }
      return { output: res, trace: [{ description: `Roman numeral: ${res}`, vars: { res } }] };
    }
  },
  {
    id: "brackets",
    name: "brackets",
    intro: "Check the balance! Every bracket ( { [ must have a matching partner ) } ] in the right order. ⚖️",
    level: 9,
    goCode: [
      "func Brackets(s string) bool {",
      "    stack := []rune{}",
      "    pairs := map[rune]rune{')': '(', '}': '{', ']': '['}",
      "    for _, r := range s {",
      "        if r == '(' || r == '{' || r == '[' {",
      "            stack = append(stack, r)",
      "        } else if match, ok := pairs[r]; ok {",
      "            if len(stack) == 0 || stack[len(stack)-1] != match { return false }",
      "            stack = stack[:len(stack)-1]",
      "        }",
      "    }",
      "    return len(stack) == 0",
      "}"
    ],
    explanations: [
      "Define 'Brackets' taking a 'string' and returning a 'bool'.",
      "Initialize 'stack' as an empty slice of runes.",
      "Define 'map' variable called 'pairs' to link closing brackets with their opening partners.",
      "Loop through the string 's'.",
      "If character 'r' is an opening bracket, 'append' it to the stack.",
      "Else if it's a closing bracket (check if it exists in 'pairs' map), logic continues:",
      "Check if stack is empty OR if the last item doesn't match our partner. If so, return false.",
      "Pop the last item from the stack using slicing 'stack[:len(stack)-1]'.",
      "Ending braces '}' for conditions and loops.",
      "Finally, return 'true' if the stack is completely empty ('len(stack) == 0').",
      "The final '}' ends the function."
    ],
    defaultArgs: ["([{}])"],
    quizHints: ["stack[:len(stack)-1]", "pairs[r]"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      const stack = [];
      const pairs: Record<string, string> = {')': '(', '}': '{', ']': '['};
      for (const char of s) {
          if ('({['.includes(char)) stack.push(char);
          else if (')}]'.includes(char)) {
              if (stack.length === 0 || stack.pop() !== pairs[char]) return { output: "false", trace: [] };
          }
      }
      return { output: String(stack.length === 0), trace: [] };
    }
  },
  {
    id: "brainfuck",
    name: "brainfuck",
    intro: "Decode a very strange language! It uses only characters like > < + - [ ] . , to control a robot's memory. 🧠💥",
    level: 10,
    goCode: [
      "func Brainfuck(code string) {",
      "    memory := make([]byte, 30000)",
      "    ptr := 0",
      "    for i := 0; i < len(code); i++ {",
      "        switch code[i] {",
      "            case '>': ptr++",
      "            case '<': ptr--",
      "            case '+': memory[ptr]++",
      "            case '-': memory[ptr]--",
      "            case '.': fmt.Printf(\"%c\", memory[ptr])",
      "        }",
      "    }",
      "}"
    ],
    explanations: [
      "Define 'Brainfuck' taking a 'string' of code.",
      "Create a memory byte slice of size 30,000 using 'make'.",
      "Initialize pointer 'ptr' to 0.",
      "Loop through each character in the 'code' string.",
      "Use a 'switch' statement to choose an action based on the character code.",
      "Each 'case' defines a command: '>' moves pointer, '<' moves back, '+' or '-' changes memory value.",
      "'.' prints the current memory value as a character using 'fmt.Printf'.",
      "Closing braces '}' end the switch, loop, and function."
    ],
    defaultArgs: ["++++[>++++<-]>."],
    quizHints: ["memory[ptr]++", "switch code[i]"],
    simulator: (args: any[]) => {
      const code = String(args[0]);
      const memory = new Uint8Array(30000);
      let ptr = 0;
      let output = "";
      for (let i = 0; i < code.length; i++) {
          const cmd = code[i];
          if (cmd === '>') ptr++;
          else if (cmd === '<') ptr--;
          else if (cmd === '+') memory[ptr]++;
          else if (cmd === '-') memory[ptr]--;
          else if (cmd === '.') output += String.fromCharCode(memory[ptr]);
      }
      return { output, trace: [] };
    }
  },
  {
    id: "options",
    name: "options",
    intro: "Check the labels! This robot checks if a list of flag options is valid. Each flag must start with '-' and be one letter. 🚩",
    level: 8,
    goCode: [
      "func Options(args []string) int {",
      "    res := 0",
      "    for _, arg := range args {",
      "        if len(arg) < 2 || arg[0] != '-' { return -1 }",
      "        for i := 1; i < len(arg); i++ {",
      "            res |= 1 << (arg[i] - 'a')",
      "        }",
      "    }",
      "    return res",
      "}"
    ],
    explanations: [
      "Define 'Options' taking a slice of strings and returning an 'int'.",
      "Initialize 'res' to 0.",
      "Loop through each argument in 'args'.",
      "Check: if argument is too short or doesn't start with '-', return -1 (error).",
      "Start a nested loop to process every character in the flag argument.",
      "Use 'res |= 1 << (arg[i] - 'a')'. This uses 'bitwise OR' and 'left shift' to mark a specific bit for each letter.",
      "Closing braces '}' manage our loops and conditions.",
      "Finally, 'return' the final bitmask integer.",
      "The final '}' ends the function."
    ],
    defaultArgs: [["-a", "-b"]],
    quizHints: ["1 << (arg[i] - 'a')", "res |= "],
    simulator: (args: any[]) => {
      const arr = Array.isArray(args[0]) ? args[0] : [];
      let res = 0;
      for (const arg of arr) {
          if (arg.length < 2 || arg[0] !== '-') return { output: "-1", trace: [] };
          for (let i = 1; i < arg.length; i++) {
              res |= 1 << (arg.charCodeAt(i) - 'a'.charCodeAt(0));
          }
      }
      return { output: String(res), trace: [] };
    }
  },
  {
    id: "rpncalc",
    name: "rpncalc",
    intro: "Reverse Polish Notation calculator! No parentheses needed. Numbers come first, then the operator. 2 3 + becomes 5. 🧮",
    level: 9,
    goCode: [
      "func RpnCalc(s string) {",
      "    stack := []int{}",
      "    tokens := strings.Fields(s)",
      "    for _, t := range tokens {",
      "        if n, err := strconv.Atoi(t); err == nil {",
      "            stack = append(stack, n)",
      "        } else {",
      "            if len(stack) < 2 { return }",
      "            v2, v1 := stack[len(stack)-1], stack[len(stack)-2]",
      "            stack = stack[:len(stack)-2]",
      "            switch t {",
      "                case \"+\": stack = append(stack, v1+v2)",
      "                case \"-\": stack = append(stack, v1-v2)",
      "                case \"*\": stack = append(stack, v1*v2)",
      "            }",
      "        }",
      "    }",
      "    fmt.Println(stack[0])",
      "}"
    ],
    explanations: [
      "Define 'RpnCalc' which takes a 'string'.",
      "Initialize 'stack' as an integer slice.",
      "Split input into tokens (words) using 'strings.Fields'.",
      "Loop through each token 't'.",
      "Try to convert token to a number using 'strconv.Atoi'. If no error, append it to stack.",
      "If it's an operator, check if there are at least 2 numbers in the stack.",
      "Pop the top two values ('v1', 'v2') and remove them from stack using slicing.",
      "Use 'switch' to perform addition, subtraction, or multiplication and append result.",
      "The '}' ends loops and decisions.",
      "Finally, print the final result using 'fmt.Println(stack[0])'.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["3 4 + 2 *"],
    quizHints: ["strconv.Atoi(t)", "stack[:len(stack)-2]"],
    simulator: (args: any[]) => {
      const s = String(args[0]);
      const stack = [];
      const tokens = s.split(/\s+/);
      for (const t of tokens) {
          const n = parseInt(t);
          if (!isNaN(n)) stack.push(n);
          else if (stack.length >= 2) {
              const v2 = stack.pop();
              const v1 = stack.pop();
              if (t === '+') stack.push(v1 + v2);
              else if (t === '-') stack.push(v1 - v2);
              else if (t === '*') stack.push(v1 * v2);
          }
      }
      return { output: String(stack[0] || "Error"), trace: [] };
    }
  },
  {
    id: "grouping",
    name: "grouping",
    intro: "Group words by their pattern! This robot finds words that share the same shape or structure. 📦",
    level: 10,
    goCode: [
      "func Grouping(s string) {",
      "    groups := make(map[string][]string)",
      "    words := strings.Fields(s)",
      "    for _, w := range words {",
      "        key := Pattern(w)",
      "        groups[key] = append(groups[key], w)",
      "    }",
      "    fmt.Println(groups)",
      "}"
    ],
    explanations: [
      "Define 'Grouping' which takes a 'string'.",
      "Create a 'groups' map linking pattern strings to slices of words.",
      "Split string into words and loop through them.",
      "Calculate the unique 'Pattern' key for the word.",
      "Add the word to its matching group in the map using 'append'.",
      "Final braces '}' manage the loop.",
      "Print the final map of grouped words.",
      "The final '}' ends the function."
    ],
    defaultArgs: ["abb cdd hello"],
    quizHints: ["make(map[string][]string)", "groups[key]"],
    simulator: (args: any[]) => {
        const s = String(args[0]);
        const words = s.split(/\s+/);
        const groups: Record<string, string[]> = {};
        const getPattern = (w: string) => {
            const m: Record<string, number> = {};
            let res = "";
            for (let i = 0; i < w.length; i++) {
                if (!(w[i] in m)) m[w[i]] = i;
                res += m[w[i]];
            }
            return res;
        };
        for (const w of words) {
            const key = getPattern(w);
            if (!groups[key]) groups[key] = [];
            groups[key].push(w);
        }
        return { output: JSON.stringify(groups), trace: [] };
    }
  }
];

// Helper to get total functions count for sidebar
export const ALL_FUNCTION_NAMES = [
    // Level 1: 5%
    "only1", "onlya", "onlyb", "onlyf", "onlyz", "hello",
    // Level 2: 10%
    "checknumber", "countalpha", "countcharacter", "printif", "printifnot", "rectperimeter", "retainfirsthalf",
    // Level 3: 20%
    "cameltosnakecase", "digitlen", "firstword", "fishandchips", "gcd", "hashcode", "lastword", "repeatalpha",
    // Level 4: 35%
    "findprevprime", "fromto", "iscapitalized", "itoa", "printmemory", "printrevcomb", "thirdtimeisacharm", "weareunique", "zipstring",
    // Level 5: 50%
    "addprimesum", "canjump", "chunk", "concatalternate", "concatslice", "fprime", "hiddenp", "inter", "reversestrcap", "saveandmiss", "union", "wdmatch",
    // Level 6: 65%
    "fifthandskip", "notdecimal", "revconcatalternate", "slice",
    // Level 7: 75%
    "findpairs", "revwstr", "rostring", "wordflip",
    // Level 8: 85%
    "itoabase", "options", "piglatin", "romannumbers",
    // Level 9: 95%
    "brackets", "rpncalc",
    // Level 10: 100%
    "brainfuck", "grouping"
];
