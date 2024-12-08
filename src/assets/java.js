export const javaKeywords = [
    "abstract", "assert", "boolean", "break", "byte", "case", "catch",
    "char", "class", "const", "continue", "default", "do", "double",
    "else", "enum", "extends", "final", "finally", "float", "for",
    "goto", "if", "implements", "import", "instanceof", "int", "interface",
    "long", "native", "new", "null", "package", "private", "protected",
    "public", "return", "short", "static", "strictfp", "super", "switch",
    "synchronized", "this", "throw", "throws", "transient", "try", "void",
    "volatile", "while", "record", "sealed", "permits", "yield", "var"
  ];
 export const javaStandardLibrary = [
    // java.lang
    "String", "Math", "System", "Object", "Integer", "Double", "Character", "Float", "Boolean", 
    "Thread", "Class", "Enum", "Runtime", "StringBuilder", "StringBuffer",
  
    // java.util
    "List", "ArrayList", "LinkedList", "HashSet", "TreeSet", "HashMap", "TreeMap", "Queue",
    "PriorityQueue", "Stack", "Vector", "Collections", "Iterator", "Random", "Scanner",
    "Optional", "Properties", "UUID", "Date", "Calendar",
  
    // java.io
    "File", "FileInputStream", "FileOutputStream", "BufferedReader", "BufferedWriter",
    "InputStreamReader", "OutputStreamWriter", "PrintWriter", "Serializable",
  
    // java.nio
    "Path", "Files", "FileSystems", "StandardOpenOption",
  
    // java.net
    "URL", "HttpURLConnection", "Socket", "ServerSocket",
  
    // java.util.concurrent
    "ExecutorService", "Future", "CompletableFuture", "Semaphore", "ReentrantLock",
  
    // java.time
    "LocalDate", "LocalTime", "LocalDateTime", "ZonedDateTime", "Duration", "Period", "Instant",
  ];
  export const stringMethods = [
    "length()", "charAt(int)", "substring(int, int)", "indexOf(String)", 
    "equals(Object)", "equalsIgnoreCase(String)", "toLowerCase()", 
    "toUpperCase()", "trim()", "replace(CharSequence, CharSequence)", 
    "split(String)", "contains(CharSequence)", "startsWith(String)", 
    "endsWith(String)", "compareTo(String)", "valueOf(Object)"
  ];
  export const mathMethods = [
    "abs(double)", "max(double, double)", "min(double, double)", "sqrt(double)", 
    "pow(double, double)", "sin(double)", "cos(double)", "tan(double)", 
    "log(double)", "exp(double)", "random()"
  ];
 export  const collectionsMethods = [
    "sort(List)", "binarySearch(List, T)", "reverse(List)", 
    "shuffle(List)", "singletonList(T)", "emptyList()", "unmodifiableList(List)"
  ];
          