export interface Language {
  id: string;
  name: string;
  icon: string;
  defaultCode: string;
}

export interface ExecutionRecord {
  id: number;
  code: string;
  input_data: string | null;
  output: string | null;
  language: string;
  created_at: string;
}

export const LANGUAGES: Language[] = [
  { id: 'python', name: 'Python', icon: 'py', defaultCode: 'print("Hello, World!")' },
  { id: 'java', name: 'Java', icon: 'java', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
  { id: 'cpp', name: 'C++', icon: 'cpp', defaultCode: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}' },
  { id: 'c', name: 'C', icon: 'c', defaultCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
];

export const API_BASE_URL = 'http://localhost:8000';
