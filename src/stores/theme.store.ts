import { writable } from 'svelte/store';
import { ThemeDto } from '../dto/theme.dto';
import { defaultTheme } from '../themes/default.theme';

export const themeStore = writable<ThemeDto>(defaultTheme);
