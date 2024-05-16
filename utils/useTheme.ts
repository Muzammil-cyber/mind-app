import { useColorScheme } from "@/components/useColorScheme";

const useTheme = (): 'light' | 'dark' => useColorScheme() ?? "light"; // default to light
export default useTheme;